---
title: (JS) 프로그래머스 - 음양 더하기
date: 2021-04-19 01:04:31
category: problem-solve
thumbnail: { thumbnailSrc }
draft: false
---

![picture 1](images/2021-04-18/0324.png)

## [프로그래머스 - 음양 더하기](https://programmers.co.kr/learn/courses/30/lessons/76501)

프로그래머스 월간 코드 챌린지 시즌2 4월 1번 문제입니다.

배열을 다룰 줄 안다면 풀 수 있는 쉬운 문제입니다.

## 풀이

주어진 배열을 순회하며 `absolutes`의 값을 더해줍니다.

`signs`이 false인 인덱스에서는 `-1`을 곱한 수를 더해줍니다.

```js
function solution(absolutes, signs) {
  return absolutes.reduce(
    (prev, acc, idx) => prev + acc * (signs[idx] ? 1 : -1),
    0
  )
}
```
