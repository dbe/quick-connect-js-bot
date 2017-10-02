class Bot {
  constructor(username, password, request, gameCount, repeatForever, repeatTimeout) {
    this.userName = username;
    this.password = password;
    this.request = request;
    this.gameCount = gameCount;
    this.repeatForever = repeatForever;
    this.repeatTimeout = repeatTimeout;
  }

  //Must override this
  decideMove(gameState) {
    throw new Error("Must override decideMove in your bot implementation.");
  }

  startGame() {
    this.joinGame().then(gameId => {
      console.log("Joined game: ", gameId);
      process.stdout.write("Waiting for game to start: ");
      this.play(gameId);
    });
  }

  joinGame() {
    return this.request('joinGame', {
      userName: this.userName,
      password: this.password
    }).then(resp => {
      if(resp.error) {
        throw new Error(resp.error.message);
      }

      return resp.result.gameId;
    });
  }

  play(gameId) {
    this.waitForMyTurn(gameId).then(gameState => {
      if(!this.isGameOver(gameState)) {
        this.makeMove(gameId, gameState.moves.concat(this.decideMove(gameState))).then(() => {
          this.play(gameId);
        });
      }
    });
  }

  waitForMyTurn(gameId) {
    return new Promise((resolve) => {
      this.pollUntilMyTurn(gameId, resolve);
    });
  }

  pollUntilMyTurn(gameId, resolve) {
    this.getGameState(gameId).then(gameState => {
      if(gameState.isStarted && this.isMyTurn(gameState)) {
        resolve(gameState);
      } else {
        process.stdout.write('*');
        if(!this.isGameOver(gameState)) {
          let timeout = gameState.isStarted ? 500 : 10000;
          setTimeout(this.pollUntilMyTurn.bind(this), timeout, gameId, resolve);
        }
      }
    });
  }

  getGameState(gameId) {
    return this.request('getGameState', {gameId}).then(resp => {
      return resp.result;
    });
  }

  makeMove(gameId, moves) {
    console.log("\nMaking Move");
    return this.request('makeMove', {
      gameId,
      userName: this.userName,
      password: this.password,
      moves
    }).then(resp => {
      return resp.result;
    });
  }

  onGameOver(gameState) {
    console.log(`\nGame over. You ${this.didIWin(gameState) ? 'Won' : 'Lost'}`);

    if(this.repeatForever || --this.gameCount > 0) {
      console.log("About to start game again with repeatTimeout: ", this.repeatTimeout);
      setTimeout(this.startGame.bind(this), this.repeatTimeout);
    }
  }

  isGameOver(gameState) {
    if(gameState.isGameOver) {
      this.onGameOver(gameState);
    }

    return gameState.isGameOver;
  }

  didIWin(gameState) {
    return this.amIplayer0(gameState) === gameState.isPlayer0Winner;
  }

  isMyTurn(gameState) {
    return this.amIplayer0(gameState) === this.isPlayer0Turn(gameState);
  }

  amIplayer0(gameState) {
    return gameState.player0 === this.userName;
  }

  isPlayer0Turn(gameState) {
    return gameState.moves.length % 2 === 0;
  }
}

export default Bot;
