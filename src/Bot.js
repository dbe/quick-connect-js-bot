class Bot {
  constructor() {

  }

  //Must override this
  decideMove(gameState) {
    throw new Error("Must override decideMove in your bot implementation.");
  }
}

export default Bot;
