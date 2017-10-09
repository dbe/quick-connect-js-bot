export function containsToken(gameState, column, row) {
  const numMovesForColumn = gameState.moves.filter(move => move === column)
    .length;

  return numMovesForColumn >= row + 1;
}
