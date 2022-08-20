---
title: nodemailer로 Gmail 보내기(+ 보안문제 해결)
date: 2022-08-20 21:08:10
category: dev
thumbnail: { thumbnailSrc }
draft: false
description: 'nodemailer로 이메일을 보내보자.'
---

## nodemailer로 이메일 보내기

nodeJS에서 이메일을 보내는 용도로 nodemailer라는 라이브러리를 사용할 수 있다.

1. nodemailer 설치

```
yarn add nodemailer
yarn add --dev @types/nodemailer
```

2. nodemailer로 이메일 전송

```ts
import * as nodeMailer from 'nodemailer'

const sendMail = async () => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: { user: 'YOUR_EMAIL', pass: 'YOUR_PASSWORD' },
  })

  const mailOptions = {
    to: 'EMAIL',
    subject: '가입 인증 메일',
    html: `
      가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
      <form action="#" method="POST">
        <button>가입확인</button>
      </form>  
      `,
  }
  await transporter.sendMail(mailOptions)
}
```

## Gmail 보안 관련 에러 메세지

google 계정이 2단계 인증을 사용 중인 경우 gmail을 서비스로 설정하고 id와 pw를 입력 후 전송하려고 하면 아래와 같은 에러 메세지를 받을 수 있다.

```
sendMemberVerificationEmail cckn.dev@gmail.com 139c0c50-2080-11ed-a3fd-1feb99e8216b
(node:14824) UnhandledPromiseRejectionWarning: Error: Invalid login: 534-5.7.9 Application-specific password required. Learn more at
534 5.7.9  https://support.google.com/mail/?p=InvalidSecondFactor o16-20020a170902d4d000b0016d3935eff0sm4816631plg.176 - gsmtp
...
(node:14824) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

해결 방법은 `앱 비밀번호`를 생성해서 사용하는 것이다. 앱 비밀번호는 보안 수준이 낮은 앱 또는 기기에 Google 계정에 대한 액세스 권한을 부여하는 비밀번호다.

## 앱 비밀번호 생성하기

1. 이메일을 보낼 계정으로 구글에 로그인 한 후 아래와 같이 계정 설정으로 들어간다.

![](https://i.imgur.com/CHc0tmW.png)

2. 좌측의 보안을 누르고 스크롤을 내리다보면 `Google에 로그인`이라는 항목 중 앱 비밀번호가 존재한다.

![](https://i.imgur.com/ZToVo7t.png)

3. 한번 더 비밀번호를 입력하고 들어가면 앱 비밀번호를 생성, 관리할 수 있는 페이지가 나온다. 여기서 아래에서 앱과 기기를 선택해야 하는데 꼭 메일을 선택할 필요는 없다. 맞춤이름을 선택하고 자신이 진행하고 있는 프로젝트의 이름을 적던지 하자.

![](https://i.imgur.com/0GsxnBK.png)

4. 아래와 같이 앱 비밀번호가 생성된다. 이 비밀번호가 노출되면 구글 계정의 모든 기능에 접근이 가능하니 노출되지 않도록 주의하자.

![](https://i.imgur.com/ykLYTMn.png)

5. 앱 비밀번호를 nodemailer의 transporter를 생성하는 곳에 패스워드 대신 넣어주면 정상적으로 동작한다.

```ts
import * as nodeMailer from 'nodemailer'

const sendMail = async () => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: { user: 'YOUR_EMAIL', pass: 'YOUR_APP_PASSWORD' },
  })

  const mailOptions = {
    to: 'EMAIL',
    subject: '가입 인증 메일',
    html: `
      가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
      <form action="#" method="POST">
        <button>가입확인</button>
      </form>  
      `,
  }
  await transporter.sendMail(mailOptions)
}
```

## 완료!

![](https://i.imgur.com/sxSi7RH.png)

## 참조

- [4.3. 유저 서비스에 회원가입 로직 구현하기 - NestJS로 배우는 백엔드 프로그래밍](https://wikidocs.net/158501)
