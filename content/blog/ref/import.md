---
title: 'Docker 이론, 개념 정리(1)'
date:
category:
draft: false
---

## Docker는 왜 사용할까?

공급자 입장에서는 간단하게 소프트웨어를 패키징할 수 있고 전달 가능하다
Docker를 이용하면 소비자는 프로그램을 간단하게 설치 가능하다.

## Docker는 무엇일까?

Docker가 무엇인지 알기 위해서는 컨테이너를 알아야 한다.

## 컨테이너는 무엇일까?

화물 컨테이너를 생각해보자
화물 컨테이너를 이용해서 물건을 실으면 물건의 크기와 무게 등과 상관없이(신경 쓰지 않고) 물건을 적재할 수 있다.
소프트웨어에서 말하는 컨테이너도 마찬가지다
여러 소프트웨어 등을 동일한 규격으로 묶어 실제 사용자가 최대한 신경을 덜 쓰고 사용할 수 있도록 만든 것이 컨테이너이다.

## Image는 뭐고 Container는 또 뭐야?

이미지와 컨테이너는 무엇일까??
이미지는 소프트웨어 구동에 필요한 의존(Dependency)과 명세를 담고 있다.
컨테이너는 이미지를 통해 만들어진다.
개발을 해본 사람이라면 Class와 Instance의 차이를 알 것이다.
일반적인 경우에는 Class를 직접 사용하지 않는다.
해당 Class를 기반으로 한 Instance를 생성하여 사용한다.
예를 들면 아래와 같다.
// Class 생성

```js
Class Car(...)
{
  func drive(...)
  {
    ...
  }
  ...
}
```

```js
main()
{
  // Instance 생성
  var k5 = new Car(...)

  // Instance 사용
  k5.drive(...)
}
```

위의 예제는 개념만 정리해둔 pseudo 코드이다.
위와 같은 예제에서

```js
Class == Image
Instance == Container
```

정도로 이해하면 쉽다.

Dockerfile은 Image를 만들기 위한 명세이고, Image는 Container를 만들기 위한 본이다.
Container는 사용하기 위해 Image로부터 만들어진 객체이다

## Docker 사용 시나리오

hello-world이미지가 없는 경우 registy(DockerHub)에서 이미지를 다운 받는다.

![picture 2](2021-03-08/5760633012eddee6570a7c22a7d8dc9a83aaab41b998d1a4302640603fccdc09.png)

hello-world이미지가 있는 경우 이미지를 다운 받지 않고 컨테이너를 생성한다.

## Docker와 기존 가상화 기술(VM)의 차이

## 공통점

각 컨테이너/VM이 격리되어 있다.

## 차이점

VM은 Hyper Visor 및 GuestOS가 포함되어 있어 더 무겁고 느리다.
VM은 각 VM간 완전한 격리가 이루어진다
Use GuestOS Kernel
Docker는 불완전한 격리가 이루어진다
Use HostOS Kernel

## Docker가 (불완전한) 격리를 수행하는 방법

Use Cgroup & Namespace of linux
Cgroup - CPU, Mem, network, I/O 등의 자원을 제한함
Namespace - 프로세스를 격리하는 기능
실제 격리는 이루어지지 않는다.

## 이미지로 컨테이너 만들기

이미지가 컨테이너로 만들어지는 과정

이미지는 file snapshot과 Command List를 가지고 있다.

해당 이미지로 컨테이너를 생성하고 File Snapshot을 HDD에 적재한다.
프로세스 영역에 Command List를 이동한다.

CommandList를 실행한다.

## Cgroup과 namespace를 Windows/macOS에서도 사용할 수 있는 이유?

Linux가 아닌 OS에 Docker를 설치하는 경우 Docker를 바로 설치하는 게 아니고 Linux VM이 설치되고 그 위에 Docker Engine 및 Container들이 설치된다.
Container들은 Linux Kernel을 사용하기 때문에 Cgroup / namespace를 사용할 수 있다.

## docker run <img> <CMD>

CMD 필드를 채워 넣으면
기존 이미지에 있던 CommandList를 무시하고 CMD를 실행한다.
