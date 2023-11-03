---
title: DynamoDB 테이블의 기본키가 단일키면 GSI도 단일키여야 할까? 
date: 2023-11-03 22:00:00
category: dev
thumbnail: { thumbnailSrc }
draft: false
---

## 요약 
GSI의 기본키는 기본 테이블의 기본키가 단일키인지 복합키인지와 무관하다. 

## 상세
AWS DynamoDB를 사용하다 보면 GSI(Global Secondary Index)를 사용하게 된다.
GSI는 기본 테이블의 기본키와는 별개의 기본키를 이용해 생성되는 인덱스이다.
여기서 궁금증이 생겼다. 

만약 기본 테이블이 단일키(Only PK)를 가진다면 GSI도 단일키를 가져야 하나? 
만약 기본 테이블이 복합키(PK + SK)를 가진다면 GSI도 복합키를 가져야 하나? 

![](https://i.imgur.com/XcnJHZe.png)

AWS의 문서에 따르면 GSI는 기본 테이블과 무관하게 사용 가능하다
- 기본 테이블의 기본키가 단일키여도 GSI는 복합키로 사용 가능! 
- 그 반대도 가능! 

## 참조 
- [DynamoDB에서 글로벌 보조 인덱스 사용 - Amazon DynamoDB](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GSI.html)