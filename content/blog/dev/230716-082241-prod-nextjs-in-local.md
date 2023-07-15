---
title: Local에서 NextJS Prod로 실행하는 방법
date: 2021-07-16 08:22:41
category: dev
thumbnail: { thumbnailSrc }
draft: false
---

NextJS에서 `yarn dev`(or `npm run dev`) 하면 NextJS앱이 dev로 뜬다.

그러나 Local에서 Dev가 아닌 Prod로 앱을 테스트하고 싶을 때가 있다.
NextJS의 경우 Dev와 Prod의 동작이 약간 다르기 때문이다.

그럼 어떻게 해야 하는가?

prod로 띄우기 위해서는 `yarn build` -> `yarn start` 하면 된다.
코드가 변경되지 않았다면 다음에는 `yarn start`만 하면 된다.
