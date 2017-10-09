import { checkWin } from './checkWin';
import { isBoardFull } from './isBoardFull';

export function playerHasWon(gameState, player) {
  if (isBoardFull(gameState)) {
    return false; // Draw
  }

  const winCount = gameState.winCondition[0];

  // Vertical rows
  const verticalCols = gameState.boardHeights.length;
  for (let col = 0; col < verticalCols; col++) {
    const verticalRows = gameState.boardHeights[col] - (winCount - 1);
    for (let row = 0; row < verticalRows; row++) {
      if (checkWin(gameState, player, col, row, { x: 0, y: 1 })) {
        return true;
      }
    }
  }

  // Horizontal rows
  const horizontalCols = gameState.boardHeights.length - (winCount - 1);
  for (let col = 0; col < horizontalCols; col++) {
    const horizontalRows = gameState.boardHeights[col];
    for (let row = 0; row < horizontalRows; row++) {
      if (checkWin(gameState, player, col, row, { x: 1, y: 0 })) {
        return true;
      }
    }
  }

  // Diagonal Up
  const diagonalUpCols = gameState.boardHeights.length - (winCount - 1);
  for (let col = 0; col < diagonalUpCols; col++) {
    const diagonalUpRows = gameState.boardHeights[col] - (winCount - 1);
    for (let row = 0; row < diagonalUpRows; row++) {
      if (checkWin(gameState, player, col, row, { x: 1, y: 1 })) {
        return true;
      }
    }
  }

  // Diagonal Down
  const diagonalDownCols = gameState.boardHeights.length - (winCount - 1);
  for (let col = 0; col < diagonalDownCols; col++) {
    const diagonalDownRows = gameState.boardHeights[col];
    for (let row = winCount - 1; row < diagonalDownRows; row++) {
      if (checkWin(gameState, player, col, row, { x: 1, y: -1 })) {
        return true;
      }
    }
  }

  return false;
}
