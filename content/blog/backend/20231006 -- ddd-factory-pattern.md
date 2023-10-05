---
title: 도메인 주도 설계 - 팩토리 패턴
date: 2023-10-05 22:00:00
category: backend
thumbnail: { thumbnailSrc }
draft: false
---

## 팩토리 패턴은 무엇인가? 
- DDD의 주요 개념 중 애플리케이션 패턴에 속하는 개념. 
![width:800px](https://i.imgur.com/XQZrZf9.png)

- 객체의 생성에 특화된 객체
- 객체의 생성에 대한 지식을 가지고 있다. 


## 팩토리 패턴 === 복잡한 물건은 공장에 맡기자.

- 간단한 물건은 직접 만들어서 사용할 수 있다. 
  - ![width:300px](https://i.imgur.com/rFNSrRh.png)

- 복잡한 물건은 공장에서 만드는 것이 효율적이다. 
  - ![width:400px](https://i.imgur.com/GAfRxYn.gif)



## 팩토리 패턴은 왜 사용하나? 

- 복잡한 객체 생성 과정의 캡슐화
- 객체의 생성 역할과 책임을 분리 
- 객체 생성과 관련된 중복 코드가 발생하는 것을 막음 



## 팩토리 패턴은 언제 사용하나? 

### 적합하지 않은 경우 
- 객체의 생성 과정이 간단한 경우 

### 적합한 경우 
- 생성자 함수, 객체 생성 과정이 복잡한 경우 
- 생성자에서 다른 객체의 생성이 일어나는 경우


## 어떻게 사용하나? 

### 팩토리 패턴의 두 가지 형태
예시 : 특정 유저 ID를 host로 가지는 Circle을 생성하는 과정

#### 클래스로서의 팩토리
```ts 
const circle = new Circle({
  host: user.id, 
  circleName: "My Circle"
})
```

#### 메서드로서의 팩토리 
```ts
const circle = user.createCircle("My Circle")
```


### 메서드로서의 팩토리 

#### 적합한 경우 
- 객체의 내부 프로퍼티(user.id)를 사용하는 패턴을 막음 
  - 내부 프로퍼티를 외부로 노출하는 것 = 권장 X 
  - 내부 프로퍼티를 사용해야 하는 경우 메서드 팩토리 사용 가능 

#### 적합하지 않은 경우 
- 도메인 지식과 부합하지 않는 경우 
  - host 유저가 없어도 자체적으로 생성될 수 있는 경우  
  - 여러 유저가 공동 host로 놓일 수 있는 경우



## 리포지토리와 팩토리 
### 공통점

- 도메인 지식을 직접 표현하지는 않지만 도메인을 표현하는데 도움을 주는 개념
- 복잡한 과정을 캡슐화하여 코드의 질을 높인다.

### 차이점 

- 팩토리는 객체의 생성을 담당
- 리포지토리는 객체의 저장과 복원을 담당 

```ts
const user = userFactory.createUser("Jaden Park")

userRepository.save(user)
```


