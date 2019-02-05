export default class Collider {
    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
    };

    ballPositionRelativeToBrick(ball, brick) {
        if (ball.x > brick.leftBoundary && ball.x < brick.rightBoundary && ball.y > brick.topBoundary) return "top";
        else if (ball.x > brick.rightBoundary && ball.y > brick.topBoundary) return "top-right";
        else if (ball.x < brick.leftBoundary && ball.y > brick.topBoundary) return "top-left";
        else if (ball.x > brick.rightBoundary && ball.y < brick.topBoundary && ball.y > brick.bottomBoundary) return "right";
        else if (ball.x > brick.leftBoundary && ball.x < brick.rightBoundary && ball.y < brick.bottomBoundary) return "bottom";
        else if (ball.x > brick.rightBoundary && ball.y < brick.bottomBoundary) return "bottom-right";
        else if (ball.x < brick.leftBoundary && ball.y < brick.bottomBoundary) return "bottom-left";
        else if (ball.x < brick.leftBoundary && ball.y < brick.topBoundary && ball.y > brick.bottomBoundary) return "left";
    }

    distanceToCorner(ball, brick) {
        return Math.sqrt(Math.pow(ball.x - brick.x, 2) + Math.pow(ball.y - brick.y, 2))
    };


    collideWithRectangle(ball, brick, pos) {
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
                const dist = this.distanceToCorner(ball, topRightCorner)
                if (dist < ball.radius) {
                    return brick;
                }
                break;
            }
            case "top-left": {
                const dist = this.distanceToCorner(ball, topLeftCorner)
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
                const dist = this.distanceToCorner(ball, bottomRightCorner)
                if (dist < ball.radius) {
                    return brick;
                }
                break;
            }
            case "bottom-left": {
                const dist = this.distanceToCorner(ball, bottomLeftCorner)
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

    collideWithRectangles(ball, bricks) {
        for (let b in bricks) {
            let pos = this.ballPositionRelativeToBrick(ball, bricks[b]);
            let brick = this.collideWithRectangle(ball, bricks[b], pos);
            if (brick) {
                //TODO Put in own function
                //delet brick when collision detected
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1)
                if (pos === "bottom" || pos === "top") {
                    ball.velY = -ball.velY;
                }
                else if (pos === "left" || "right") {
                    ball.velX = -ball.velX;
                }
                else {
                    ball.velX = -ball.velX;
                    ball.velY = -ball.velY;
                }
            }
        }
    }

    collideWithPaddle(ball, paddle) {
        if (ball.bottomBoundary <= paddle.topBoundary && ball.leftBoundary >= paddle.leftBoundary && ball.rightBoundary <= paddle.rightBoundary) {
            ball.velX = ball.velX;
            ball.velY = -ball.velY;
            ball.y = paddle.topBoundary + ball.radius;
        }
    };

    collideWithWall(){
        if (this.leftBoundary <= -this.width / 2) {
            this.velX = -this.velX;
        }
        if (this.rightBoundary >= this.width / 2) {
            this.velX = -this.velX;
        }
    }
}