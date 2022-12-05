# 1단계: 콘솔로 원 그리기

<details>
<summary> 문제 설명 및 요구사항 </summary>
## 문제 설명
1. 입력: 1이상 80 이하의 정수를 콘솔을 통해 입력받는다.
2. 출력: 브라우저 화면에 해당 크기의 원을 "멋지게" 출력한다. 
3. JavaScript로 구현하기에 브라우저 화면에 출력 하도록 한다.

## 입력 및 출력 예시

```
원의 크기는?
6
   --
  -  -
 -    -
 -    -
  -  -
   --
```

## 1단계 코딩 요구사항

- 컴파일 또는 실행이 가능해야 한다. (컴파일이나 실행되지 않을 경우 감점 대상)
- gist는 하위 폴더 구조를 지원하지 않기 때문에 컴파일 또는 실행에 필요한 소스 코드는 모두 포함하고, 프로젝트 파일 등은 포함하지 않아도 된다.
- 자기만의 기준으로 최대한 간결하게 코드를 작성한다.
- Readme.md에 풀이 과정 및 코드 설명, 실행 결과를 기술하고 코드와 같이 gist에 포함해야 한다.
- 제출시 gist URL과 revision 번호를 함께 제출한다.
</details>
</br>

# 구조

- 자바스크립트로 구현하기에 콘솔이 아닌 웹 브라우저에 출련되도록 구현했다.
- 사용자가 원하는 원의 크기(지름)를 입력하면 해당 지름을 가진 원 모양이 출력된다.
- 지름이 짝수인 경우 원의 센터를 지정하는 방법을 아직 찾지못하여 지름이 홀수인 경우만 우선 출력 가능하다.
- 지름은 1~81 정수 중 홀수만 입력 받을 수 있다.

### 📑 목차

[1. 원의 크기(지름) 입력창 인터페이스](#입력창-인터페이스)

[2. 입력값(지름)을 가진 원 구현](#원-구현)

[3. 구현된 원 브라우저에 호출](#원-호출)

</br>

## 입력창 인터페이스

1. input tag를 이용하여 사용자의 입력값을 받을 수 있도록 한다.
2. placeholder 속성을 이용하여 입력값 안내 메시지를 사용자에서 전달한다.
3. type속성을 "number"로 하여 사전에 숫자가 아닌 input값의 입력을 방지한다.

```html
<input
  class="circle__form__input"
  placeholder="ex) 1~81 중 홀수만 입력해 주세요..."
  type="number"
/>
```

4. event를 이용하여 사용자가 원하는 원의 크기(지름) 값을 받아온다.
5. 입력값이 구조에 맞지 않는 짝수, 빈값, 음수, 81 초과 등의 경우 입력을 차단하고 안내 메시지를 띄운다.
6. 1~81 사이의 홀수가 바르게 입력되면 circle객체에 지름값을 전달한다.

```js
let circle = { circleArray: [] };

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
```

</br>

## 원 구현

1. 앞에서 입력받은 원의 크기(지름) 값을 기준으로 반지름과 센터값을 정의한다.
2. 배열 인덱스 (0부터 시작) 특성을 고려하여 반지름은 버림을 해준다.
3. 위와 같은 배열의 특성으로 각 센터값도 반지름 치수와 같다.
4. Array.from() 메서드로 지름값 dia 만큼의 length를 가진 2차원 배열을 생성한다.
5. "(x-a)^2 + (y-b)^2 = r^2 원 접선의 방정식" 접점과 센터를 기준으로 원의 내부에 있는지 판단.
6. 위 원의 성질을 이용하여 원을 벗어나는 배열 요소는 빈값으로 원 내에 해당하면 ⭐️을 추가한다.

```js
// 사용자가 입력한 값(지름)을 기준으로 원을 만들어 준다.
circle.makeCircle = function () {
  let dia = Number(this.diaNumber); // 지름
  let radius = Math.floor(dia / 2); // 반지름
  let centerX = radius; // 센터 x 값
  let centerY = radius; // 센터 y 값

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
```

</br>

## 원 호출

1. 구현된 원을 브라우저에 호출하여 사용자에게 보여준다.
2. 입력될 원의 크기(지름)을 모르기에 입력된 크기 length만큼의 div를 생성하여 호출한다.

```js
// "makeCircle" 함수에서 생성된 원(배열)을 브라우저에 호출한다.
circle.showCircle = function (dia) {
  resultCircleSize.innerHTML = `원의 크기는 ${dia} 입니다.`;
  for (let i = 0; i < dia; i++) {
    const div = document.createElement("div");
    div.innerText = this.circleArray[i];
    resultCircle.appendChild(div);
  }
};
```

</br>

# 🛠️ 보완점

1. 짝수의 경우에도 원의 구현이 되도록 보완한다.
2. 호출된 원이 더욱 "멋지게" 되는 방법을 고민한다.
