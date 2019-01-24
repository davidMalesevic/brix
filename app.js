//SEnviromental variables
var canvaContainer = document.querySelector('.canvas-container');
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

//set width and height of playing field
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var center = width / 2;

//dimensions for the paddle
var paddleWidth = 200;
var paddleHeight = 25;
var paddleCenter = center - (paddleWidth / 2)

//dimensions for the bricks
var brickLines = 10;
var brickGridColumns = 15;
var brickWidth = width / brickGridColumns;
var brickHeight = 50;

//brickplacement parametersh
var brickColumns = width / brickWidth;
var brickPadding = 1;

function drawPaddle() {

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(paddleCenter, height - paddleHeight * 2, paddleWidth, paddleHeight);

        console.log(width + ' ' + height);

}

function drawBrix() {
    for (let i = 0; i < brickLines; i++) {
        for (let j = 0; j < brickColumns; j++) {
            ctx.strokeRect(j * brickWidth, i * 25, brickWidth, 25);
            console.log(i)
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(center, height - paddleHeight * 2.4, 10, 0, 2 * Math.PI);
    ctx.fill();
}


window.onload = function drawGame() {
    console.log(brickWidth);
    console.log(brickColumns);
    drawPaddle();
    drawBrix();
    drawBall();
}