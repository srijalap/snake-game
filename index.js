// Number of rows and columns in grid
const rows = 20;
const columns = 20;

// Initial number of turns taken by snake
let rightTurns = 0;
let leftTurns = 0;
let upTurns = 0;
let downTurns = 0;

// Array to hold the body of snake
const snakeBody = [];

// Initial point of the grid
let x = 0;
let y = 0;

// Position of food
let foodBoxes = [];

// obstacle wall
const obstacleWall = [
    [10, 10],
    [11, 10],
    [12, 10],
    [13, 10],
    [14, 10],
];

let snakeBox;
let direction = 'right';

let score = 0;
let snakeLength = 5;

const container = document.getElementById('grid-container');
const modal = document.getElementById('modal-page');
console.log('modal is', modal);

var startTime = Date.now();
console.log('startTime', startTime);

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

function placeWall() {
    obstacleWall.forEach((oneWallCoordinate) => {
        const wallElem = document.getElementsByClassName(oneWallCoordinate[0] + '-' + oneWallCoordinate[1])[0];
        wallElem.classList.add('wall');
    });
}

function placeFood(foodBoxIndexToRemove) {
    let numberOfFoodToGenerate = 3;
    if (foodBoxIndexToRemove >= 0) {
        // Remove the eaten food and place another one
        // This if statement is called when snake eats food, so we replace the
        // eaten food with another food
        const foodBoxToRemoveElem = document.getElementsByClassName(
            foodBoxes[foodBoxIndexToRemove][0] + '-' + foodBoxes[foodBoxIndexToRemove][1]
        )[0];
        foodBoxToRemoveElem.classList.remove('food');

        // Remove eaten food from foodBoxes array
        const removed = foodBoxes.splice(foodBoxIndexToRemove, 1);
        numberOfFoodToGenerate = 1;
    }

    // Generate three foods
    // This else statement is called when game is started
    generateFoodBox(numberOfFoodToGenerate);
}

function generateFoodBox(count) {
    for (let x = 0; x < count; x++) {
        let foodX = Math.floor(Math.random() * rows);
        let foodY = Math.floor(Math.random() * columns);

        // If foodBox with above generated coordinates already exist or are in the snakeBody,
        // generate again
        if (
            foodBoxes.indexOf([foodX, foodY]) === -1 ||
            snakeBody.includes([foodX, foodY]) ||
            obstacleWall.includes([foodX, foodY])
        ) {
            let foodClassName = foodX + '-' + foodY;

            let foodBox = document.getElementsByClassName(foodClassName)[0];
            foodBox.classList.add('food');

            foodBoxes.push([foodX, foodY]);
        } else {
            generateFoodBox(1);
        }
    }
}

function placeSnake() {
    // Snake always start from the upper left corner
    snakeBox = document.getElementsByClassName('0-0')[0];
    snakeBox.classList.add('snake');

    // Put the body to the beginning of array
    snakeBody.push([0, 0]);
}

makeGrid(rows, columns);
placeFood();
placeSnake();
placeWall();

document.addEventListener('keyup', changeDirection);
let myInterval = setInterval(moveSnake, 300);

