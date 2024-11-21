let player_1_position = 0;
let player_2_position = 0;

const ladder1 = 4;
const ladder2 = 12;
const ladder3 = 14;
const ladder4 = 22;
const ladder5 = 41;
const ladder6 = 54;

const snake1 = 28;
const snake2 = 37;
const snake3 = 48;
const snake4 = 75;
const snake5 = 94;
const snake6 = 96;

function diceShow(nuumber) {
  switch (nuumber) {
    case 1:
      return '⚫️⚫️⚫️\n⚫️🔴⚫️\n⚫️⚫️⚫️';
    case 2:
      return '🟢⚫️⚫️\n⚫️⚫️⚫️\n⚫️⚫️🟢';
    case 3:
      return '🟢⚫️⚫️\n⚫️🟢⚫️\n⚫️⚫️🟢';
    case 4:
      return '🟢⚫️🟢\n⚫️⚫️⚫️\n🟢⚫️🟢';
    case 5:
      return '🟢⚫️🟢\n⚫️🟢⚫️\n🟢⚫️🟢';
    case 6:
      return '🔴⚫️🔴\n🔴⚫️🔴\n🔴⚫️🔴';
  }
}

function diceRoll() {
  while (1 > 0) {
    const diceValue = Math.floor(Math.random() * 10);

    if (diceValue > 0 && diceValue <= 6) {
      return diceValue;
    }
  }
}

function ladderFound(position) {
  switch (position) {
    case ladder1: return 56;
    case ladder2: return 50;
    case ladder3: return 55;
    case ladder4: return 58;
    case ladder5: return 79;
    case ladder6: return 88;
    default: return position;
  }
}

function snakeFound(position) {
  switch (position) {
    case snake1: return 10;
    case snake2: return 3;
    case snake3: return 16;
    case snake4: return 32;
    case snake5: return 71;
    case snake6: return 42;
    default: return position;
  }
}

function winMessage(player1, player2) {
  if (player_1_position === 100) {
    return player1 + ' WON THE MATCH 🎉🎊';
  }

  return player2 + ' WON THE MATCH 🎉🎊';
}

function displayMessage(position, newPosition) {
  console.log();
  console.log();
  if (newPosition > position) {
    return '🥳 You Found A 🪜';
  }

  if (newPosition < position) {
    return '😔 You Found A 🐍';
  }

  return '';
}

function snakeOrLadderFound(position) {
  let currentPosition = snakeFound(position);

  if (position === currentPosition) {
    currentPosition = ladderFound(position);
  }

  console.log(displayMessage(position, currentPosition));

  return currentPosition;
}


function roll(chance) {
  confirm('Do You Want To Skip?')
  const number = diceRoll();
  console.log(diceShow(number));
  if (chance % 2 === 0) {
    player_1_position = snakeOrLadderFound(player_1_position + number);
    return player_1_position > 100 ? player_1_position - number : player_1_position;
  }

  player_2_position = snakeOrLadderFound(player_2_position + number);
  return player_2_position > 100 ? player_2_position - number : player_2_position;
}

function displayPosition(player1, player2) {
  const player1Po = player1 + '  score: ' + player_1_position;
  const player2Po = player2 + '  score: ' + player_2_position;

  return player1Po + ' \n' + player2Po;
}

function getHorizontal() {
  return '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
}

function player1Position() {
  if (player_1_position % 10 === 0) {
    if (player_1_position === 100) {
      return getHorizontal() + '\n┃ 🟢 ';
    }
    return '┃\n' + getHorizontal() + '\n┃ ' + '🟢' + ' ';
  }
  return '┃ ' + '🟢' + ' ';
}

function player2Position() {
  if (player_2_position === 100) {
    return getHorizontal() + '\n┃ 🔴 ';
  }
  if (player_2_position % 10 === 0) {
    return '┃\n' + getHorizontal() + '\n┃ ' + '🔴' + ' ';
  }
  return '┃ ' + '🔴' + ' ';
}

function playerSymbol(index) {
  if (index === player_1_position) {
    if (index === player_1_position && index === player_2_position) {
      if (player_2_position % 10 === 0) {
        return '┃\n' + getHorizontal() + '\n┃ ' + '🟩' + ' ';
      }
      return '┃ ' + '🟩' + ' ';
    }

    if (index === player_1_position) {
      return player1Position();
    }
  }

  if (index === player_2_position) {
    return player2Position();
  }

}

function board(index) {
  if (index === player_1_position || index === player_2_position) {
    return playerSymbol(index);
  }

  if (index === player_2_position) {
    if (player_2_position === 100) {
      return getHorizontal() + '\n┃ 🔴 ';
    }
    if (player_2_position % 10 === 0) {
      return '┃\n' + getHorizontal() + '\n┃ ' + '🔴' + ' ';
    }
    return '┃ ' + '🔴' + ' ';
  }

  if (index < 10) {
    return '┃ 0' + index + ' ';
  }

  if (index === 100) {
    return getHorizontal() + '\n┃ 🏁 ';
  }

  if (index % 10 === 0) {
    return '┃\n' + getHorizontal() + '\n┃ ' + index + ' ';
  }
  return '┃ ' + index + ' ';
}

function getBoard(index) {
  if (index === 0) {
    return '┃\n' + getHorizontal();
  }
  return board(index) + getBoard(index - 1);
}

function dice(player1, player2, chances) {
  for (let times = chances; times >= 0; times++) {
    if (times % 2 === 0) {
      console.log('next', player1, "'s turn");
      player_1_position = roll(times);
    } else {
      console.log('next', player2, "'s turn");
      player_2_position = roll(times);
    }

    console.log(displayPosition(player1, player2));
    console.log(getBoard(100));
    if (player_1_position === 100 || player_2_position === 100) {
      return winMessage(player1, player2);
    }
  }
}

function resetValue() {
  player_1_position = 0;
  player_2_position = 0;
}

function restartGame(player1, player2) {
  console.log(dice(player1, player2, 0));
}

function gameStart() {
  const player1 = prompt('Player 1 Name:');
  const player2 = prompt('Player 2 Name:');

  console.log(dice(player1, player2, 0));
  const restart = confirm('Do You Want To Restart?');

  if (restart) {
    resetValue();
    return restartGame(player1, player2);
  }

  const newGame = confirm('Do You Want To Start A New Game?');

  if (newGame) {
    resetValue();
    return gameStart();
  }

  console.log('GooD ByE  👋🏻')
}

gameStart();
