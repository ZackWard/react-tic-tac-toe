import React from "react";

import LoginForm from "./LoginForm.jsx";
import PlayerList from "./PlayerList.jsx";
import InvitationList from "./InvitationList.jsx";
import MultiplayerBoard from "./MultiplayerBoard.jsx";

let wssUrl = "ws://localhost:8080";

export default class Multiplayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameForm: ""
        };

        // Keep our WebSocket as a property of the component
        this.connection = null;

        this.attemptLogin = this.attemptLogin.bind(this);
        this.handleInvitation = this.handleInvitation.bind(this);
        this.acceptInvitation = this.acceptInvitation.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.connection = new WebSocket(wssUrl);
        this.connection.onopen = () => {
            console.log("Client socket open!");
            this.connection.onmessage = this.handleMessage;
            this.props.setConnectionActive();
        };
    }

    componentWillUnmount() {
        console.log("Unmounting Multiplayer Element");
        this.connection.close();
    }

    handleInvitation(from, to) {
        console.log("Handling invitation from " + from + " to " + to);
        let invitationRequest = {
            action: "INVITATION",
            from,
            to
        };
        this.connection.send(JSON.stringify(invitationRequest));
    }

    acceptInvitation(from) {
        console.log("Accepting invitation from " + from);

        let message = {
            action: "ACCEPT_INVITATION",
            from,
            to: this.props.username
        };

        this.connection.send(JSON.stringify(message));
    }

    attemptLogin(user) {
        // Go ahead and fire off the login request, let Redux handle the result when it comes in        
        let message = {
            action: "LOGIN",
            user
        };

        this.connection.send(JSON.stringify(message));
    }

    handleMessage(event) {
        this.props.handleMessage(this.connection, event.data);
    }

    handleClick(position) {
        console.log("Handling multiplayer click on position #" + position + "!");
        let move = {
            action: "MAKE_MOVE",
            player: this.props.username,
            position
        };
        this.connection.send(JSON.stringify(move));
    }

    render() {
        return (
            <div id="multiplayer">
                <LoginForm loggedIn={this.props.loggedIn} attemptLogin={this.attemptLogin}/>
                <PlayerList loggedIn={this.props.loggedIn} playing={this.props.playing} username={this.props.username} playerList={this.props.playerList} handleInvitation={this.handleInvitation}/>
                <InvitationList loggedIn={this.props.loggedIn} playing={this.props.playing} invitations={this.props.invitations} acceptInvitation={this.acceptInvitation}/>
                {this.props.playing && <MultiplayerBoard board={this.props.board} clickHandler={this.handleClick}/>}
            </div>
        );
    }
}