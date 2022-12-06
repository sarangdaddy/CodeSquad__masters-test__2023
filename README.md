# 2단계: 지구 태양 달의 위치 표시하기

1단계에서 구현한 코드를 기반으로 지구 태양 달의 위치를 표시하는 프로램을 작성한다.

<details>
<summary> 문제 설명 및 요구사항 </summary>
## 문제 설명

1. 프로그램을 실행하면 1월 1일부터 12월 31일까지 날짜를 입력받는다.

2. 해당 날짜에 태양 지구 달의 상대적인 위치를 콘솔에 "멋지게" 출력한다.

3. 단 1월 1일에 태양 - 지구 - 달은 순서대로 일직선상에 위치한다고 가정한다.

4. 문제의 단순화를 위해 태양 지구 달은 같은 평면상에서 공전하며, 공전궤도는 완전한 원이라고 가정한다.

## 입력 및 출력 예시

```
Sun, Earth, Moon
날짜를 입력하세요.
1월 1일


     *
    ***                                    *
   *****                                  ***   *
    ***                                    *
     *

(안 멋짐)
```

## 2단계 코딩 요구사항

- 너무 크지 않은 함수 단위로 구현하고 중복된 코드를 줄이도록 노력한다.
- 마찬가지로 Readme.md 파일과 작성한 소스 코드를 모두 기존 secret gist에 올려야 한다.
- 전역변수의 사용을 자제한다.
- 객체 또는 배열을 적절히 활용한다.

</details>
</br>

# 구조

- 자바스크립트로 구현하기에 콘솔이 아닌 웹 브라우저에 출력되도록 구현했다.
- 디폴트는 (2022년)1월 1일로 태양, 지구, 달이 일적선 상에 존재한다.
- 사용자가 보고싶은 날짜를 입력하면 해당 날짜로 지구와 달이 위치한다.
- 지구는 태양을 중심으로 360도 회전하며, 달은 지구를 중심으로 360도 회전한다고 가정한다.
- 본 프로그램에서 자전은 구현되지 않았다.

### 📑 목차

