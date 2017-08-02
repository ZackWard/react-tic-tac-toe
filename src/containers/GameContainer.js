import {connect} from "react-redux";
import TicTacToe from "../components/TicTacToe.jsx";
import {doPlayerTurn, changePlayerMark, makePlay, resetBoard} from "../actionCreators.js";

console.log(TicTacToe);

const mapStateToProps = (state) => {
    return {
        playerMark: state.playerMark,
        board: state.board
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
            dispatch(makePlay(position, player));
        },
        resetBoard: () => {
            dispatch(resetBoard());
        }
    };
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
export default GameContainer;