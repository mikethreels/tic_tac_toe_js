// eslint-disable-next-line no-unused-vars
const gameBoard = (() => {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return {
    board,
  };
})();

const Player = (name, symbol) => {
  const getName  = () => name;
  const getSymbol = () => symbol;
};

function render() {
  const game = document.getElementById('game');

  const boardArr = gameBoard.board;
  boardArr.forEach(space => {
    const boardSpace = document.createElement('div');
    boardSpace.innerHTML = space;
    game.append(boardSpace);
  });
}

render();