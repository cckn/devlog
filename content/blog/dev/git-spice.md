---
title: git spice와 Stacked Diff 워크플로우
date: 2024-06-30 10:00:00
category: dev
thumbnail: { thumbnailSrc }
draft: false
---

작은 단위의 PR과 작업 속도 간의 균형을 맞추기는 쉽지 않다. 특히 코드리뷰가 필수인 환경에서는 더욱 그렇다.

## PR 크기의 딜레마

큰 PR을 만들면 리뷰어가 제대로 보기 어렵다. 2000줄짜리 PR을 받으면 대충 훑어보고 LGTM 달기 마련이다. 반대로 작은 PR들로 나누면 각각의 리뷰를 기다려야 한다. 특히 이전 작업을 기반으로 새로운 작업을 이어나가야 한다면? 첫 번째 PR 머지를 기다리고, 두 번째 PR 머지를 기다리고... 결국 개발 속도가 느려진다.

물론 코드리뷰를 최우선으로 하는 문화가 정착되면 좋겠지만, 현실적으로 쉽지 않다. 각자 자신의 일이 바쁘기 때문이다.

이런 상황에서 Stacked Diff 방식이 유용할 수 있다.

## Stacked Diff란

Stacked Diff는 Meta(구 Facebook)에서 시작된 개발 방식이다. 큰 기능을 여러 개의 작은 PR로 나누되, 이들을 스택처럼 쌓아 올린다.

```
main
  └── refactor/extract-validation (PR #1)
       └── refactor/improve-error-handling (PR #2)
            └── refactor/unify-response-format (PR #3)
                 └── refactor/add-tests (PR #4)
```

핵심은 PR #1의 리뷰를 기다리지 않고 PR #2, #3, #4를 계속 만들어 나갈 수 있다는 점이다. 각 PR은 이전 PR 위에 쌓이지만, 독립적으로 리뷰받을 수 있다.

Meta는 이를 위해 Phabricator를 만들었고, 이후 Graphite 같은 도구들도 나왔다. 하지만 이런 도구들은 팀 전체가 도입해야 하고 설정도 복잡하다.

## Git만으로도 가능하지만...

사실 git의 기본 기능만으로도 stacked diff는 가능하다:

```bash
# 첫 번째 작업
git checkout -b feature-1
# ... 작업 ...
git push origin feature-1

# 두 번째 작업 (feature-1 기반)
git checkout -b feature-2
# ... 작업 ...
git push origin feature-2

# feature-1이 수정되면 feature-2 리베이스
git checkout feature-2
git rebase feature-1
git push --force-with-lease origin feature-2
```

하지만 브랜치가 많아질수록 관리가 복잡해진다:
- 각 브랜치의 의존 관계를 기억해야 함
- 하나씩 수동으로 리베이스해야 함
- 충돌 발생시 여러 번 해결해야 함
- PR 설명에 의존 관계를 명시해야 함

git spice나 Graphite 같은 도구들은 이런 번거로운 과정을 자동화하고 추상화한 것이다.

## git spice 소개

git spice는 2024년 7월에 Abhinav Gupta가 만든 도구다. 기존 Git 워크플로우를 크게 바꾸지 않으면서 stacked diff를 사용할 수 있게 해준다.

설치는 간단하다:

```bash
# macOS
brew install abhinav/tap/git-spice

# 또는 바이너리 직접 다운로드
curl -fsSL https://github.com/abhinav/git-spice/releases/latest/download/git-spice-darwin-arm64 \
  -o /usr/local/bin/git-spice
chmod +x /usr/local/bin/git-spice
```

`gs` 명령어가 ghostscript와 충돌한다면 alias를 설정하면 된다:

```bash
alias spice='git-spice'
```

## 실제 예시: API 리팩토링

레거시 사용자 API를 리팩토링하는 상황을 생각해보자. `/users` 엔드포인트가 300줄짜리 거대한 함수 하나로 되어 있다.

### 일반적인 접근: 독립 브랜치

보통은 독립적인 브랜치로 작업한다:

```
main
  ├── refactor/extract-validation     # controllers/users.js 수정
  ├── refactor/improve-error-handling  # controllers/users.js 수정 (충돌!)
  ├── refactor/unify-response-format   # controllers/users.js 수정 (충돌!)
  └── refactor/add-tests              # controllers/users.js 수정 (충돌!)
```

같은 파일을 여러 PR에서 수정하면:
- 첫 번째 PR이 머지되면 나머지 모든 PR에서 충돌
- 충돌 해결하고 push하면 또 다른 PR이 머지되어 또 충돌
- 결국 "이거 그냥 하나로 합칠까요?" 하게 됨

## git spice로 해결하기

### 첫 번째 브랜치: 입력 검증 분리

```bash
# 브랜치 생성
gs branch create refactor/extract-validation

# 입력 검증 로직을 별도 파일로 분리
vim validators/userValidator.js  # 새 파일 생성
vim controllers/users.js         # 기존 검증 코드 제거 및 import

git add .
git commit -m "refactor: extract user input validation to separate module"

# PR 생성
gs branch submit
```

