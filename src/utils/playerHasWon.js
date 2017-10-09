import { checkWin } from './checkWin';
import { isBoardFull } from './isBoardFull';

export function playerHasWon(gameState, player) {
  if (isBoardFull(gameState)) {
    return false; // Draw
  }

  const winCount = gameState.winCondition[0];

  // Find a vertical sequence for player
  for (let col = 0; col < gameState.boardHeights.length; col++) {
    for (let row = 0; row < gameState.boardHeights[col]; row++) {
      if (checkWin(gameState, player, col, row, { x: 0, y: 1 })) {
        return true;
      }
    }
  }

  // Find a horizontal sequence for player
  for (let col = 0; col < gameState.boardHeights.length; col++) {
    for (let row = 0; row < gameState.boardHeights[col]; row++) {
      if (checkWin(gameState, player, col, row, { x: 1, y: 0 })) {
        return true;
      }
    }
  }

  // Find a diagonal up sequence for player
  for (let col = 0; col < gameState.boardHeights.length; col++) {
    for (let row = 0; row < gameState.boardHeights[col]; row++) {
      if (checkWin(gameState, player, col, row, { x: 1, y: 1 })) {
        return true;
      }
    }
  }

  // Find a diagonal down sequence for player
  for (let col = 0; col < gameState.boardHeights.length; col++) {
    for (let row = winCount - 1; row < gameState.boardHeights[col]; row++) {
      if (checkWin(gameState, player, col, row, { x: 1, y: -1 })) {
        return true;
      }
    }
  }

  return false;
}
