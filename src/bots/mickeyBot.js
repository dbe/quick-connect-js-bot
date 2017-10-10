'use strict';

import Bot from '../Bot';

const conditionChecks = {
  row: {
    checkInline: (boardModel, colIdx, rowIdx, offset, player) => {
      return boardModel.length > colIdx + offset
        && boardModel[colIdx + offset].length - 1 >= rowIdx
        && boardModel[colIdx + offset][rowIdx] === player;
    },
    checkGapWin: (boardModel, colIdx, rowIdx, gapIdx) => {
      return gapIdx
        && boardModel[gapIdx].length === rowIdx;
    },
    checkTailWin: (boardModel, gameState, colIdx, rowIdx, offset, winLength) => {
      return boardModel.length >= colIdx + winLength
        && boardModel[colIdx + winLength - 1].length === rowIdx;
    },
    checkHeadWin: (boardModel, gameState, colIdx, rowIdx) => {
      return colIdx > 0
        && boardModel[colIdx - 1].length === rowIdx;
    }
  },
  upDiagonal: {
    checkInline: (boardModel, colIdx, rowIdx, offset, player) => {
      return boardModel.length > colIdx + offset
        && boardModel[colIdx + offset].length - 1 >= rowIdx + offset
        && boardModel[colIdx + offset][rowIdx + offset] === player;
    },
    checkGapWin: (boardModel, colIdx, rowIdx, gapIdx) => {
      return gapIdx
        && boardModel[gapIdx].length === rowIdx + (gapIdx - colIdx);
    },
    checkTailWin: (boardModel, gameState, colIdx, rowIdx, offset, winLength) => {
      return boardModel.length > colIdx + winLength - 1
        && boardModel[colIdx + winLength - 1].length === rowIdx + offset
        && gameState.boardHeights[colIdx + winLength - 1] > rowIdx + offset;
    },
    checkHeadWin: (boardModel, gameState, colIdx, rowIdx) => {
      return colIdx > 0 && rowIdx > 0 && boardModel[colIdx - 1].length === rowIdx - 1;
    }
  },
  downDiagonal: {
    checkInline: (boardModel, colIdx, rowIdx, offset, player) => {
      return boardModel.length > colIdx + offset
        && rowIdx - offset >= 0
        && boardModel[colIdx + offset].length - 1 >= rowIdx - offset
        && boardModel[colIdx + offset][rowIdx - offset] === player;
    },
    checkGapWin: (boardModel, colIdx, rowIdx, gapIdx) => {
      return gapIdx
        && boardModel[gapIdx].length === rowIdx - (gapIdx - colIdx);
    },
    checkTailWin: (boardModel, gameState, colIdx, rowIdx, offset, winLength) => {
      return boardModel.length > colIdx + winLength - 1
        && boardModel[colIdx + winLength - 1].length === rowIdx - offset
        && rowIdx - offset >= 0;
    },
    checkHeadWin: (boardModel, gameState, colIdx, rowIdx) => {
      return colIdx > 0
        && boardModel[colIdx - 1].length === rowIdx + 1
        && boardModel[colIdx - 1].length < gameState.boardHeights[colIdx - 1];
    }
  }
};

function getPlayer(gameState) {
  return process.argv[2] === gameState.player0
    ? 0
    : 1;
}

function getBoardModel(gameState) {
  const board = [];
  gameState.boardHeights.forEach(x => (board.push([])));
  gameState.moves.forEach((move, idx) => {
    const player = idx % 2;
    board[move].push(player);
  });

  return board;
}

function checkColumnsWin(boardModel, player, gameState, winLength) {
  let winMove;

  boardModel.forEach((col, idx) => {
    let consec = 0;
    col.forEach(token => {
      if (token === player) {
        consec++;
      } else {
        consec = 0;
      }
    });

    if (consec === winLength - 1 && col[col.length - 1] === player && col.length < gameState.boardHeights[idx]) {
      winMove = idx;
    }
  });

  return winMove;
}

