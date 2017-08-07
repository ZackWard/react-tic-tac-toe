import {connect} from "react-redux";
import Multiplayer from "../components/Multiplayer.jsx";
import {handleMessage, websocketConnected} from "../multiplayerActionCreators.js";

const mapStateToProps = state => {
    return {
        loggedIn: state.multiplayer.loggedIn,
        playing: state.multiplayer.playing,
        board: state.multiplayer.board,
        username: state.multiplayer.username,
        playerList: state.multiplayer.connectedPlayers,
        invitations: state.multiplayer.invitations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setConnectionActive: () => {
            dispatch(websocketConnected());
        },
        login: (username) => {
            dispatch(attemptLogin(username));
        },
        handleMessage: (socket, message) => {
            dispatch(handleMessage(socket, message));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);