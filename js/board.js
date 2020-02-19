const Game = () => {
  let playTurn = 1;
  const symbolX = 'X';
  const symbolO = 'O';
  const arrayPosition = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

  const assignSignToButton = (position, sign) => {
    document.querySelector(`.cell-${position}`).innerHTML = sign;
  };

  const position = (position) => {
    arrayPosition[position - 1] = playTurn % 2 === 0 ? symbolX : symbolO;
    playTurn += 1;

    assignSignToButton(position, arrayPosition[position - 1]);
  };

  const isFull = () => {
    for (let index = 0; index < arrayPosition.length; index += 1) {
      if (arrayPosition[index] === ' ') return false;
    }
    return true;
  };

  const checkTurn = () => {
    if (playTurn % 2 === 0) return 1;

    return 2;
  };

  const validateResult = (symbol) => {
    // horizontal
    if (arrayPosition[0] + arrayPosition[1] + arrayPosition[2] === symbol.repeat(3)
      || arrayPosition[3] + arrayPosition[4] + arrayPosition[5] === symbol.repeat(3)
      || arrayPosition[6] + arrayPosition[7] + arrayPosition[8] === symbol.repeat(3)) return true;

    // vertical
    if (arrayPosition[0] + arrayPosition[3] + arrayPosition[6] === symbol.repeat(3)
      || arrayPosition[1] + arrayPosition[4] + arrayPosition[7] === symbol.repeat(3)
      || arrayPosition[2] + arrayPosition[5] + arrayPosition[8] === symbol.repeat(3)) return true;

    // diagonal
    if (arrayPosition[0] + arrayPosition[4] + arrayPosition[8] === symbol.repeat(3)
      || arrayPosition[2] + arrayPosition[4] + arrayPosition[6] === symbol.repeat(3)) return true;

    return false;
  };

  const winner = () => {
    if (validateResult(symbolO)) return 1;
    if (validateResult(symbolX)) return 2;

    if (isFull()) return 3;
    return 0;
  };

  const validatePosition = position => {
    if (arrayPosition[position - 1] !== ' ') return 'Position Taken';

    return 0;
  };

  return {
    position, isFull, checkTurn, validateResult, winner, validatePosition, arrayPosition,
  };
};

const Board = () => {
  const { position, validatePosition, winner } = Game();

  const refresh = () => {
    window.location.reload();
  };

  const displayWinner = () => {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    document.querySelector('.table').style.visibility = 'hidden';
    document.getElementById('startgame').style.visibility = 'hidden';
    const gameWinner = winner();
    if (gameWinner === 2) document.querySelector('.winner').innerHTML = `${player2} wins`;
    if (gameWinner === 1) document.querySelector('.winner').innerHTML = `${player1} wins`;
    if (gameWinner === 3) document.querySelector('.winner').innerHTML = 'Its a Draw';

    document.getElementById('button').innerHTML = `<button class='refresh'>Restart Game</button>`;
    document.querySelector('.refresh').addEventListener('click', refresh);
  };

  const playTurn = positionValue => {
    const result = validatePosition(positionValue);
    if (result === 0) {
      position(positionValue);
      if (winner() !== 0) {
        displayWinner();
      }
    } else {
      document.querySelector('.error').innerHTML = result;
    }
  };

  const play = (value) => {
    playTurn(value);
  };

  return { play };
};

const AddEventToCell = (() => {
  const { play } = Board();
  const addEventToCell = () => {
    for (let index = 1; index <= 9; index += 1) {
      document.querySelector(`.cell-${index}`).addEventListener('click', function eVal() {
        const val = this.dataset.cell;
        play(val);
      });
    }
  };
  return { addEventToCell };
})();

document.addEventListener('DOMContentLoaded', () => {
  AddEventToCell.addEventToCell();
});
