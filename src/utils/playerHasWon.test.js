import test from 'ava';
import { playerHasWon } from './playerHasWon';

test('returns false if the game is a draw', t => {
  const gameState = {
    boardHeights: [2, 2, 2],
    moves: [0, 0, 2, 1, 1, 2],
    winCondition: [3],
    isPlayer0First: true,
  };

  t.false(playerHasWon(gameState, 0));
  t.false(playerHasWon(gameState, 1));
});

test('determines if the provided player has won vertically', t => {
  const gameState = {
    boardHeights: [4, 4],
    moves: [0, 1, 0, 1, 0, 1, 0],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(playerHasWon(gameState, 0));
  t.false(playerHasWon(gameState, 1));
});

test('determines if the provided player has won horizontally', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [0, 0, 1, 1, 2, 2, 3],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(playerHasWon(gameState, 0));
  t.false(playerHasWon(gameState, 1));
});

test('determines if the provided player has won diagonally up', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [0, 1, 1, 2, 2, 0, 2, 0, 3, 3, 3, 1, 3],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(playerHasWon(gameState, 0));
  t.false(playerHasWon(gameState, 1));
});

test('determines if the provided player has won diagonally down', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4, 4],
    moves: [4, 3, 3, 2, 2, 4, 2, 1, 1, 1, 1],
    winCondition: [4],
    isPlayer0First: true,
  };

  t.true(playerHasWon(gameState, 0));
  t.false(playerHasWon(gameState, 1));
});
