/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import Player from './player';
import domManipulation from './dom';
import gameBoard from './gameBoard';

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

  const winCheck = () => {
    if (winningMoves.some((win) => win.every((r) => currentPlayer.comb.includes(r)))) {
      domManipulation.winner(currentPlayer);
    } else if (turns === 9 && !winningMoves.some((win) => win.every((r) => currentPlayer.comb.includes(r)))) {
      domManipulation.winner('N/A', true);
    }
  };

  const playerMove = (space) => {
    if (player1.comb.includes(space - 1) || player2.comb.includes(space - 1)) {
      return false;
    }
    return true;
  };

  // const checkTurns = () => {
  //   // eslint-disable-next-line max-len
  //   if (turns === 9 && !winningMoves.some((win) => win.every((r) => currentPlayer.comb.includes(r)))) {
  //     winner('N/A', true);
  //   }
  // };

  const switchPlayer = () => {
    // console.log(currentPlayer.getName());
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return currentPlayer;
  };

  const incrementmoves = (space) => {
    turns += 1;
    gameBoard.board[space - 1] = currentPlayer.getSymbol();
    currentPlayer.comb.push(space - 1);
  };

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
    domManipulation.render(currentPlayer, player1, player2);
  }

  function gameInit(e) {
    e.preventDefault();
    const tempplayer1 = document.getElementById('newPlayer1').value;
    const tempplayer2 = document.getElementById('newPlayer2').value;
    player1 = Player(tempplayer1, 'X');
    player2 = Player(tempplayer2, 'O');
    currentPlayer = player1;
    switchForm();
    domManipulation.render(currentPlayer, player1, player2);
  }


  return {
    winnerMessage,
    winCheck,
    playerMove,
    switchForm,
    reset,
    gameInit,
    incrementmoves,
    switchPlayer,
  };
})();


export default gameLogic;