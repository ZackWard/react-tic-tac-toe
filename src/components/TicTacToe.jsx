import React from "react";

import Nav from "./Nav.jsx";
import DialogBox from "./DialogBox.jsx";
import Board from "./Board.jsx";

import TTTEngine from "./TTTEngine.js";

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.gameEngine = new TTTEngine();
        this.gameEngine.setPlayer("O");
        this.state = {
            playerMark: "X",
            board: [null, null, null, null, null, null, null, null, null]
        };

        // bind methods so that 'this' will refer to this component in the method.
        this.handleClick = this.handleClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.chooseMark = this.chooseMark.bind(this);
    }

    chooseMark(mark) {
        // Choosing X or O only happens at the beginning of the game, so if the user has chosen 'O', we need to go ahead and make the first move.
        this.gameEngine.setPlayer(mark == "X" ? "O" : "X");
        this.setState({
            playerMark: mark
        });
    }

    resetGame() {
        console.log("Resetting game");
        this.setState({
            board: [null, null, null, null, null, null, null, null, null]
        });
    }

    handleClick(position) {
        let computerMark = this.state.playerMark == "X" ? "O" : "X";

        console.log("From TTT: Got click for position #" + position);

        // Return early if this position isn't empty
        if (this.state.board[position] != null) {
            console.log("Sorry, that position is already occupied.");
            return;
        }

        // Update the board with the player's move
        let newBoard = JSON.parse(JSON.stringify(this.state.board));
        newBoard[position] = this.state.playerMark;

        // Check to see if the player won.
        if (this.gameEngine.checkWinner(newBoard) == this.state.playerMark) {
            console.log("The player won! This should never happen. The game is broken.");
        }

        // Get the computers move and update the board with it
        let computerMove = this.gameEngine.decideMove(newBoard);
        console.log("Computer move: " + computerMove);
        newBoard[computerMove] = computerMark;

        // Check to see if the computer won
        if (this.gameEngine.checkWinner(newBoard) == computerMark) {
            console.log("The computer won! I'm not surprised.");
        }

        this.setState({
            board: newBoard
        });
    }

    render() {
        return (
            <div>
                <Nav />
                <DialogBox chooseMark={this.chooseMark}/>
                <Board data={this.state.board} handleClick={this.handleClick} resetGame={this.resetGame}/>
            </div>
        );
    }
}

module.exports = TicTacToe;