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
  const comb = [];
  return { getName, getSymbol, comb };
};

// eslint-disable-next-line no-unused-vars
const gameLogic = (() => {
  let player1;
  let player2;
  let currentPlayer;
  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

  const reset = () => {
    
  };

  const winner = (player) => {
    const message = document.getElementById('message');
    const messageText = document.createElement('p');
    messageText.innerHTML = `Congratulation ${player.getName()} you win
    would you like to play again?`;
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `<button onclick="reset()" id="reset_button">Play again!</button>`;
    message.append(messageText);
    message.append(buttonDiv);
    message.attributes.class.value = 'block';
    // eslint-disable-next-line no-undef
    game.attributes.class.value = 'none';
  };

  const winCheck = () => {
    if (winningMoves.some((win) => win.every((r) => currentPlayer.comb.includes(r)))) {
      winner(currentPlayer);
    }
  };

  function render() {
    const game = document.getElementById('game');
    while (game.firstChild) {
      game.removeChild(game.firstChild);
    }

    const boardArr = gameBoard.board;
    boardArr.forEach(space => {
      const boardSpace = document.createElement('a');
      const boardSpaceText = document.createElement('p');
      boardSpaceText.innerHTML = space;
      // eslint-disable-next-line func-names
      boardSpace.onclick = function () {
        gameBoard.board[space - 1] = currentPlayer.getSymbol();
        boardSpaceText.innerHTML = currentPlayer.getSymbol();
        currentPlayer.comb.push(space - 1);
        winCheck();
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      };
      boardSpace.append(boardSpaceText);
      game.append(boardSpace);
    });
  }


  // eslint-disable-next-line no-unused-vars
  const switchForm = () => {
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
    const tempplayer1 = document.getElementById('newPlayer1').value;
    const tempplayer2 = document.getElementById('newPlayer2').value;
    player1 = Player(tempplayer1, 'X');
    player2 = Player(tempplayer2, 'O');
    currentPlayer = player1;
    switchForm();
    render();
  }

  document.getElementById('newPlayerForm').addEventListener('submit', gameInit);
})();
