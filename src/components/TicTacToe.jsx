import React from "react";

import Nav from "./Nav.jsx";
import DialogBox from "./DialogBox.jsx";
import TTTCell from "./TTTCell.jsx";

export default function TicTacToe(props) {

    let clickCell = (position) => {
        props.makePlay(position, props.playerMark);
    };

    let openSpaces = props.board.filter(space => space == null).length;
    let resetButtonText = "Reset";
    if (openSpaces < 1 || props.winner != null) {
        resetButtonText = "Try again?";
    }

    return (
        <div>
            <Nav />
            <DialogBox chooseMark={props.changePlayerMark}/>
            <div className="board">
                <table>
                    <tbody>
                        <tr>
                            <TTTCell winningSpaces={props.winningSpaces} position={0} mark={props.board[0]} clickHandler={clickCell} />
                            <TTTCell winningSpaces={props.winningSpaces} className="middle" position={1} mark={props.board[1]} clickHandler={clickCell} />
                            <TTTCell winningSpaces={props.winningSpaces} position={2} mark={props.board[2]} clickHandler={clickCell} />
                        </tr>
                        <tr className="middle">
                            <TTTCell winningSpaces={props.winningSpaces} position={3} mark={props.board[3]} clickHandler={clickCell} />
                            <TTTCell winningSpaces={props.winningSpaces} className="middle" position={4} mark={props.board[4]} clickHandler={clickCell} />
                            <TTTCell winningSpaces={props.winningSpaces} position={5} mark={props.board[5]} clickHandler={clickCell} />
                        </tr>
                        <tr>
                            <TTTCell winningSpaces={props.winningSpaces} position={6} mark={props.board[6]} clickHandler={clickCell} />
                            <TTTCell winningSpaces={props.winningSpaces} className="middle" position={7} mark={props.board[7]} clickHandler={clickCell} />
                            <TTTCell winningSpaces={props.winningSpaces} position={8} mark={props.board[8]} clickHandler={clickCell} />
                        </tr>
                    </tbody>
                </table>
                <div id="options">
                    <button disabled className="btn btn-default">Undo</button>
                    <button onClick={props.resetBoard} className="btn btn-default">{resetButtonText}</button>
                    <button disabled className="btn btn-default">Redo</button>
                    <br />
                    <button className="btn btn-default" data-toggle="modal" data-target="#dialog">Options</button>
                </div>
            </div>
        </div>
    );
};