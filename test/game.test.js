/* eslint-disable no-unused-vars */
import { gameBoard, gameLogic } from '../docs/game';
import Player from '../docs/player';


describe('Game Flow module pattern ', () => {
  let player1;
  let player2;
  beforeAll(() => {
    player1 = Player('user1', 'X');
    player2 = Player('user2', 'O');
    player1.comb.push(1, 2);
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
    console.log(player2.comb);
    expect(gameLogic.playerMove(5, player1, player2)).toBe(true);
    expect(gameLogic.playerMove(6, player1, player2)).toBe(false);
  });
});