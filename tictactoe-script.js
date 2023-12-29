document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetBtn = document.getElementById('reset-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const turnIndicator = document.getElementById('turn-indicator');
    const currentTeamSpan = document.getElementById('current-team');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    board.addEventListener('click', handleCellClick);

    resetBtn.addEventListener('click', resetGame);

    newGameBtn.addEventListener('click', newGame);

    resetGame();

    function handleCellClick(event) {
        const cellIndex = Array.from(board.children).indexOf(event.target);

        if (gameBoard[cellIndex] === '' && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            
            if (checkWin()) {
                turnIndicator.textContent = `Team ${currentPlayer === 'X' ? 'Rot' : 'Blau'} hat gewonnen!`;
                highlightWinningCells();
                gameActive = false;
                newGameBtn.disabled = false;
            } else if (checkDraw()) {
                turnIndicator.textContent = 'Unentschieden!';
                gameActive = false;
                newGameBtn.disabled = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnIndicator.textContent = `Team ${currentPlayer === 'X' ? 'Rot' : 'Blau'} ist am Zug`;
            }

            updateShadow();
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function highlightWinningCells() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            const cells = board.children;
    
            if (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c] && gameBoard[a] !== '') {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
            }
        });
    }

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        Array.from(board.children).forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });

        turnIndicator.textContent = `Team Rot ist am Zug`;
        newGameBtn.disabled = true;

        updateShadow();
    }

    function newGame() {
        newGameBtn.disabled = true;
        resetGame();
    }

    function updateShadow() {
        board.style.boxShadow = currentPlayer === 'X' ? '0 0 400px 20px rgba(255, 0, 0, 0.7)' : '0 0 400px 20px rgba(0, 0, 255, 0.7)';
    }
});
