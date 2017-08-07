import React from "react";

import TTTCell from "./TTTCell.jsx";

export default class Multiplayerboard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="board">
                <table>
                    <tbody>
                        <tr>
                            <TTTCell  position={0} mark={this.props.board[0]} clickHandler={this.props.clickHandler} />
                            <TTTCell  className="middle" position={1} mark={this.props.board[1]} clickHandler={this.props.clickHandler} />
                            <TTTCell  position={2} mark={this.props.board[2]} clickHandler={this.props.clickHandler} />
                        </tr>
                        <tr className="middle">
                            <TTTCell  position={3} mark={this.props.board[3]} clickHandler={this.props.clickHandler} />
                            <TTTCell  className="middle" position={4} mark={this.props.board[4]} clickHandler={this.props.clickHandler} />
                            <TTTCell  position={5} mark={this.props.board[5]} clickHandler={this.props.clickHandler} />
                        </tr>
                        <tr>
                            <TTTCell  position={6} mark={this.props.board[6]} clickHandler={this.props.clickHandler} />
                            <TTTCell className="middle" position={7} mark={this.props.board[7]} clickHandler={this.props.clickHandler} />
                            <TTTCell position={8} mark={this.props.board[8]} clickHandler={this.props.clickHandler} />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}