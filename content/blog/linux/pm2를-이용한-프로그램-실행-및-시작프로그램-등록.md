---
title: PM2를 이용한 프로그램 실행 및 시작프로그램 등록
date: 2019-11-05 20:03:15
category: linux
thumbnail: { thumbnailSrc }
draft: false
---

![picture 18](images/2021-03-09/91b1c55a1780dc5bf7bd08e2f34b987d44f424c48aea1b4b9e5502fe339cde89.png)

## 이 글은 어떤 사람들을 위한 글인가요?

- 리눅스에서 시작프로그램을 등록하고 싶어요 (라즈베리파이)
  - 윈도우에서 사용하시려면 [링크](https://jsdev.kr/t/pm2-windows/4729)를 참조해주세요
- 그 프로그램이 예상치 못한 런타임에러로 중단되어도 알아서 다시 시작했으면 좋겠어요
- 따로 로깅을 하지 않더라도 해당 프로그램의 로그를 확인하고 싶어요

---

## 다른 방법도 있지 않아요?

단순 시작프로그램 등록만을 원한다면 [rc.local 파일을 수정하거나 데몬으로 추가할 수 있지만](https://nobilitycat.tistory.com/entry/리눅스-시작-시-자동으로-실행-될-프로그램-등록하기)

- 프로그램이 알 수 없는 문제로 종료되면?
- 해당 프로그램의 로그를 확인하고 싶다면?

같은 문제는 따로 처리해야합니다. 😦

PM2를 사용한다면 간단한 방법으로 위와 같은 문제들을 해결 할 수 있습니다.

---

## PM2는 무엇인가요?

사용자의 프로그램을 항상 동작하도록 도와주는 프로세스 관리자입니다.

기본적으로 NODE.JS에 최적화되어 있지만 아래 언어들도 지원하는 것으로 보입니다.

```json
{
  ".sh": "bash",
  ".py": "python",
  ".rb": "ruby",
  ".coffee": "coffee",
  ".php": "php",
  ".pl": "perl",
  ".js": "node"
}
```

---

# PM2 사용 방법

본격적으로 PM2 사용 방법을 알아보겠습니다.

자세한 정보는 [QUICK START](https://pm2.keymetrics.io/docs/usage/quick-start/) 참조하세요

---

## 내 프로그램을 시작프로그램으로 등록하려면?

1. `pm2 install`
2. `pm2 start`
3. `pm2 startup`
   1. 출력된 스크립트 복사하여 command에 붙여넣기
4. `pm2 save`
5. Reboot 후 `pm2 monit` 등으로 정상 동작 확인

---

## 설치

```bash
npm install pm2@latest -g
# or
yarn global add pm2
```

pm2를 전역으로 설치합니다. 전역으로 설치해야 shell 상에서 `pm2` 커맨드를 사용 할 수 있어요.

- `npm`이나 `yarn` 중 선호하는 패키지 관리자 사용하세요
- npm이 설치되어 있지 않은 경우 [Node.js](https://nodejs.org/ko/) 설치하시면 됩니다 🙂

---

## 시작

```bash
pm2 start <Your App>
```

기본 형식은 위와 같습니다. <your App> 부분에 실행 할 프로그램을 넣으시면 돼요

저는 거의 항상 npm script를 사용해서 프로그램을 실행하기 때문에 아래와 같이 시작합니다.

```bash
pm2 start npm -- start # 이름 등록 하지 않음(npm으로 등록됨)
# or
pm2 start npm --name "Your APP Name" -- start # (앱 이름 등록 가능)
```

---

## 확인

아래 커맨드들을 이용하여 현재 등록되어 있는 프로세스들을 확인 할 수 있습니다.

### ls

```
pm2 ls
```

![Untitled.png](https://images.velog.io/post-images/cckn/320f06f0-ff46-11e9-94aa-23d3cb3379d4/Untitled.png)

익숙한 ls 명령어를 이용해서 현재 등록된 프로세스들을 조회할 수 있습니다.

### monit

```
pm2 monit
```

![monit.png](https://images.velog.io/post-images/cckn/2bc5d5d0-ff46-11e9-a05c-c5bfa6b71115/monit.png)

각 프로세스의 출력 및 상태를 실시간으로 확인할 수 있는 UI가 제공됩니다.

### logs

```
pm2 logs
pm2 logs --lines 200
```

저장된 로그를 확인합니다.
`--lines`를 이용해 줄 수를 지정할 수 있습니다.

---

## 프로그램 시작 등록

프로그램이 정상적으로 등록되고 동작하는 것을 확인했다면 프로그램 시작 등록을 할 차례입니다.

```
pm2 startup
```

위 명령어를 입력하면 아래와 같은 메세지가 출력됩니다.

```
[PM2] You have to run this command as root. Execute the following command:
      sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

현재 등록된 프로세스들을 시작프로세스로 등록하기 위한 커맨드가 제공됩니다 (2번째 줄부터)

이 커맨드는 각기 다른 OS에 맞게 PM2에서 출력해주는 것이므로 제 블로그에 있는 글을 복사하지 말고 해당 환경에서 출력된 command를 복사해서 붙여넣어주세요

# 참조

https://pm2.keymetrics.io/docs/usage/quick-start/

https://pm2.keymetrics.io/docs/usage/startup/

https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script
