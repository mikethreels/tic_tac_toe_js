/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
import gameLogic from './game';
import gameBoard from './gameBoard';

const domManipulation = (() => {
  function checkMove(check, space, boardSpaceText, currentPlayer) {
    console.log(currentPlayer.getSymbol());
    if (check) {
      gameLogic.incrementmoves(space);
      gameLogic.winCheck();
      boardSpaceText.innerHTML = currentPlayer.getSymbol();
      console.log(currentPlayer.getSymbol());

      console.log(currentPlayer.getSymbol());
    } else {
      alert('this position has already been taken chose another');
    }
    return boardSpaceText;
  }

  const displayPlayer = (currentPlayer) => {
    const gameInfo = document.getElementById('game_info');
    while (gameInfo.firstChild) {
      gameInfo.removeChild(gameInfo.firstChild);
    }
    const turn = document.createElement('div');
    turn.innerHTML = `<h2>${currentPlayer.getName()} it's your turn!</h2>`;
    gameInfo.append(turn);
  };

  function render(currentPlayer) {
    console.log(currentPlayer.getName());
    const game = document.getElementById('game');
    while (game.firstChild) {
      game.removeChild(game.firstChild);
    }
    const gameInfo = document.getElementById('game_info');
    while (gameInfo.firstChild) {
      gameInfo.removeChild(gameInfo.firstChild);
    }
    const turn = document.createElement('div');
    turn.innerHTML = `<h2>${currentPlayer.getName()} it's your turn!</h2>`;
    gameInfo.append(turn);
    const boardArr = gameBoard.board;
    boardArr.forEach(space => {
      const boardSpace = document.createElement('a');
      const boardSpaceText = document.createElement('p');
      boardSpaceText.innerHTML = space;
      // eslint-disable-next-line func-names
      boardSpace.onclick = () => {
        const check = gameLogic.playerMove(space);
        checkMove(check, space, boardSpaceText, currentPlayer);
        currentPlayer = gameLogic.switchPlayer();
        displayPlayer(currentPlayer);
      };
      boardSpace.append(boardSpaceText);
      game.append(boardSpace);
    });
  }

  const winner = (player, draw = false) => {
    const message = document.getElementById('message');
    while (message.firstChild) {
      message.removeChild(message.firstChild);
    }
    const messageContainer = document.createElement('div');
    const messageHeader = document.createElement('h3');
    const messageText = document.createElement('p');
    const winMessage = gameLogic.winnerMessage(draw, player);
    messageHeader.innerHTML = winMessage;
    messageText.innerHTML = 'would you like to play again?';
    messageContainer.append(messageHeader);
    messageContainer.append(messageText);
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = '<button id="reset_button">Play again!</button>';
    message.append(messageContainer);
    message.append(buttonDiv);
    message.attributes.class.value = 'message_section';
    const game = document.getElementById('game');
    const gameInfo = document.getElementById('game_info');
    game.attributes.class.value = 'none';
    gameInfo.attributes.class.value = 'none';
    document.querySelector('button').addEventListener('click', gameLogic.reset);
  };

  return {
    render,
    winner,
  };
})();

export default domManipulation;