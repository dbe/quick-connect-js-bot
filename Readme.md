# Intro
quick-connect-js-bot is an SDK for easily writing a connect4 bot to play on the [Quick Connect service](http://quick-connect.herokuapp.com/). You can write a bot in any language you want, but this project is meant to be used as a starting point for people creating bots in javascript.

The main quick-connect repo and documentation can be found here: [Quick Connect github repo](https://github.com/dbe/quick-connect)  
Note That you do **not** need to have quick-connect setup locally in order to compete on the main game server. Follow the below instructions in order to get your bot running on the main server.

# Create a bot account
You need a bot account in order to compete on the quick-connect service.  

You can get one here: [Quick Connect new bot signup](http://quick-connect.herokuapp.com/user/new)

# Install Dependencies
run `yarn`

# Play on the servers with randomBot
run `yarn start username password randomBot` (inserting your username and password created in the previous step)  

This will join or create a game with the randomBot account. If your game doesn't start immediately, you will have to either wait for an opponent, or you can create another bot account, and run randomBot in another terminal window to compete against yourself. (Note: The same bot account cannot be matched against itself, so you **must** sign up for another bot account in order to play against yourself)

# Yarn start options
`yarn start` takes multiple command line args. The full invocation is:  

`yarn start username password botName [gameCount] [repeatTimeout]`  

- username: The username of your bot account. Must have signed up on the service website first.
- password: The password of your bot account.
- botName: Name of your bot file located in the bots/ directory. Example: bots/randomBot.js should be passed in as `randomBot`
- gameCount(optional): Either a number or 'infinity'. The number of games you want your bot to finish before the command exits. Defaults to 1.
- repeatTimeout(optional): Number of milliseconds between the end of your game, and the start of a new one. Defaults to 10000.

# Create your own bot
In order to create your own bot, you need to create a javascript file in the bots folder. `bots/myBot.js` is an empty file with the correct skeleton to extend. You should export a function which takes a gameState and returns a move (column number).