function checkHorizontalOrDiagonalWin(boardModel, player, gameState, winLength, conditions) {
  let winMove;

  boardModel.forEach((col, colIdx) => {
    col.forEach((token, rowIdx) => {
      if (token === player) {
        let inline = 1;
        let offset = 1;
        let missCount = 0;
        let gapIdx;

        while (inline < winLength - 1 && missCount < 2) {
          if (conditions.checkInline(boardModel, colIdx, rowIdx, offset, player)) {
            inline++;
          } else {
            gapIdx = colIdx + offset;
            missCount++;
          }

          offset++;
        }

        if (inline === winLength - 1) {
          if (conditions.checkGapWin(boardModel, colIdx, rowIdx, gapIdx)) {
            winMove = gapIdx;
          }

          if (conditions.checkTailWin(boardModel, gameState, colIdx, rowIdx, offset, winLength)) {
            winMove = winMove || colIdx + winLength - 1;
          }

          if (conditions.checkHeadWin(boardModel, gameState, colIdx, rowIdx)) {
            winMove = winMove || colIdx - 1;
          }
        }
      }
    });
  });

  return winMove;
}

function checkForWinMove(boardModel, player, gameState, winLength) {
  const colWin = checkColumnsWin(boardModel, player, gameState, winLength);
  const rowWin = checkHorizontalOrDiagonalWin(boardModel, player, gameState, winLength, conditionChecks.row);
  const upDiagonalWin = checkHorizontalOrDiagonalWin(boardModel, player, gameState, winLength, conditionChecks.upDiagonal);
  const downDiagonalWin = checkHorizontalOrDiagonalWin(boardModel, player, gameState, winLength, conditionChecks.downDiagonal);

  return colWin || rowWin || upDiagonalWin || downDiagonalWin;
}

function getMove(boardModel, gameState) { // TODO: Narrow down a strategy for choosing spaces when no wins or threats exist
  const centerPosition = Math.floor(boardModel.length / 2);
  let target = centerPosition;
  let isFull = true;

  while (isFull) {
    if (target >= 0 && target < boardModel.length && boardModel[target].length < gameState.boardHeights[target]) {
      isFull = false;
      break;
    }

    target = randomMove(gameState);
  }

  return target;
}

function randomMove(gameState) {
  return Math.floor(Math.random() * gameState.boardHeights.length);
}

// TODO: This is cycling through rows and columns an awful lot. Since the board is small, this doesn't matter much
//   but this code does not scale well. Ideally, this would be refactored to cycle through columns and rows once and
//   determine the winning, defensive, or strategic moves in ONE iteration
function getNextMove(boardModel, player, gameState) {
  const winLength = gameState.winCondition[0];

  const win = checkForWinMove(boardModel, player, gameState, winLength); // try to win
  const survive = checkForWinMove(boardModel, player === 0 ? 1 : 0, gameState, winLength); // block opponent from winning
  const blockProgress = checkForWinMove(boardModel, player === 0 ? 1 : 0, gameState, winLength - 1); // block opponent from getting 3 in a row
  const buildConsecutive = checkForWinMove(boardModel, player, gameState, winLength - 1); // try to get 3 in a row
  const whatevs = getMove(boardModel, gameState); // place a token somewhere near the center

  return win || survive || blockProgress || buildConsecutive || whatevs;
}

class MickeyBot extends Bot {
  constructor(...args) {
    super(...args);
    this.randomChance = Math.random() / 5; // Bot will play a random move up to 20% of the time
  }

  decideMove(gameState) {
    const playRandom = Math.random() <= this.randomChance;
    const boardModel = getBoardModel(gameState);
    const player = getPlayer(gameState);
    const move = getNextMove(boardModel, player, gameState);

    console.log(`The odds of a random move are ${this.randomChance} and this move is ${playRandom ? 'random' : 'not random'}.`);

    return playRandom
      ? randomMove(gameState)
      : move;
  }
}

export default MickeyBot;
