---
title: (JS) 브라우저에서 전체화면(Fullscreen) 모드 사용하기
date: 2021-05-19 13:05:02
category: js-ts
thumbnail: { thumbnailSrc }
draft: false
---

> 이 글의 전체 예제는 [링크](https://codepen.io/cckn/pen/zYZNrWr)에서 확인할 수 있습니다.

브라우저에서 DOM 요소를 전체화면으로 표시하려면 `requestFullscreen` 기능을 사용하면 됩니다.

다만 브라우저별로 다른 메서드를 사용하기 때문에 각각의 메서드를 지정해주어야 정상적으로 동작할 수 있습니다.

유튜브 등의 동영상 사이트에서 동영상을 전체 화면으로 볼 때 사용하는 기능이기도 합니다.

## 전체화면으로 들어가기 - requestFullscreen

```js
document.documentElement.requestFullscreen()
```

위의 `element`는 전체화면으로 띄우고자 하는 `DOM element`를 이야기합니다.

다음과 같은 형태로 사용하면 됩니다.

```js
const fullscreen = element => {
  element.requestFullscreen()
}
```

## 전체화면에서 나가기 - exitFullscreen

전체화면에서 나갈 때에는 가장 상위의 DOM Element인 document에서 `exitFullscreen`을 사용합니다.

```js
document.exitFullscreen()
```

다음과 같은 형태로 사용하면 됩니다.

```js
const exitFullScreen = () => {
  document.exitFullscreen()
}
```

## Fullscreen 상태 확인 - fullscreenElement

현재 Fullscreen 상태인 DOM Element를 확인하고 싶으면 `fullscreenElement` 속성을 확인합니다.

현재 full-screen mode로 표시되는 Element를 알려줍니다.

full-screen mode가 아닌 경우 해당 속성은 `null`입니다.

## Toggle Fullscreen

하나의 버튼으로 전체화면과 일반화면을 토글시키고 싶다면 아래와 같이 사용합니다.

```js
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
```

## 브라우저별 지원

브라우저에서 표준 사양은 requestFullscreen를 사용하는 것이지만 브라우저 별로 해당 메서드를 지원하지 않는 경우도 있습니다.

이럴 때는 브라우저에 맞는 메서드를 사용할 수 있도록 해주어야 합니다.

### 토글 X

```js
const fullscreen = element => {
  if (element.requestFullscreen) return element.requestFullscreen()
  if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
  if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
  if (element.msRequestFullscreen) return element.msRequestFullscreen()
}

const exitFullScreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen()
  if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen()
  if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
  if (document.msExitFullscreen) return document.msExitFullscreen()
}
```

### 토글

```js
function toggleFullScreen(element) {
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) return element.requestFullscreen()
    if (element.webkitRequestFullscreen)
      return element.webkitRequestFullscreen()
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
    if (element.msRequestFullscreen) return element.msRequestFullscreen()
  } else {
    if (document.exitFullscreen) return document.exitFullscreen()
    if (document.webkitCancelFullscreen)
      return document.webkitCancelFullscreen()
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
    if (document.msExitFullscreen) return document.msExitFullscreen()
  }
}
```

## 전체 소스코드

<https://codepen.io/cckn/pen/zYZNrWr>

<script async src="//jsfiddle.net/cckn_dev/d62c3g81/1/embed/"></script>

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./index.css" />
    <script src="./index.js" defer></script>
  </head>
  <body>
    <div class="container">
      <button class="enterFullscreenBtn">Fullscreen</button>
      <button class="exitFullscreenBtn">Cancel Fullscreen</button>
      <button class="toggleFullscreenBtn">Toggle Fullscreen</button>
    </div>
  </body>
</html>
```

##### index.css

```css
.container {
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

##### index.js

```js
const enterFullscreenBtn = document.querySelector('.enterFullscreenBtn')
const exitFullscreenBtn = document.querySelector('.exitFullscreenBtn')
const toggleFullscreenBtn = document.querySelector('.toggleFullscreenBtn')

const container = document.querySelector('.container')

enterFullscreenBtn.addEventListener('click', e => {
  fullscreen(container)
})

exitFullscreenBtn.addEventListener('click', e => {
  exitFullScreen()
})

toggleFullscreenBtn.addEventListener('click', e => {
  toggleFullScreen(container)
})

const fullscreen = element => {
  if (element.requestFullscreen) return element.requestFullscreen()
  if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
  if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
  if (element.msRequestFullscreen) return element.msRequestFullscreen()
}

const exitFullScreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen()
  if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen()
  if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
  if (document.msExitFullscreen) return document.msExitFullscreen()
}

function toggleFullScreen(element) {
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) return element.requestFullscreen()
    if (element.webkitRequestFullscreen)
      return element.webkitRequestFullscreen()
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
    if (element.msRequestFullscreen) return element.msRequestFullscreen()
  } else {
    if (document.exitFullscreen) return document.exitFullscreen()
    if (document.webkitCancelFullscreen)
      return document.webkitCancelFullscreen()
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
    if (document.msExitFullscreen) return document.msExitFullscreen()
  }
}
```

## 기타 : 전체화면에서 배경이 검은색으로 나오는 경우

background-color가 따로 지정되지 않은 경우 전체화면시 배경 색상이 검은색으로 표시될 수 있습니다.

전체화면시의 기본 배경색이 검정색이기 때문입니다.

이런 경우 해당 요소의 background-color를 지정해주면 해결됩니다.

## 참조

- <https://developer.mozilla.org/ko/docs/Web/API/Fullscreen_API>
- <https://stackoverflow.com/questions/16163089/background-element-goes-black-when-entering-fullscreen-with-html5>
