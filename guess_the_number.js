function message(predictedNumber, originalNumber, chances) {

  if (originalNumber < predictedNumber) {
    return '⭕️ predicted number is greater than original ⭕️ \n  CHANCES LEFT:  ' + chances;
  }

  if (originalNumber > predictedNumber) {
    return '⭕️ predicted number is less than original ⭕️ \n  CHANCES LEFT:  ' + chances;
  }
}

function playGame(number, chances) {
  if (chances === 0) {
    return 'number is: ' + number + '\n ⛔️ GAME OVER ⛔️ \n   TRY AGAIN ';
  }
  const predictedNumber = +prompt("guess the number from 1 to 10");

  if (number === predictedNumber) {
    return '🥳 CONGRATULATIONS 🥳 \n' + 'Guessed It Correctly';
  }

  console.log(message(predictedNumber, number, chances - 1));

  return playGame(number, chances - 1);
}


function guessTheNumber() {
  console.log('__WELCOMOE__');
  const a = confirm('Are You Ready...');

  if (a) {
    const realNumber = Math.round(Math.random() * 10);

    return playGame(realNumber, 3);
  } else {
    return ('OK BYE. 🙂👋🏻   ');
  }
}

console.log(guessTheNumber());
