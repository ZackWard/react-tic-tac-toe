// Use Redux with react-redux bindings for state management
// Because Tic-tac-toe state is fairly straightforward, let's keep the reducers, actions, etc in this file

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
    multiplayer: {
        connected: false,
        loggedIn: false,
        username: null,
        board: [null, null, null, null, null, null, null, null, null],
        playing: false,
        playerMark: "?",
        turn: "X",
        connectedPlayers: [],
        invitations: []
    },
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
            break;
        case "MULTIPLAYER_ESTABLISH_CONNECTION":
            console.log("In reducer, handling establish connection");
            newState.multiplayer.connected = true;
            break;
        case "MULTIPLAYER_LOGIN_SUCCESS":
            console.log("In reducer, handling login");
            newState.multiplayer.username = action.username;
            newState.multiplayer.loggedIn = true;
            break;
        case "MULTIPLAYER_UPDATE_PLAYER_LIST":
            console.log("In reducer, updating player list");
            console.log(action.playerList);
            newState.multiplayer.connectedPlayers = action.playerList;
            break;
        case "MULTIPLAYER_NEW_INVITATION":
            console.log("In reducer, received a new invitation from " + action.from);
            console.log(action);
            newState.multiplayer.invitations.push(action.from);
            break;
        case "MULTIPLAYER_GAME_BEGIN":
            console.log("Beginning game!");
            // clear all invitations
            newState.multiplayer.invitations = [];
            newState.multiplayer.playing = true;
            newState.multiplayer.playerMark = action.playerMark;
            break;
        case "MULTIPLAYER_BOARD_UPDATE":
            console.log("In reducer, got board update!");
            console.log(action.board);
            newState.multiplayer.board = action.board;
            break;
    }

    return newState;
}

export default createStore(reducer, applyMiddleware(thunk));