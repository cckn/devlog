---
title: Jest가 너무 느릴 때 해결 방법(with ts-jest)
date: 2022-09-03 10:09:55
category: dev
thumbnail: { thumbnailSrc }
draft: false
---

Jest를 이용해 테스트를 할 때 간단한 테스트임에도 불구하고 너무 느릴 때가 있다. 예를 들면 간단한 테스트 케이스 하나 추가될 때마다 jest 동작 시간이 5초씩 추가되는 것이다.

![](https://i.imgur.com/Uzr0WZ8.png)

이렇게 느린 이유는 `ts-jest`의 설정 때문이라고 한다.

## 해결 방법

### 1. jest.config.js의 설정을 변경한다.

ts-jest의 isolatedModules 옵션을 true로 설정한다.

```js
'use strict'

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
```

### 2. jest를 돌릴 때 `maxWorkers=1` 옵션을 함께 전달한다.

이 옵션은 jest가 동시에 실행할 수 있는 worker의 개수를 1로 제한한다.

```bash
yarn test --maxWorkers=1
```

package.json의 script에 추가해두면 편하다.

```json
{
  "scripts": {
    "test": "jest --maxWorkers=1"
  }
}
```

## 참조

- [javascript - Jest - Simple tests are slow - Stack Overflow](https://stackoverflow.com/questions/45087018/jest-simple-tests-are-slow)
