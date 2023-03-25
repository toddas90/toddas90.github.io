// Define the grid size and cell size
const GRID_SIZE = 30;
const CELL_SIZE = 20;

// Define the colors for the cells
const DEAD_COLOR = 'white';

// Get the game board element
const gameBoard = document.getElementById('gameBoard') as HTMLElement;

// Create the grid
let grid: { state: number, color: string }[][] = [];
for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
        grid[i][j] = { state: Math.round(Math.random()), color: DEAD_COLOR };
    }
}

// Draw the grid
function drawGrid() {
    console.log("Draw grid");
    let html = '';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            html += `<div class="cell" id="cell-${i}-${j}" style="background-color:${grid[i][j].color}"></div>`;
        }
    }

    if (gameBoard !== null) {
        gameBoard.innerHTML = html;
    }

    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            const [row, col] = (cells[i].id.split('-').slice(1).map(Number) as [number, number]);
            grid[row][col].state = grid[row][col].state === 0 ? 1 : 0;
            grid[row][col].color = grid[row][col].state === 1 ? getRandomColor() : DEAD_COLOR;
            (cells[i] as HTMLElement).style.backgroundColor = grid[row][col].color;
        });
    }
}

// Update the grid
function updateGrid() {
    console.log("Update grid");
    let newColor = getRandomColor();
    const newGrid: { state: number, color: string }[][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        newGrid[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j].state === 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = { state: 0, color: DEAD_COLOR };
            } else if (grid[i][j].state === 0 && neighbors === 3) {
                newGrid[i][j] = { state: 1, color: newColor };
            } else {
                newGrid[i][j] = { state: grid[i][j].state, color: grid[i][j].color };
            }
        }
    }
    grid = newGrid;
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        const [row, col] = (cells[i].id.split('-').slice(1).map(Number) as [number, number]);
        (cells[i] as HTMLElement).style.backgroundColor = grid[row][col].color;
    }
}

// Get a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Count the neighbors of a cell
function countNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
                count += grid[newRow][newCol].state;
            }
        }
    }
    return count;
}

// Start the game
let intervalId: number;
function startGame() {
    console.log("Start game");
    intervalId = setInterval(() => {
        updateGrid();
    }, 100);
}

// Pause the game
function pauseGame() {
    console.log("Pause game");
    clearInterval(intervalId);
}

// Reset the game
function resetGame() {
    console.log("Reset game");
    grid = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = { state: Math.round(Math.random()), color: DEAD_COLOR };
        }
    }
    const cells = document.getElementsByClassName('cell') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = DEAD_COLOR;
    }
    pauseGame();
}

window.onload = () => {
    // Add event listeners to the buttons
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (startBtn === null || pauseBtn === null || resetBtn === null) {
        throw new Error('Could not find buttons');
    }

    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    resetBtn.addEventListener('click', resetGame);

    // Draw the grid initially
    drawGrid();
}