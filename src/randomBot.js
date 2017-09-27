//Your AI logic here.
function decideMove(gameState) {
  return Math.floor(Math.random() * gameState.boardHeights.length);
}

export default decideMove;
