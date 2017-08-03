// We'll need our game engine here, since this is where we're handling game logic
import TTTEngine from "./TTTEngine";
import minimaxEngine from "./minimaxEngine";

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

// The main action creator is where we'll handle our game logic. That way the reducer stays pure.
export const handlePlayerMove = (position) => {

    return function (dispatch, getState) {

        // Initialize a few things
        let action = {
            type: "HANDLE_PLAYER_MOVE",
            playerMove: null,
            computerMove: null,
            winner: null,
            winningSpaces: null,
            optimalMove: null
        };
        let state = getState();
        let computerMark = state.playerMark == "X" ? "O" : "X";
        gameEngine.setPlayer(computerMark);

        // Return early if the game has been won
        if (state.winner != null) {
            console.log("Sorry, the game is over!");
            return false;
        }

        // Return early if the player is trying to move into a space that is already occupied
        if (state.board[position] != null) {
            console.log("Invalid move!");
            return false;
        }

        // The player has made a valid move, add it to the action payload
        action.playerMove = position;

        // Make a copy of the board, and add the player's move so that we can use it to check for a winner and calculate
        // the computer's move.
        let tempBoard = JSON.parse(JSON.stringify(state.board));
        tempBoard[position] = state.playerMark;

        // Check to see if the player has won
        let playerMoveResult = gameEngine.checkWinner(tempBoard);
        if (playerMoveResult.winner == state.playerMark) {
            action.winner = state.playerMark;
            action.winningSpaces = playerMoveResult.winningSpaces;
            // If the player won (should never happen), there is no need to calculate the computer's move
            dispatch(action);
            return;
        }

        // Ok, time for the computer to make a move
        // action.computerMove = gameEngine.decideMove(tempBoard);
        // tempBoard[action.computerMove] = computerMark;

        // Let's try the minimax engine....
        let mmEngine = new minimaxEngine(computerMark);
        action.computerMove = mmEngine.findBestMove(tempBoard);
        tempBoard[action.computerMove] = computerMark;

        // Check to see if the computer won
        let computerMoveResult = gameEngine.checkWinner(tempBoard);
        if (computerMoveResult.winner == computerMark) {
            action.winner = computerMark;
            action.winningSpaces = computerMoveResult.winningSpaces;
        }

        // Ok, we should be finished. Dispatch the action.
        dispatch(action);
    };
};