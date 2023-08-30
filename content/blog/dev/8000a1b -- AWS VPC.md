---
title: AWS VPC(Virtual Private Cloud)
date: 2023-08-30 22:00:00
category: dev
thumbnail: { thumbnailSrc }
draft: false
---

# AWS VPC의 중요성

Amazon Web Services (AWS)에서 인프라를 만들거나 관리할 때, Virtual Private Cloud (VPC)는 빠질 수 없는 중요한 개념이다. AWS 리소스들, 예를 들어 EC2 인스턴스나 RDS 데이터베이스 같은 것들, 모두 VPC 위에서 동작한다. Default VPC를 사용할 수도 있지만, 이는 일부 사용 상황에 제약이 있을 수 있다. 그래서 사용자의 요구사항에 맞게 VPC를 설정하는 것이 중요하다.

# VPC란 무엇인가?

VPC는 클라우드 환경에서 사용자만의 가상의 프라이빗 네트워크 공간이다. 한 VPC 내에서는 여러 개의 가용 영역 (Availability Zone, AZ)을 사용할 수 있지만, 여러 리전에 걸쳐 동작하는 것은 불가능하다. VPC의 크기는 Classless Inter-Domain Routing (CIDR) 블록으로 지정하며, 한번 생성한 후에는 변경할 수 없다.

# VPC의 크기는 어떻게 결정해야 하는가?

VPC의 크기는 한 번 정해지면 변경할 수 없기 때문에, 처음 만들 때 크게 만드는 것이 유리할 것 같다는 생각을 할 수 있다. 하지만, 무작정 크게 만들어진 VPC는 네트워크 설계의 유연성 면에서 불리한 점이 있다. 예를 들어, CIDR 블록의 범위가 겹치는 경우 VPC 간의 피어링이 불가능하다. 따라서 VPC의 크기는 미래의 확장성과 현재의 필요성을 모두 고려하여 신중하게 결정해야 한다.

# VPC는 AWS에만 있는 개념인가?

VPC라는 개념은 AWS에만 있는 것이 아니다. 다른 클라우드 서비스 제공자들에서도 비슷한 개념을 사용하고 있지만, 이름이 조금 다를 수 있다. 예를 들어, Microsoft Azure에서는 Virtual Network (VNet)라는 이름으로, Google Cloud Platform (GCP)에서는 VPC Network라는 이름으로 이 개념을 사용하고 있다. 이처럼 각 클라우드 서비스 제공자마다 약간씩 차이는 있지만, 가상 프라이빗 네트워크를 제공하는 핵심 개념은 동일하다.

# 참조

- AWS 공인 솔루션스 아키텍트 올인원 스터디 가이드
