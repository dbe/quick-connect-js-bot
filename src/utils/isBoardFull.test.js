import test from 'ava';
import { isBoardFull } from './isBoardFull';

test('checks if the board is full', t => {
  const gameState = { moves: [0, 0, 0], boardHeights: [3] };

  t.true(isBoardFull(gameState));
});

test('checks if the board is not full', t => {
  const gameState = { moves: [0], boardHeights: [3] };

  t.false(isBoardFull(gameState));
});
