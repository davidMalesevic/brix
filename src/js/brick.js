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

}