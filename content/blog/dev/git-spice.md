---
title: "git spice와 Stacked Diff 워크플로우"
date: 2025-06-22
draft: false
tags: ["git", "workflow", "productivity", "code-review"]
---

작업을 하다 보면 작은 단위의 PR과 작업 속도 간의 균형을 맞추기 쉽지 않다. 더군다나 코드리뷰가 요구되는 상황이면 더욱 그렇다.

## PR 크기의 딜레마

큰 PR을 만들면 리뷰어가 제대로 보기 어렵다. 2000줄짜리 PR을 받으면 대충 훑어보고 LGTM 달기 마련이다. 반대로 작은 PR들로 나누면 각각의 리뷰를 기다려야 한다. 첫 번째 PR 리뷰 기다리고, 두 번째 PR 리뷰 기다리고... 결국 개발 속도가 느려진다.

코드리뷰는 동료의 코드리뷰를 최우선으로 생각하는 문화가 자리잡아야 한다고 생각한다. 기술적인 것들보다 이런 문화가 더 중요하다. 그러나 이런 문화가 쉽지 않다. 각자 자신의 일이 바쁘기 때문이다.

그렇다면 이런 상황에서 어떻게 대응이 가능할까? git spice 같은 stacked diff 방식이 유용할 수 있다.

## Stacked Diff란

Stacked Diff는 Meta(구 Facebook)에서 시작된 개발 방식이다. 큰 기능을 여러 개의 작은 PR로 나누되, 이들을 스택처럼 쌓아 올린다.

```
main
  └── feat/db-schema (PR #1)
       └── feat/auth-api (PR #2)
            └── feat/jwt-logic (PR #3)
                 └── feat/login-form (PR #4)
```

핵심은 PR #1의 리뷰를 기다리지 않고 PR #2, #3, #4를 계속 만들어 나갈 수 있다는 점이다. 각 PR은 이전 PR 위에 쌓이지만, 독립적으로 리뷰받을 수 있다.

Meta는 이를 위해 Phabricator를 만들었고, 이후 Graphite 같은 도구들도 나왔다. 하지만 이런 도구들은 팀 전체가 도입해야 하고 설정도 복잡하다.

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

## 기본 사용법

인증 기능을 구현한다고 가정해보자. DB 스키마, API, JWT 로직, 프론트엔드를 순서대로 작업한다.

### 첫 번째 브랜치 생성

```bash
# 브랜치 생성
gs branch create feat/db-schema

# 작업
echo "CREATE TABLE users (...);" > schema.sql
git add schema.sql
git commit -m "feat: add users table schema"

# PR 생성
gs branch submit
```

### 다음 작업 이어가기

리뷰를 기다리지 않고 바로 다음 작업을 시작한다:

```bash
# 두 번째 브랜치 (첫 번째 브랜치 위에 생성)
gs branch create feat/auth-api

# API 구현
vim controllers/auth.go
git add .
git commit -m "feat: implement auth endpoints"

# 세 번째 브랜치
gs branch create feat/jwt-logic

# JWT 로직 구현
vim middleware/jwt.go
git add .
git commit -m "feat: add JWT handling"
```

### 전체 스택 제출

```bash
# 스택 상태 확인
gs stack

# 모든 브랜치를 PR로 제출
gs stack submit
```

### 리뷰 피드백 반영

첫 번째 PR에 수정 요청이 들어왔다면:

```bash
# 첫 번째 브랜치로 이동
gs branch checkout feat/db-schema

# 수정
vim schema.sql
git add .
git commit --amend

# 상위 브랜치들 자동 리베이스
gs stack restack

# 모든 PR 업데이트
gs stack submit
```

`gs stack restack` 한 번으로 모든 상위 브랜치가 자동으로 리베이스된다. 수동으로 각 브랜치를 리베이스할 필요가 없다.

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
gs branch checkout feat/jwt-logic
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

스택 구조를 이해하지 못한 팀원이 잘못된 순서로 머지할 수 있다. 스택의 base부터 순서대로 머지되어야 한다는 점을 공유해야 한다.

## 도입 전략

1. 개인 프로젝트나 사이드 프로젝트에서 먼저 익숙해지기
2. 2-3개 PR로 나눌 수 있는 작은 기능부터 적용
3. 성공 경험을 팀원들과 공유
4. 관심 있는 팀원들이 자연스럽게 도입

강요하지 말고 장점을 보여주는 것이 중요하다.

## 마무리

git spice를 사용하면 작은 PR을 유지하면서도 개발 속도를 잃지 않을 수 있다. Meta 같은 빅테크 기업들이 수년간 사용해온 검증된 워크플로우를 간단하게 도입할 수 있다는 점이 매력적이다.

완벽한 코드리뷰 문화가 정착되기를 기다리기보다는, 도구의 도움을 받아 생산성을 높이는 것도 좋은 방법이다.

## 참고

- [git spice 공식 문서](https://abhinav.github.io/git-spice/)
- [git spice GitHub](https://github.com/abhinav/git-spice)
- [Stacked Diffs (Pragmatic Engineer)](https://newsletter.pragmaticengineer.com/p/stacked-diffs)