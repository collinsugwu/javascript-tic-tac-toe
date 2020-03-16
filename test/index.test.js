const validate = require('../src/validate');

test('validate presence of player name', () => {
  expect(validate('', '')).toBe(false);
});

test('validate absence of player name', () => {
  expect(validate('aa', 'bb')).toBe(true);
});