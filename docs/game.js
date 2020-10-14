/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

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
  


const gameLogic = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let turns = 0;
  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

  const winnerMessage = (draw, player) => {
    let winMessage;
    if (draw === true) {
      winMessage = "It's a draw!";
    } else {
      winMessage = `Congratulation ${player.getName()} you win!`;
    }
    return winMessage;
  };

  const winner = (player, draw = false) => {
    const message = document.getElementById('message');
    while (message.firstChild) {
      message.removeChild(message.firstChild);
    }
    const messageContainer = document.createElement('div');
    const messageHeader = document.createElement('h3');
    const messageText = document.createElement('p');
    const winMessage = winnerMessage(draw, player);
    messageHeader.innerHTML = winMessage;
    messageText.innerHTML = 'would you like to play again?';
    messageContainer.append(messageHeader);
    messageContainer.append(messageText);
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = '<button id="reset_button">Play again!</button>';
    message.append(messageContainer);
    message.append(buttonDiv);
    message.attributes.class.value = 'message_section';
    game.attributes.class.value = 'none';
    game_info.attributes.class.value = 'none';
    document.querySelector('button').addEventListener('click', reset);
  };

  const winCheck = () => {
    if (winningMoves.some((win) => win.every((r) => currentPlayer.comb.includes(r)))) {
      winner(currentPlayer);
    }
  };

  const playerMove = (space, boardSpace) => {
    if (player1.comb.includes(space - 1) || player2.comb.includes(space - 1)) {
      // eslint-disable-next-line no-alert
      alert('this position has already been taken chose another');
      playerMove(boardSpace, space);
      return false;
    }
    return true;
  };

  const displayTurn = () => {
    const gameInfo = document.getElementById('game_info');
    while (gameInfo.firstChild) {
      gameInfo.removeChild(gameInfo.firstChild);
    }
    const turn = document.createElement('div');
    turn.innerHTML = `<h2>${currentPlayer.getName()} it's your turn!</h2>`;
    gameInfo.append(turn);
  };

  const checkTurns = () => {
    // eslint-disable-next-line max-len
    if (turns === 9 && !winningMoves.some((win) => win.every((r) => currentPlayer.comb.includes(r)))) {
      winner('N/A', true);
    }
  };

  function render() {
    const game = document.getElementById('game');
    while (game.firstChild) {
      game.removeChild(game.firstChild);
    }
    displayTurn();
    const boardArr = gameBoard.board;
    boardArr.forEach(space => {
      const boardSpace = document.createElement('a');
      const boardSpaceText = document.createElement('p');
      boardSpaceText.innerHTML = space;
      // eslint-disable-next-line func-names
      boardSpace.onclick = () => {
        turns += 1;
        const check = playerMove(space, boardSpace);
        if (check) {
          gameBoard.board[space - 1] = currentPlayer.getSymbol();
          boardSpaceText.innerHTML = currentPlayer.getSymbol();
          currentPlayer.comb.push(space - 1);
          winCheck();
          checkTurns();
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          displayTurn();
        }
      };
      boardSpace.append(boardSpaceText);
      game.append(boardSpace);
    });
  }

  const switchForm = () => {
    const newPlayerForm = document.getElementById('player');
    if (newPlayerForm.attributes.class.value === 'player_select') {
      newPlayerForm.attributes.class.value = 'none';
      game.attributes.class.value = 'game_section';
      game_info.attributes.class.value = 'game_info';
    } else {
      newPlayerForm.attributes.class.value = 'player_select';
    }
  };

  function reset() {
    gameBoard.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    player1.comb = [];
    player2.comb = [];
    turns = 0;
    game.attributes.class.value = 'game_section';
    game_info.attributes.class.value = 'game_info';
    message.attributes.class.value = 'none';
    currentPlayer = player1;
    render();
  }

  function gameInit(e) {
    e.preventDefault();
    const tempplayer1 = document.getElementById('newPlayer1').value;
    const tempplayer2 = document.getElementById('newPlayer2').value;
    player1 = Player(tempplayer1, 'X');
    player2 = Player(tempplayer2, 'O');
    currentPlayer = player1;
    switchForm();
    render();
  }
  
 
  return { winnerMessage, winner, winCheck, playerMove, displayTurn, checkTurns,
           render, switchForm, reset, gameInit }
})();



export { gameBoard, Player, gameLogic }