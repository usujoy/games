const HEIGHT = 5;
const WIDTH = 5;
const CHANCES = 6;
let field = '';

function repeat(string, index) {
  let newString = '';

  for (let i = 0; i < index; i++) {
    newString += string;
  }

  return newString;
}

function slice(string, from, to) {
  let newString = '';

  for (let index = from; index < to; index++) {
    newString += string[index];
  }

  return newString;
}

function mineField() {
  for (let i = 0; i < HEIGHT; i++) {
    console.log(slice(field, i * WIDTH, (i + 1) * WIDTH));
  }
}

function replace(index, character) {
  let newString = '';

  for (let i = 0; i < field.length; i++ ) {
    newString += i === index ? character : field[i];
  }

  return newString;
}

function giveHint(number, bombPosition) {
  if (number > bombPosition + 5) {
    return 'prediction is TOO HIGH';
  }

  if (number < bombPosition - 5) {
    return 'prediction is TOO LOW'
  }

  if (number > bombPosition) {
    return 'prediction is HIGH';
  }

  return 'prediction is LOW';
}

function inputMessage(number, bombPosition, chancesLeft) {
  if (number > 25 || number < 1) {
    console.log('Invalid Input');
    return startDiffuse(bombPosition, chancesLeft);
  }
}

function updateField(number, bombPosition) {
  field = replace(number, '❍');
  
  if (number === bombPosition - 1) {
    field = replace(number, '◉')
  }

  return mineField();
}

function winMessage() {
  console.log('BOMB DIFFUSED.. CONGRATULATIONS 🥳')
}

function userInput() {
  console.log('Type number of Bomb you want to diffuse..(between 1 and 25)');

  return +prompt('give the number for diffuse:');
}

function chancesLeftMessage(chancesLeft) {
  console.log('\n CHANCES LEFT: ', chancesLeft - 1);
}

function gameOverMessage() {
  console.log('NO CHANCES LEFT \n   GAME OVER')
}

function gameStart(bombPosition, chances) {
  for (let i = chances; i >= 0; i--) {
    if (i === 0) {
      gameOverMessage();
      return;
    }
    
    const number = userInput() - 1;
    chancesLeftMessage(i);
    updateField(number, bombPosition);
    console.log(giveHint(number, bombPosition - 1));

    const gameWinOrNot = number === (bombPosition -1);

    if (gameWinOrNot) {
      winMessage();
      return;
    }
  }
}

function getBombPosition(from, to) {
  const number = from + Math.floor(Math.random() * (to - from));

  return number;
}


function restartGame() {
  const restart = confirm('do you want to restart? ');

  if (restart) {
    start();
  }

  return;
}

function start() {
  console.log('    WELCOME TO \n DIFFUSE THE BOMB \n \n')
  field = repeat('⎕', HEIGHT * WIDTH);

  mineField();

  const bombPosition = getBombPosition(0, HEIGHT * WIDTH);

  gameStart(bombPosition, CHANCES);
  restartGame();
}

start();
