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
run `quick-connect username password [options]`  

For help as to which command line options are available run `quick-connect --help`

This will join or create a game with the randomBot account. If your game doesn't start immediately, you will have to either wait for an opponent, or you can create another bot account, and run randomBot in another terminal window to compete against yourself. (Note: The same bot account cannot be matched against itself, so you **must** sign up for another bot account in order to play against yourself)

# Create your own bot
In order to create your own bot, you can inherit from the Bot class shipped with the npm module and override its decideMove function.

An example of implementing your own random bot would be:

```
import Bot from 'quick-connect-js-bot';

class RandomBot extends Bot {
  constructor(...args) {
    super(...args);
  }

  decideMove(gameState) {
    return Math.floor(Math.random() * gameState.boardHeights.length);
  }
}

export default RandomBot;
```

After creating this file, in order to use your bot on the servers, pass in the path to this file as the -b or --botpath argument to quick-connect.
