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

    const renderGameBoard = () => {
        for (let index = 0; index < squares.length; index++) {
            squares[index].textContent = gameBoard.getSquare(index);
        }
    };

    const setMessage = (msg) => {};
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;
    let gameOver = false;

    const playRound = (squareIndex) => {
        gameBoard.setSquare(squareIndex, getCurrentPlayerSign());
        if (checkGameOver()) {
            // Game is over
            gameOver = true;
            // display work
            return;
        }
        ++round;
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
})();
