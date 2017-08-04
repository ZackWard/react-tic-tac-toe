import React from "react";

import Nav from "./Nav.jsx";
import DialogBox from "./DialogBox.jsx";
import {FailNotification} from "./FailNotification.jsx";
import TTTCell from "./TTTCell.jsx";

export default class TicTacToe extends React.Component {

    constructor(props) {
        super(props);

        // bind methods
        this.clickCell = this.clickCell.bind(this);
    }

    clickCell(position) {
        this.props.makePlay(position, this.props.playerMark);
    }

    componentDidMount() {
        console.log("Loaded, resetting board...");
        this.props.resetBoard();
    }

    render() {

        let openSpaces = this.props.board.filter(space => space == null).length;
        let resetButtonText = "Reset";
        if (openSpaces < 1 || this.props.winner != null) {
            resetButtonText = "Try again?";
        }

        return (
            <div>
                { ! this.props.failGifLoading && <FailNotification player={this.props.playerMark} winner={this.props.winner} failGif={this.props.failGif} /> }
                <Nav />
                <DialogBox chooseMark={this.props.changePlayerMark}/>
                <div className="board">
                    <table>
                        <tbody>
                            <tr>
                                <TTTCell winningSpaces={this.props.winningSpaces} position={0} mark={this.props.board[0]} clickHandler={this.clickCell} />
                                <TTTCell winningSpaces={this.props.winningSpaces} className="middle" position={1} mark={this.props.board[1]} clickHandler={this.clickCell} />
                                <TTTCell winningSpaces={this.props.winningSpaces} position={2} mark={this.props.board[2]} clickHandler={this.clickCell} />
                            </tr>
                            <tr className="middle">
                                <TTTCell winningSpaces={this.props.winningSpaces} position={3} mark={this.props.board[3]} clickHandler={this.clickCell} />
                                <TTTCell winningSpaces={this.props.winningSpaces} className="middle" position={4} mark={this.props.board[4]} clickHandler={this.clickCell} />
                                <TTTCell winningSpaces={this.props.winningSpaces} position={5} mark={this.props.board[5]} clickHandler={this.clickCell} />
                            </tr>
                            <tr>
                                <TTTCell winningSpaces={this.props.winningSpaces} position={6} mark={this.props.board[6]} clickHandler={this.clickCell} />
                                <TTTCell winningSpaces={this.props.winningSpaces} className="middle" position={7} mark={this.props.board[7]} clickHandler={this.clickCell} />
                                <TTTCell winningSpaces={this.props.winningSpaces} position={8} mark={this.props.board[8]} clickHandler={this.clickCell} />
                            </tr>
                        </tbody>
                    </table>
                    <div id="options">
                        <button disabled={! this.props.undoAvailable } onClick={this.props.undoMove} className="btn btn-default">Undo</button>
                        <button onClick={this.props.resetBoard} className="btn btn-default">{resetButtonText}</button>
                        <button disabled={! this.props.redoAvailable } onClick={this.props.redoMove} className="btn btn-default">Redo</button>
                        <br />
                        <button className="btn btn-default" data-toggle="modal" data-target="#dialog">Options</button>
                    </div>
                </div>
            </div>
        );
    }
};