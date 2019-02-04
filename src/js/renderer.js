export default class Renderer {
    constructor() {
        let canvas = document.querySelector("canvas");
        this.ctx = canvas.getContext("2d");

        //set width and height of playing field
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.scale(1, -1);
    }

    clearCanvas(){
        this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    drawBrick(brick) {
        this.ctx.fillStyle = brick.color;
        this.ctx.strokeStyle = brick.bordercolor;
        this.ctx.lineWidth = 10;
        let drawX = brick.x - brick.width / 2;
        let drawY = brick.y - brick.height / 2;
        //this.ctx.strokeRect(drawX, drawY, width, height);
        this.ctx.fillRect(drawX, drawY, this.width, this.height);
    };

    drawBall(ball) {
        this.ctx.beginPath();
        this.ctx.fillStyle = ball.color;
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    };

    drawPaddle(paddle) {
        this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        let drawX = paddle.x - paddle.width / 2;
        let drawY = paddle.y - paddle.height / 2;
        this.ctx.fillRect(drawX, drawY, paddle.width, paddle.height);
    };
}