### 다음 작업 이어가기

리뷰를 기다리지 않고 바로 다음 작업을 시작한다:

```bash
# 두 번째 브랜치 (첫 번째 브랜치 위에 생성)
gs branch create refactor/improve-error-handling

# 에러 처리 개선 - 같은 파일을 또 수정
vim controllers/users.js  # try-catch 추가, 에러 응답 통일
vim errors/ApiError.js    # 커스텀 에러 클래스

git add .
git commit -m "refactor: improve error handling with custom error classes"

# 세 번째 브랜치
gs branch create refactor/unify-response-format

# 응답 포맷 통일 - 또 같은 파일 수정
vim controllers/users.js         # 모든 응답을 표준 포맷으로
vim utils/responseFormatter.js   # 응답 포맷터 유틸

git add .
git commit -m "refactor: unify API response format"
```

### 전체 스택 제출

```bash
# 스택 상태 확인
gs stack

# 모든 브랜치를 PR로 제출
gs stack submit
```

### 리뷰 피드백 반영

첫 번째 PR(검증 로직 분리)에 수정 요청이 들어왔다면:

```bash
# 첫 번째 브랜치로 이동
gs branch checkout refactor/extract-validation

# 피드백 반영 - validator 로직 수정
vim validators/userValidator.js
vim controllers/users.js  # import 경로 수정
git add .
git commit --amend

# 상위 브랜치들 자동 리베이스
gs stack restack

# 모든 PR 업데이트
gs stack submit
```

`gs stack restack` 한 번으로 모든 상위 브랜치가 자동으로 리베이스된다. 수동으로 각 브랜치를 리베이스할 필요가 없다.

### 핵심 차이점

같은 파일을 네 번 수정했지만:
- 각 PR은 작고 명확함 (한 가지 목적만)
- 충돌 걱정 없이 계속 작업 진행
- 첫 번째 PR 피드백 반영해도 나머지는 자동 리베이스
- `gs stack restack` 한 번이면 끝

일반 Git 워크플로우였다면 feature-2, feature-3, feature-4를 각각 수동으로 리베이스하고, 충돌을 각각 해결해야 했을 것이다.


## 주요 명령어

자주 사용하는 명령어는 몇 개 안 된다:

- `gs branch create` (gs bc): 새 브랜치 생성
- `gs stack restack` (gs sr): 스택 리베이스
- `gs stack submit` (gs ss): 모든 PR 제출/업데이트
- `gs repo sync` (gs rs): main 업데이트 & 머지된 브랜치 정리
- `gs branch checkout` (gs bco): 브랜치 체크아웃

## 실전 팁

### 긴급 수정이 필요할 때

```bash
# main에서 직접 브랜치 생성
gs branch create --trunk hotfix/critical-bug

# 수정 후 제출
git commit -m "fix: critical bug"
gs branch submit

# 원래 작업으로 복귀
gs branch checkout refactor/unify-response-format
```

### PR이 머지된 후

```bash
# main 업데이트 및 머지된 브랜치 삭제
gs repo sync

# 남은 브랜치들 리베이스
gs stack restack
```

### 충돌 처리

```bash
gs stack restack
# 충돌 발생

# 충돌 해결 후
git add .
gs rebase continue  # 또는 gs rbc

# 중단하려면
gs rebase abort  # 또는 gs rba
```

## 주의사항

### Squash-merge 이슈

GitHub의 squash-merge는 커밋 해시를 변경한다. 상위 브랜치들이 여전히 이전 커밋을 참조하고 있기 때문에 `gs repo sync` 후 `gs stack restack`이 필요하다.

### 팀원과의 협업

스택 구조를 모르는 팀원이 순서를 잘못 이해할 수 있다. PR #4부터 머지하면 #1, #2, #3의 변경사항이 모두 포함된 거대한 PR이 되어버린다. 반드시 base(#1)부터 순서대로 머지해야 한다는 점을 공유해야 한다.

## 도입 전략

1. 혼자 작업하는 기능에서 먼저 시도
2. 2-3개 PR로 시작 (너무 많으면 복잡)
3. 성공 사례를 팀에 공유
4. 관심 있는 동료와 함께 사용

## 마무리

Stacked Diff는 작은 PR과 빠른 개발 속도라는 두 마리 토끼를 잡을 수 있는 방법이다. git만으로도 가능하지만 번거롭고, git spice 같은 도구를 쓰면 훨씬 편하다.

완벽한 코드리뷰 문화를 기다리기보다는, 지금 당장 생산성을 높일 수 있는 도구를 활용하는 것도 현실적인 선택이다.

## 참고

- [git spice 공식 문서](https://abhinav.github.io/git-spice/)
- [git spice GitHub](https://github.com/abhinav/git-spice)
- [Stacked Diffs (Pragmatic Engineer)](https://newsletter.pragmaticengineer.com/p/stacked-diffs)