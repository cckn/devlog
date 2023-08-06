---
title: JWT는 무엇인가?
date: 2023-08-06 20:08:06
category: backend
thumbnail: { thumbnailSrc }
draft: false
---

JWT는 유저를 인증하고 식별하기 위한 토큰 기반 인증이다. 서버 기반 인증과 달리 유저의 인증 정보를 서버에 저장하지 않고 토큰에 저장하여 클라이언트에게 보낸다.

JWT는 자가수용적(Self-contained)이다. 토큰 자체에 사용자의 권한 정보나 서비스를 사용하기 위한 정보가 포함된다는 뜻이다.

## JWT는 언제 사용하는가?

### 회원 인증

회원 인증시에 JWT를 사용할 수 있다.

유저가 로그인하면 서버는 서명된 JWT를 발급하여 클라이언트에게 전달한다. 이후 요청이 발생할 때마다 클라이언트는 JWT를 포함하여 서버에 전달한다.

서버는 요청에 포함된 JWT이 유효한지 검증한다. 유효한 토큰이라면 유저의 요청에 맞게 동작하고 응답한다. 만약 조작된 토큰이라면 서버에서 조작 여부를 알 수 있다.

세션 방식과 달리 서버는 로그인된 유저들을 DB로 관리할 필요가 없어진다.

### 정보 교환

JWT는 두 개체 사이에서 안정적으로 정보를 교환하기 위해 사용할 수 있다.

정보가 서명되어 있기 때문에 제 3자의 조작을 확인할 수 있기 때문이다.

## JWT는 어떻게 구성되는가?

![](https://i.imgur.com/tdGO6D6.png)

JWT는 3개의 부분으로 구성된다. 각각 `header`, `payload`, `signature`이다. 각 부분은 `.`으로 구분된다.

각 부분은 별 의미없는 문자열로 보일 수 있다. 사실은 base64로 인코딩된 JSON이다.

### header

헤더는 두 가지의 정보를 가진다.

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

type는 토큰의 타입을 지정한다. "JWT"이며 고정값이다.

alg는 해싱 알고리즘을 지정한다. 해싱 알고리즘은 토큰을 검증할 때 사용된다.

### payload

페이로드에는 토큰의 정보들이 담긴다.

페이로드에 포함된 `key: value`의 정보의 단위를 클레임(claim)이라고 부른다. 페이로드는 여러 클레임을 가지고 있다.

클레임의 종류는 아래와 같이 구분할 수 있다.

- 등록된 클레임(registered claim)
- 공개 클레임(public claim)
- 비공개 클레임(private claim)

#### 등록된 클레임(registered claim)

토큰의 정보를 담기 위해 이미 이름이 정해진(=약속된) 클레임들이다.

약속된 클레임들이지만 해당 클레임들은 필수가 아닌 optional이다.

- `iss`: 토큰 발급자 (issuer)
- `sub`: 토큰 제목 (subject)
- `aud`: 토큰 대상자 (audience)
- `exp`: 토큰의 만료시간 (expiraton), 시간은 NumericDate 형식으로 되어있어야 하며 (예: 1480849147370) 언제나 현재 시간보다 이후로 설정되어있어야합니다.
- `nbf`: Not Before 를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 처리되지 않습니다.
- `iat`: 토큰이 발급된 시간 (issued at), 이 값을 사용하여 토큰의 age 가 얼마나 되었는지 판단 할 수 있습니다.
- `jti`: JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용됩니다. 일회용 토큰에 사용하면 유용합니다.

#### 공개 클레임(public claim)

등록된 클레임 외에 서비스에서 필요한 정보들을 Custom하게 사용할 수 있다.

이 중 충돌이 방지된 클레임을 공개 클레임이라고 한다.

[JSON Web Token (JWT)](https://www.iana.org/assignments/jwt/jwt.xhtml) 사이트에 등록하거나 충돌이 발생하지 않도록 URL 형식을 사용한다.

```json
{
  "https://velopert.com/jwt_claims/is_admin": true
}
```

#### 비공개 클레임(private claim)

Custom Claim 중 충돌 방지에 대한 고려가 되지 않은 클레임이다. 정보를 교환하는 양 주체간 미리 협의하여 사용한다.

```json
{
  "username": "velopert"
}
```

### signature

서명은 헤더의 인코딩 값과 Payload의 인코딩 값을 합친 후 서버가 가진 비밀키로 해쉬를 하여 생성한다. 이렇게 만들어진 해쉬값을 Hex -> Base64 인코딩을 거친다.

```ts
HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret)
```

## JWT의 검증

JWT의 값을 검증하거나 확인하는 것은 [JSON Web Tokens - jwt.io](https://jwt.io/)에서 확인할 수 있다.

![](https://i.imgur.com/7uUC25p.png)

## 주의사항

JWT의 정보는 암호화되어 있지 않은 정보이다. 따라서 보안이 필요한 정보는 JWT를 통해 전달해서는 안된다.

JWT를 서명하는 비밀키가 유출된 경우 JWT 토큰이 조작될 수 있다.

# 참조

- [RFC 7519: JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
- [[JWT] JSON Web Token 소개 및 구조 | VELOPERT.LOG](https://velopert.com/2389)
