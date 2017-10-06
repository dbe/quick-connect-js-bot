function buildBoardState(moves, boardHeights, isPlayer0First) {
  let state = [];
  let player = isPlayer0First ? 0 : 1;

  for (let i = 0; i < boardHeights.length; i++) {
    state.push([]);
  }

  moves.forEach(move => {
    state[move].push(player);
    player = (player + 1) % 2;
  });

  return state;
}

function columnAvailable(gameState, columnIndex) {
  const numMovesForColumn = gameState.moves.filter(
    moveIndex => moveIndex === columnIndex
  ).length;
  const numSpacesInColumn = gameState.boardHeights[columnIndex];

  // Return true if the column has free spaces
  return numMovesForColumn < numSpacesInColumn;
}

function containsToken(boardState, col, row) {
  return !(
    col < 0 ||
    col >= boardState.length ||
    row < 0 ||
    row >= boardState[col].length
  );
}

function getAllAvailableMoves(gameState) {
  return gameState.boardHeights.reduce(
    (availableMoves, columnHeight, columnIndex) => {
      if (isBoardEmpty(gameState) || columnAvailable(gameState, columnIndex)) {
        availableMoves.push(columnIndex);
      }
      return availableMoves;
    },
    []
  );
}

function isBoardEmpty(gameState) {
  return gameState.moves.length === 0;
}

function isBoardFull(gameState) {
  return gameState.boardHeights.every(
    (columnHeight, columnIndex) => !columnAvailable(gameState, columnIndex)
  );
}

export default {
  buildBoardState,
  columnAvailable,
  containsToken,
  getAllAvailableMoves,
  isBoardEmpty,
  isBoardFull,
};
