const validate = require('../src/validate');

test('validate presence of player name', () => {
  expect(validate('value1', 'value2')).toBeTruthy();
});

test('validate absence of player name', () => {
  expect(validate('', '')).toBeFalsy();
});