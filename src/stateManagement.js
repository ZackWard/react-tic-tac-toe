// Use Redux with react-redux bindings for state management
// Because Tic-tac-toe state is fairly straightforward, let's keep the reducers, actions, etc in this file

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
    playerMark: "X",
    game: {
        past: [],
        present: {
            board: [null, null, null, null, null, null, null, null, null],
            winner: null,
            winningSpaces: null
        },
        future: []
    },
    failNotification: {
        loading: false,
        source: null
    }
};

const reducer = (state = defaultState, action) => {
    // Don't mutate state, return a new copy
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {      
        case "CHANGE_PLAYER_MARK":
            newState.playerMark = action.playerMark;
            break;

        case "HANDLE_PLAYER_MOVE":

            // Make a copy of the "present" board and push it into the past
            newState.game.past.push(JSON.parse(JSON.stringify(newState.game.present)));

            // Player move
            newState.game.present.board[action.playerMove] = state.playerMark;

            // Computer move (could be null, if the player won. But it shouldn't even be null.)
            if (action.computerMove != null) {
                newState.game.present.board[action.computerMove] = state.playerMark == "X" ? "O" : "X";
            }
            
            // Winner
            newState.game.present.winner = action.winner;

            // Winning combos
            newState.game.present.winningSpaces = action.winningSpaces;

            // If we're making a move, we need a fresh future
            newState.game.future = [];

            break;

        case "UNDO_MOVE": 
            // Move the present to the future, move the past to the present
            newState.game.future.unshift(newState.game.present);
            newState.game.present = newState.game.past.pop();
            break;
        
        case "REDO_MOVE":
            // Move the present to the past, move the future to the present
            newState.game.past.push(newState.game.present);
            newState.game.present = newState.game.future.shift();
            break;
        
        case "RESET_BOARD": 
            newState.game.past = [];
            newState.game.present = {
                board: [null, null, null, null, null, null, null, null, null],
                winner: null,
                winningSpaces: null
            };
            newState.game.past = [];
            break;
        
        case "BEGIN_FETCH_FAIL_NOTIFICATION_GIF": 
            newState.failNotification.loading = true;
            break;
        case "FINISH_FETCH_FAIL_NOTIFICATION_GIF":
            newState.failNotification.loading = false;
            newState.failNotification.source = action.source;
    }

    return newState;
}

export default createStore(reducer, applyMiddleware(thunk));