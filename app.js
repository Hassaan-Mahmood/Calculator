
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
  