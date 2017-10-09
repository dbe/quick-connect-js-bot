import test from 'ava';
import { checkWin } from './checkWin';

test('determines if the provided player has won vertically', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [0, 1, 0, 1, 0, 1, 0],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(checkWin(gameState, 0, 0, 0, { x: 0, y: 1 }));
  t.false(checkWin(gameState, 1, 0, 0, { x: 0, y: 1 }));
});

test('determines if the provided player has won horizontally', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [0, 0, 1, 1, 2, 2, 3],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(checkWin(gameState, 0, 0, 0, { x: 1, y: 0 }));
  t.false(checkWin(gameState, 1, 0, 0, { x: 1, y: 0 }));
});

test('determines if the provided player has won diagonally up', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [0, 1, 1, 2, 2, 0, 2, 0, 3, 3, 3, 1, 3],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(checkWin(gameState, 0, 0, 0, { x: 1, y: 1 }));
  t.false(checkWin(gameState, 1, 0, 0, { x: 1, y: 1 }));
});

test('determines if the provided player has won diagonally down', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [4, 3, 3, 2, 2, 4, 2, 1, 1, 1, 1],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(checkWin(gameState, 0, 1, 3, { x: 1, y: -1 }));
  t.false(checkWin(gameState, 1, 1, 3, { x: 1, y: -1 }));
});
