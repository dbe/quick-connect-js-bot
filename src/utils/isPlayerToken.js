export function isPlayerToken(gameState, player, col, row) {
  const state = [];
  let playerToken = gameState.isPlayer0First ? 0 : 1;

  for (let i = 0; i < gameState.boardHeights.length; i++) {
    state.push([]);
  }

  gameState.moves.forEach(move => {
    state[move].push(playerToken);
    playerToken = (playerToken + 1) % 2;
  });

  return state[col][row] === player;
}
