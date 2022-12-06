const inputMonth = document.querySelector(".date__form__month");
const inputDay = document.querySelector(".date__form__day");
const inputButton = document.querySelector(".date__form__btn");
const monthResult = document.querySelector(".date__month");
const dayResult = document.querySelector(".date__day");

date = {};

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

inputButton.addEventListener("click", date.getDateValue.bind(date));
