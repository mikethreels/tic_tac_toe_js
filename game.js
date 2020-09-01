// eslint-disable-next-line no-unused-vars
const gameBoard = (() => {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return {
    board,
  };
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

function render(players = []) {
  const game = document.getElementById('game');
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
  console.log(players[0].getName());

  const boardArr = gameBoard.board;
  boardArr.forEach(space => {
    const boardSpace = document.createElement('a');
    const boardSpaceText = document.createElement('p');
    boardSpaceText.innerHTML = space;
    boardSpace.onclick = function () {
      gameBoard.board[space - 1] = 'x';
      boardSpaceText.innerHTML = 'x';
    };
    boardSpace.append(boardSpaceText);
    game.append(boardSpace);
  });
}

// eslint-disable-next-line no-unused-vars
const switchForm = () => {
  console.log('switchFOrm');
  const newPlayerForm = document.getElementById('newPlayerForm');
  if (newPlayerForm.attributes.class.value === 'block') {
    newPlayerForm.attributes.class.value = 'none';
    // eslint-disable-next-line no-undef
    game.attributes.class.value = 'game_section';
  } else {
    newPlayerForm.attributes.class.value = 'block';
  }
};

function gameInit(e) {
  // prevent the submit button from sending the form
  e.preventDefault();
  console.log('gameinit');
  const tempplayer1 = document.getElementById('newPlayer1').value;
  const tempplayer2 = document.getElementById('newPlayer2').value;
  const players = [Player(tempplayer1, 'X')];
  players.push(Player(tempplayer2, 'O'));
  switchForm();
  render(players);
}

document.getElementById('newPlayerForm').addEventListener('submit', gameInit);
