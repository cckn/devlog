---
title: 릿코드(Leetcode) - 3. Longest Substring Without Repeating Characters
date: 2021-03-14 15:03:59
category: problem-solve
thumbnail: { thumbnailSrc }
draft: false
---

[문제 링크](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## 3. Longest Substring Without Repeating Characters

반복되는 문자가 없는 `가장 긴` 부분 문자열의 길이를 구하는 문제

### 풀이

투 포인터 알고리즘 느낌으로 접근했다.

- start, end를 두고
  - 중복된 문자열이 없는 경우 end를 ++하고
  - 중복된 문자열이 있는 경우 start를 이동해서 중복되지 않은 문자열로 바꾼다.
- 해당 과정에서 발생한 `중복된 문자가 없는 부분 문자열`의 길이 중 가장 큰 값을 반환한다.

```ts
function lengthOfLongestSubstring(s: string): number {
  let start = 0
  let end = 0

  let max = 0
  while (start <= end && end <= s.length) {
    const substring = s.slice(start, end)
    max = Math.max(max, substring.length)

    const index = substring.indexOf(s[end])
    if (index !== -1) {
      start += index + 1
      continue
    }
    end++
  }
  return max
}
```
