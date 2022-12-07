const inputButton = document.querySelector(".date__form__btn");
const yearResult = document.querySelector(".date__year");
const monthResult = document.querySelector(".date__month");
const dayResult = document.querySelector(".date__day");

date = {};

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

// 임의의 date와 디폴트 date값을 초로 환산하여 일수의 차를 구한다.
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

// "일" 수를 토대로 Earth와 Moon이 몇도 이동하는지 계산하고 이동시킨다.
date.rotateObject = function (day) {
  const earthOrbit = document.querySelector(".earth-spin");
  const moonOrbit = document.querySelector(".moon-spin");
  const marsOrbit = document.querySelector(".mars-spin");

  const earthOneDayDeg = 0.98630137; // 지구의 공전 주기 365
  const moonOneDayDeg = 13.33333; // 달의 공전 주기 27
  const marsOneDayDeg = 0.52401747; // 화성의 공전 주기 687

  const earthDeg = day * earthOneDayDeg;
  const moonDeg = day * moonOneDayDeg;
  const marsDeg = day * marsOneDayDeg;

  earthOrbit.style.transform = `rotate(${earthDeg}deg)`;
  moonOrbit.style.transform = `rotate(${moonDeg}deg)`;
  marsOrbit.style.transform = `rotate(${marsDeg}deg)`;
};

inputButton.addEventListener("click", date.getDateValue.bind(date));
