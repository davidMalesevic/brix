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
    update(renderer) {
        this.x += this.velX;
        this.leftBoundary = this.x - this.width / 2;
        this.rightBoundary = this.x + this.width / 2;
        if (this.leftBoundary <= -renderer.width / 2) {
            this.x = -renderer.width / 2 + this.width / 2;
        }
        if (this.rightBoundary >= renderer.width / 2) {
            this.x = renderer.width / 2 - this.width / 2;
        }
    }
}