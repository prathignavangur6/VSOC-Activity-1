const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.disabled = true;

    checkWinner();
}

function checkWinner() {
    let winnerFound = false;

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winnerFound = true;
            break;
        }
    }

    if (winnerFound) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        disableCells();
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function disableCells() {
    cells.forEach((cell) => {
        cell.disabled = true;
    });
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.disabled = false;
    });
}