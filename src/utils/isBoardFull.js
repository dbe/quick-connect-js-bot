import { columnAvailable } from './columnAvailable';

export function isBoardFull(gameState) {
  return gameState.boardHeights.every(
    (columnHeight, columnIndex) => !columnAvailable(gameState, columnIndex)
  );
}
