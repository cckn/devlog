---
title: AWS Step Functions
date: 2022-08-15 17:08:95
category: dev
thumbnail: { thumbnailSrc }
draft: false
---

# WHAT : AWS Step Functions는 무엇인가요?

![](https://i.imgur.com/oFsp2ua.png)

AWS Step Functions는 시각화된 워크플로를 통해 분산 애플리케이션 및 마이크로 서비스 컴포넌트의 관리를 돕는 완전 관리형 서비스

기존의 SWF(Amazon Simple Workflow)를 대체하는 용도로 만들어짐
![](https://i.imgur.com/rf9OYCh.png)

## 용어 정의

- 상태 머신 : Step-functions으로 작성한 Workflow
- 상태 : Workflow의 각 단계
- 상태 전환 : 한 상태에서 다음 상태로 이동하는 것

## Amazon States Language

Amazon States 언어는 state machine을 정의하는 데 사용되는 구조화된 JSON 기반 언어

- CDK를 사용하는 경우 직접 사용하지는 않음
- 생성된 리소스는 Amazon States Language로 되어있기 때문에 살펴보는데 도움이 될 수도 있음

```json
{
  "Comment": "An example of the Amazon States Language using a choice state.",
  "StartAt": "FirstState",
  "States": {
    "FirstState": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:FUNCTION_NAME",
      "Next": "ChoiceState"
    },
    "ChoiceState": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.foo",
          "NumericEquals": 1,
          "Next": "FirstMatchState"
        },
        {
          "Variable": "$.foo",
          "NumericEquals": 2,
          "Next": "SecondMatchState"
        }
      ],
      "Default": "DefaultState"
    },

    "FirstMatchState": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:OnFirstMatch",
      "Next": "NextState"
    },

    "SecondMatchState": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:OnSecondMatch",
      "Next": "NextState"
    },

    "DefaultState": {
      "Type": "Fail",
      "Error": "DefaultStateError",
      "Cause": "No Matches!"
    },

    "NextState": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:FUNCTION_NAME",
      "End": true
    }
  }
}
```

# WHY : 왜 AWS Step Functions를 사용하나요 ?

## AWS Step Functions의 장점

### 워크플로 시각화

- 워크플로를 시각화해서 볼 수 있음
- 실행 이력을 시각화와 로그로 확인 가능(어떤 노드가 실행되었고 성공, 실패 하였는지)
- 운영 기록이 남으며 추후 감사 자료로 활용 가능

### AWS Step-functions를 이용해 AWS의 서비스 통합

- Lambda, ECS, Fargate, Batch, DynamoDB, SNS, SQS, SageMaker, EventBridge 등등 AWS의 거의 대부분(200개) 서비스
- 서비스 통합 코드(ex. Lambda->Fargate)를 작성하지 않고 Step-functions의 기능을 이용한 통합 가능

### 내결함성 및 상태 유지 워크플로 구축

- 워크플로의 Task가 실행되도록 보장
  - standard : 정확히 1회
  - express : 최소 1회
- try/catch, 재시도 및 롤백 기능 제공으로 오류와 예외를 자동으로 처리

## Use case

### Function orchestration

![](https://i.imgur.com/yF4fzzq.png)

- 특정 순서로 Lambda를 실행하는 워크플로 생성
  - 이전 Step의 Lambda Output은 다음 Lambda 함수의 Input으로 전달
  - 마지막 상태의 Output은 워크플로의 결과로 사용됨

### Human in the loop

- 특정 로직에서 사용자나 외부 시스템의 응답을 기다려야 하는 경우 Step-functions에서 다음과 같은 로직을 사용할 수 있습니다.
  - task에서 task token을 생성하고 대기 (TaskType을 waitForTaskToken으로 설정)
  - sendTaskSuccess or sendTaskFailure API를 호출하며 task token을 전달
  - step-functions은 적절한 일시정지된 task를 찾아서 결과를 전달
  - task는 결과를 이용해 작업을 재개

![](https://i.imgur.com/7hvdRgc.png)

- 아래 예시는 Step-functions과 API Gateway, SES를 이용해 이메일을 이용한 승인/거절 시스템을 구성한 예시

![](https://i.imgur.com/fYKItwD.png)

# How : AWS Step Functions는 어떻게 사용하나요?

## AWS Step Functions - CDK에서의 사용

```ts
import * as lambda from 'aws-cdk-lib/aws-lambda'

declare const submitLambda: lambda.Function
declare const getStatusLambda: lambda.Function

const submitJob = new tasks.LambdaInvoke(this, 'Submit Job', {
  lambdaFunction: submitLambda,
  // Lambda's result is in the attribute `Payload`
  outputPath: '$.Payload',
})

const waitX = new sfn.Wait(this, 'Wait X Seconds', {
  time: sfn.WaitTime.secondsPath('$.waitSeconds'),
})

const getStatus = new tasks.LambdaInvoke(this, 'Get Job Status', {
  lambdaFunction: getStatusLambda,
  // Pass just the field named "guid" into the Lambda, put the
  // Lambda's result in a field called "status" in the response
  inputPath: '$.guid',
  outputPath: '$.Payload',
})

const jobFailed = new sfn.Fail(this, 'Job Failed', {
  cause: 'AWS Batch Job Failed',
  error: 'DescribeJob returned FAILED',
})

const finalStatus = new tasks.LambdaInvoke(this, 'Get Final Job Status', {
  lambdaFunction: getStatusLambda,
  // Use "guid" field as input
  inputPath: '$.guid',
  outputPath: '$.Payload',
})

const definition = submitJob
  .next(waitX)
  .next(getStatus)
  .next(
    new sfn.Choice(this, 'Job Complete?')
      // Look at the "status" field
      .when(sfn.Condition.stringEquals('$.status', 'FAILED'), jobFailed)
      .when(sfn.Condition.stringEquals('$.status', 'SUCCEEDED'), finalStatus)
      .otherwise(waitX)
  )

new sfn.StateMachine(this, 'StateMachine', {
  definition,
  timeout: Duration.minutes(5),
})
```

## AWS Step Functions - State의 종류

### Task

- 작업을 수행한다.
- Lambda로 수행되는 작업일 수도 있고, Batch로 수행되는 작업일 수도 있다.

### Pararell

- Branch들을 병렬적으로 실행할 때 사용된다.
- Branch에 두 State가 있다면,
  - 이 State를 서로 독립적으로 병렬적으로 수행한다는 뜻이다.

### Choice

- 다음에 어떤 State로 넘어갈 지 분기를 설정할 수 있다.
- Inputpath의 값에 따라 서로 다른 로직을 수행해야 할 때 사용된다.

### Map

- 함수형 프로그래밍의 map 함수와 유사
- 입력 배열의 각 항목을 처리하고 결과 배열을 반환
- 최대 병렬처리 횟수 설정 가능

### Wait

- "Seconds"에 지정된 초만큼 기다린다(딜레이된다).

### Fail

- 작업을 멈추고 이 작업을 실패로 표시한다.

### Succeed

- 작업을 멈추고 이 작업을 성공으로 표시한다.

### Pass

- 입력된 데이터를 다음 상태로 전달
  - 전달 과정에서 데이터를 삭제하거나 추가할 수 있음
- 처음 Step-functions을 작업할 때 아직 구현되지 않은 Task들을 Pass로 잡아두고 작업하면 편함.

## AWS Step Functions - Type of Task

Standard Workflow에서 사용할 수 있는 Task의 타입은 아래 3가지

- Express Workflow는 `Run a job(.sync)` 또는 `Wait for Callback(.waitForTaskToken)`를 지원하지 않습니다.

### Request a response (default)

- 일반적인 Task
- 서비스를 호출하고 HTTP 응답을 받은 후 Step Functions가 다음 상태로 진행

### Run a job (.sync)

- 서비스를 호출하고 Step Functions가 작업이 완료될 때까지 대기
- ECS, Fargate 같은 인스턴스와 연동

### Wait for a callback with a task token (.waitForTaskToken)

- task는 task token으로 서비스를 호출하고 대기
- task token이 콜백과 함께 반환되면 작업 재개

# 기타

## AWS Step Functions - Standard vs Express

- Step Functions는 특정 사용 사례에 따라 사용할 수 있는 두 가지 워크플로 유형 제공
  - 스탠더드 워크플로는 장기 실행 워크로드를 관리하는 데 사용
  - 익스프레스 워크플로는 대용량 이벤트 처리 워크로드를 지원 (IoT 등)

![](https://i.imgur.com/aHEY5ld.png)

### Standard workflow

- 장기 실행 워크플로에 이상적
  - 실행 기록 및 시각적 디버깅을 보여줌
- 멱등성이 없는 작업을 수행하는 데 적합

- 실행시간 최대 1년
- 정확히 한 번만 워크플로를 실행
  - 각 단계(Step)가 정확히 한 번 실행됨
- 처리된 상태 전환 수에 따라 요금이 청구

### Express workflow

- 이벤트 비율이 높은 워크로드에 이상적
- 멱등성이 있는 작업을 조정하는 데 이상적

  - 스트리밍 데이터 처리 및 IoT 데이터 수집하는 작업
  - 입력 데이터를 변환 후 PUT을 통해 Amazon DynamoDB에 저장하는 작업
  - 처리 시간이 길지 않고 빈도가 높은 데이터 처리

- 실행시간 최대 5분
- 최소 한 번 워크플로를 실행
  - 각 단계는 최소 한 번 실행하지만 두 번 이상 실행될 수 있음
- 실행 횟수, 실행 기간 및 사용된 메모리에 따라 청구(standard에 비해 낮은 요금)
- Task 형태 중 이나 callback은 사용할 수 없음

# 참조

- [Amazon States Language - AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html)
- [aws-cdk-lib.aws_stepfunctions module · AWS CDK](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions-readme.html)
- [Standard vs. Express Workflows - AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html)
- [집중적 워크로드용 신유형? - Step Functions Express Workflows 출시](https://blog.wisen.co.kr/pages/blog/blog-detail.html?idx=11978)
- [What is AWS Step Functions? - AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html)
- [AWS Step Functions - Web Documents](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html)
- [AWS Step Functions - PDF Documents](https://docs.aws.amazon.com/ko_kr/step-functions/latest/dg/step-functions-dg.pdf)
- [AWS Step Functions을 통한 마이크로서비스 오케스트레이션 - 강세용:: AWS 현대적 애플리케이션 개발 - YouTube](https://www.youtube.com/watch?v=sRXvADi4hmw)
