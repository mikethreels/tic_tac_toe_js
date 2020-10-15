/* eslint-disable no-unused-vars */
import { gameBoard, gameLogic } from '../docs/game';
import Player from '../docs/player';

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});


describe('Game Flow module pattern ', () => {
  let player1;
  let player2;
  let currentPlayer;
  beforeAll(() => {
    player1 = Player('user1', 'X');
    player2 = Player('user2', 'O');
    currentPlayer = player1;
    player1.comb.push(0, 1, 2);
    player2.comb.push(3, 5);
  });

  test('Player has a name', () => {
    expect(player1.getName()).toBe('user1');
    expect(player1.getSymbol()).toBe('X');
  });

  test('test output if player has won or not', () => {
    expect(gameLogic.winnerMessage(false, player1)).toBe('Congratulation user1 you win!');
    expect(gameLogic.winnerMessage(true, player1)).toBe("It's a draw!");
  });

  test('test if move was already taken', () => {
    expect(gameLogic.playerMove(5, player1, player2)).toBe(true);
    expect(gameLogic.playerMove(6, player1, player2)).toBe(false);
  });

  // test('validates and set player move', () => {
  //   global.currentPlayer = player1;
  //   console.log(global.currentPlayer);
  //   const callWinCheck = gameLogic.winCheck;
  //   const myMockWinCheck = jest.fn(callWinCheck);
  //   // const mockElement = document.createElement('p');
  //   const value = gameLogic.checkMove(myMockWinCheck);
  //   // mockElement.innerHTML = currentPlayer.getSymbol();
  //   // spy.mockReturnValue(mockElement);
  //   // mockElement();
  //   expect(myMockWinCheck).toHaveBeenCalled();
  // });
  it.only('calls winCheck', () => {
    jest.spyOn(gameLogic, 'winCheck');
    gameLogic.checkMove(true, 0, 0, currentPlayer);
    expect(gameLogic.winCheck()).toBeCalled();
  });
});

describe('checkMove', () => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

  test('returns false if there is no winning pattern', () => {
    const boardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(gameLogic);
  });
});