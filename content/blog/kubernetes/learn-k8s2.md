---
title: 쿠버네티스의 철학
date: 2021-04-28 07:04:05
category: kubernetes
thumbnail: { thumbnailSrc }
draft: true
---

> 이 글은 [조훈](https://www.inflearn.com/users/@kubernetes)님의 [쉽게 시작하는 쿠버네티스(Kubernetes)](https://www.inflearn.com/course/%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4-%EC%89%BD%EA%B2%8C%EC%8B%9C%EC%9E%91/dashboard)를 학습하는 과정에서 기록하였습니다.
>
> 강의 내용과 다소 차이가 있을 수 있으니 정확한 학습을 위해서는 강의를 참조해주세요.

이 글에서는 쿠버네티스의 철학과 아키텍처에 대해 학습한 내용을 기술하겠습니다.

## 쿠버네티스의 철학

쿠버네티스는 마이크로 서비스 아키텍처(Micro Servises Architecture, 이하 MSA) 구조를 가집니다.
쿠버네티스를 이루는 각 구성요소들이 각기 다른 역할을 수행합니다.
이 구성요소들은 쿠버네티스의 pod로 동작합니다.

### 컨테이너 구성 요소들을 조회하는 방법

### Pod가 배포되었을 때 쿠버네티스 구성 요소들이 하는 일

- 사용자가 Pod를 생성합니다. (`kubectl run <Pod name> --image=<Pod image>`)
- kubelet을 통해 API Server로 Pod 생성 명령이 전달됩니다.
  - API 서버의 상태(status)가 변경되었습니다.
- etcd에 API Server의 현재 상태를 백업합니다.
  - API Server에 이상이 생시면 etcd에 백업된 내용을 가지고 복구합니다.
- 컨트롤러 매니저와 스케줄러에 데이터를 전송합니다.
- kubelet에서 컨테이너 런타임과 통신합니다.
- Pod가 생성됩니다.
- 생성된 Pod가 kube-proxy와 연결됩니다.
- 사용자가 kube-proxy를 통해 Pod에 접속합니다.
