import test from 'ava';
import { getAllAvailableMoves } from './getAllAvailableMoves';

test('determines available moves from game state', t => {
  const gameState = { boardHeights: [3, 3], moves: [0, 0, 0] };

  const availableMoves = getAllAvailableMoves(gameState);

  t.deepEqual(availableMoves, [1]);
});

test('determines available moves from game state', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4],
    moves: [3, 3, 3, 3, 1, 2, 2],
  };

  const availableMoves = getAllAvailableMoves(gameState);

  t.deepEqual(availableMoves, [0, 1, 2]);
});
