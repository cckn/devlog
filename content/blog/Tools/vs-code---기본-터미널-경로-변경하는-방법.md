---
title: VS Code | 기본 터미널 경로 변경하는 방법
date: 2021-03-09 13:03:28
category: tools
thumbnail: { thumbnailSrc }
draft: false
---

![picture 23](images/2021-03-09/36a1be62ddbdb910eff6759144d3b2df0b7204638708da16dacb3b64665431f3.png)

## VS Code의 터미널

![picture 3](images/2021-04-16/7d186eb9e2a9a1d22afcfe13dc7c1689f56d5290c6c7ae0c1bc207f422bec9e5.png)

VS Code에서는 현재 작업 중인 폴더의 터미널을 간편하게 열 수 있습니다.

**Ctrl+`(키보드에서 1 왼쪽에 있음)**를 누르면 터미널을 사용할 수 있습니다.

윈도우를 기준으로 `PowerShell`이 기본 터미널로 지정되어 있습니다.

## 다른 터미널 사용하는 방법

색깔도 없고 딱딱한 `PowerShell`보다는 알록달록한 `Git Bash`를 사용하고 싶어졌습니다.

다른 터미널을 사용하려면 어떻게 해야 할까요?
![picture 4](images/2021-04-16/e15398f6ec1bb337d17e4b6a37d8a059f2a7c1831e0b140adae27dbd0160ad2a.png)

오른쪽 위의 드롭다운 버튼을 누르면 이렇게 여러 터미널 중에 선택해서 사용할 수 있습니다.

![picture 5](images/2021-04-16/be8609a4b1097be3ee2706bb985b717ee4a8ebe8f8cafc7d5ee1b23a7832beac.png)

알록달록한 `Git Bash`가 열렸습니다.

## 기본 터미널 변경 방법

VS Code를 새로 켜거나 터미널을 종료한 후 다시 열면 딱딱한 Power Shell이 우리를 반겨줍니다.

기본 터미널을 변경해봅시다.

---

1. `Ctrl + Shift + P` 버튼을 이용해 다음과 같은 창을 띄워줍니다.

![picture 8](images/2021-04-16/f2f430678056a379b8feaeb387041a2db8cb3ff5630c1886001139fde759bfe5.png)

2. **select default profile**을 검색해 다음과 같은 메뉴를 선택합니다.

![picture 7](images/2021-04-16/38ca16d79bb12e94b664c7ddef05ad70b145e34aaa7523587f72298e593deeb9.png)

3. 터미널 목록 중에 기본 터미널로 사용하고 싶은 터미널을 선택합니다.

![picture 6](images/2021-04-16/c6a4ade2320f4dcfeb0222fd79cae72c39ff8d886d6daff4a9a2643ea98a1996.png)

기본 터미널이 변경되었습니다.

이제 터미널을 다시 켜도, VS Code를 다시 켜도, 컴퓨터를 재부팅해도 VS Code는 우리가 선택한 터미널로 열립니다.
