import Bot from '../Bot.js';

class RandomBot extends Bot {
  constructor(...args) {
    super(...args);
  }

  decideMove(gameState) {
    return Math.floor(Math.random() * gameState.boardHeights.length);
  }
}

export default RandomBot;
