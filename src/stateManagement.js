// Use Redux with react-redux bindings for state management
// Because Tic-tac-toe state is fairly straightforward, let's keep the reducers, actions, etc in this file

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
    playerMark: "X",
    board: [null, null, null, null, null, null, null, null, null],
    gameOver: false,
    winner: false
};

const reducer = (state = defaultState, action) => {
    // Don't mutate state, return a new copy
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        
        case "CHANGE_PLAYER_MARK":
            newState.playerMark = action.playerMark;
            break;
        
        case "MAKE_PLAY":
            newState.board[action.position] = action.player;
            break;

        case "GAME_OVER": 
            newState.gameOver = true;
            break;
        
        case "RESET_BOARD": 
            newState.board = [null, null, null, null, null, null, null, null, null];
            newState.gameOver = false;
            break;
    }

    return newState;
}

export default createStore(reducer, applyMiddleware(thunk));