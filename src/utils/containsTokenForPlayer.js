import { containsToken } from './containsToken';
import { isPlayerToken } from './isPlayerToken';

export function containsTokenForPlayer(gameState, player, col, row) {
  return (
    containsToken(gameState, col, row) &&
    isPlayerToken(gameState, player, col, row)
  );
}
