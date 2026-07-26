let currentDisplay = document.getElementById("current");

let firstNumber = "";
let operator = "";
let secondNumer = "";

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
  