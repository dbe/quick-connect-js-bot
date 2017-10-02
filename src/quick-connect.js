#!/usr/bin/env node

var fs = require('fs');
var jayson = require('jayson');
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


function validateArgs(program) {

}


console.log("In quick connect js")
console.log(program.username);
console.log(program.password);
console.log(program.botpath);
console.log(program.gamecount);
console.log(program.timeout);
console.log(program.rpcUrl);
