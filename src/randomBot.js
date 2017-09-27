//Your AI logic here.
function decideMove(gameState) {
  return gameState.moves.concat(Math.floor(Math.random() * gameState.boardHeights.length));
}

export default decideMove;
