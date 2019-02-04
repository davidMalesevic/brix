export default class Brick {
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