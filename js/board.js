const game = () => {
  let playTurn = 1;
  let symbol_x = 'X';
  let symbol_o = 'O';
  let arrayPosition = ['', '', '', '', '', '', '', '', '']

  const position = (position) => {
    arrayPosition[position - 1] = playTurn % 2 == 0 ? symbol_x : symbol_o;

    playTurn += 1;
  };

  const isEmpty = () => {
    arrayPosition.forEach(element => {
      if (element != '') return false;
    });

    return true;
  };

  const isFull = () => {
    array.forEach(element => {
      if (element == '') return false;
    });

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
      if (allEqual(i, symbol_x)) return 1;
      if (allEqual(i, symbol_o)) return 2;
    }
    if (isFull()) return 3;

    return 0;
  };

  return {
    position, isEmpty, isFull, checkTurn, allEqual, winner
  }
};