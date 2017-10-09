import { isBoardEmpty } from './isBoardEmpty';
import { columnAvailable } from './columnAvailable';

export function getAllAvailableMoves(gameState) {
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
