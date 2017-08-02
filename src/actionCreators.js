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