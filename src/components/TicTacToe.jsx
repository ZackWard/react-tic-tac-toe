import React from "react";

import Nav from "./Nav.jsx";
import DialogBox from "./DialogBox.jsx";
import TTTCell from "./TTTCell.jsx";

export default function TicTacToe(props) {

    let clickCell = (position) => {
        props.makePlay(position, props.playerMark);
    };

    return (
        <div>
            <Nav />
            <DialogBox chooseMark={props.changePlayerMark}/>
            <div className="board">
                <table>
                    <tbody>
                        <tr>
                            <TTTCell position={0} mark={props.board[0]} clickHandler={clickCell} />
                            <TTTCell className="middle" position={1} mark={props.board[1]} clickHandler={clickCell} />
                            <TTTCell position={2} mark={props.board[2]} clickHandler={clickCell} />
                        </tr>
                        <tr className="middle">
                            <TTTCell position={3} mark={props.board[3]} clickHandler={clickCell} />
                            <TTTCell className="middle" position={4} mark={props.board[4]} clickHandler={clickCell} />
                            <TTTCell position={5} mark={props.board[5]} clickHandler={clickCell} />
                        </tr>
                        <tr>
                            <TTTCell position={6} mark={props.board[6]} clickHandler={clickCell} />
                            <TTTCell className="middle" position={7} mark={props.board[7]} clickHandler={clickCell} />
                            <TTTCell position={8} mark={props.board[8]} clickHandler={clickCell} />
                        </tr>
                    </tbody>
                </table>
                <div id="options">
                    <button data-toggle="modal" data-target="#dialog" onClick={props.resetBoard} className="btn btn-default">Reset</button>
                </div>
            </div>
        </div>
    );
};