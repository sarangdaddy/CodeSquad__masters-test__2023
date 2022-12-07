# 3단계: 콘솔 태양계 출력 프로그램 완성

2단계 구현내용을 기반으로 태양계를 출력하는 프로그램을 구현한다.

<details>
<summary> 문제 설명 및 요구사항 </summary>

## 문제 설명

1. 1년 1월 1일부터 9999년 12월 31일까지 임의의 날짜를 입력받는다.
2. 해당날짜의 태양과 행성의 모습을 "멋지게" 콘솔에 출력한다.
3. 옵션: 부가적인 태양계의 객체를 자유롭게 추가 출력해도 무방하다. (예: 달, 기타 위성, 혜성 등)

## 입력 및 출력 예시

```
날짜를 입력하세요.
3214년 12월 31일


 .              +   .                .   . .     .  .
                   .                    .       .     *
  .       *                        . . . .  .   .  + .
            "You Are Here"            .   .  +  . . .
.                 |             .  .   .    .    . .
                  |           .     .     . +.    +  .
                 \|/            .       .   . .
        . .       V          .    * . . .  .  +   .
           +      .           .   .      +
                            .       . +  .+. .
  .                      .     . + .  . .     .      .
           .      .    .     . .   . . .        ! /
      *             .    . .  +    .  .       - O -
          .     .    .  +   . .  *  .       . / |
               . + .  .  .  .. +  .
.      .  .  .  *   .  *  . +..  .            *
 .      .   . .   .   .   . .  +   .    .            +

```

## 3단계 코딩 요구사항

- 가능한 한 커밋을 자주 하고 구현의 의미가 명확하게 전달되도록 커밋 메시지를 작성한다
- 함수나 메소드는 한 번에 한 가지 일을 하고 가능하면 20줄이 넘지 않도록 구현한다
- 함수나 메소드의 들여쓰기를 가능하면 적게(3단계까지만) 할 수 있도록 노력한다

```
  function main() {
        for() { // 들여쓰기 1단계
            if() { // 들여쓰기 2단계
                return; // 들여쓰기 3단계
            }
        }
    }
```

</details>
</br>

# 구조

- 자바스크립트로 구현하기에 콘솔이 아닌 웹 브라우저에 출력되도록 구현했다.
- 디폴트는 (2022년)1월 1일에 태양, 지구, 달, 화성이 일적선 상에 존재한다.
- "날짜받기" 버튼 클릭시 0001년 01월 01일 ~ 9999년 12월 31일 중 임의의 날짜를 입력 받는다.
- 지구와 화성은 태양을 중심으로 360도 회전하며, 달은 지구를 중심으로 360도 회전한다고 가정한다.
- 2단계에서 구현된 프로그램에 새로운 객체(화성)를 추가했다.
- 지구, 화성, 달은 임의의 날짜에 해당하는 위치로 이동한다.
- 본 프로그램에서 자전은 구현되지 않았다.

### 📑 목차

