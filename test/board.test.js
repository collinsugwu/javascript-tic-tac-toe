const board = require('../src/board');

test('check position of symbol', () => {
  expect(board.Game().position(2)).toBe('X');
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

// test('validate position taken', () => {
//   expect(board.Game().validatePosition('')).toBe('Position Taken');
// });