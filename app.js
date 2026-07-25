  const currentEl = document.getElementById('current');
  const historyEl = document.getElementById('history');

  let current = '0';
  let previous = null;
  let operator = null;
  let justEvaluated = false;

  const opSymbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };

  function updateDisplay(){
    currentEl.textContent = formatNumber(current);
    historyEl.textContent = previous !== null && operator
      ? `${formatNumber(previous)} ${opSymbols[operator]}`
      : '\u00A0';
    fitCurrentFont();
  }

  function fitCurrentFont(){
    currentEl.style.fontSize = '';
    const maxSize = parseFloat(getComputedStyle(currentEl).fontSize);
    const minSize = maxSize * 0.5;
    const available = currentEl.parentElement.clientWidth - 8;
    let size = maxSize;
    currentEl.style.fontSize = size + 'px';
    while(currentEl.scrollWidth > available && size > minSize){
      size -= 2;
      currentEl.style.fontSize = size + 'px';
    }
  }

  window.addEventListener('resize', fitCurrentFont);

  function formatNumber(numStr){
    if(numStr === 'Error') return numStr;
    let [int, dec] = numStr.toString().split('.');
    const neg = int.startsWith('-');
    if(neg) int = int.slice(1);
    if(int.length > 12) int = Number(int).toExponential(5);
    else int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-' : '') + int + (dec !== undefined ? '.' + dec : '');
  }

  function inputDigit(d){
    if(justEvaluated){
      current = d;
      justEvaluated = false;
    } else {
      current = current === '0' ? d : current + d;
    }
    if(current.replace('-','').replace('.','').length > 14) return;
    updateDisplay();
  }

  function inputDecimal(){
    justEvaluated = false;
    if(!current.includes('.')) current += '.';
    updateDisplay();
  }

  function chooseOperator(op){
    if(operator && previous !== null && !justEvaluated){
      compute();
    }
    previous = current;
    operator = op;
    current = '0';
    justEvaluated = false;
    updateDisplay();
  }

  function compute(){
    if(operator === null || previous === null) return;
    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result;
    switch(operator){
      case 'add': result = a + b; break;
      case 'subtract': result = a - b; break;
      case 'multiply': result = a * b; break;
      case 'divide': result = b === 0 ? NaN : a / b; break;
    }
    if(isNaN(result) || !isFinite(result)){
      current = 'Error';
      previous = null;
      operator = null;
    } else {
      result = Math.round(result * 1e10) / 1e10;
      current = result.toString();
      previous = null;
      operator = null;
    }
    justEvaluated = true;
    flashGlow();
    updateDisplay();
  }

  function clearAll(){
    current = '0';
    previous = null;
    operator = null;
    justEvaluated = false;
    updateDisplay();
  }

  function clearEntry(){
    current = '0';
    justEvaluated = false;
    updateDisplay();
  }

  function negate(){
    if(current === '0' || current === 'Error') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    updateDisplay();
  }

  function percent(){
    if(current === 'Error') return;
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
  }

  function flashGlow(){
    currentEl.classList.add('glow');
    setTimeout(() => currentEl.classList.remove('glow'), 400);
  }

  document.querySelectorAll('[data-num]').forEach(btn => {
    btn.addEventListener('click', () => inputDigit(btn.dataset.num));
  });

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if(['add','subtract','multiply','divide'].includes(action)) chooseOperator(action);
      else if(action === 'equals') compute();
      else if(action === 'clear') clearAll();
      else if(action === 'clearEntry') clearEntry();
      else if(action === 'negate') negate();
      else if(action === 'percent') percent();
      else if(action === 'decimal') inputDecimal();
    });
  });

  window.addEventListener('keydown', (e) => {
    if(e.key >= '0' && e.key <= '9') inputDigit(e.key);
    else if(e.key === '.') inputDecimal();
    else if(e.key === '+') chooseOperator('add');
    else if(e.key === '-') chooseOperator('subtract');
    else if(e.key === '*') chooseOperator('multiply');
    else if(e.key === '/') { e.preventDefault(); chooseOperator('divide'); }
    else if(e.key === 'Enter' || e.key === '=') compute();
    else if(e.key === 'Backspace'){
      current = current.length > 1 ? current.slice(0, -1) : '0';
      updateDisplay();
    }
    else if(e.key === 'Escape') clearAll();
  });

  updateDisplay();
