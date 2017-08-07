import React from "react";

export default class InvitationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.loggedIn) {
            return null;
        }

        if (this.props.playing) {
            return null;
        }

        let invitations = this.props.invitations.map((invite, index) => {
            return <li key={index}><a href="#" onClick={(e) => {e.preventDefault(); this.props.acceptInvitation(invite);}}>{invite}</a></li>
        });

        return (
            <div id="multiplayer-invitation-list">
                <p>The following players have invited you to play:</p>
                <hr />
                <ul>
                    {invitations}
                </ul>
            </div>
        );
    }
}