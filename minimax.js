function minimax(inputGame, isMaximizing, depth = 100) {
    // console.log(inputGame);
    // console.log(isMaximizing);
    if (isTerminalState(inputGame) || depth <= 0)
        return [evaluateGame(inputGame), ""];

    let bestValue = 0;
    let bestMove = -1;
    let symbol = "";
    if (isMaximizing) {
        bestValue = -Infinity;
        symbol = "X";
    } else {
        bestValue = Infinity;
        symbol = "O";
    }

    const allAvailableMoves = computerAvailableMoves(inputGame);
    // console.log(allAvailableMoves);
    allAvailableMoves.forEach((move) => {
        const newInputGame = deepCopy(inputGame);
        // console.log(newGame);
        computerMakeMove(newInputGame, move, symbol);
        const hypotheticalValue = minimax(
            newInputGame,
            !isMaximizing,
            depth - 1
        )[0];
        // console.log(`${isMaximizing}: ${hypotheticalValue}`);

        if (isMaximizing) {
            if (hypotheticalValue > bestValue) {
                bestValue = hypotheticalValue;
                bestMove = move;
            }
        } else {
            if (hypotheticalValue < bestValue) {
                bestValue = hypotheticalValue;
                bestMove = move;
            }
        }
    });

    return [bestValue, bestMove];
}

function isTerminalState(gameState) {
    return (
        hasWon(gameState, "X") ||
        hasWon(gameState, "O") ||
        computerAvailableMoves(gameState).length <= 0
    );
}

function hasWon(gameBoard, symbol) {
    // console.log(gameBoard);
    return WINNING_COMBINATIONS.some((combination) => {
        // console.log(combination);
        return combination.every((index) => {
            // console.log(index);
            const numRows = gameBoard.length; // Total number of rows
            const numCols = gameBoard[0].length; // Total number of columns assuming matrix is not jagged

            // Calculate row and column from linearIndex
            const row = Math.floor(index / numCols);
            const col = index % numCols;

            // Access and return the cell value if indices are valid
            if (row < numRows && col < numCols) {
                return gameBoard[row][col] === symbol;
            }
        });
    });
}

function computerAvailableMoves(gameBoard) {
    const gameBoardArray = gameBoard.flat(1);
    // console.log(gameBoardArray);

    return gameBoardArray
        .map((cell, index) => ({ symbol: cell, index }))
        .filter((cell) => cell.symbol === "")
        .map((div) => div.index);
}

function evaluateGame(gameBoard) {
    // console.log(gameBoard);
    let gameEval = null;
    if (hasWon(gameBoard, "X")) gameEval = 1;
    else if (hasWon(gameBoard, "O")) gameEval = -1;
    else gameEval = 0;

    // printGameBoard(gameBoard);
    // console.log(gameEval);
    return gameEval;
}

function htmlGameToArray() {
    const gameArray = [];
    let cellIndex = 0;
    const cellsAsArray = [...cellElements];
    for (let i = 0; i < 3; i++) {
        const rowArray = [];
        for (let j = 0; j < 3; j++) {
            let symbol = "";
            if (cellsAsArray[cellIndex].classList.contains(X_CLASS)) {
                symbol = "X";
            } else if (
                cellsAsArray[cellIndex].classList.contains(CIRCLE_CLASS)
            ) {
                symbol = "O";
            }
            rowArray.push(symbol);
            cellIndex++;
        }
        gameArray.push(rowArray);
    }
    // console.log(gameArray);
    return gameArray;
}

function availableMoves() {
    return [...cellElements]
        .map((cell, index) => ({ cell, index }))
        .filter(
            (div) =>
                !div.cell.classList.contains(X_CLASS) &&
                !div.cell.classList.contains(CIRCLE_CLASS)
        )
        .map((div) => div.index);
}

// htmlGameToArray();
// console.log(availableMoves());

function makeMove(move, symbol) {
    cellElements[move].classList.add(
        symbol === "X" ? X_CLASS : symbol === "O" ? CIRCLE_CLASS : null
    );
}

function computerMakeMove(gameBoard, move, symbol) {
    if (symbol === "X" || symbol === "O") {
        const numRows = gameBoard.length; // Total number of rows
        const numCols = gameBoard[0].length; // Total number of columns assuming matrix is not jagged

        // Calculate row and column from linearIndex
        const row = Math.floor(move / numCols);
        const col = move % numCols;

        // Access and return the cell value if indices are valid
        if (row < numRows && col < numCols) {
            gameBoard[row][col] = symbol;
        }
    }
}

function printGameBoard(gameBoard) {
    // console.log(gameBoard);
    let gameString = "";
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            gameString +=
                gameBoard[i][j] === "" ? " - " : " " + gameBoard[i][j] + " ";
        }
        gameString += "\n";
    }
    console.log(gameString);
    // return gameString
}

function deepCopy(nestedArray) {
    return JSON.parse(JSON.stringify(nestedArray));
}

function evaluateGameState(gameState) {
    // console.log(gameBoard);
    let gameEval = null;
    if (hasWon(gameState, "X")) gameEval = Infinity;
    else if (hasWon(gameState, "O")) gameEval = -Infinity;
    else gameEval = evaluateCurrentGameState(gameState);

    // printGameBoard(gameBoard);
    // console.log(gameEval);
    return gameEval;
}

function evaluateCurrentGameState(gameState) {}

const my_board = [
    ["", "", "X"],
    ["", "", ""],
    ["", "", ""],
];

const new_game = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const x_winning = [
    ["X", "", "O"],
    ["", "O", ""],
    ["", "", "X"],
];

const o_winning = [
    ["X", "X", "O"],
    ["", "X", ""],
    ["", "O", "O"],
];

const x_won = [
    ["X", "O", ""],
    ["", "X", "O"],
    ["", "", "X"],
];

const o_won = [
    ["O", "X", ""],
    ["O", "X", "X"],
    ["O", "", ""],
];

const tie = [
    ["X", "X", "O"],
    ["O", "O", "X"],
    ["X", "O", "X"],
];

// printGameBoard(my_board);
// computerMakeMove(my_board, 5-1, "O");
// console.log(computerAvailableMoves(my_board));
// computerMakeMove(my_board, 1-1, "X");
// computerMakeMove(my_board, 4-1, "O");
// computerMakeMove(my_board, 2-1, "X");
// printGameBoard(my_board);
// console.log(hasWon(my_board, "X"));
// console.log(hasWon(my_board, "O"));

// console.log(minimax(x_winning, true));
// console.log(minimax(o_winning, true));
// console.log(minimax(new_game, true));
// console.log(minimax(new_game, true, 3));

// const board1_status = isTerminalState(new_game);
// const board2_status = isTerminalState(x_won);
// const board3_status = isTerminalState(o_won);
// const board4_status = isTerminalState(tie);
// console.log(board1_status);
// console.log(board2_status);
// console.log(board3_status);
// console.log(board4_status);

// if (board1_status) console.log(evaluateGame(new_game));

// if (board2_status) console.log(evaluateGame(x_won));
// if (board3_status) console.log(evaluateGame(o_won));
// if (board4_status) console.log(evaluateGame(tie));
