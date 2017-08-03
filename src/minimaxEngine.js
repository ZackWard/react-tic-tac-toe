export default class minimaxEngine {

    constructor(player = 'O') {
        this.winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        this.player = player;
    }

    setPlayer(player) {
        this.player = player;
    }

    findBestMove(board) {
        console.log("Finding best move for board:");
        this.printBoard(board);
        return this.minimax(board, this.player).position;
    }

    minimax(board, player) {
        // First, check to see if the game is over. This could happen if somebody won, or if there are no moves left.
        // minimax can only evaluate a finished game. If the game is over, return the value of the result.
        if (this.gameOver(board)) {
            return {score: this.score(board, player)};
        }

        // Ok, we couldn't score this board, so we need to try every possible position, check the score on each one,
        // and choose the best one. 
        let moves = [];
        this.findPotentialMoves(board).forEach(possibleMove => {
            let possibleBoard = board.slice(0);
            possibleBoard[possibleMove] = player;
            moves.push({
                position: possibleMove,
                score: this.minimax(possibleBoard, player == 'X' ? 'O' : 'X').score
            });
        });
        
        // We should now have an array of a list of moves along with their scores. 
        // If, in this recursion, we're the "player", we want to choose the highest score
        // If we're the "opponent", we want to choose the lowest score
        if (player == this.player) {
            return this.getHighestScoringMove(moves);
        } else {
            return this.getLowestScoringMove(moves);
        }
    }

    getHighestScoringMove(moves) {
        return moves.sort((a, b) => b.score - a.score)[0];
    }

    getLowestScoringMove(moves) {
        return moves.sort((a, b) => a.score - b.score)[0];
    }

    findPotentialMoves(board) {
        let potentialMoves = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                potentialMoves.push(i);
            }
        }
        return potentialMoves;
    }

    score(board) {
        let winner = this.findWinner(board);
        if (this.player == winner) {
            return 10;
        } else if (winner == false) {
            return 0;
        } else {
            // If we haven't won, but the game is over, we've lost
            return -10;
        }
    }

    gameOver(board) {
        if (this.findWinner(board) != false || this.findPotentialMoves(board).length < 1) {
            return true;
        }
        return false;
    }

    findWinner(board) {
        // Check to see if somebody has won this board
        let winner = false;
        this.winningCombos.forEach(combo => {
            if (board[combo[0]] != null && board[combo[0]] == board[combo[1]] && board[combo[1]] == board[combo[2]]) {
                winner = board[combo[0]];
            }
        });
        return winner;
    }

    printBoard(gameBoard) {
        let board = gameBoard.map(position => {
            if (position == null) {
                return " ";
            } else {
                return position;
            }
        });

        console.log(" ");
        console.log(" " + board[0] + " | " + board[1] + " | " + board[2]);
        console.log(" ---------");
        console.log(" " + board[3] + " | " + board[4] + " | " + board[5]);
        console.log(" ---------");
        console.log(" " + board[6] + " | " + board[7] + " | " + board[8]);
        console.log(" ");
    }
}

// // Testing stuff
// let engineTest = new minimaxEngine('X');
// let testBoard = ['O', null, 'X', 'X', null, 'X', null, 'O', 'O'];

// engineTest.printBoard(testBoard);
// console.log("Recommended move: " + engineTest.findBestMove(testBoard));