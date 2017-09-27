var fs = require('fs');

//TODO: Use a standard unix
if(process.argv[2] === '--help') {
  printHelp();
  process.exit(0);
}

let { userName, password } = parseCredentials();
let { gameCount, repeatTimeout, repeatForever } = parseOptions();
let decideMove = loadBot();

var jayson = require('jayson');
var Promise = require("bluebird");

const RPC_URL = 'http://quick-connect.herokuapp.com/rpc';
// const RPC_URL = 'http://localhost:3002/rpc';  //For local testing

var client = jayson.client.http(RPC_URL);
var request = Promise.promisify(client.request, {context: client});

startGame();



//--------------------Lib Code--------------------//

function printHelp() {
  console.log("Usage: node lib/iWinBot.js userName password botname gameCount repeatTimeout");
  console.log("botname must be the name of a file in the bots directory.");
  console.log("Example: If your bot file is located at bots/myBot.js, just use 'myBot' as the argument");
  console.log("gameCount will default to 1");
  console.log("To repeat infinitely input 'infinity' as gameCount");
  console.log("repeatTimeout will default to 10 seconds");
}

function parseCredentials() {
  let userName = process.argv[2];
  let password = process.argv[3];

  if(!userName || !password) {
    console.log("Please pass userName and password via command line.");
    printHelp();

    process.exit(1);
  }

  return {
    userName,
    password
  }
}

function loadBot() {
  let botName = process.argv[4];
  let botPath = `${__dirname}/bots/${botName}.js`;

  if (!fs.existsSync(botPath)) {
    console.log(`${botPath} doesn't exist. Please provide a valid bot.`)
    process.exit(1);
  }

  return require(botPath).default;
}

function parseOptions() {
  let gameCount = process.argv[5];
  let repeatTimeout = Number(process.argv[6]) || 10000;
  let repeatForever = (gameCount === 'infinity');
  gameCount = Number(gameCount) || 1;

  console.log(`gameCount: ${gameCount}`);
  console.log(`repeatTimeout: ${repeatTimeout}`);
  console.log(`repeatForever: ${repeatForever}`);

  return { gameCount, repeatTimeout, repeatForever };
}

function onGameOver(gameState) {
  console.log(`\nGame over. You ${didIWin(gameState) ? 'Won' : 'Lost'}`);
  console.log(`See game replay: http://quick-connect.herokuapp.com/preview/${gameState.gameId}`);

  if(repeatForever || --gameCount > 0) {
    console.log("About to start game again with repeatTimeout: ", repeatTimeout);
    setTimeout(startGame, repeatTimeout);
  }
}

function isGameOver(gameState) {
  if(gameState.isGameOver) {
    onGameOver(gameState);
    return true;
  } else {
    return false;
  }
}

function startGame() {
  console.log("Starting game.");
  joinGame(userName, password).then(gameId => {
    console.log("Joined game: ", gameId);
    play(gameId);
  });
}

function play(gameId) {
  waitForMyTurn(gameId).then(gameState => {
    if(!isGameOver(gameState)) {
      makeMove(gameId, gameState.moves.concat(decideMove(gameState))).then(() => {
        play(gameId);
      });
    }
  });
}

function waitForMyTurn(gameId) {
  return new Promise((resolve) => {
    pollUntilMyTurn(gameId, resolve);
  });
}

function pollUntilMyTurn(gameId, resolve) {
  getGameState(gameId).then(gameState => {
    if(gameState.isStarted && isMyTurn(gameState)) {
      resolve(gameState);
    } else {
      process.stdout.write('*');
      if(!isGameOver(gameState)) {
        setTimeout(pollUntilMyTurn, 1000, gameId, resolve);
      }
    }
  });
}

function makeMove(gameId, moves) {
  console.log("\nMaking Move");
  return request('makeMove', {gameId, userName, password, moves}).then(resp => {
    return resp.result;
  });
}

function getGameState(gameId) {
  return request('getGameState', {gameId}).then(resp => {
    return resp.result;
  });
}

function joinGame(userName, password) {
  return request('joinGame', {userName, password}).then(resp => {
    return resp.result.gameId;
  });
}

//Pure Game Logic Code
function didIWin(gameState) {
  return amIplayer0(gameState) === gameState.isPlayer0Winner;
}

function isMyTurn(gameState) {
  return amIplayer0(gameState) === isPlayer0Turn(gameState);
}

function amIplayer0(gameState) {
  return gameState.player0 === userName;
}

function isPlayer0Turn(gameState) {
  return gameState.moves.length % 2 === 0;
}
