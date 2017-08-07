export const websocketConnected = () => {
    return {
        type: "MULTIPLAYER_ESTABLISH_CONNECTION"
    };
};

export const attemptLogin = username => {
    return function (dispatch) {

    };
};

export const handleMessage = (socket, rawMessage) => {
    return function (dispatch, getState) {
        let message = JSON.parse(rawMessage);

        // This is where we will respond to events coming in from the multiplayer server.
        // In most cases, we're just passing actions to the reducer
        console.log("In handleMessage");
        console.log(message);

        switch (message.type) {
            case "LOGIN_SUCCESS":
                dispatch({
                    type: "MULTIPLAYER_LOGIN_SUCCESS",
                    username: message.user
                });
                break;
            case "MULTIPLAYER_UPDATE_PLAYER_LIST":
                dispatch({
                    type: "MULTIPLAYER_UPDATE_PLAYER_LIST",
                    playerList: message.players
                });
                break;
            case "MULTIPLAYER_NEW_INVITATION": 
                dispatch({
                    type: "MULTIPLAYER_NEW_INVITATION",
                    from: message.from
                });
                break;
            case "MULTIPLAYER_GAME_BEGIN":
                dispatch({
                    type: "MULTIPLAYER_GAME_BEGIN",
                    playerMark: message.playerMark
                });
                break;
            case "MULTIPLAYER_BOARD_UPDATE":
                dispatch({
                    type: "MULTIPLAYER_BOARD_UPDATE",
                    board: message.board
                });
        }
    };
}