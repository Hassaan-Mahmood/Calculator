let currentDisplay = document.getElementById("current");

let firstNum = "";
let operator = "";
let secondNum = "";

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
}

function equalOperation() {}
  