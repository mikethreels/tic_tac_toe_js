/* eslint-disable no-unused-vars */
import gameLogic from '../docs/game';
import Player from '../docs/player';
import domManipulation from '../docs/dom';

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

  describe('Test player information ', () => {
    test('Player1 has a name', () => {
      expect(player1.getName()).toBe('user1');
    });

    test('Player1 has a symbol', () => {
      expect(player1.getSymbol()).toBe('X');
    });

    test('Player2 has a name', () => {
      expect(player2.getName()).toBe('user2');
    });

    test('Player2 has a symbol', () => {
      expect(player2.getSymbol()).toBe('O');
    });
  });

  describe('Test game outcome display ', () => {
    test('test output if player1 has won', () => {
      expect(gameLogic.winnerMessage(false, player1)).toBe('Congratulation user1 you win!');
    });

    test('test output if player2 has won', () => {
      expect(gameLogic.winnerMessage(false, player2)).toBe('Congratulation user2 you win!');
    });

    test('test output if it is a draw', () => {
      expect(gameLogic.winnerMessage(true, player1)).toBe("It's a draw!");
    });
  });

  test('test if move was already taken', () => {
    expect(gameLogic.playerMove(5, player1, player2)).toBe(true);
    expect(gameLogic.playerMove(6, player1, player2)).toBe(false);
  });
});

describe('Validate user move and if user has won ', () => {
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

  describe('Test if user has won or not', () => {
    test('test output if player1 has won', () => {
      expect(gameLogic.winnerMessage(false, player1)).toBe('Congratulation user1 you win!');
    });

    test('test output if player2 has won', () => {
      expect(gameLogic.winnerMessage(false, player2)).toBe('Congratulation user2 you win!');
    });

    test('If it is a draw', () => {
      expect(gameLogic.winnerMessage(true, player1)).toBe("It's a draw!");
    });
  });

  describe('test if move was already taken', () => {
    test('returns false if move was already made', () => {
      expect(gameLogic.playerMove(6, player1, player2)).toBe(false);
    });

    test('returns true if move was not already made', () => {
      expect(gameLogic.playerMove(5, player1, player2)).toBe(true);
    });
  });
});

describe('test winCheck function', () => {
  let player1;
  let player2;
  let currentPlayer;
  const spy = jest.spyOn(domManipulation, 'winner').mockImplementation(() => true);
  beforeAll(() => {
    player1 = Player('user1', 'X');
    player2 = Player('user2', 'O');
    currentPlayer = player1;
    player1.comb.push(0, 1, 2);
    player2.comb.push(3, 5);
  });
  afterEach(() => {
    spy.mockClear();
  });
  test('calls winner if there is a winning pattern', () => {
    gameLogic.winCheck(currentPlayer);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test("doesn't run winner if there is no winning pattern", () => {
    gameLogic.winCheck(player2);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});

describe('test drawCheck function', () => {
  let player1;
  let player2;
  let currentPlayer;
  const spy = jest.spyOn(domManipulation, 'winner').mockImplementation(() => true);
  beforeAll(() => {
    player1 = Player('user1', 'X');
    player2 = Player('user2', 'O');
    currentPlayer = player1;
    player1.comb.push(0, 1, 2);
    player2.comb.push(3, 5);
  });
  afterEach(() => {
    spy.mockClear();
  });
  test('calls winner if there is a Draw', () => {
    gameLogic.drawCheck(player2, 9);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test("doesn't run winner if there is no Draw", () => {
    gameLogic.drawCheck(player2);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
