const winner = document.getElementById("staticBackdropLabel");


const cells = document.querySelectorAll(".cell");
const turnInfo = document.getElementById("turn");


const players = {
    x: "x",
    o: "o",
}
let currentPlayer = "";
let isGameRunning = false;

let boardState = Array(9).fill("");

const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

function initializeGame() {
    cells.forEach(cell => {
        cell.addEventListener("click", clickCell);
    });
}


function startGame() {
    isGameRunning = true;
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = players.x;
    if (currentPlayer == players.x){
        turnInfo.textContent = "Ход крестиков";
    } else {
        turnInfo.textContent = "Ход ноликов";
    };
}


function clickCell() {
    if(!isGameRunning) {
        return;
    }
    if(this.textContent) {
        return;
    }
    this.textContent = currentPlayer;
    const cellIndex = this.dataset.cellIndex;
    boardState[cellIndex] = currentPlayer;
    if(checkGameOver()) {
        return finishGame();
    }
     if (currentPlayer === players.x) {
        currentPlayer = players.o;
     } else {
        currentPlayer = players.x;
     }
     if (currentPlayer == players.x){
        turnInfo.textContent = "Ход крестиков";
    } else {
        turnInfo.textContent = "Ход ноликов";
    };
}

function checkLine(line) {
    const [a, b, c] = line;

    const cellA = boardState[a];
    const cellB = boardState[b];
    const cellC = boardState[c];
    if([cellA, cellB, cellC].includes("")) {
        return false;
    }
    return cellA === cellB && cellB === cellC;
}


function checkGameOver() {
    for(const line of winLines) {
        if(checkLine(line)) {
            if (currentPlayer == players.x){
                
                winner.textContent = "Победа крестиков!";
            } else {
                winner.textContent  = "Победа ноликов!";
            };
            $('#myModal').modal('show');
            return true;
        }
    }
    if(!boardState.includes("")) {
        winner.textContent = "Ничья!";
        $('#myModal').modal('show');
        return true;
    }
}

function finishGame() {
    isGameRunning = false;
    turnInfo.textContent = "";
}



window.addEventListener("load", () => {
    initializeGame();
    startGame();
});





