const board = require('../src/board');

const validateResult = (symbol, arrayPosition) => {
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

test('check position of symbol to be empty string', () => {
  expect(board.Game().position(2)).toBe(undefined);
});

test('validate position taken', () => {
  const arrayPosition = [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  expect(board.Game().validatePosition(arrayPosition[1])).toEqual('Position Taken');
});

test('check if board is not full', () => {
  const boardArr = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  boardArr.forEach((el) => {
    expect(board.Game().isFull(el)).toBeFalsy();
  });
});

test('player X as the winner', () => {
  const boardArr = ['X', 'X', 'X', 'O', ' ', ' ', ' ', ' ', ' '];
  const symbol = 'X';
  const result = validateResult(symbol, boardArr);
  expect(result).toEqual(true);
});

test('player O as the winner', () => {
  const boardArr = ['O', 'O', 'O', 'X', ' ', ' ', ' ', ' ', ' '];
  const symbol = 'O';
  const result = validateResult(symbol, boardArr);
  expect(result).toEqual(true);
});

test("it's a draw", () => {
  const boardArr = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
  const symbol = 'O';
  const result = validateResult(symbol, boardArr);
  expect(result).toEqual(false);
});