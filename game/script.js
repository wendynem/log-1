let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

document.addEventListener('DOMContentLoaded', init);

function init() {
    createBoard();
}

function createBoard() {
    const boardContainer = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardContainer.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] === '' && !isGameOver()) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (isWinner()) {
            document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;
            showNewGameButton();
        } else if (isBoardFull()) {
            document.getElementById('result').textContent = "It's a draw!";
            showNewGameButton();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function isWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function isGameOver() {
    return isWinner() || isBoardFull();
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('result').textContent = '';
    document.getElementById('newGameBtn').style.display = 'none';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

function showNewGameButton() {
    const newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.style.display = 'block';
    newGameBtn.addEventListener('click', resetGame);
}
