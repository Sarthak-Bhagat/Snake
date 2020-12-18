const board_border = 'white';
const board_background = "black  ";
const snake_col = '#fff700';

var maxX = window.wth - 100 ;
var maxY = window.hgt - 100;
var nodeSize = 20;
var xPos = Math.floor(Math.random() * maxX) / nodeSize;
xPos = (xPos + 100 >= window.wth) ? window.wth : xPos;
var yPos = Math.floor(Math.random() * maxY);
yPos = (yPos + 100 >= window.wth) ? window.wth : yPos;
xPos = Math.round(xPos / nodeSize) * nodeSize;
yPos = Math.round(yPos / nodeSize) * nodeSize;

var wth = window.innerWidth - (window.innerWidth * 5 / 100);
var hgt = window.innerHeight - (window.innerHeight * 5 / 100);

let snake = [{
    x: xPos + 40,
    y: yPos
}, {
    x: xPos + 30,
    y: yPos
}, {
    x: xPos + 20,
    y: yPos
}, {
    x: xPos + 10,
    y: yPos
}, {
    x: xPos,
    y: yPos
}]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = nodeSize;
let dy = 0;



const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
main();

gen_food();

document.addEventListener("keydown", change_direction);


function main() {

    if (has_game_ended()) {
        document.getElementById("snakeboard").style.opacity = "0.2"
        document.getElementById("score").style.opacity = "0.2"
        document.getElementById('scoredisp').innerHTML = "You scored "+ score+" this match";
        document.getElementById("odio").setAttribute('src', 'B.mp3');
        document.getElementById("power").play();
        $("#modal").modal({backdrop: false});
        return;
    }
    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, 100)
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'red';
    snakeboard_ctx.fillRect(food_x, food_y, nodeSize, nodeSize);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, nodeSize, nodeSize);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
const hitLeftWall = snake[0].x < 0;
const hitRightWall = snake[0].x > snakeboard.width - nodeSize;
const hitToptWall = snake[0].y < 0;
const hitBottomWall = snake[0].y > snakeboard.height - nodeSize;
return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / nodeSize) * nodeSize;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - nodeSize);
    food_y = random_food(0, snakeboard.height - nodeSize);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;


    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -nodeSize;
    const goingDown = dy === nodeSize;
    const goingRight = dx === nodeSize;
    const goingLeft = dx === -nodeSize;
    
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -nodeSize;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -nodeSize;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = nodeSize;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = nodeSize;
    }
}

function move_snake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        gen_food();
    } else {
        snake.pop();
    }
}