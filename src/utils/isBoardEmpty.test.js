import test from 'ava';
import { isBoardEmpty } from './isBoardEmpty';

test('checks if the board is empty', t => {
  const gameState = { moves: [] };

  t.true(isBoardEmpty(gameState));
});

test('checks if the board is not empty', t => {
  const gameState = { moves: [1] };

  t.false(isBoardEmpty(gameState));
});