function moveSnake() {
    let snakeHead = snakeBody[snakeBody.length - 1];

    // snakeHead[0] -> x co-ordinate of snake head
    // snakeHead[1] -> y co-ordinate of snake head
    // foodBoxes[0][0] -> x co-ordinate of first food
    // foodBoxes[0][1] -> y co-ordinate of first food
    // foodBoxes[1][0] -> x co-ordinate of second food
    // foodBoxes[1][1] -> y co-ordinate of second food
    // foodBoxes[2][0] -> x co-ordinate of third food
    // foodBoxes[2][1] -> y co-ordinate of third food

    // if snake is going to eat food in the next move
    let eatenFoodBoxIndex; //is undefined here.
    // when snake is moving up direction snake head (y co-ordinate) is (+1) just before head meet the food.
    // when snake is moving down direction snake head (y co-ordinate) is (-1) just before head meet the food.
    // when snake is moving right direction snake head (x co-ordinate) is (-1) just before head meet the food.
    // when snake is moving left direction snake head (x co-ordinate) is (+1) just before head meet the food.

    if (direction === 'up' && snakeHead[0] === foodBoxes[0][0] && snakeHead[1] === foodBoxes[0][1] + 1) {
        eatenFoodBoxIndex = 0;
    } else if (direction === 'up' && snakeHead[0] === foodBoxes[1][0] && snakeHead[1] === foodBoxes[1][1] + 1) {
        eatenFoodBoxIndex = 1;
    } else if (direction === 'up' && snakeHead[0] === foodBoxes[2][0] && snakeHead[1] === foodBoxes[2][1] + 1) {
        eatenFoodBoxIndex = 2;
    } else if (direction === 'down' && snakeHead[0] === foodBoxes[0][0] && snakeHead[1] === foodBoxes[0][1] - 1) {
        eatenFoodBoxIndex = 0;
    } else if (direction === 'down' && snakeHead[0] === foodBoxes[1][0] && snakeHead[1] === foodBoxes[1][1] - 1) {
        eatenFoodBoxIndex = 1;
    } else if (direction === 'down' && snakeHead[0] === foodBoxes[2][0] && snakeHead[1] === foodBoxes[2][1] - 1) {
        eatenFoodBoxIndex = 2;
    } else if (direction === 'right' && snakeHead[0] === foodBoxes[0][0] - 1 && snakeHead[1] === foodBoxes[0][1]) {
        eatenFoodBoxIndex = 0;
    } else if (direction === 'right' && snakeHead[0] === foodBoxes[1][0] - 1 && snakeHead[1] === foodBoxes[1][1]) {
        eatenFoodBoxIndex = 1;
    } else if (direction === 'right' && snakeHead[0] === foodBoxes[2][0] - 1 && snakeHead[1] === foodBoxes[2][1]) {
        eatenFoodBoxIndex = 2;
    } else if (direction === 'left' && snakeHead[0] === foodBoxes[0][0] + 1 && snakeHead[1] === foodBoxes[0][1]) {
        eatenFoodBoxIndex = 0;
    } else if (direction === 'left' && snakeHead[0] === foodBoxes[1][0] + 1 && snakeHead[1] === foodBoxes[1][1]) {
        eatenFoodBoxIndex = 1;
    } else if (direction === 'left' && snakeHead[0] === foodBoxes[2][0] + 1 && snakeHead[1] === foodBoxes[2][1]) {
        eatenFoodBoxIndex = 2;
    }

    if (eatenFoodBoxIndex >= 0) {
        score = score + 10;
        snakeLength = snakeLength + 5;
        console.log('score is', score);
        const eatenFoodBox = foodBoxes[eatenFoodBoxIndex];
        snakeBody.push([eatenFoodBox[0], eatenFoodBox[1]]);

        // Snake head is now changed
        snakeHead = snakeBody[snakeBody.length - 1];

        // Remove the eaten food and place next food
        placeFood(eatenFoodBoxIndex);

        // Add snake class to the eaten food box because snake has eaten the food and increased its length
        const eatenFoodBoxElem = document.getElementsByClassName(eatenFoodBox[0] + '-' + eatenFoodBox[1])[0];
        eatenFoodBoxElem.classList.add('snake');
    } else {
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

        // Add class snake to the newly pushed snake co-ordinate
        if (direction) {
            let addedBodyBox = document.getElementsByClassName(snakeHead[0] + '-' + snakeHead[1])[0];

            if (addedBodyBox) {
                addedBodyBox.classList.add('snake');

                // Remove the co-ordinate of tail of snake from snakeBody
                // Remove class snake from the removed tail

                if (snakeBody.length > snakeLength) {
                    let removedBody = snakeBody.shift();
                    let removedBodyBox = document.getElementsByClassName(removedBody[0] + '-' + removedBody[1])[0];
                    removedBodyBox.classList.remove('snake');
                }
            } else {
                // Alert Game over and stop executing the moveSnake function
                gameOver();
            }
        }
    }

    // Game over if snake head collides with snake body
    const snakeBodyWithoutHead = snakeBody.slice(0, -1);
    // includes does not check if array exists in array of array
    // so stringified to check if a string exists in array of string
    if (JSON.stringify(snakeBodyWithoutHead).includes(JSON.stringify(snakeHead))) {
        gameOver();
    }

    // Game over if snake head collides with the obstacle wall
    if (JSON.stringify(obstacleWall).includes(JSON.stringify(snakeHead))) {
        gameOver();
    }
}

function changeDirection(event) {
    if (event.code === 'ArrowRight' && (direction === 'up' || direction === 'down')) {
        direction = 'right';
        rightTurns++;
    } else if (event.code === 'ArrowLeft' && (direction === 'up' || direction === 'down')) {
        direction = 'left';
        leftTurns++;
    } else if (event.code === 'ArrowUp' && (direction === 'right' || direction === 'left')) {
        direction = 'up';
        upTurns++;
    } else if (event.code === 'ArrowDown' && (direction === 'right' || direction === 'left')) {
        direction = 'down';
        downTurns++;
    }
}

function gameOver() {
    const endTime = Date.now();

    const totalPlayingTime = (endTime - startTime) / 1000;
    const playedTimeElem = document.getElementById('playedTime');
    playedTimeElem.innerHTML = totalPlayingTime;

    modal.style.display = 'block';
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = `${score}.`;

    clearInterval(myInterval);

    // Add bar chart
    const label = ['Right Turns', 'Left Turns', 'Up Turns', 'Down Turns'];

    const data = {
        labels: label,
        datasets: [
            {
                label: 'Snake moves',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [rightTurns, leftTurns, upTurns, downTurns],
            },
        ],
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    };
    const barChart = new Chart(document.getElementById('barChart'), config);
}

const okBtn = document.getElementById('okBtn');
okBtn.addEventListener('click', hideModal);
function hideModal() {
    modal.style.display = 'none';
}

const playAgainBtn = document.getElementById('playAgainBtn');
playAgainBtn.addEventListener('click', reloadPage);
function reloadPage() {
    window.location.reload();
}
