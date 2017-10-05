#!/usr/bin/env node

var fs = require('fs');
var jayson = require('jayson');
var path = require('path');
var program = require('commander');
var Promise = require("bluebird");

//Used so requires auto transpile es6
require("babel-register")({
    presets: [
        "es2015"
    ],
});

program
  .version('0.1.0')
  .arguments('<username> <password>')
  .action((username, password) => {
    program.username = username;
    program.password = password;
  })
  .option('-b --bot-path <bot-path>', 'Path to bot (default randomBot)')
  .option('-c --game-count <game-count>', '# of games to play before exiting. enter "infinity" to run forever')
  .option('-t --timeout <timeout>', 'Timeout after a game, before bot rejoins (milliseconds)', parseInt)
  .option('-r --rpc-url <rpc-url>', 'Alternative RPC-URL, useful for local testing. Ex: -r localhost:3002/rpc')
  .option('-g --game-id <game-id>', 'Play a game in progress. Ex: -g a2121321-440c-4941-9a94-c8be8c6bb294')
  .parse(process.argv);

const { username, password } = parseCredentials(program);
const Bot = loadBot(program);
const request = buildRequest(program);
const { gameCount, repeatForever } = parseGameCount(program);
const repeatTimeout = program.timeout || 10000;

let bot = new Bot(username, password, request, gameCount, repeatForever, repeatTimeout);
if (program.gameId) {
  bot.play(program.gameId);
} else {
  bot.startGame();
}

function parseCredentials(program) {
  //Needed to do this because commander.js only enforces 'required' arguments when a subset of them is passed in
  if(program.username === undefined || program.password === undefined) {
    console.log("Username and password are required");
    process.exit(1);
  }

  return { username: program.username, password: program.password };
}

function loadBot(program) {
  let botPath = program.botPath || 'node_modules/quick-connect-js-bot/lib/bots/randomBot.js';
  botPath = path.resolve(botPath);

  if (!fs.existsSync(botPath)) {
    console.log(`${botPath} doesn't exist. Please provide a valid bot.`)
    process.exit(1);
  }

  return require(botPath).default;
}

function buildRequest(program) {
  let rpcUrl = program.rpcUrl || 'http://quick-connect.herokuapp.com/rpc';
  var client = jayson.client.http(rpcUrl);
  return Promise.promisify(client.request, {context: client});
}

function parseGameCount(program) {
  let repeatForever = (program.gameCount === 'infinity');
  let gameCount = Number(program.gameCount) || 1;

  return { gameCount, repeatForever };
}
