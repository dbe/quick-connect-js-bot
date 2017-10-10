import test from 'ava';
import { containsTokenForPlayer } from './containsTokenForPlayer';

test('determines if a particular space does not contain a token', t => {
  const gameState = {
    isPlayer0First: true,
    boardHeights: [3, 3, 3],
    moves: [1, 1, 0],
  };

  t.false(containsTokenForPlayer(gameState, 0, 2, 0));
});

test("determines if a particular space contains a player's token", t => {
  const gameState = {
    isPlayer0First: true,
    boardHeights: [3, 3, 3],
    moves: [1, 1, 0],
  };

  t.true(containsTokenForPlayer(gameState, 0, 0, 0));
  t.true(containsTokenForPlayer(gameState, 0, 1, 0));
  t.false(containsTokenForPlayer(gameState, 0, 1, 1));
});
