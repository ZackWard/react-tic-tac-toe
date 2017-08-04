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
        return this.minimax(board, this.player).position;
    }

    minimax(board, player, depth=1) {
        // First, check to see if the game is over. This could happen if somebody won, or if there are no moves left.
        // minimax can only evaluate a finished game. If the game is over, return the value of the result.
        if (this.gameOver(board)) {
            return {
                score: this.score(board, player),
                depth: depth
            };
        }

        // Ok, we couldn't score this board, so we need to try every possible position, check the score on each one,
        // and choose the best one. 
        let moves = [];
        this.findPotentialMoves(board).forEach(possibleMovePosition => {
            let possibleBoard = board.slice(0);
            possibleBoard[possibleMovePosition] = player;
            let possibleMoveResults = this.minimax(possibleBoard, player == 'X' ? 'O' : 'X', depth + 1);
            moves.push({
                position: possibleMovePosition,
                score: possibleMoveResults.score,
                depth: possibleMoveResults.depth
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
        // First, find the highest score
        let bestScore = moves.reduce((score, move) => { return move.score > score ? move.score : score }, -100);

        // Then, filter out any score that is less than the best
        let potentialMoves = moves.filter(move => move.score == bestScore);

        // Now, we have an array with all of the best moves, but possible at varying depths. A larger depth indicates more moves to win.
        // We want the fastest win, therefore we want the lowest depth
        // move a depth = 6, move b depth = 4. We want b to be sorted to the first in the array
        return potentialMoves.sort((a, b) => a.depth - b.depth)[0];
    }

    getLowestScoringMove(moves) {
        // First, get the lowest score
        let lowestScore = moves.reduce((score, move) => { return move.score < score ? move.score : score }, 100);

        // Filter out any score that is higher than the best
        let potentialMoves = moves.filter(move => move.score == lowestScore);

        // Find the move with the highest depth
        return potentialMoves.sort((a, b) => b.depth - a.depth)[0];
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
        let winner = this.findWinner(board).winner;
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
        if (this.findWinner(board).winner != false || this.findPotentialMoves(board).length < 1) {
            return true;
        }
        return false;
    }

    findWinner(board) {
        // Check to see if somebody has won this board
        let winner = false;
        let winningSpaces = null;

        this.winningCombos.forEach(combo => {
            if (board[combo[0]] != null && board[combo[0]] == board[combo[1]] && board[combo[1]] == board[combo[2]]) {
                winner = board[combo[0]];
                winningSpaces = [combo[0], combo[1], combo[2]];
            }
        });

        return {
            winner,
            winningSpaces
        };
    }
}