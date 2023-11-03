---
title: 아키텍처 패턴과 도메인 주도 개발
date: 2023-10-22 22:00:00
category: backend
thumbnail: { thumbnailSrc }
draft: false
---


# 참조 
- [도메인 주도 설계 철저 입문 - 예스24](https://www.yes24.com/Product/Goods/93384475)
- [NHN FORWARD 22 - 클린 아키텍처 애매한 부분 정해 드립니다. - YouTube](https://www.youtube.com/watch?v=g6Tg6_qpIVc&ab_channel=NHNCloud)



# 소프트웨어 아키텍처란 ?  

![](https://i.imgur.com/UZEaLCQ.png)

소프트웨어 아키텍처는 기능과 구조 중 구조에 대한 이야기 
- 코드를 구성하는 원칙 
- 좋은 아키텍처를 가진 프로젝트에서는 `어떤 로직을 어디에 구현할 것인지` 고민하지 않아도 됨
- (책) 일반적인 소프트웨어 개발에서 아키텍처는 가장 중요한 개념이지만 DDD에서의 아키텍처는 주인공이 아닌 도구에 가까움 

## 소프트웨어 아키텍처의 목표 

![](https://i.imgur.com/3brlr1R.png)

![](https://i.imgur.com/FErkpQg.png)

- 좋은 아키텍처(구조)는 유지보수 비용을 최소화하기 위해 필요하다. 
- DDD에서는 도메인 객체를 다른 레이어로부터 분리하고 지켜내는 것 


## 아키텍처 패턴 

- 아키텍처는 아키텍처 패턴과 동의어가 아니다. 

```ts
아키텍처 패턴 = [
  계층형 아키텍처, 
  클린 아키텍처, 
  헥사고날 아키텍처,
  // ... 
] 
```
- 모든 소프트웨어에는 나름의 아키텍처가 있다. 좋은 아키텍처는 기능, 성능, 확장성, 유지보수성, 보안 등을 고려하여 설계된다. 이 과정에서 많은 에너지가 소모된다. 
- 아키텍처 패턴은 좋은 아키텍처를 만들기위해 만들어진 레시피이다. 


![](https://i.imgur.com/0UOuOdI.png)

- 좋은 아키텍처를 위한 많은 소프트웨어 개발 원칙들이 존재한다. 
  - 이걸 설계, 개발시마다 지키고 모든 팀원이 이해하기는 어렵다. 🙄

![](https://i.imgur.com/HTYontd.png)

- 요리를 잘 못하는 사람도 좋은 레시피를 잘 따라한다면 좋은 요리를 만들 수 있다.  
- 마찬가지로 맨땅에서 좋은 아키텍처를 만들기 위해 애를 쓰는 것보다 아키텍처 패턴을 활용하는 것이 더 쉽게 좋은 아키텍처를 만들 수 있게 한다. 


### 계층형 아키텍처 

![](https://i.imgur.com/M88ggTi.png)

- 각 계층은 상위 계층에 서비스를 제공하고, 하위 계층으로부터 서비스를 받음
- 도메인 로직을 Domain 계층에 명확하게 정의하도록 권장
  - 이 외의 계층에서는 도메인 로직의 구현에 개입하지 않음
- (책) 실무에서는 계층형 아키텍처를 사용하더라도 의존관계 역전을 적용하도록 하여 사용 
- 쉽고 단순하지만 계층간 의존성이 높아 유지보수가 어려울 수 있음 

### 헥사고날 아키텍처 

![](https://i.imgur.com/Syvvc9m.png)

- 포트-어댑터 패턴을 사용해서 Ports-and-Adapters 아키텍처라고도 함. 
- 외부의 변경으로부터 핵심 로직(도메인 객체)를 분리, 보호 
- Input Port(프라이머리 포트)와 Output Port(세컨더리 포트)

> [!note]
> 클린 아키텍처의 Entity는 DDD에서 말하는 Entity와는 다름.
> - 비즈니스 규칙을 캡슐화한 객체 or 데이터 구조와 함수를 묶은 것 
> - DDD의 도메인 객체에 가까운 개념 

### 클린 아키텍처 

![](https://i.imgur.com/fbRhy0s.png)

![](https://i.imgur.com/7EC6dc2.png)

- 의존성 역전을 통해 도메인을 중심으로 사용 
- 계층을 나누고 의존성의 방향이 안쪽을 향한다. 
- 의존성의 방향은 고수준을 향하게 한다. 





## 클린 아키텍처와 헥사고날 아키텍처의 공통 목표 ?

![](https://i.imgur.com/zFTSTk3.png)

- 클린 아키텍처는 좋은 아키텍처(+헥사고날)의 특징들을 모아서 만든 아키텍처 패턴 
- 공통의 목표와 핵심 규칙을 가지고 있기 때문에 거의 유사함 
- (책) 헥사고날 아키텍처는 포트와 어댑터로 탈착이 가능하게하라는 원칙, 클린 아키텍처는 구체적인 구현 방법도 명시. 

## 클린 아키텍처와 헥사고날 아키텍처 비교 

![](https://i.imgur.com/B6dJzGR.png)

- `헥사고날 아키텍처 === 클린 아키텍처`로 생각하고 진행해도 무방하다고 한다. 
- 각 아키텍처의 개념은 아래와 같이 매핑할 수 있다.
  - 클린 아키텍처 `Entity`             == 헥사고날 `Entity`
  - 클린 아키텍처 `Use Cases`          == 헥사고날 `Use Case + Ports`
  - 클린 아키텍처 `Interface Adapters` == 헥사고날 `Adapters`


## 클린 아키텍처를 적용해야 할까? 어떤 아키텍처를 사용해야 할까? 

![](https://i.imgur.com/IXhNnGS.png)

- 팀원들이 이해하지 못했지만 혼자서만 이해한 아키텍처 구조를 코드베이스에 적용해도 될까? 
  - 아키텍처를 적용하면서 발생하는 복잡성, 러닝 커브가 존재하기 때문에 섣불리 도입할 순 없다. 
  - 모두가 사용하기로 합의된 이후에 적용할 것 

![](https://i.imgur.com/0ThAfwR.png)
![](https://i.imgur.com/hRyGCfN.png)

- 헥사고날 아키텍처를 입문용으로 사용해서 클린 아키텍처로 
  - 클린 아키텍처로 시작하면 생각보다 레퍼런스가 적어 고생할 수 있음. 
  - 헥사고날 아키텍처는 쉽게 시작할 수 있는 실습 자료들이 많음. 
