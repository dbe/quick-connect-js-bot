import test from 'ava';
import {
  buildBoardState,
  columnAvailable,
  containsToken,
  getAllAvailableMoves,
  isBoardEmpty,
  isBoardFull,
} from './utils';

// Get All Available Moves
test('getAllAvailableMoves: determines available moves from game state', t => {
  const gameState = { boardHeights: [3, 3], moves: [0, 0, 0] };

  const availableMoves = getAllAvailableMoves(gameState);

  t.deepEqual(availableMoves, [1]);
});

test('getAllAvailableMoves: determines available moves from game state', t => {
  const gameState = {
    boardHeights: [4, 4, 4, 4],
    moves: [3, 3, 3, 3, 1, 2, 2],
  };

  const availableMoves = getAllAvailableMoves(gameState);

  t.deepEqual(availableMoves, [0, 1, 2]);
});

// Is Board Empty
test('isBoardEmpty: checks if the board is empty', t => {
  const gameState = { moves: [] };

  t.true(isBoardEmpty(gameState));
});

test('isBoardEmpty: checks if the board is not empty', t => {
  const gameState = { moves: [1] };

  t.false(isBoardEmpty(gameState));
});

// Is Board Full
test('isBoardFull: checks if the board is full', t => {
  const gameState = { moves: [0, 0, 0], boardHeights: [3] };

  t.true(isBoardFull(gameState));
});

test('isBoardFull: checks if the board is not full', t => {
  const gameState = { moves: [0], boardHeights: [3] };

  t.false(isBoardFull(gameState));
});

// Column Available
test('columnAvailable: determines if the provided column has empty spaces', t => {
  const gameState = { boardHeights: [1, 1], moves: [1] };

  t.true(columnAvailable(gameState, 0));
  t.false(columnAvailable(gameState, 1));
});

// Build Board State
test('buildBoardState: can create the game board', t => {
  const expectedBoardState = [[1, 0], [1]];

  const moves = [0, 0, 1];
  const boardHeights = [2, 2];

  const actualBoardState = buildBoardState(moves, boardHeights, false);

  t.deepEqual(actualBoardState, expectedBoardState);
});

// Contains Token
test('containsToken: determines if a particular space contains a token', t => {
  const boardState = [[1, 0], [1]];

  t.true(containsToken(boardState, 0, 0));
});
