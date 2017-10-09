import { containsToken } from './containsToken';
import { containsTokenForPlayer } from './containsTokenForPlayer';

export function checkWin(gameState, player, col, row, direction) {
  let win = true;

  if (!containsToken(gameState, col, row)) {
    return false;
  }

  for (let count = 0; count < gameState.winCondition[0]; count++) {
    const checkCol = col + count * direction.x;
    const checkRow = row + count * direction.y;

    if (!containsTokenForPlayer(gameState, player, checkCol, checkRow)) {
      win = false;
      break;
    }
  }

  return win;
}
