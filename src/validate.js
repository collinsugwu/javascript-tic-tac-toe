function validate(player1, player2) {
  if (player1 === '' || player2 === '') {
    return false;
  }
  return true;
}

export default validate;

module.exports = validate;