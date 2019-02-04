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

beep = new Audio('sounds/beep.wav');
boop = new Audio('sounds/boop.wav');
//bgMusic = new Audio('sounds/bg-music/dubstep.mp3');
//bgMusic.loop = true;


window.onload = function () {
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
        this.borderColor = 'black';
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
        ctx.strokeStyle = this.bordercolor;
        ctx.lineWidth = 10;
        let drawX = this.x - this.width / 2;
        let drawY = this.y - this.height / 2;
        //ctx.strokeRect(drawX, drawY, width, height);
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
    for (b in bricks) {
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


for (i = 0; i < brickColumns; i++) {
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
