import Player from '../docs/player';

describe('test if player information is given', () => {
  let player1;
  let player2;
  beforeAll(() => {
    player1 = Player('user1', 'X');
    player2 = Player('user2', 'O');
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
});