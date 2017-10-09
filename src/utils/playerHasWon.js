import { checkWin } from './checkWin';
import { isBoardFull } from './isBoardFull';

export function playerHasWon(gameState, player) {
  if (isBoardFull(gameState)) {
    return false; // Draw
  }

  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];

  for (let col = 0; col < gameState.boardHeights.length; col++) {
    for (let row = 0; row < gameState.boardHeights[col]; row++) {
      const winningSequence = directions.some(direction =>
        checkWin(gameState, player, col, row, direction)
      );

      if (winningSequence) {
        return true;
      }
    }
  }

  return false;
}
