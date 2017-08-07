import React from "react";

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // prebind methods
    }

    invite(player) {
        console.log("Sending invitation to play TTT with " + player);
    }

    render() {
        if (!this.props.loggedIn) {
            return null;
        }

        if (this.props.playing) {
            return null;
        }

        let otherPlayers = this.props.playerList.filter(player => player != this.props.username);
        let players = otherPlayers.map((player, index) => {
            return <li key={index}><a href="#" onClick={(e) => {e.preventDefault(); this.props.handleInvitation(this.props.username, player);}}>{player}</a></li>
        });

        return (
            <div id="multiplayer-player-list">
                <p>You're currently logged in as {this.props.username}.</p>
                <p>Other players:</p>
                <hr />
                <ul>
                    {players}
                </ul>
            </div>
        );
    }
}