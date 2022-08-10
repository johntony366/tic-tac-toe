const Player = (sign) => {
    this.sign = sign;
    const getSign = () => sign;

    return { getSign };
};

const gameBoard = (() => {
    const squares = ["", "", "", "", "", "", "", "", ""];

    const setSquare = (index, sign) => {
        if (squares[index] != "") {
            return;
        } else {
            squares[index] = sign;
        }
    };

    const getSquare = (index) => {
        return squares[index];
    };

    const reset = () => {
        for (let index = 0; index < squares.length; index++) {
            squares[index] = "";
        }
    };

    return { setSquare, getSquare, reset };
})();

const displayController = (() => {
    const squares = document.querySelectorAll(".square");
    const message = document.querySelector(".messageBox");
    const restartButton = document.querySelector(".restart-button");

    squares.forEach((square) => {
        square.addEventListener("click", (e) => {
            if (square.textContent != "" || gameController.getGameOver()) {
                return;
            }
            gameController.playRound(parseInt(square.dataset.index));
            renderGameBoard();
        });
    });

    restartButton.addEventListener('click', () => {
        gameBoard.reset();
        gameController.reset();
        resetMessage();

        renderGameBoard();
    })

    const renderGameBoard = () => {
        for (let index = 0; index < squares.length; index++) {
            squares[index].textContent = gameBoard.getSquare(index);
        }
    };

    const setResultMessage = (sign) => {
        setMessage(`Player ${sign} has won!`);
    };

    const setDrawMessage = () => {
        setMessage('The game has ended in a draw!');
    }

    const setRoundMessage = (sign) => {
        setMessage(`Player ${sign}'s turn`);
    }
    
    const resetMessage = () => {
        setMessage(`Player X's turn`);
    };

    const setMessage = (msg) => {
        message.textContent = msg;
    };

    return { renderGameBoard, setResultMessage, setDrawMessage, setRoundMessage };
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;
    let gameOver = false;

    const playRound = (squareIndex) => {
        gameBoard.setSquare(squareIndex, getCurrentPlayerSign());
        if (checkGameOver(squareIndex)) {
            gameOver = true;
            return;
        }
        ++round;
        displayController.setRoundMessage(getCurrentPlayerSign());
    };

    const checkGameOver = (squareIndex) => {
        if (round == 9) {
            displayController.setDrawMessage();
            return true;
        } else if (checkWinner(squareIndex)) {
            displayController.setResultMessage(
                getCurrentPlayerSign()
            );
            return true;
        } else {
            return false;
        }
    };

    const checkWinner = (squareIndex) => {
        const winningCombinations = [
            // rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // cols
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations
            .filter((combination) => {
                return combination.includes(squareIndex);
            }) //This returns array of winning combinations which contain the index
            .some((combination) => {
                //Checking whether any are satisfied by current game board.
                return combination.every((squareNumber) => {
                    return (
                        gameBoard.getSquare(squareNumber) ==
                        getCurrentPlayerSign()
                    );
                });
            });
    };

    const getGameOver = () => {
        return gameOver;
    };

    const getCurrentPlayerSign = () => {
        if (round % 2 == 1) {
            return "X";
        } else {
            return "O";
        }
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    }

    return { playRound, getGameOver, getCurrentPlayerSign, reset };
})();
