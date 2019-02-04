import '../css/style.css';
import Brick from './brick';
import Ball from './ball';
import Paddle from './paddle';
//SEnviromental letiables
//let canvaContainer = document.querySelector('.canvas-container')

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

//set width and height of playing field
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let center = width / 2;
ctx.translate(width / 2, height / 2);
ctx.scale(1, -1);

let beep = new Audio('sounds/beep.wav');
let boop = new Audio('sounds/boop.wav');
let bgMusic = new Audio('sounds/bg-music/dubstep.mp3');
//bgMusic.loop = true;


window.onload = function () {
    bgMusic.play();
};

//randomizer with min & max value
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

//Collsion detection

function ballPositionRelativeToBrick(ball, brick) {
    if (ball.x > brick.leftBoundary && ball.x < brick.rightBoundary && ball.y > brick.topBoundary) return "top";
    else if (ball.x > brick.rightBoundary && ball.y > brick.topBoundary) return "top-right";
    else if (ball.x < brick.leftBoundary && ball.y > brick.topBoundary) return "top-left";
    else if (ball.x > brick.rightBoundary && ball.y < brick.topBoundary && ball.y > brick.bottomBoundary) return "right";
    else if (ball.x > brick.leftBoundary && ball.x < brick.rightBoundary && ball.y < brick.bottomBoundary) return "bottom";
    else if (ball.x > brick.rightBoundary && ball.y < brick.bottomBoundary) return "bottom-right";
    else if (ball.x < brick.leftBoundary && ball.y < brick.bottomBoundary) return "bottom-left";
    else if (ball.x < brick.leftBoundary && ball.y < brick.topBoundary && ball.y > brick.bottomBoundary) return "left";
}

function distanceToCorner(ball, brick) {
    return Math.sqrt(Math.pow(ball.x - brick.x, 2) + Math.pow(ball.y - brick.y, 2))
};


function collideWithRectangle(ball, brick, pos) {
    const topRightCorner = { x: brick.x + brick.width / 2, y: brick.y + brick.height / 2 };
    const topLeftCorner = { x: brick.x - brick.width / 2, y: brick.y + brick.height / 2 };
    const bottomRightCorner = { x: brick.x + brick.width / 2, y: brick.y - brick.height / 2 };
    const bottomLeftCorner = { x: brick.x - brick.width / 2, y: brick.y - brick.height / 2 };
    switch (pos) {
        case "top": {
            if (ball.bottomBoundary <= brick.topBoundary) {
                return brick;
            }
            break;
        }
        case "top-right": {
            const dist = distanceToCorner(ball, topRightCorner)
            if (dist < ball.radius) {
                return brick;
            }
            break;
        }
        case "top-left": {
            const dist = distanceToCorner(ball, topLeftCorner)
            if (dist < ball.radius) {
                return brick;
            }
            break;
        }
        case "right": {
            if (ball.leftBoundary <= brick.rightBoundary) {
                return brick;
            }
            break;
        }
        case "bottom": {
            if (ball.topBoundary >= brick.bottomBoundary) {
                return brick;
            }
            break;
        }
        case "bottom-right": {
            const dist = distanceToCorner(ball, bottomRightCorner)
            if (dist < ball.radius) {
                return brick;
            }
            break;
        }
        case "bottom-left": {
            const dist = distanceToCorner(ball, bottomLeftCorner)
            if (dist < ball.radius) {
                return brick;
            }
            break;
        }
        case "left": {
            if (ball.rightBoundary >= brick.leftBoundary) {
                return brick;
            }
            break;
        }
        default: return null;
    }
}


function collideWithRectangles(ball, bricks) {
    for (let b in bricks) {
        let pos = ballPositionRelativeToBrick(ball, bricks[b]);
        let brick = collideWithRectangle(ball, bricks[b], pos);
        if (brick) {
            let index = bricks.indexOf(brick)
            bricks.splice(index, 1)
            if (pos === "bottom" || pos === "top") {
                ball.velY = -ball.velY;
                beep.play();
            }
            else if (pos === "left" || "right"){
                ball.velX = -ball.velX;
                beep.play();
            }
            else {
                ball.velX = -ball.velX;
                ball.velY = -ball.velY;
                beep.play();
            }
        }
    }
}

function collideWithPaddle(ball, paddle) {
    if (ball.bottomBoundary <= paddle.topBoundary && ball.leftBoundary >= paddle.leftBoundary && ball.rightBoundary <= paddle.rightBoundary) {
        ball.velX = ball.velX;
        ball.velY = -ball.velY;
        ball.y = paddle.topBoundary + ball.radius;
        boop.play();
    }
};

let ball = new Ball(0, 0, 'red', 15);
let paddle = new Paddle(0, -430, 200, 30);

//for loop for brick drawing

const bricks = [];
const brickColumns = 12;
const brickWidth = width / brickColumns;
const brickHeight = 30;
const brickRows = 4;


for (let i = 0; i < brickColumns; i++) {
    let x = (-width / 2) + (brickWidth / 2 + i * brickWidth);
    bricks.push(new Brick(x, (height / 2) - brickHeight / 2, width / brickColumns, brickHeight, "magenta"));
}

//Paddle movement input

window.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 65) {  //A key
        paddle.setLeftVelocity();
    }
    else if (evt.keyCode == 68) {  //D key
        paddle.setRightVelocity();
    }
}
window.onkeyup = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 65 && paddle.isMovingLeft) {  //A key
        paddle.stop();
    }
    else if (evt.keyCode == 68 && paddle.isMovingRight) {  //D key
        paddle.stop();
    }
}

ball.velX = 8;
ball.velY = 8;

//Game Loop

function loop() {
    ctx.clearRect(-width / 2, -height / 2, canvas.width, canvas.height);
    ball.update();
    paddle.update();
    collideWithPaddle(ball, paddle);
    collideWithRectangles(ball, bricks);
    paddle.draw();
    ball.draw();
    for (let b in bricks) {
        bricks[b].draw();
    }

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
