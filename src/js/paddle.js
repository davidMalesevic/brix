export default class Paddle {
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