const inputValue = document.querySelector(".circle__form__input");
const inputButton = document.querySelector(".circle__form__btn");
const resultCircleSize = document.querySelector(".circle__size");
const resultCircle = document.querySelector(".circle__show");

let circle = { circleArray: [] };

// 사용자가 원의 지름을 입력하면 값을 가져온다.
circle.getInputValue = function (event) {
  event.preventDefault();

  // 오류가 발생 할 수 있는 input값은 안내창과 함께 차단한다.
  if (
    inputValue.value % 2 === 0 ||
    inputValue.value === "" ||
    inputValue.value <= 0 ||
    inputValue.value > 81
  ) {
    alert("정수 1~81 중 홀수만 입력해 주세요.");
    inputValue.value = "";
    return;
  }

  this.diaNumber = inputValue.value;
  inputValue.value = "";
  this.makeCircle();
};

// 사용자가 입력한 값(지름)을 기준으로 원을 만들어 준다.
circle.makeCircle = function () {
  let dia = Number(this.diaNumber); // 지름
  let radius = Math.floor(dia / 2); // 반지름
  let centerX = radius;
  let centerY = radius;

  // 지름 크기만큼의 원 배열 생성
  this.circleArray = Array.from({ length: dia }, () => Array(dia));

  // 배열 요소가 최대한 원의 모양이 되도록 빈 값과 ⭐️을 입력해준다.
  for (let i = centerX - radius; i <= centerX + radius; i++) {
    for (let j = centerY - radius; j <= centerY + radius; j++) {
      if (
        (i - radius) * (i - radius) + (j - radius) * (j - radius) <=
        radius * radius
      ) {
        this.circleArray[i][j] = "⭐️";
      } else {
        this.circleArray[i][j] = "";
      }
    }
  }
  this.showCircle(dia);
};

// "makeCircle" 함수에서 생성된 원(배열)을 브라우저에 호출한다.
circle.showCircle = function (dia) {
  resultCircleSize.innerHTML = `원의 크기는 ${dia} 입니다.`;
  for (let i = 0; i < dia; i++) {
    const div = document.createElement("div");
    div.innerText = this.circleArray[i];
    resultCircle.appendChild(div);
  }
};

inputButton.addEventListener("click", circle.getInputValue.bind(circle));
