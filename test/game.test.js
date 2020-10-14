import { Player, gameBoard } from '../docs/game'

test("Player has a name", () => {
  const player = Player('user1', 'X');
  console.log(player.getName(), player.getSymbol());
  expect(player.getName()).toBe("user1");
  expect(player.getSymbol()).toBe("X");
})