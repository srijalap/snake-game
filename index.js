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

let snakeBox;
let direction;
let foodBox;

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
    console.log('Place food');
    foodX = Math.floor(Math.random() * rows);
    foodY = Math.floor(Math.random() * columns);

    let food = document.getElementsByClassName('food');

    // Remove food if any previously
    if (food.length > 0) {
        food[0].classList.remove('food');
    }

    let foodClassName = foodX + '-' + foodY;

    foodBox = document.getElementsByClassName(foodClassName)[0];
    foodBox.classList.add('food');
}

function placeSnake() {
    let snakeX = Math.floor(Math.random() * rows);
    let snakeY = Math.floor(Math.random() * columns);

    let snakeClassName = snakeX + '-' + snakeY;

    snakeBox = document.getElementsByClassName(snakeClassName)[0];
    snakeBox.classList.add('snake');

    // Put the body to the beginning of array
    snakeBody.push([snakeX, snakeY]);
}

makeGrid(rows, columns);
placeFood();
placeSnake();

document.addEventListener('keyup', moveSnake);
let myInterval = setInterval(moveSnake, 300);

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

    let snakeHead = snakeBody[snakeBody.length - 1];

    // if snake is going to eat food in the next move
    if (
        (direction === 'up' && snakeHead[0] === foodX && snakeHead[1] === foodY + 1) ||
        (direction === 'down' && snakeHead[0] === foodX && snakeHead[1] === foodY - 1) ||
        (direction === 'right' && snakeHead[0] === foodX - 1 && snakeHead[1] === foodY) ||
        (direction === 'left' && snakeHead[0] === foodX + 1 && snakeHead[1] === foodY)
    ) {
        snakeBody.push([foodX, foodY]);

        // Snake head is now changed
        snakeHead = snakeBody[snakeBody.length - 1];

        // Add snake class to the food box because snake has eaten the food and increased its length
        foodBox.classList.add('snake');

        // Remove the eaten food and place next food
        placeFood();
    } else {
        // Else, snake is not eating food, just move the snake

        if (direction === 'right') {
            snakeBody.push([snakeHead[0] + 1, snakeHead[1]]);
        } else if (direction === 'left') {
            snakeBody.push([snakeHead[0] - 1, snakeHead[1]]);
        } else if (direction === 'up') {
            snakeBody.push([snakeHead[0], snakeHead[1] - 1]);
        } else if (direction === 'down') {
            snakeBody.push([snakeHead[0], snakeHead[1] + 1]);
        }

        // Snake head is changed again
        snakeHead = snakeBody[snakeBody.length - 1];

        console.log('Snake body after move is ', JSON.parse(JSON.stringify(snakeBody)));

        // Add class snake to the newly pushed snake co-ordinate
        if (direction) {
            let addedBodyBox = document.getElementsByClassName(snakeHead[0] + '-' + snakeHead[1])[0];

            if (addedBodyBox) {
                addedBodyBox.classList.add('snake');

                // Remove the co-ordinate of tail of snake from snakeBody
                let removedBody = snakeBody.shift();
    
                // Remove class snake from the removed tail
                let removedBodyBox = document.getElementsByClassName(removedBody[0] + '-' + removedBody[1])[0];
                removedBodyBox.classList.remove('snake');
            } else {
                // Alert Game over and stop executing the moveSnake function
                alert('Game over');
                clearInterval(myInterval);
            }
            

            console.log('Snake body at last is ', JSON.parse(JSON.stringify(snakeBody)));
        }
    }
}
