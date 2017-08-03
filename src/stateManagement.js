// Use Redux with react-redux bindings for state management
// Because Tic-tac-toe state is fairly straightforward, let's keep the reducers, actions, etc in this file

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
    playerMark: "X",
    board: [null, null, null, null, null, null, null, null, null],
    winner: null,
    winningSpaces: null
};

const reducer = (state = defaultState, action) => {
    // Don't mutate state, return a new copy
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {      
        case "CHANGE_PLAYER_MARK":
            newState.playerMark = action.playerMark;
            break;

        case "HANDLE_PLAYER_MOVE":
            // Player move
            newState.board[action.playerMove] = state.playerMark;

            // Computer move (could be null, if the player won. But it shouldn't even be null.)
            if (action.computerMove != null) {
                newState.board[action.computerMove] = state.playerMark == "X" ? "O" : "X";
            }
            
            // Winner?
            newState.winner = action.winner;

            // Winning combos?
            newState.winningSpaces = action.winningSpaces;

            break;
        
        case "RESET_BOARD": 
            newState.board = [null, null, null, null, null, null, null, null, null];
            newState.winner = null;
            newState.winningSpaces = null;
            break;
    }

    return newState;
}

export default createStore(reducer, applyMiddleware(thunk));