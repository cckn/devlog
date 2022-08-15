---
title: 옵시디안 이미지 관리 지옥에서 벗어나보자(feat imgur.com)
date: 2022-08-16 00:08:88
category: tools
thumbnail: { thumbnailSrc }
draft: false
---

![asd|200](https://i.imgur.com/AiTDizj.png)

옵시디안은 노트에 올린 이미지를 vault 내부의 로컬 파일로 저장한다. 해당 파일들의 위치나 format은 설정에서 관리 가능하다.

이러한 옵시디언의 이미지 관리 방식은 몇 가지 단점이 있다.

1. 파일 관리가 어렵다.
2. 노트를 공유하거나 옮기기 어렵다.(이미지도 함께 찾아서 보내야 한다.)
3. 용량을 낭비한다.

용량을 낭비하는 단점은 드롭박스 등의 공유 스토리지를 사용하지 않는 이상 큰 문제가 되지 않는다.

하지만 1번 문제와 2번 문제는 서로 연계되어 환장의 콜라보를 보여준다. 하나의 옵시디언 노트를 공유하거나 옮기려고 생각하는 경우 고려해야 할 사항들이 많다.

imgur를 통해 이미지를 호스팅하게 되면 공유시 마크다운만 복사해서 넘겨도 된다. obsidian-imgur-plugin라는 플러그인을 이용해 이미지를 imgur에 쉽게 업로드 할 수 있다.

# obsidian-imgur-plugin

obsidian-imgur-plugin은 옵시디언 이미지를 local이 아닌 [Imgur](https://imgur.com)라는 무료 이미지 호스팅 사이트에 올리도록 도와주는 플러그인이다.

다음 단계로 진행하기 앞서 Imgur 계정이 없다면 미리 가입해두자. (비회원으로도 사용 가능하지만 추천하지 않는다.)

## 설치 및 사용 방법

obsidian-imgur-plugin의 설치 및 사용 방법은 매우 간단하다. 커뮤니티 플러그인에서 imgur-plugin 찾아서 다운로드하고 Authenticated upload를 선택하고 Authenticate 버튼을 눌러 인증과정을 진행하면 된다.

![](https://i.imgur.com/uYhy8Jt.png)

![](https://i.imgur.com/UGlW6cy.png)

## Anonymous upload와 Authenticated upload의 차이

![](https://i.imgur.com/jAZeSaW.png)

Anonymous upload와 Authenticated upload 중 업로드 타입을 선택할 수 있다.

### Anonymous upload

Anonymous upload는 익명으로 imgur에 업로드를 수행한다. 기본적으로 obsidian-imgur-plugin에 포함된 client ID를 사용하는데 이는 다른 유저들도 함께 사용하기 때문에 업로드 상한에 걸려 사용하지 못할 수도 있다.

obsidian-imgur-plugin 안내 페이지에서는 자신만의 Client ID를 생성해서 사용하는 방법에 대해 안내하고 있다.

개인적으로 Anonymous upload보다는 아래의 Authenticated upload를 사용하기를 권장한다. Anonymous upload는 한 번 업로드한 파일은 삭제할 수 없기 때문이다.

### Authenticated upload

imgur.com에 가입된 계정을 이용해 업로드 한다. 플러그인을 통해 업로드한 이미지는 `https://<ID>.imgur.com/all/`를 통해 조회하거나 삭제할 수 있다.

개인적으로는 이 방법이 더 나은 방법이라고 생각해서 Authenticated upload를 사용했다.

## Confirm befoer update - 업로드 전 확인창

플러그인 옵션에서 `Confirm befoer update` 항목을 켜서 이미지 업로드 시 확인창을 띄우도록 할 수 있다.

![](https://i.imgur.com/exW3BAO.png)

순서대로 `항상 imgur 업로드`, `업로드`, `로컬에 저장`이다

![](https://i.imgur.com/k28KSG0.png)

## 결과

이후 붙여넣기 하는 이미지(+gif) 파일들은 아래와 같이 imgur에 업로드 된 주소로 등록된다

```
![](https://i.imgur.com/g2kH9P0.png)
```

[Imgur](https://imgur.com)에 접속하여 Images 탭에 들어가보면 지금까지 업로드한 파일들을 볼 수 있다.

![](https://i.imgur.com/poyeUM3.png)

# obsidian-imgur-plugin를 이용해 올린 이미지는 안전한가?

플러그인 안내 페이지에 따르면 `링크를 공유하거나 누군가가 이미지 URL을 추측하지 않는 한 이미지를 볼 수 없습니다.`라고 안내하고 있다.

기본적으로 imgur.com에 올라간 이미지는 post로 작성되어 공개하지 않는 이상 공개되지 않는 것으로 보인다. 그러나 이는 URL이 유출되면 누군가가 확인할 수 있다는 의미이므로 외부에 절대 공개되면 안되는 파일들은 업로드하지 않도록 주의가 필요하겠다.

# 참조

- [GitHub - gavvvr/obsidian-imgur-plugin: Pastes images right to imgur.com](https://github.com/gavvvr/obsidian-imgur-plugin)
- [Imgur: The magic of the Internet](https://imgur.com)
