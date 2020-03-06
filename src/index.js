import validate from './validate';

const DisplayBoard = (() => {
  const displayBoard = () => {
    document.querySelector('.table').innerHTML = ` <tr>
        <td class="cell cell-1" data-cell='1'></td>
        <td class="cell cell-2" data-cell='2'></td>
        <td class="cell cell-3" data-cell='3'></td>
      </tr>
      <tr>
        <td class="cell cell-4" data-cell='4'></td>
        <td class="cell cell-5" data-cell='5'></td>
        <td class="cell cell-6" data-cell='6'></td>
      </tr>
      <tr>
        <td class="cell cell-7" data-cell='7'></td>
        <td class="cell cell-8" data-cell='8'></td>
        <td class="cell cell-9" data-cell='9'></td>
      </tr>
    `;
  };

  return {
    displayBoard,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  DisplayBoard.displayBoard();
});

document.getElementById('startgame').addEventListener('click', () => {
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
  if (validate(player1, player2)) {
    document.querySelector('.validation').innerHTML = 'Name field is required';
  } else {
    document.querySelector('.table').style.display = 'table';
  }
});

module.exports = DisplayBoard;