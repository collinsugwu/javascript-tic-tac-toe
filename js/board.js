const Game = () => {
  let playTurn = 1;
  let symbol_x = 'X';
  let symbol_o = 'O';
  let arrayPosition = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

  const position = (position) => {
    arrayPosition[position - 1] = playTurn % 2 == 0 ? symbol_x : symbol_o;

    playTurn += 1;
  };

  const isEmpty = () => {
    for (let index = 0; index < arrayPosition.length; index++) {
      if (arrayPosition[index] != ' ') return false;
    }

    return true;
  };

  const isFull = () => {
    for (let index = 0; index < arrayPosition.length; index++) {
      if (arrayPosition[index] == ' ') return false;
    }
    return true;
  };

  const checkTurn = () => {
    if (playTurn % 2 == 0) return 1;

    return 2;
  };

  const allEqual = (index, symbol) => {
    if ((arrayPosition[0 + (index * 3)] + arrayPosition[1 + (index * 3)] + arrayPosition[2 + (index * 3)] == symbol * 3) ||
      (arrayPosition[0 + index] + arrayPosition[3 + index] + arrayPosition[6 + index] == symbol * 3) ||
      (arrayPosition[0 + (index * 2)] + arrayPosition[4] + arrayPosition[8 - (index * 2)] == symbol * 3 && index < 2)) return true;

    return false;
  };

  const winner = () => {
    for (let index = 1; index <= 3; index++) {
      if (allEqual(index, symbol_x)) return 1;
      if (allEqual(index, symbol_o)) return 2;
    }
    if (isFull()) return 3;

    return 0;
  };

  const validatePosition = position => {

    if (arrayPosition[position - 1] != '') return 'Position Taken';

    return 0;
  }

  return {
    position, isEmpty, isFull, checkTurn, allEqual, winner, validatePosition, arrayPosition
  }
};

const Board = () => {
  let { position, validatePosition, winner } = Game();

  const playTurn = position => {
    let result = validatePosition(position);
    if (result == 0) {
      position(position)
    } else {
      document.querySelector('.error').innerHTML = result;
    }
  }

  const displayWinner = () => {
    if (winner() == 1) {
      // player 1 wins
    } else if (winner() == 2) {
      // player 2 wins 
    } else {
      // its a draw
    }
  };

  const play = (value) => {
    while (winner() == 0) {
      playTurn(value)
    }
  };

  return {play, displayWinner, playTurn };
};

const DisplayBoard = (() => {

  let { play } = Board();
  const { arrayPosition } = Game();
  const displayBoard = () => {
    const buttonCount = 9;
    document.querySelector('.buttons').innerHTML =
      `<button class="btn-default button-1" value="1">${arrayPosition[0]}</button>
    <button class="btn-default button-2" value="2">${arrayPosition[1]}</button>
    <button class="btn-default button-3" value="3">${arrayPosition[2]}</button>
    <button class="btn-default button-4" value="4">${arrayPosition[3]}</button>
    <button class="btn-default button-5" value="5">${arrayPosition[4]}</button>
    <button class="btn-default button-6" value="6">${arrayPosition[5]}</button>
    <button class="btn-default button-7" value="7">${arrayPosition[6]}</button>
    <button class="btn-default button-8" value="8">${arrayPosition[7]}</button>
    <button class="btn-default button-9" value="9">${arrayPosition[8]}</button>
    `
    for (let index = 1; index <= buttonCount; index++) {
      document.querySelector(`.button-${index}`).addEventListener('click', function () {
        let val = this.value
        play(val)
      });
    }
  }

  return { displayBoard }
})();

document.addEventListener('DOMContentLoaded', () => {
  DisplayBoard.displayBoard()
});