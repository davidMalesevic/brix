export default class Ball {
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