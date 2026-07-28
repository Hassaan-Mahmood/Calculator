const currentDisplay = document.getElementById("current");

  firstNumber = "";
  operator = "";
  secondNumber = "";

function calculator(parameter) {
  if (
    parameter === "+" ||
    parameter === "−" ||
    parameter === "×" ||
    parameter === "÷"
  ) {
    if (operator === "") {
      operator = parameter;
      currentDisplay.innerHTML += operator;
    }
  } else if (parameter === "AC") {
    currentDisplay.innerHTML = "";
  } else if (parameter === "C") {
    if (secondNumber) {
      secondNumber = secondNumber.slice(0, -1);
    } else if (operator) {
      operator = "";
    } else {
      firstNumber = firstNumber.slice(0, -1);
    }
    currentDisplay.innerHTML = firstNumber + operator + secondNumber;
  } 
  

  
  else if (
    parameter === 0 ||
    parameter === 1 ||
    parameter === 2 ||
    parameter === 3 ||
    parameter === 4 ||
    parameter === 5 ||
    parameter === 6 ||
    parameter === 7 ||
    parameter === 8 ||
    parameter === 9 
  ){
    if (operator === "") {
      firstNumber += parameter;
    } else {
      secondNumber += parameter;
    }
    currentDisplay.innerHTML += parameter;
  }
}

function equalOperation() {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  let result;

  if (operator === "+") {
    result = firstNumber + secondNumber;
  } else if (operator === "−") {
    result = firstNumber - secondNumber;
  } else if (operator === "×") {
    result = firstNumber * secondNumber;
  } else if (operator === "÷") {
    result = firstNumber / secondNumber;
  }

  currentDisplay.innerHTML = result;
  updateDiplay()
}

function updateDiplay() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
}

// updateDiplay()
