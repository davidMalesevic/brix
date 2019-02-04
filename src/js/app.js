import '../css/style.css';
import Brick from './brick';
import Ball from './ball';
import Paddle from './paddle';
import Renderer from './renderer';
import Collider from './collider';
//SEnviromental letiables
//let canvaContainer = document.querySelector('.canvas-container')

let canvas = document.querySelector("canvas");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let beep = new Audio('sounds/beep.wav');
let boop = new Audio('sounds/boop.wav');
let bgMusic = new Audio('sounds/bg-music/dubstep.mp3');
//bgMusic.loop = true;


window.onload = function () {
    bgMusic.play();
};


let renderer = new Renderer(canvas);
let collider = new Collider();

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
    renderer.clearCanvas();
    ball.update(renderer);
    paddle.update(renderer);
    collider.collideWithPaddle(ball, paddle);
    collider.collideWithRectangles(ball, bricks);
    renderer.drawPaddle(paddle);
    renderer.drawBall(ball);
    for (let b in bricks) {
        renderer.drawBrick(bricks[b]);
    }

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
