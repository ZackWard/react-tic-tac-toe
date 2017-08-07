import {connect} from "react-redux";
import TicTacToe from "../components/TicTacToe.jsx";
import {handlePlayerMove, changePlayerMark, undoMove, redoMove, resetBoard} from "../actionCreators.js";
import {doMultiplayerMove} from "../multiplayerActionCreators.js";

const mapStateToProps = (state) => {
    return {
        playerMark: state.playerMark,
        board: state.game.present.board,
        winner: state.game.present.winner,
        winningSpaces: state.game.present.winningSpaces,
        failGifLoading: state.failNotification.loading,
        failGif: state.failNotification.source,
        undoAvailable: state.game.past.length > 0,
        redoAvailable: state.game.future.length > 0,
        multiplayer: state.multiplayer.playing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePlayerMark: (mark) => {
            // If the player is changing the mark that they're using, we know we need to reset the board (to prevent cheating)
            dispatch(resetBoard());
            dispatch(changePlayerMark(mark));
        },
        makePlay: (position, player) => {
            dispatch(handlePlayerMove(position, player));
        },
        doMultiplayerMove: (position) => {
            dispatch(doMultiplayerMove)
        },
        resetBoard: () => {
            dispatch(resetBoard());
        },
        undoMove: () => {
            dispatch(undoMove());
        },
        redoMove: () => {
            dispatch(redoMove());
        }
    };
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
export default GameContainer;