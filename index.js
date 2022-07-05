// Number of rows and columns in grid
const rows = 20;
const columns = 20;

// Array to hold the body of snake
const snakeBody = [];

// Initial point of the grid
let x = 0;
let y = 0;

// Position of food
let foodX;
let foodY;

// Position of snake
let snakeX = 0;
let snakeY = 0;

let snakeBox;
let direction;

const container = document.getElementById('grid-container');

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    // For each rows
    for (a = 0; a < rows; a++) {
        // For each column
        for (b = 0; b < cols; b++) {
            let box = document.createElement('div');

            container.appendChild(box).className = `grid-item ${x}-${y}`;
            x++;
        }

        // Move x co-ordinate to left hand side,
        x = 0;
        y++;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * rows);
    foodY = Math.floor(Math.random() * columns);

    let food = document.getElementsByClassName('food');

    // Remove food if any previously
    if (food.length > 0) {
        food[0].classList.remove('food');
    }

    let foodClassName = foodX + '-' + foodY;

    let foodBox = document.getElementsByClassName(foodClassName)[0];
    foodBox.classList.add('food');
}

function placeSnake() {
    snakeX = Math.floor(Math.random() * rows);
    snakeY = Math.floor(Math.random() * columns);

    snakeBody.push[[snakeX, snakeY]];

    let snakeClassName = snakeX + '-' + snakeY;
    snakeBox = document.getElementsByClassName(snakeClassName)[0];
    snakeBox.classList.add('snake');

    snakeBody.push(snakeClassName);
}

makeGrid(rows, columns);
placeFood();
placeSnake();

document.addEventListener('keyup', moveSnake);
setInterval(moveSnake, 300);

function moveSnake(event) {
    if (event) {
        if (event.code === 'ArrowRight') {
            direction = 'right';
        } else if (event.code === 'ArrowLeft') {
            direction = 'left';
        } else if (event.code === 'ArrowUp') {
            direction = 'up';
        } else if (event.code === 'ArrowDown') {
            direction = 'down';
        }
    }

    if (direction === 'right') {
        snakeX++;
    } else if (direction === 'left') {
        snakeX--;
    } else if (direction === 'up') {
        snakeY--;
    } else if (direction === 'down') {
        snakeY++;
    }

    snakeBox.classList.remove('snake');

    let newSnakeClassName = snakeX + '-' + snakeY;

    snakeBox = document.getElementsByClassName(newSnakeClassName)[0];
    snakeBox.classList.add('snake');

    // if snake eat food
    if (snakeX == foodX && snakeY == foodY) {
        placeFood();
        snakeBody.push([foodX, foodY]);
    }
}

function eatFood() {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
}
