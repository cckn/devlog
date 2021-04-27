---
title: JS로 알고리즘 - 로또의 최고 순위와 최저 순위(프로그래머스 - 백엔드 데브매칭)
date: 2021-04-27 12:29:33
category: problem-solve
thumbnail: { thumbnailSrc }
draft: false
---

![picture 1](images/2021-04-27/abf81ca6fb1ba2c6f7a380908e851f3bb9ca7453c37b70b727caa8cc9f5603c9.png)

## [로또의 최고 순위와 최저 순위](https://programmers.co.kr/learn/courses/30/lessons/77484)

- 최고 순위는 0이 다 맞았을 경우
- 최저 순위는 0이 다 틀렸을 경우

## 전체 소스코드

```js
const getRank = (match: number) => (match > 1 ? 7 - match : 6)

function solution(lottos: number[], win_nums: number[]) {
  let matched = 0
  let wildcard = 0

  lottos.forEach(num => {
    if (num === 0) wildcard++
    else if (win_nums.includes(num)) matched++
  })
  return [getRank(wildcard + matched), getRank(matched)]
}
```
