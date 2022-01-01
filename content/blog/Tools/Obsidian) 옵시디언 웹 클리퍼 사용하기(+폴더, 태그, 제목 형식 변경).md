---
title: Obsidian) 옵시디언 웹 클리퍼 사용하기(+폴더, 태그, 제목 형식 변경)
date: 2022-01-01 23:01:81
category: tools
thumbnail: { thumbnailSrc }
draft: false
---

옵시디안용 웹 클리퍼를 사용하는 법을 기술한다.
Mac에서 사용 중이고 윈도우에서는 되지 않을 수도 있다.

# 순서

1. **[obsidian-web-clipper.js](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3)** 페이지 소스코드를 복사한다.
2. 웹브라우저에서 즐겨찾기를 하나 만든다.(아무 페이지에서나 상관 없음.)
3. 해당 즐겨찾기 우클릭 - edit - URL에 `1`에서 복사한 코드를 붙여넣기한다.
4. 클리핑을 원하는 페이지에서 해당 즐겨찾기를 누르면 클리핑된다.

# 폴더, 태그, 제목 형식 변경하는 방법

위와 같이 사용하면 root folder에 `#clippings`라는 태그로 메모가 생성된다.

이 부분을 수정해보자.

### 폴더 변경하는 법

- 11번 라인의 folder 변수를 아래와 같이 수정한다.

```js
//const folder = "";
const folder = 'folderName/'
```

### 태그 변경하는 법

14번 라인의 tags 변수를 아래와 같이 수정한다.

```js
// const tags = "#clippings";
const tags = '#원하는태그'
```

### 제목 형식 변경하는 법

클리핑된 노트의 경우 구분을 위해 `Clip - {클리핑된 메모 제목}` 과 같은 형태로 prefix가 붙기를 원했다.
여러가지 방법이 있지만 99번째 줄의 내용을 아래와 같이 수정할 수 있다.

```js
document.location.href =
  'obsidian://new?' +
  //+ "file=" + encodeURIComponent(folder + fileName)
  'file=' +
  encodeURIComponent(folder + 'Clip - ' + fileName) +
  '&content=' +
  encodeURIComponent(fileContent) +
  vaultName
```

---

# 출처(참고문헌)

- [# (맥 전용) 안 되는지 알았죠? 다 돼요! 옵시디안 웹 클리핑(스크렙) 방법](https://www.youtube.com/watch?v=x3-LbB7KvkU&list=PLy4SLsxzyLUUJlu0L-_U7c1jy_bqvPMR6&index=8)
- **[obsidian-web-clipper.js](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3)**

---
