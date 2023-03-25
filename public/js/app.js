"use strict";
// Define the grid size and cell size
const GRID_SIZE = 30;
const CELL_SIZE = 20;
// Define the colors for the cells
const DEAD_COLOR = 'white';
const ALIVE_COLOR = 'black';
// Get the game board element
const gameBoard = document.getElementById('gameBoard');
// Create the grid
let grid = [];
for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
        grid[i][j] = Math.round(Math.random());
    }
}
// Draw the grid
function drawGrid() {
    console.log("Draw grid");
    let html = '';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            html += `<div class="cell" id="cell-${i}-${j}"></div>`;
        }
    }
    if (gameBoard !== null) {
        gameBoard.innerHTML = html;
    }
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            const [row, col] = cells[i].id.split('-').slice(1).map(Number);
            grid[row][col] = grid[row][col] === 0 ? 1 : 0;
            cells[i].style.backgroundColor = grid[row][col] === 1 ? ALIVE_COLOR : DEAD_COLOR;
        });
    }
}
// Update the grid
function updateGrid() {
    console.log("Update grid");
    const newGrid = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        newGrid[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = 0;
            }
            else if (grid[i][j] === 0 && neighbors === 3) {
                newGrid[i][j] = 1;
            }
            else {
                newGrid[i][j] = grid[i][j];
            }
        }
    }
    grid = newGrid;
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        const [row, col] = cells[i].id.split('-').slice(1).map(Number);
        cells[i].style.backgroundColor = grid[row][col] === 1 ? ALIVE_COLOR : DEAD_COLOR;
    }
}
// Count the neighbors of a cell
function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0)
                continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
}
// Start the game
let intervalId;
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
            grid[i][j] = Math.round(Math.random());
        }
    }
    const cells = document.getElementsByClassName('cell');
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
};
