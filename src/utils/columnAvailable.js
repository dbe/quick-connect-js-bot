export function columnAvailable(gameState, column) {
  const numMovesForColumn = gameState.moves.filter(move => move === column)
    .length;
  const numSpacesInColumn = gameState.boardHeights[column];

  // Return true if the column has free spaces
  return numMovesForColumn < numSpacesInColumn;
}
