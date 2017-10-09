import test from 'ava';
import { containsToken } from './containsToken';

test('determines if a particular space contains a token', t => {
  const gameState = { moves: [1, 1, 0] };

  t.true(containsToken(gameState, 0, 0));
  t.true(containsToken(gameState, 1, 0));
  t.true(containsToken(gameState, 1, 1));
  t.false(containsToken(gameState, 0, 1));
  t.false(containsToken(gameState, 1, 2));
  t.false(containsToken(gameState, 2, 0));
});
