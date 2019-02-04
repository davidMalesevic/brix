import { random } from './utils';

export default class Ball {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.color = color;
        this.radius = radius;
    }

    update(renderer) {
        this.x += this.velX;
        this.y += this.velY;
        this.topBoundary = this.y + this.radius;
        this.bottomBoundary = this.y - this.radius;
        this.leftBoundary = this.x - this.radius;
        this.rightBoundary = this.x + this.radius;
        if (this.topBoundary >= renderer.height / 2) {
            this.velY = -this.velY;
        }
        if (this.bottomBoundary <= -renderer.height / 2) {
            this.x = 0;
            this.y = 0;
            this.velY = 5;
            this.velX = random(-5, 5);
        }
        if (this.leftBoundary <= -renderer.width / 2) {
            this.velX = -this.velX;
        }
        if (this.rightBoundary >= renderer.width / 2) {
            this.velX = -this.velX;
        }
    }
}