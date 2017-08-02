// Use Redux with react-redux bindings for state management
// Because Tic-tac-toe state is fairly straightforward, let's keep the reducers, actions, etc in this file

import {createStore} from 'redux';
import TTTEngine from './TTTEngine.js';

// Initialize game engine
let computerPlayer = new TTTEngine();

const defaultState = {
    playerMark: "X",
    board: [null, null, null, null, null, null, null, null, null],
    gameOver: false
};

const reducer = (state = defaultState, action) => {
    // Don't mutate state, return a new copy
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        
        case "CHANGE_PLAYER_MARK":
            console.log("Changing player mark to " + action.playerMark);
            newState.playerMark = action.playerMark;

            // Also, update our computer player to have the opposing mark
            let newComputerMark = action.playerMark == "X" ? "O" : "X";
            computerPlayer.setPlayer(newComputerMark);
            break;
        
        case "MAKE_PLAY":

            // Return early if the game is already over
            if (state.gameOver) {
                console.log("Nice try, but the game is over!");
                break;
            }

            // Return early if the position that the player is attempting to play on is already taken
            if (state.board[action.position] != null) {
                console.log("Sorry, that position has already been played on.");
                break;
            }

            newState.board[action.position] = action.player;

            // TODO: Check to see if the player made a foolish move and respond "appropriately"

            // Check to see if the player won with this move
            // Possible return values from TTTEngine.checkWinner(board): "X", "O", "Cat"
            if (computerPlayer.checkWinner(newState.board) == state.playerMark) {
                console.log("The player just won! That should be impossible!");
                newState.gameOver = true;
                break;
            }

            // Find the computers mark
            let computerMark = state.playerMark == "X" ? "O" : "X";

            // Ok, here is the magic: The player has just made a move, but didn't win the game. Now we need to make a move.
            let computerMove = computerPlayer.decideMove(newState.board);
            console.log("Computer move: " + computerMove);
            newState.board[computerMove] = computerMark;

            // Check to see if the computer won with this move
            // Possible return values from TTTEngine.checkWinner(board): "X", "O", "Cat"
            if (computerPlayer.checkWinner(newState.board) == computerMark) {
                console.log("The computer won! I'm shocked!");
                newState.gameOver = true;
                // Dispatch event
            }
            break;
        
        case "RESET_BOARD": 
            newState.board = [null, null, null, null, null, null, null, null, null];
            newState.gameOver = false;
            break;
    }

    return newState;
}

export default createStore(reducer);