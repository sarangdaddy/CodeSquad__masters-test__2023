const sunObject = document.querySelector("#sun");
const earthObject = document.querySelector("#earth");
const moonObject = document.querySelector("#moon");
const marsObject = document.querySelector("#mars");

// Space 생성자 (Space 관리자 - 행성을 추출하여 우주에 호출한다.)
function Space(objName) {
  this.objName = objName;
}

Space.prototype.objName = null;

// 행성을 추출하는 메서드
Space.prototype.getObj = function () {
  switch (this.objName) {
    case "sun":
      this.showObj(sunObject);
      break;
    case "mars":
      this.showObj(marsObject);
      break;
    case "earth":
      this.showObj(earthObject);
      break;
    case "moon":
      this.showObj(moonObject);
      break;
  }
};

// 추출한 행성을 보여주는 메서드
Space.prototype.showObj = function (toHtml) {
  for (let i = 0; i < this.dia; i++) {
    const div = document.createElement("div");
    div.innerText = this.array[i];
    toHtml.appendChild(div);
  }
};

// Planet 생성자 (Planet 관리자 - 행성을 생성한다.)
function Planet(objName, dia) {
  this.objName = objName;
  this.dia = dia;
  this.radius = Math.floor(dia / 2);
  this.centerX = this.radius;
  this.centerY = this.radius;
  this.array = new Array();
}

// Planet에 Space를 상속 시킨다. Space > Planet
Planet.prototype = new Space();

// 인자(지름)값으로 생성할 행성을 선택한다.
Planet.prototype.selectPlanet = function () {
  switch (this.dia) {
    case 7:
      this.makePlanet("🔥");
      break;
    case 5:
      this.makePlanet("🎈");
      break;
    case 3:
      this.makePlanet("🌏");
      break;
    case 1:
      this.makePlanet("🌕");
      break;
  }
};

// 선택받은 행성을 생성한다.
Planet.prototype.makePlanet = function (imo) {
  this.array = Array.from({ length: this.dia }, () => Array(this.dia));

  for (
    let i = this.centerX - this.radius;
    i <= this.centerX + this.radius;
    i++
  ) {
    for (
      let j = this.centerY - this.radius;
      j <= this.centerY + this.radius;
      j++
    ) {
      if (
        (i - this.radius) * (i - this.radius) +
          (j - this.radius) * (j - this.radius) <=
        this.radius * this.radius
      ) {
        this.array[i][j] = `${imo}`;
      } else {
        this.array[i][j] = "";
      }
    }
  }
};

// 행성이름과 지름값을 부여한다.
const sun = new Planet("sun", 7);
const earth = new Planet("earth", 3);
const moon = new Planet("moon", 1);
const mars = new Planet("mars", 5);

sun.selectPlanet();
sun.getObj();
mars.selectPlanet();
mars.getObj();
earth.selectPlanet();
earth.getObj();
moon.selectPlanet();
moon.getObj();