[1. 날짜 입력 및 출력 인터페이스](#인터페이스)

[2. 태양, 지구, 달을 생성하는 space 객체](#space-객체)

[3. 생성된 각 객체에 날짜를 입력받고 이동시키는 date 객체](#date-객체)

</br>

## 인터페이스

1. 브라우저에 출력하기에 html과 css를 이용하여 인터페이스를 구현했다.
2. from과 input tag로 사용자의 날짜 입력값을 입력 받는다.

```html
<div class="date__input">
  <input
    class="date__form__month"
    placeholder="ex) 월을 입력하세요."
    min="1"
    max="12"
    type="number"
  />
  <input
    class="date__form__day"
    placeholder="ex) 일을 입력하세요."
    min="1"
    max="31"
    type="number"
  />
  <button class="date__form__btn">input</button>
</div>
```

3. main tag를 기준으로 태양, 지구, 달의 class와 id를 부여하고 궤도 div와 회전 div를 생성했다.

```html
<main class="space__main">
  <div class="object" id="sun"></div>
  <div class="orbit earth-orbit"></div>
  <div class="earth-spin">
    <div class="object" id="earth"></div>
    <div class="orbit moon-orbit"></div>
    <div class="moon-spin">
      <div class="object" id="moon"></div>
    </div>
  </div>
</main>
```

4. 태양, 지구, 달의 디폴트 위치 (일직선상)을 css로 구현했다.

```cs
// 태양의 경우 예시
.space__main {
  background-color: black;
  position: relative;
  height: 100vh;
  margin: auto;
  overflow: hidden;
}

#sun,
.orbit,
.orbit + div,
.orbit + div > div {
  position: absolute;
}

#sun,
.orbit,
.orbit + div {
  top: 50%;
  left: 50%;
}

.orbit + div > div {
  top: 0;
  left: 50%;
}

.orbit,
.orbit + div div {
  border-radius: 50%;
}

#sun {
  height: 200px;
  width: 200px;
  margin-top: -100px;
  margin-left: -100px;
  border-radius: 50%;
  box-shadow: 0 0 84px tomato;
}
```

5. css는 아래 사이트들로부터 도움을 받았다.

[1. 참고사이트](https://stackoverflow.com/questions/25472490/make-div-orbit-around-a-moving-div)

[2. 참고사이트](https://bskyvision.com/entry/css-css%EC%97%90%EC%84%9C-%EA%BA%BD%EC%87%A0-%EC%9D%98-%EC%9D%98%EB%AF%B8%EB%8A%94)

</br>

## space 객체

1. space에 존재하는 태양, 지구, 달을 생성하고 호출한다.
2. 1단계에서 구현한 지름으로 원을 만드는 기능을 도입하여 구축했다.
3. init값으로 태양, 지구, 달의 지름 크기를 불러온다.

```js
// Sun, Earth, Moon의 지름 초기값을 입력 해준다.
space.init = function () {
  let sunR = 7;
  let earthR = 3;
  let moonR = 1;

  this.planetSize(sunR);
  this.planetSize(earthR);
  this.planetSize(moonR);
};
```

4. 입력받은 지름값으로 행성 생성에 필요한 정보로 전환하여 각 행성 생성 함수로 전달한다.

```js
let space = { sun: [], earth: [], moon: [] };

// 각 행성의 지름값으로 행성 생성에 필요한 정보를 가져온다.
space.planetSize = function (d) {
  let dia = Number(d); // 지름
  let radius = Math.floor(d / 2); // 반지름
  let centerX = radius;
  let centerY = radius;

  if (dia === 7) {
    this.makeSun(dia, radius, centerX, centerY);
  } else if (dia === 3) {
    this.makeEarth(dia, radius, centerX, centerY);
  } else if (dia === 1) {
    this.makeMoon(dia, radius, centerX, centerY);
  }
};
```

5. 태양 생성 함수

```js
// Sun 생성 함수
space.makeSun = function (d, r, x, y) {
  this.sun = Array.from({ length: d }, () => Array(d));

  for (let i = x - r; i <= x + r; i++) {
    for (let j = y - r; j <= y + r; j++) {
      if ((i - r) * (i - r) + (j - r) * (j - r) <= r * r) {
        this.sun[i][j] = "🔥";
      } else {
        this.sun[i][j] = "";
      }
    }
  }
  this.showTheSun(d);
};

// Sun 호출 함수
space.showTheSun = function (d) {
  for (let i = 0; i < d; i++) {
    const div = document.createElement("div");
    div.innerText = this.sun[i];
    sunObject.appendChild(div);
  }
};
```

6. 1단계에서 구현된 함수를 도입했으며 반복되기에 지구와 달의 설명은 생략 하겠다.

</br>

## date 객체

1. 인터페이스에서 구현한 날짜 입력창에 사용자가 월과 일을 입력하면 입력 날짜를 받아온다.
2. 잘못된 날짜 (음수 혹은 초과 숫자)가 입력되면 안내메시지를 뛰운다.
3. 좋은 시각화를 위해 한자리의 숫자가 입력된 경우 앞자리에 "0"을 붙이고 브라우저에 보여준다.

```js
// 사용자가 입력한 "월" 과 "일" 정보를 브라우저에 표시한다.
date.getDateValue = function (event) {
  event.preventDefault();
  const selectMonth = inputMonth.value;
  const selectDay = inputDay.value;

  if (selectMonth < 0 || selectMonth > 12) {
    alert("월은 1월~12월만 존재합니다.");
    return;
  }
  if (selectDay < 0 || selectDay > 31) {
    alert("일은 1일~31일만 존재합니다.");
    return;
  }

  monthResult.innerText = `${selectMonth.padStart(2, "0")}월`;
  dayResult.innerText = `${selectDay.padStart(2, "0")}일`;
  inputMonth.value = "";
  inputDay.value = "";
  this.calculateDate(selectMonth, selectDay);
};
```

4. 디폴트 date:(2022)년 01월 01일과 사용자 입력 date를 Date.parse 메서드로 밀리초로 환산한다.
5. 사용자 입력 날짜 밀리초 - 디폴트 밀리초로 "몇일" 후 인지 도출한다.

```js
// 사용자가 입력한 date와 디폴트 date값을 초로 환산하여 일수의 차를 구한다.
date.calculateDate = function (mon, day) {
  const monthNumber = Number(mon);
  const dayNumber = Number(day);
  const defaultDate = Date.parse("2022 / 01 / 01");
  const userDate = Date.parse(`2022 / ${monthNumber} / ${dayNumber}`);
  const onedayMs = 86400000; // 1 day는 86400000 밀리초다.
  const movedDay = (userDate - defaultDate) / onedayMs;

  this.rotateObject(movedDay);
};
```

6. 지구와 달의 회전도를 계산하기 위해 이용된 수치들은 아래와 같다.

| 1day 밀리초 | 1day 지구 rotate deg | 1day 달 rotate deg |
| :---------: | :------------------: | :----------------: |
|  86400000   |      0.98630137      |      13.33333      |

7. 앞에서 구해진 이동 일수와 각도를 곱한 deg만큼 rotate 해준다.

```js
// "일" 수를 토대로 Earth와 Moon이 몇도 이동하는지 계산하고 이동시킨다.
date.rotateObject = function (day) {
  const earthOrbit = document.querySelector(".earth-spin");
  const moonOrbit = document.querySelector(".moon-spin");

  const earthOneDayDeg = 0.98630137;
  const moonOneDayDeg = 13.33333;

  const earthDeg = day * earthOneDayDeg;
  const moonDeg = day * moonOneDayDeg;

  earthOrbit.style.transform = `rotate(${earthDeg}deg)`;
  moonOrbit.style.transform = `rotate(${moonDeg}deg)`;
};
```

</br>

# 🛠️ 보완점

1. 중복되는 코드를 줄여주는 방법을 생각해보자.
2. 날짜 입력을 달력으로 입력 받을 수 있도록 구현해보자 (년도 포함)
3. 화성, 목성 등 다른 행성을 추가하여 구현해보자.
4. 리얼타임으로 움직이는 프로그램으로 발전 시켜보자.
