// We'll need our game engine here, since this is where we're handling game logic
import minimaxEngine from "./minimaxEngine";
let mmEngine = new minimaxEngine();

// Simple action creators
export const changePlayerMark = (player) => {
    return {
        type: "CHANGE_PLAYER_MARK",
        playerMark: player
    };
};

export const undoMove = () => {
    return {
        type: "UNDO_MOVE"
    };
};

export const redoMove = () => {
    return {
        type: "REDO_MOVE"
    };
};

// Reseting the board will also begin to load a fun new gif ;)
// I'll use a thunk here so that I can begin to load the gif, but still reset the board and allow the player to begin playing
export const resetBoard = () => {
    return function (dispatch) {

        dispatch({
            type: "RESET_BOARD"
        });

        dispatch({
            type: "BEGIN_FETCH_FAIL_NOTIFICATION_GIF"
        });

        let gifTag = "fail";
        let url="https://api.giphy.com/v1/gifs/random?api_key=7c4d694af8d44968b781f38c13396f88&tag=" + gifTag + "&rating=g"

        fetch(url)
        .then(res => res.json())
        .then(jsonResponse => {
            dispatch({
                type: "FINISH_FETCH_FAIL_NOTIFICATION_GIF",
                source: jsonResponse.data.image_mp4_url
            });
        });

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
        mmEngine.setPlayer(computerMark);

        // Return early if the game has been won
        if (state.game.present.winner != null) {
            console.log("Sorry, the game is over!");
            return false;
        }

        // Return early if the player is trying to move into a space that is already occupied
        if (state.game.present.board[position] != null) {
            console.log("Invalid move!");
            return false;
        }

        // The player has made a valid move, add it to the action payload
        action.playerMove = position;

        // Make a copy of the board, and add the player's move so that we can use it to check for a winner and calculate
        // the computer's move.
        let tempBoard = JSON.parse(JSON.stringify(state.game.present.board));
        tempBoard[position] = state.playerMark;

        // Check to see if the player has won
        let playerMoveResult = mmEngine.findWinner(tempBoard);
        if (playerMoveResult.winner == state.playerMark) {
            action.winner = state.playerMark;
            action.winningSpaces = playerMoveResult.winningSpaces;
            // If the player won (should never happen), there is no need to calculate the computer's move
            dispatch(action);
            return;
        }

        // Ok, time for the computer to make a move using the minimax algorithm
        action.computerMove = mmEngine.findBestMove(tempBoard);
        tempBoard[action.computerMove] = computerMark;

        // Check to see if the computer won
        let computerMoveResult = mmEngine.findWinner(tempBoard);
        if (computerMoveResult.winner == computerMark) {
            action.winner = computerMark;
            action.winningSpaces = computerMoveResult.winningSpaces;
        }

        // Ok, we should be finished. Dispatch the action.
        dispatch(action);
    };
};