# 4단계: 추가기능 구현

3단계까지 구현된 프로그램에 추가기능을 구현해보자.

<details>
<summary> 문제 설명 및 요구사항 </summary>

## 4단계 코딩 요구사항

- 콘솔에서 애니메이션으로 동작하도록 구현해 본다.
- 프레임당 시간을 조절할 수 있게 구현해 본다.
- 웹 UI 또는 기타 GUI 프로그램으로 구현해 본다.

</details>
</br>

# 구조

- 자바스크립트로 구현하기에 콘솔이 아닌 웹 브라우저에 출력되도록 구현했다.
- 디폴트는 2022년 1월 1일에 태양, 지구, 달, 화성이 일직선 상에 존재한다.
- 지구와 화성은 태양을 중심으로 360도 회전하며, 달은 지구를 중심으로 360도 회전한다고 가정한다.
- "Start" 버튼 클릭시 0.1초에 하루가 지나는 날짜 타이머를 시작한다.
- "Pause" 날짜 타이머가 멈춘다.
- "Reset" 날짜 타이머가 초기화 된다.
- 각 객체(행성)은 증가하는 날짜에 맞춰 해당하는 위치로 이동한다.
- 본 프로그램에서 자전은 구현되지 않았다.

### 📑 목차

[1. 버튼, 날짜 타이머, 객체 이동 화면 등 인터페이스](#인터페이스)

[2. 태양, 지구, 화성, 달을 생성하는 space 객체](#space-객체)

[3. 날짜 타이머에 해당하는 위치로 각 객체를 이동시키는 date 객체](#date-객체)

</br>

## 인터페이스

1. 브라우저에 출력하기에 html과 css를 이용하여 인터페이스를 구현했다.
2. 3단계에서는 임의의 날짜를 받아왔다면 4단계에서는 버튼 클릭시 2022.01.01부터 날짜가 증가하도록 구현했다.
3. Start 버튼 클릭시 0.1초에 1일이 증가한다.
4. Pause 버튼 클릭시 날짜 타이머가 일시정지 한다.
5. Reset 버튼 클릭시 날짜 타이머가 초기화 된다.

```html
<div class="date__result">
  <span class="date__year">2022년</span>
  <span class="date__month">01월</span>
  <span class="date__day">01일</span>
  <button class="date__form__startBtn">Start</button>
  <button class="date__form__pauseBtn">Pause</button>
  <button class="date__form__resetBtn">Reset</button>
</div>
```

6. main tag안에 태양, 지구, 화성, 달의 class와 id를 부여하고 궤도 div와 회전 div를 생성했다.

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

7. 태양, 지구, 화성, 달의 디폴트 위치 (일직선상)을 css로 구현했다.

```cs
// 2,3단계와 동일
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

8. css는 아래 사이트들로부터 도움을 받았다.

   [1. 참고사이트](https://stackoverflow.com/questions/25472490/make-div-orbit-around-a-moving-div)
   [2. 참고사이트](https://bskyvision.com/entry/css-css%EC%97%90%EC%84%9C-%EA%BA%BD%EC%87%A0-%EC%9D%98-%EC%9D%98%EB%AF%B8%EB%8A%94)

</br>

## space 객체 (3단계와 동일)

1. 인터페이스에 호출할 태양, 지구, 화성, 달을 생성한다.
2. 1단계에서 구현한 지름으로 원을 만드는 기능을 도입하여 구축했다.
3. init값으로 태양, 지구, 화성, 달의 지름 크기를 불러온다.

```js
// 3단계에서 화성이 추가되었다.
let space = { sun: [], earth: [], moon: [], mars: [] };

// Sun, Earth, Moon, Mars의 지름 초기값을 입력 해준다.
space.init = function () {
  const sunR = 7;
  const earthR = 3;
  const moonR = 1;
  const marsR = 5; // Mars 추가

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
  const dia = Number(d); // 지름
  const radius = Math.floor(d / 2); // 반지름
  const centerX = radius;
  const centerY = radius;

  switch (dia) {
    case 7:
      this.makeSun(dia, radius, centerX, centerY);
      break;
    case 5:
      this.makeMars(dia, radius, centerX, centerY);
      break;
    case 3:
      this.makeEarth(dia, radius, centerX, centerY);
      break;
    case 1:
      this.makeMoon(dia, radius, centerX, centerY);
      break;
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

1. 인터페이스에 구현된 "Start" 버튼을 클릭시 0.1초 마다 1day가 증가하도록 구현한다.
2. 0.1초마다 변경되는 날짜는 getDateValue 함수로 전달된다.
3. 0.1초 실행마다 countDay가 카운트 된다.
4. countDay 숫자만큼 rotateObject 함수에 전달하여 객체(행성)을 회전시킨다.

```js
startButton.addEventListener("click", date.startTimer.bind(date));

date = {};

const defaultMilsec = Date.parse("2022-01-01:00:00:00"); // 2022/01/01 을 밀리초로 환산 1640962800000
const oneDayMilsec = 86400000; // 밀리초로 더해주면 리얼타임으로 날짜가 증가 된다.
let plusDayMilsec = defaultMilsec;
let countDay = 0;
let interval;

// Start 버튼 클릭시 0.1초 마다 하루 + 된다.
date.startTimer = function (event) {
  event.preventDefault();
  interval = setInterval(() => {
    plusDayMilsec += oneDayMilsec; // 2022/01/01 + 1 day
    this.getDateValue(plusDayMilsec);
    countDay++; // rotate day가 0.1초마다 1찍 증가한다.
    this.rotateObject(countDay);
  }, 100);
```

```js
// 하루가 증가할때마다 인터페이스 날짜 변경하는 함수
date.getDateValue = function (plusDayMilsec) {
  const changeDate = new Date(plusDayMilsec);
  const changeYear = changeDate.getFullYear();
  const changeMonth = changeDate.getMonth() + 1;
  const changeDay = changeDate.getDate();

  const selectYear = String(changeYear);
  const selectMonth = String(changeMonth);
  const selectDay = String(changeDay);

  //좋은 시각화를 위해 앞의 자리가 0인 경우 str "0" 이 호출되도록 구현했다.
  yearResult.innerText = `${selectYear.padStart(4, "0")}년`;
  monthResult.innerText = `${selectMonth.padStart(2, "0")}월`;
  dayResult.innerText = `${selectDay.padStart(2, "0")}일`;
};
```

5. 지구, 화성, 달의 회전도를 계산하기 위해 이용된 수치들은 아래와 같다.
   > | 1day 밀리초 | 1day 지구 rotate deg | 1day 달 rotate deg | 1day 화성 rotate deg |
   > | :---------: | :------------------: | :----------------: | :------------------: |
   > |  86400000   |      0.98630137      |      13.33333      |      0.52401747      |

```js
// 디폴트 날짜부터 하루가 증가함에 Earth, Mars, Moon이 몇도 이동하는지 계산하고 이동시킨다.
date.rotateObject = function (countDay) {
  const earthOneDayDeg = 0.98630137; // 지구의 공전 주기 365
  const moonOneDayDeg = 13.33333; // 달의 공전 주기 27
  const marsOneDayDeg = 0.52401747; // 화성의 공전 주기 687

  const earthDeg = countDay * earthOneDayDeg;
  const moonDeg = countDay * moonOneDayDeg;
  const marsDeg = countDay * marsOneDayDeg;

  earthOrbit.style.transform = `rotate(${earthDeg}deg)`;
  moonOrbit.style.transform = `rotate(${moonDeg}deg)`;
  marsOrbit.style.transform = `rotate(${marsDeg}deg)`;
};
```

6. "Pause" 버튼을 클릭시 날짜 타이머가 일시정지 한다.

```js
pauseButton.addEventListener("click", date.pauseTimer);

// 날짜 증가 타이머 일시정지 함수
date.pauseTimer = function (event) {
  event.preventDefault();
  clearInterval(interval);
};
```

7. "Reset" 버튼을 클릭시 날짜 타이머가 초기화 된다.

```js
resetButton.addEventListener("click", date.resetTimer.bind(date));

// 프로그램 리셋 함수
date.resetTimer = function (event) {
  event.preventDefault();
  clearInterval(interval);
  plusDayMilsec = defaultMilsec;
  countDay = 0;
  this.getDateValue(plusDayMilsec);
  this.rotateObject(countDay);
};
```

</br>

# 🛠️ 보완점

1. 전역변수를 최대한 제거해보자.
2. 중복되는 코드를 없에는 방법을 강구해보자.
3. 객체지향프로그래밍(OOP)를 더 공부하고 고민해보자.
4. Start 버튼을 여러번 클릭시 속도가 빨라지고 일시정지 기능이 안되는 버그발견
5. 추가 버그를 찾아보고 해결방법을 강구하자.
