---
title: (JS) 프로그래머스 - 괄호 회전하기
date: 2021-04-19 01:04:40
category: problem-solve
thumbnail: { thumbnailSrc }
draft: false
---

![picture 1](images/2021-04-18/0324.png)

## [프로그래머스 - 괄호 회전하기](https://programmers.co.kr/learn/courses/30/lessons/76502)

프로그래머스 월간 코드 챌린지 시즌2 4월 2번 문제입니다.

스택을 사용하면 쉽게 해결할 수 있는 문제입니다.

알고리즘 풀이의 경우 문제를 잘 나누는 능력이 도움이 많이 됩니다.

## 풀이

이 문제는 아래와 같이 나눌 수 있습니다.

- 문자열을 한칸씩 왼쪽으로 돌리는 문제
- 주어진 괄호 문자열이 올바른 괄호인지 확인하는 문제

### 문자열을 한칸씩 왼쪽으로 돌리는 문제

여러가지 방법이 있지만 저는 큐의 성질을 이용했습니다.

주어진 문자열을 배열로 만들고 문자열의 길이만큼 순회하며 `arr.push(arr.shift())`를 이용해 한칸씩 왼쪽으로 돌렸습니다.

```js
const arr = s.split('')

for (let i = 0; i < s.length; i++) {
  arr.push(arr.shift())
}
```

### 주어진 괄호 문자열이 올바른지 확인하는 문제

주어진 문자열이 올바른 괄호인지 어떻게 알 수 있을까요?

스택을 이용하면 간단하게 풀 수 있습니다.

스택에 한 글자씩 넣되 짝이 맞는 괄호가 나오면 해당 괄호들을 꺼내서 없앱니다.

그 과정에서 아래와 같은 경우들이 발생하면 올바른 괄호 문자열이 아닙니다.

- `닫는 괄호`가 나왔을 때 스택의 맨 위 요소와 짝을 이루지 못하는 경우(빈 스택도 포함)
- 모든 문자를 처리한 후 스택에 남은 문자가 있는 경우

```js
const pair = { '}': '{', ']': '[', ')': '(' }

const isValid = arr => {
  const stack = []
  for (let i = 0; i < arr.length; i++) {
    const c = arr[i]
    if (pair[c] === undefined) stack.push(c)
    else {
      if (stack[stack.length - 1] !== pair[c]) return false
      stack.pop()
    }
  }
  if (stack.length) return false
  return true
}
```

### 전체 소스코드

위에서 해결한 문제를 합치면 됩니다.

- 문자열을 한칸씩 왼쪽으로 돌리면서
- 돌아간 괄호 문자열이 올바른지 확인합니다.
- 올바른 문자열이라면 count를 1씩 증가시킵니다.

```js
const pair = { '}': '{', ']': '[', ')': '(' }

function solution(s) {
  const arr = s.split('')
  let result = 0
  const isValid = arr => {
    const stack = []
    for (let i = 0; i < arr.length; i++) {
      const c = arr[i]
      if (pair[c] === undefined) stack.push(c)
      else {
        if (stack[stack.length - 1] !== pair[c]) return false
        stack.pop()
      }
    }
    if (stack.length) return false
    return true
  }

  for (let i = 0; i < s.length; i++) {
    if (isValid(arr)) result++
    arr.push(arr.shift())
  }

  return result
}
```
