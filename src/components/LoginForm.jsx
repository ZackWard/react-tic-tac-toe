import React from "react";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    render() {
        if (this.props.loggedIn) {
            return null;
        }
        return (
            <div id="multiplayer-login">
                <input placeholder="Type a username to play multiplayer" type="text" value={this.state.username} onChange={this.handleChange} />
                <button onClick={() => {this.props.attemptLogin(this.state.username)}}>Log in</button>
            </div>
        );
    }
}