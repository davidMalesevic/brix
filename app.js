//SEnviromental letiables
//let canvaContainer = document.querySelector('.canvas-container');
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

window.onload = function(){
    bgMusic.play();
};

//randomizer with min & max value
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

class Brick {
    constructor(x, y, width, height, color) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.topBoundary = this.y + this.height / 2;
        this.bottomBoundary = this.y - this.height / 2;
        this.leftBoundary = this.x - this.width / 2;
        this.rightBoundary = this.x + this.width / 2;
    }
    draw() {
        ctx.fillStyle = this.color;
        let drawX = this.x - this.width / 2;
        let drawY = this.y - this.height / 2;
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }
}

// define Ball constructorScreenshot from 2019-01-31 14-21-58
class Ball {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.color = color;
        this.radius = radius;
    }
    // define ball draw method
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.topBoundary = this.y + this.radius;
        this.bottomBoundary = this.y - this.radius;
        this.leftBoundary = this.x - this.radius;
        this.rightBoundary = this.x + this.radius;
        if (this.topBoundary >= canvas.height / 2) {
            this.velY = -this.velY;
        }
        if (this.bottomBoundary <= -canvas.height / 2) {
            this.x = 0;
            this.y = 0;
            this.velY = 5;
            this.velX = random(-5, 5);
        }
        if (this.leftBoundary <= -canvas.width / 2) {
            this.velX = -this.velX;
        }
        if (this.rightBoundary >= canvas.width / 2) {
            this.velX = -this.velX;
        }
    }
}

class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = 0;
        this.velY = 0;
        this.VELOCITY = 10;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.topBoundary = this.y + this.height / 2;
        this.leftBoundary = this.x - this.width / 2;
        this.rightBoundary = this.x + this.width / 2;
    }
    draw() {
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        let drawX = this.x - this.width / 2;
        let drawY = this.y - this.height / 2;
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }
    setLeftVelocity() {
        this.velX = -this.VELOCITY;
        this.isMovingLeft = true;
        this.isMovingRight = false;
    }
    setRightVelocity() {
        this.velX = this.VELOCITY;
        this.isMovingRight = true;
        this.isMovingLeft = false;
    }
    stop() {
        this.velX = 0;
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }
    update() {
        this.x += this.velX;
        this.leftBoundary = this.x - this.width / 2;
        this.rightBoundary = this.x + this.width / 2;
        if (this.leftBoundary <= -canvas.width / 2) {
            this.x = -width / 2 + this.width / 2;
        }
        if (this.rightBoundary >= canvas.width / 2) {
            this.x = width / 2 - this.width / 2;
        }
    }
}

function collideWithPaddle(playBall, paddle) {
    if (playBall.bottomBoundary <= paddle.topBoundary && playBall.leftBoundary >= paddle.leftBoundary && playBall.rightBoundary <= paddle.rightBoundary) {
        playBall.velX = playBall.velX;
        playBall.velY = -playBall.velY;
        playBall.y = paddle.topBoundary + playBall.radius;
        boop.play();
    }
}

function ballPositionRelativeToBrick(playBall, brick) {
    if (playBall.x > brick.leftBoundary && playBall.x < brick.rightBoundary && playBall.y > brick.topBoundary) return "top";
    else if (playBall.x > brick.rightBoundary && playBall.y > brick.topBoundary) return "top-right";
    else if (playBall.x < brick.leftBoundary && playBall.y > brick.topBoundary) return "top-left";
    else if (playBall.x > brick.rightBoundary && playBall.y < brick.topBoundary && playBall.y > brick.bottomBoundary) return "right";
    else if (playBall.x > brick.leftBoundary && playBall.x < brick.rightBoundary && playBall.y < brick.bottomBoundary) return "bottom";
    else if (playBall.x > brick.rightBoundary && playBall.y < brick.bottomBoundary) return "bottom-right";
    else if (playBall.x < brick.leftBoundary && playBall.y < brick.bottomBoundary) return "bottom-left";
    else if (playBall.x < brick.leftBoundary && playBall.y < brick.topBoundary && playBall.y > brick.bottomBoundary) return "left";
}

function collideWithBrick(playBall, brick, pos) {
    switch (pos) {
        case "top": {
            if (playBall.bottomBoundary <= brick.topBoundary) {
                return brick;
            }
            break;
        }
        case "right": {
            if (playBall.leftBoundary <= brick.rightBoundary) {
                return brick;
            }
            break;
        }
        case "bottom": {
            if (playBall.topBoundary >= brick.bottomBoundary) {
                return brick;
            }
            break;
        }
        case "left": {
            if (playBall.rightBoundary >= brick.leftBoundary) {
                return brick;
            }
            break;
        }
        default: return null;
    }
}


function collideWithBricks(playBall, bricks) {
    for (b in bricks) {
        let pos = ballPositionRelativeToBrick(playBall, bricks[b]);
        let brick = collideWithBrick(playBall, bricks[b], pos);
        if (brick) {
            let index = bricks.indexOf(brick)
            bricks.splice(index, 1)
            if (pos === "bottom" || pos === "top") {
                playBall.velY = -playBall.velY;
                beep.play();
            }
            else {
                playBall.velX = -playBall.velX;
                beep.play();
            }
        }
    }
}


let playBall = new Ball(0, 0, 'red', 15);
let paddle = new Paddle(0, -430, 200, 30);
const bricks = [];

for (i = 0; i < 38; i++) {
    let x = -width / 2 + i * 50;
    bricks.push(new Brick(x, 300, 50, 50, "magenta"));
}

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

playBall.velX = 8;
playBall.velY = 8;

//Game Loop

function loop() {
    ctx.clearRect(-width / 2, -height / 2, canvas.width, canvas.height);
    playBall.update();
    paddle.update();
    collideWithPaddle(playBall, paddle);
    collideWithBricks(playBall, bricks);
    paddle.draw();
    playBall.draw();
    for (let b in bricks) {
        bricks[b].draw();
    }

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
