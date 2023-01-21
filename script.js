const lives = document.getElementById("lives");
let minValue = document.getElementById("min");
let maxValue = document.getElementById("max");
let randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
let stopGame = document.querySelector('.submitExit');
let check = document.querySelector('.submitCheck');
let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');


let guessCount = 1;
let resetButton;
guessField.disabled = true;
guessSubmit.disabled = true;


function value(){
  minValue = Number(minValue.value);
  maxValue =  Number(maxValue.value);
  if (minValue == ''){
    alert ('Введите минимальное значение!');
    guesses.textContent = 'Предыдущие варианты: ';
    location.reload();
  }else if (maxValue == '') {
    alert ('Введите максимальное значение!');
    location.reload();
  }else if(minValue > maxValue) { 
    alert ('Минимальное значение не может быть больше максимального!');
    location.reload();
  }
  // console.log (minValue +'\n'+ maxValue);
 
}

function startGame() {

  guessCount = 1;
  lives.innerHTML = 5;
  

  let resetParass = document.querySelectorAll('.resultParas p');
  for (let i = 0; i < resetParass.length ; i++) {
    resetParass[i].textContent = '';
  }

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.color = 'white'; 
  
  randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
   
  // console.log (randomNumber);
}



  function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Предыдущие варианты: ';
  }
  guesses.textContent += userGuess + ' ';
 
  if (userGuess === randomNumber) {
    if ((guessCount === 2) || (guessCount === 3) || (guessCount === 4)) {
    lastResult.textContent = 'Поздравляю! Ты угадал число за ' + guessCount + ' попытки!'; 
    }else if (guessCount === 1) {
        lastResult.textContent = 'Поздравляю! Ты угадал число за ' + guessCount + ' попытку!'; 
    }else lastResult.textContent = 'Поздравляю! Ты угадал число за ' + guessCount + ' попыток!';  
    lastResult.style.color = '#4cbb17'; 
    lowOrHi.textContent = '';
    setGameOver();
    }else if (guessCount === 5) {
    lives.innerHTML = 0;
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
    }else {
    lastResult.style.color = '#1835FF'; 
    if(userGuess < randomNumber){
      lowOrHi.textContent = 'Попробуй ввести число больше!';
      lastResult.textContent = 'Холоднее!';
      lives.innerHTML -= 1;
    }else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Попробуй ввести число меньше!';
      lastResult.style.color = '#FF1824'; 
      lastResult.textContent = 'Теплее!';
      lives.innerHTML -= 1;
    }if (userGuess > maxValue || userGuess < minValue){
      lowOrHi.textContent = 'Вы вышли за придел диапазона!';
      setGameOver()
    }
  }


 
  guessCount++;
  guessField.value = '';
  guessField.focus();
}
  guessSubmit.addEventListener('click', checkGuess);
  stopGame.addEventListener('click', setGameOver);
  check.addEventListener('click', value);
  check.addEventListener('click', startGame);
  
      
  function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Новая игра';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}


  function resetGame() { 
  guessCount = 1;
  lives.innerHTML = 5;
  

  let resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  location.reload();

  lastResult.style.color = 'white'; 

  randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
}
      
    