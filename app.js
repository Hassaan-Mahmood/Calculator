let currentDisplay = document.getElementById("current");

let firstNumber = "";
let operator = "";
let secondNumber = "";

function calculator(parameter) {
  if (
    parameter === "+" ||
    parameter === "-" ||
    parameter === "x" ||
    parameter === "/"
  ) {
    operator = parameter;
    currentDisplay.innerHTML += operator;
  } 
  
  // else if (parameter === "AC") {
  //   currentDisplay.innerHTML = "";
  // }
  //  else if (parameter === "C") {
  //   let string = currentDisplay.innerHTML;
  //   string.substring(0, string-1);
  // }
  else {
    if (operator === "") {
      firstNumber = parameter;
    } else {
      secondNumber = parameter;
    }
    currentDisplay.innerHTML += parameter;
  }

  console.log("FirstNumber : " + firstNumber);
  console.log("Operator : " + operator);
  console.log("SecondNumber : " + secondNumber);
  

}

function equalOperation() {

}
