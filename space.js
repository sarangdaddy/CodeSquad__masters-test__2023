const sunObject = document.querySelector("#sun");
const earthObject = document.querySelector("#earth");
const moonObject = document.querySelector("#moon");
const marsObject = document.querySelector("#mars");

let space = { sun: [], earth: [], moon: [], mars: [] };

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

// Earth 생성 함수
space.makeEarth = function (d, r, x, y) {
  this.earth = Array.from({ length: d }, () => Array(d));

  for (let i = x - r; i <= x + r; i++) {
    for (let j = y - r; j <= y + r; j++) {
      if ((i - r) * (i - r) + (j - r) * (j - r) <= r * r) {
        this.earth[i][j] = "🌏";
      } else {
        this.earth[i][j] = "";
      }
    }
  }
  this.showTheEarth(d);
};

// Earth 호출 함수
space.showTheEarth = function (d) {
  for (let i = 0; i < d; i++) {
    const div = document.createElement("div");
    div.innerText = this.earth[i];
    earthObject.appendChild(div);
  }
};

// Moon 생성 함수
space.makeMoon = function (d, r, x, y) {
  this.moon = Array.from({ length: d }, () => Array(d));

  for (let i = x - r; i <= x + r; i++) {
    for (let j = y - r; j <= y + r; j++) {
      if ((i - r) * (i - r) + (j - r) * (j - r) <= r * r) {
        this.moon[i][j] = "🌕";
      } else {
        this.moon[i][j] = "";
      }
    }
  }
  this.showTheMoon(d);
};

// Moon 호출 함수
space.showTheMoon = function (d) {
  for (let i = 0; i < d; i++) {
    const div = document.createElement("div");
    div.innerText = this.moon[i];
    moonObject.appendChild(div);
  }
};

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

space.init();
