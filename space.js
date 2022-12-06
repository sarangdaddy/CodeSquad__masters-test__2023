const sunObject = document.querySelector("#sun");
const earthObject = document.querySelector("#earth");
const moonObject = document.querySelector("#moon");

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

// Sun, Earth, Moon의 지름 초기값을 입력 해준다.
space.init = function () {
  let sunR = 7;
  let earthR = 3;
  let moonR = 1;

  this.planetSize(sunR);
  this.planetSize(earthR);
  this.planetSize(moonR);
};

space.init();
