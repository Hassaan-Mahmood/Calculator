const currentDisplay = document.getElementById("current");

let firstNumber = "";
let operator = "";
let secondNumber = "";


function calculator(parameter) {

  if (
    parameter === "+" ||
    parameter === "−" ||
    parameter === "×" ||
    parameter === "÷"
  ) {
    operator = parameter;
    currentDisplay.innerHTML += operator;
  } 
  
  
  else if (parameter === "AC") {
    currentDisplay.innerHTML = "";
  }
  
  
   else if (parameter === "C") {
    if (secondNumber) {
      secondNumber = secondNumber.slice(0, -1);
    } else if (operator) {
      operator = "";
    } else {
      firstNumber = firstNumber.slice(0, -1);
    }
    currentDisplay.innerHTML = firstNumber + operator + secondNumber;
  }
  
  
  
  else {
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

  firstNumber = ""
  operator = ""
  secondNumber = ""
}