[1. 임의의 날짜입력 및 결과출력 인터페이스](#인터페이스)

[2. 태양, 지구, 화성, 달을 생성하는 space 객체](#space-객체)

[3. 임의의 입력벋은 날짜의 위치로 각 객체를 이동시키는 date 객체](#date-객체)

</br>

## 인터페이스

1. 브라우저에 출력하기에 html과 css를 이용하여 인터페이스를 구현했다.
2. button 클릭 이벤트 발생시 임의의 날짜가 form에 호출된다.

```html
<form class="date__form">
  <div class="date__result">
    <span class="date__year">2022년</span>
    <span class="date__month">01월</span>
    <span class="date__day">01일</span>
    <button class="date__form__btn">날짜받기</button>
  </div>
</form>
```

3. main tag안에 태양, 지구, 화성, 달의 class와 id를 부여하고 궤도 div와 회전 div를 생성했다.

```html
<main class="space__main">
  <div class="object" id="sun"></div>
  <div class="orbit mars-orbit"></div>
  <div class="mars-spin">
    <div class="object" id="mars"></div>
  </div>
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

4. 태양, 지구, 화성, 달의 디폴트 위치 (일직선상)을 css로 구현했다.

```cs
// 2단계와 동일하며 화성이 추가 되었기에 화성의 css만 설명하겠다.
#mars {
  position: absolute;
  top: 0;
  left: 50%;
  height: 150px;
  width: 150px;
  margin-left: -75px;
  margin-top: -75px;
  border-radius: 50%;
}

.mars-orbit,
.mars-spin {
  width: 900px;
  height: 900px;
  margin-left: -450px;
  margin-top: -450px;
  border-color: greenyellow;
}
```

5. css는 아래 사이트들로부터 도움을 받았다.

   [1. 참고사이트](https://stackoverflow.com/questions/25472490/make-div-orbit-around-a-moving-div)
   [2. 참고사이트](https://bskyvision.com/entry/css-css%EC%97%90%EC%84%9C-%EA%BA%BD%EC%87%A0-%EC%9D%98-%EC%9D%98%EB%AF%B8%EB%8A%94)

</br>

## space 객체

1. 인터페이스에 호출할 태양, 지구, 화성, 달을 생성한다.
2. 1단계에서 구현한 지름으로 원을 만드는 기능을 도입하여 구축했다.
3. init값으로 태양, 지구, 화성, 달의 지름 크기를 불러온다.

```js
// 3단계에서 화성이 추가되었다.
let space = { sun: [], earth: [], moon: [] };

// Sun, Earth, Moon, Mars의 지름 초기값을 입력 해준다.
space.init = function () {
  let sunR = 7;
  let earthR = 3;
  let moonR = 1;
  let marsR = 5; // Mars 추가

  this.planetSize(sunR);
  this.planetSize(earthR);
  this.planetSize(moonR);
  this.planetSize(marsR);
};
```

4. 입력받은 지름값으로 행성 생성에 필요한 정보로 전환하여 각 행성 생성 함수로 전달한다.

```js
// 각 행성의 지름값으로 행성 생성에 필요한 정보를 가져온다.
space.planetSize = function (d) {
  let dia = Number(d); // 지름
  let radius = Math.floor(d / 2); // 반지름
  let centerX = radius;
  let centerY = radius;

  if (dia === 7) {
    this.makeSun(dia, radius, centerX, centerY);
  } else if (dia === 5) {
    // Mars 추가
    this.makeMars(dia, radius, centerX, centerY);
  } else if (dia === 3) {
    this.makeEarth(dia, radius, centerX, centerY);
  } else if (dia === 1) {
    this.makeMoon(dia, radius, centerX, centerY);
  }
};
```

5. 화성 생성 함수

```js
// Mars 생성 함수
space.makeMars = function (d, r, x, y) {
  this.mars = Array.from({ length: d }, () => Array(d));

  for (let i = x - r; i <= x + r; i++) {
    for (let j = y - r; j <= y + r; j++) {
      if ((i - r) * (i - r) + (j - r) * (j - r) <= r * r) {
        this.mars[i][j] = "☄️";
      } else {
        this.mars[i][j] = "";
      }
    }
  }
  this.showTheMars(d);
};

// Mars 호출 함수
space.showTheMars = function (d) {
  for (let i = 0; i < d; i++) {
    const div = document.createElement("div");
    div.innerText = this.mars[i];
    marsObject.appendChild(div);
  }
};
```

6. 2단계에서 구현된 함수에 화성이 추가되었기에 태양, 지구, 달의 설명은 생략하겠다.

</br>

## date 객체

1. 인터페이스에 구현된 "날짜받기" 버튼을 클릭시 이벤트 호출로 임의의 날짜를 생성한다.
2. 임의의 날짜는 Math.random 메서드로 년, 월, 일 각각의 값을 받는다.
3. 좋은 시각화를 위해 앞의 자리가 0인 경우 str "0" 이 호출되도록 구현했다.

```js
date = {};

inputButton.addEventListener("click", date.getDateValue.bind(date));

// 1년 1월 1일부터 9999년 12월 31일까지 임의의 날짜를 입력 받는다.
date.getDateValue = function (event) {
  event.preventDefault();

  const selectYear = String(Math.floor(Math.random() * 9999 + 1));
  const selectMonth = String(Math.floor(Math.random() * 12 + 1));
  const selectDay = String(Math.floor(Math.random() * 31 + 1));

  yearResult.innerText = `${selectYear.padStart(4, "0")}년`;
  monthResult.innerText = `${selectMonth.padStart(2, "0")}월`;
  dayResult.innerText = `${selectDay.padStart(2, "0")}일`;

  this.calculateDate(selectYear, selectMonth, selectDay);
};
```

4. 디폴트 date:(2022)년 01월 01일과 임의의 date를 Date.parse 메서드로 밀리초로 환산한다.
5. (임의의 날짜 밀리초) - (디폴트 밀리초)로 "몇일"의 전,후 인지 도출한다.

```js
// 사용자가 입력한 date와 디폴트 date값을 초로 환산하여 일수의 차를 구한다.
date.calculateDate = function (year, mon, day) {
  const yearNumber = Number(year);
  const monthNumber = Number(mon);
  const dayNumber = Number(day);
  const defaultDate = Date.parse("2022 / 01 / 01");
  const randomDate = Date.parse(
    `${yearNumber} / ${monthNumber} / ${dayNumber}`
  );
  const onedayMs = 86400000; // 1 day는 86400000 밀리초다.
  const movedDay = (randomDate - defaultDate) / onedayMs;

  this.rotateObject(movedDay);
};
```

6. 지구, 화성, 달의 회전도를 계산하기 위해 이용된 수치들은 아래와 같다.

| 1day 밀리초 | 1day 지구 rotate deg | 1day 달 rotate deg | 1day 화성 rotate deg |
| :---------: | :------------------: | :----------------: | :------------------: |
|  86400000   |      0.98630137      |      13.33333      |      0.52401747      |

7. 앞에서 구해진 이동 일수와 각도를 곱한 deg만큼 rotate 해준다.

```js
// "일" 수를 토대로 Earth와 Moon이 몇도 이동하는지 계산하고 이동시킨다.
date.rotateObject = function (day) {
  const earthOrbit = document.querySelector(".earth-spin");
  const moonOrbit = document.querySelector(".moon-spin");
  const marsOrbit = document.querySelector(".mars-spin");

  const earthOneDayDeg = 0.98630137; // 지구의 공전 주기 365일
  const moonOneDayDeg = 13.33333; // 달의 공전 주기 27일
  const marsOneDayDeg = 0.52401747; // 화성의 공전 주기 687일

  const earthDeg = day * earthOneDayDeg;
  const moonDeg = day * moonOneDayDeg;
  const marsDeg = day * marsOneDayDeg;

  earthOrbit.style.transform = `rotate(${earthDeg}deg)`;
  moonOrbit.style.transform = `rotate(${moonDeg}deg)`;
  marsOrbit.style.transform = `rotate(${marsDeg}deg)`;
};
```

</br>

# 🛠️ 보완점

1. 중복되는 코드를 줄여주는 방법을 생각해보자.
2. 전체적인 인터페이스 디자인을 개선해보자
3. UI에서 새로운 객체(행성)을 추가하고 삭제되도록 구현해보자.
4. 리얼타임으로 움직이는 프로그램으로 발전 시켜보자.
