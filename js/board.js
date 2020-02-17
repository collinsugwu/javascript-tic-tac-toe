const Game = () => {
  let playTurn = 1;
  let symbol_x = 'X';
  let symbol_o = 'O';
  let arrayPosition = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

  const position = (position) => {
    arrayPosition[position - 1] = playTurn % 2 == 0 ? symbol_x : symbol_o;
    playTurn += 1;

    assignSignToButton(position, arrayPosition[position - 1])
  };

  const assignSignToButton = (position, sign) => {
    document.querySelector(`.cell-${position}`).innerHTML = sign
  }

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

  const validateResult = (symbol) => {
    //horizontal
    if (arrayPosition[0] + arrayPosition[1] + arrayPosition[2] == symbol.repeat(3) ||
      arrayPosition[3] + arrayPosition[4] + arrayPosition[5] == symbol.repeat(3) ||
      arrayPosition[6] + arrayPosition[7] + arrayPosition[8] == symbol.repeat(3)) return true

    // vertical
    if (arrayPosition[0] + arrayPosition[3] + arrayPosition[6] == symbol.repeat(3) ||
      arrayPosition[1] + arrayPosition[4] + arrayPosition[7] == symbol.repeat(3) ||
      arrayPosition[2] + arrayPosition[5] + arrayPosition[8] == symbol.repeat(3)) return true

    // diagonal
    if (arrayPosition[0] + arrayPosition[4] + arrayPosition[8] == symbol.repeat(3) ||
      arrayPosition[2] + arrayPosition[6] + arrayPosition[6] == symbol.repeat(3)) return true

    return false;
  };

  const winner = () => {
    if (validateResult(symbol_o)) return 1;
    if (validateResult(symbol_x)) return 2;

    if (isFull()) return 3;
    return 0;
  };

  const validatePosition = position => {
    if (arrayPosition[position - 1] != ' ') return 'Position Taken';

    return 0;
  }

  return {
    position, isEmpty, isFull, checkTurn, validateResult, winner, validatePosition, arrayPosition
  }
};

const Board = () => {
  let { position, validatePosition, winner } = Game();

  const playTurn = positionValue => {
    let result = validatePosition(positionValue);
    if (result == 0) {
      position(positionValue)
      if (winner() != 0) {
        displayWinner()
      }

    } else {
      document.querySelector('.error').innerHTML = result;
    }
  }

  const displayWinner = () => {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;

    let gameWinner = winner();
    if (gameWinner == 1) document.querySelector('.winner').innerHTML = `${player1} wins`;
    if (gameWinner == 2) document.querySelector('.winner').innerHTML = `${player1} wins`;
    if (gameWinner == 3) document.querySelector('.winner').innerHTML = 'Its a Draw';

  };


  const play = (value) => {
    playTurn(value)
  };

  return { play };
};

const AddEventToCell = (() => {
  let { play } = Board()
  const addEventToCell = () => {
    for (let index = 1; index <= 9; index++) {
      document.querySelector(`.cell-${index}`).addEventListener('click', function () {
        let val = this.dataset.cell
        play(val)
      });
    }
  }
  return { addEventToCell }
})();

document.addEventListener('DOMContentLoaded', () => {
  AddEventToCell.addEventToCell()
});