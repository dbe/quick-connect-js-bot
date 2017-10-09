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

# GameState object
```
GameState: {
  gameId: uuid,
  isPlayer0First: boolean,
  player0: string,  //userName
  player1: string,  //userName
  boardHeights: List<int>, // Each int represents the height of that column
  winCondition: List<int>, //Array of lengths of connected links needed for victory. [4] represents standard connect4
  moves: List<int> //List of columns played in. Players moves alternate in this list
  isGameOver: boolean,
  isPlayer0Winner: boolean (nullable for draw)
}
```

# BotUtils

Utility functions are available for assistance when dealing with the Game State.

```
import { BotUtils } from 'quick-connect-js-bot';

/* Given a game state:
 * gameState = {
 *  boardHeights: [3, 3, 3],
 *  moves: [0, 1, 1, 1]
 * }
 */
decideMove(gameState) {
  const moves = BotUtils.getAllAvailableMoves(gameState);
  console.log(moves); // Logs [1, 3]
}
```

## API

#### checkWin()
```
checkWin(gameState, player, column, row, direction)
```

Returns true if the provided player (0 or 1) has enough tokens in a row to fulfill the `gameState.winCondition`.
> The direction parameter should be an object with properties for x and y to indicate what direction to look from the provided column and row. For example calling `checkWin(gameState, 1, 0, 0, {x: 0, y: 1})` will check tokens in column 0 starting from row 0 to see if player 1 has won the game.

### columnAvailable()
```
columnAvailable(gameState, column)
```

Returns true if the provided column index has empty spaces

### containsToken()
```
containsToken(gameState, column, row)
```

Returns true if the provided row and column contains a token, given a BoardState

### containsTokenForPlayer()
```
containsTokenForPlayer(gameState, player, column, row)
```

Returns true if the provided column and row contains a token and that token is the provided player's token.

### getAllAvailableMoves()
```
getAllAvailableMoves(gameState)
```

Returns a list of columns that are available to make a move.

### isBoardEmpty()
```
isBoardEmpty(gameState)
```

Returns true if the no player has made a move.

### isBoardFull()
```
isBoardFull(gameState)
```

Returns true if all spaces on the board contain a token and no moves can be made.

### isPlayerToken()
```
isPlayerToken(gameState, player, column, row)
```

Returns true if the provided column and row contains a token for the provided player (0 or 1).

### playerHasWon()
```
playerHasWon(gameState, player)
```

Returns true if the provided player (0 or 1) has won the game. Checks all possible directions for the number of tokens to match the `gameState.winCondition`.
