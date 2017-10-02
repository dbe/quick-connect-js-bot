#!/usr/bin/env node

var fs = require('fs');
var jayson = require('jayson');
var path = require('path');
var program = require('commander');
var Promise = require("bluebird");

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

//Needed to do this because commander.js only enforces 'required' arguments when a subset of them is passed in
if(program.username === undefined || program.password === undefined) {
  console.log("Username and password are required");
  process.exit(1);
}

const decideMove = loadBot(program.botpath);



function loadBot(botPath) {
  botPath = botPath || 'lib/bots/randomBot.js';
  botPath = path.resolve(botPath);

  if (!fs.existsSync(botPath)) {
    console.log(`${botPath} doesn't exist. Please provide a valid bot.`)
    process.exit(1);
  }

  return require(botPath).default;
}


console.log("In quick connect js")
console.log(program.username);
console.log(program.password);
console.log(program.botpath);
console.log(program.gamecount);
console.log(program.timeout);
console.log(program.rpcUrl);
