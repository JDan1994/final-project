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

// Выигрышные комбинации
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

//Инициализация игры
function initializeGame() {
    cells.forEach(cell => {
        cell.addEventListener("click", clickCell);
    });
}

// Функция старта игры
function startGame() {
    isGameRunning = true;
    currentPlayer = players.x;
    if (currentPlayer == players.x){
        turnInfo.textContent = "Ход крестиков";
    } else {
        turnInfo.textContent = "Ход ноликов";
    };
}

// Функция проверяет, можно ли кликнуть по клетке, записывает новое значение в пустую клетку и приводит к смене хода
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
//Функция проверки соответствия победных значений
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

//Проверка окончания игры с помощью перебора массива с победными линиями
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

// Функция запрета подстановки новых крестиков/ноликов по окончании игры
function finishGame() {
    isGameRunning = false;
    turnInfo.textContent = "";
}


// Ожидание полной загрузки страницы
window.addEventListener("load", () => {
    initializeGame();
    startGame();
});





