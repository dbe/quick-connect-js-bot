import test from 'ava';
import { columnAvailable } from './columnAvailable';

test('determines if the provided column has empty spaces', t => {
  const gameState = { boardHeights: [1, 1], moves: [1] };

  t.true(columnAvailable(gameState, 0));
  t.false(columnAvailable(gameState, 1));
});
