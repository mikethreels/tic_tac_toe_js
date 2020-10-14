const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const comb = [];
  return { getName, getSymbol, comb };
};

export default Player;