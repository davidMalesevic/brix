export default class Renderer {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;
        //set width and height of playing field
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.scale(1, -1);
    }

    clearCanvas(){
        this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    drawBackground(){
        this.ctx.fillStyle = "rgb(0, 20, 53)";
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    drawBrick(brick) {
        this.ctx.fillStyle = brick.color;
        this.ctx.strokeStyle = brick.bordercolor;
        this.ctx.lineWidth = 10;
        let drawX = brick.x - brick.width / 2;
        let drawY = brick.y - brick.height / 2;
        this.ctx.strokeRect(drawX, drawY, brick.width, brick.height);
        this.ctx.fillRect(drawX, drawY, brick.width, brick.height);
    };

    drawBall(ball) {
        this.ctx.beginPath();
        this.ctx.fillStyle = ball.color;
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    };

    drawPaddle(paddle) {
        this.ctx.fillStyle = "rgb(256, 256, 256)";
        let drawX = paddle.x - paddle.width / 2;
        let drawY = paddle.y - paddle.height / 2;
        this.ctx.fillRect(drawX, drawY, paddle.width, paddle.height);
    };
}