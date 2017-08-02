// We'll need our game engine here, since this is where we're handling game logic
import TTTEngine from "./TTTEngine";
let gameEngine = new TTTEngine();

// Simple action creators

export const resetBoard = () => {
    return {
        type: "RESET_BOARD"
    };
};

export const changePlayerMark = (player) => {
    return {
        type: "CHANGE_PLAYER_MARK",
        playerMark: player
    };
};

export const makePlay = (position, player) => {
    return {
        type: "MAKE_PLAY",
        position,
        player
    };
};

export const gameOver = () => {
    return {
        type: "GAME_OVER"
    };
};

// The main action creator is where we'll handle our game logic. That way the reducer stays pure.
export const handlePlayerMove = (position) => {

    // Ok, so here is the pseudo code
    // First, handle the players move
    // If it is successful (the move was a valid one) check to see if the player won
    // If the player didn't win, have the computer choose a move
    // Check to see if the computer won
    // If the computer didn't win, allow the player to move again

    // We'll do this with a thunk!
    return function (dispatch, getState) {

        // Make a copy of the current Redux state. 
        // We'll have to keep this in sync with our dispatches. This is a little icky, but I'll hold my nose and do it for now.
        // It helps keep the reducer pure.
        let localState = JSON.parse(JSON.stringify(getState()));

        // TODO: Move this somewhere better. We shouldn't need to initialize this every move
        gameEngine.setPlayer(localState.playerMark == "X" ? "O" : "X");
        
        // Return early if the game is already over
        if (localState.gameOver) {
            console.log("Nice try, but the game is over!");
            return false;
        }

        // Return early if the position that the player is attempting to play on is already taken
        if (localState.board[position] != null) {
            console.log("Sorry, that position has already been played on.");
            return false;
        }

        // This seems to be a valid move. Dispatch an update to the Redux state, and update our local state too.
        dispatch(makePlay(position, localState.playerMark));
        localState.board[position] = localState.playerMark;

        // Check to see if the player won with this move
        // Possible return values from TTTEngine.checkWinner(board): "X", "O", "Cat"
        if (gameEngine.checkWinner(localState.board) == localState.playerMark) {
            console.log("The player just won! That should be impossible!");
            dispatch(gameOver());
            localState.gameOver = true;
            localState.winner = localState.playerMark;
        }

        // TODO: Check to see if the player made a foolish move and respond "appropriately"

        // Find the computers mark
        let computerMark = localState.playerMark == "X" ? "O" : "X";

        // Ok, here is the magic: The player has just made a move, but didn't win the game. Now we need to make a move.
        let computerMove = gameEngine.decideMove(localState.board);
        console.log("Computer move: " + computerMove);

        // Dispatch the computers move, and update our local state (ick)
        dispatch(makePlay(computerMove, computerMark));
        localState.board[computerMove] = computerMark;

        // Check to see if the computer won with this move
        // Possible return values from TTTEngine.checkWinner(board): "X", "O", "Cat"
        if (gameEngine.checkWinner(localState.board) == computerMark) {
            console.log("The computer won! I'm shocked!");
            dispatch(gameOver());
            localState.gameOver = true;
            localState.winner = computerMark;
            // Dispatch event
        }
    };

};