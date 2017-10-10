import test from 'ava';
import { isPlayerToken } from './isPlayerToken';

test("determines if a particular space contains a player's token", t => {
  const gameState = {
    isPlayer0First: true,
    boardHeights: [3, 3, 3],
    moves: [1, 1, 0],
  };

  t.true(isPlayerToken(gameState, 0, 0, 0));
  t.true(isPlayerToken(gameState, 0, 1, 0));
  t.true(isPlayerToken(gameState, 1, 1, 1));

  t.false(isPlayerToken(gameState, 0, 1, 1));
  t.false(isPlayerToken(gameState, 0, 2, 0));
  t.false(isPlayerToken(gameState, 1, 0, 1));
});
