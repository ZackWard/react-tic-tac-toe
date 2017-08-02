import React from "react";

import TTTCell from "./TTTCell.jsx";

class Board extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="board">
                <table>
                    <tbody>
                        <tr>
                            <TTTCell clickHandler={this.props.handleClick} position={0} mark={this.props.data[0]} />
                            <TTTCell className="middle" clickHandler={this.props.handleClick} position={1} mark={this.props.data[1]} />
                            <TTTCell clickHandler={this.props.handleClick} position={2} mark={this.props.data[2]} />
                        </tr>
                        <tr className="middle">
                            <TTTCell clickHandler={this.props.handleClick} position={3} mark={this.props.data[3]} />
                            <TTTCell className="middle" clickHandler={this.props.handleClick} position={4} mark={this.props.data[4]} />
                            <TTTCell clickHandler={this.props.handleClick} position={5} mark={this.props.data[5]} />
                        </tr>
                        <tr>
                            <TTTCell clickHandler={this.props.handleClick} position={6} mark={this.props.data[6]} />
                            <TTTCell className="middle" clickHandler={this.props.handleClick} position={7} mark={this.props.data[7]} />
                            <TTTCell clickHandler={this.props.handleClick} position={8} mark={this.props.data[8]} />
                        </tr>
                    </tbody>
                </table>
                <div id="options">
                    <button data-toggle="modal" data-target="#dialog" onClick={this.props.resetGame} className="btn btn-default">Reset</button>
                </div>
            </div>
        );
    }
}

module.exports = Board;