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
  .option('-b --botpath <botpath>', 'Path to bot (default randomBot)')
  .option('-g --gamecount <gamecount>', '# of games to play before exiting. enter "infinity" to run forever')
  .option('-t --timeout <timeout>', 'Timeout after a game, before bot rejoins (milliseconds)', parseInt)
  .option('-r --rpc-url <rpc-url>', 'Alternative RPC-URL, useful for local testing. Ex: -r localhost:3002/rpc')
  .parse(process.argv);

const { username, password } = parseCredentials(program);
const Bot = loadBot(program);
const request = buildRequest(program);
const { gameCount, repeatForever } = parseGameCount(program);
const repeatTimeout = program.repeatTimeout || 10000;

let bot = new Bot(username, password, request, gameCount, repeatForever, repeatTimeout);
bot.startGame();

function parseCredentials(program) {
  //Needed to do this because commander.js only enforces 'required' arguments when a subset of them is passed in
  if(program.username === undefined || program.password === undefined) {
    console.log("Username and password are required");
    process.exit(1);
  }

  return { username: program.username, password: program.password };
}

function loadBot(program) {
  let botpath = program.botpath || 'node_modules/quick-connect-js-bot/lib/bots/randomBot.js';
  botpath = path.resolve(botpath);

  if (!fs.existsSync(botpath)) {
    console.log(`${botpath} doesn't exist. Please provide a valid bot.`)
    process.exit(1);
  }

  return require(botpath).default;
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
