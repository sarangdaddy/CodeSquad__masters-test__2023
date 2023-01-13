const startButton = document.querySelector(".date__form__startBtn");
const pauseButton = document.querySelector(".date__form__pauseBtn");
const resetButton = document.querySelector(".date__form__resetBtn");

const yearResult = document.querySelector(".date__year");
const monthResult = document.querySelector(".date__month");
const dayResult = document.querySelector(".date__day");

const earthOrbit = document.querySelector(".earth-spin");
const moonOrbit = document.querySelector(".moon-spin");
const marsOrbit = document.querySelector(".mars-spin");

date = {
  defaultMilsec: Date.parse("2022-01-01:00:00:00"),
  oneDayMilsec: 86400000,
  plusDayMilsec: this.defaultMilsec,
  countDay: 0,
};

let interval;

// Start 버튼 클릭시 0.1초 마다 하루 + 된다.
date.startTimer = function (event) {
  event.preventDefault();
  this.plusDayMilsec = this.defaultMilsec;
  interval = setInterval(() => {
    this.plusDayMilsec += this.oneDayMilsec; // 2022/01/01 + 1 day
    this.getDateValue(this.plusDayMilsec);
    this.countDay++; // rotate day가 0.1초마다 1찍 증가한다.
    this.rotateObject(this.countDay);
  }, 100);
};

// 하루가 증가할때마다 인터페이스 날짜 변경하는 함수
date.getDateValue = function (day) {
  const changeDate = new Date(day);
  const changeYear = changeDate.getFullYear();
  const changeMonth = changeDate.getMonth() + 1;
  const changeDay = changeDate.getDate();

  const selectYear = String(changeYear);
  const selectMonth = String(changeMonth);
  const selectDay = String(changeDay);

  yearResult.innerText = `${selectYear.padStart(4, "0")}년`;
  monthResult.innerText = `${selectMonth.padStart(2, "0")}월`;
  dayResult.innerText = `${selectDay.padStart(2, "0")}일`;
};

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

// 날짜 증가 타이머 일시정지 함수
date.pauseTimer = function (event) {
  event.preventDefault();
  clearInterval(interval);
};

// 프로그램 리셋 함수
date.resetTimer = function (event) {
  event.preventDefault();
  clearInterval(interval);
  this.plusDayMilsec = this.defaultMilsec;
  this.countDay = 0;
  this.getDateValue(this.plusDayMilsec);
  this.rotateObject(this.countDay);
};

startButton.addEventListener("click", date.startTimer.bind(date));
pauseButton.addEventListener("click", date.pauseTimer.bind(date));
resetButton.addEventListener("click", date.resetTimer.bind(date));
