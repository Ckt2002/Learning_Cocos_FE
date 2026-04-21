export default class MovementManager {
    constructor(node, moveSpeed = 100) {
        this.node = node;
        this.moveSpeed = moveSpeed;
        this.isMovingRight = false;
        this.isMovingLeft = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
    }

    runUpdate(dt) {
        if (this.isMovingRight) {
            this.node.x += this.moveSpeed * dt;
        } else if (this.isMovingLeft) {
            this.node.x -= this.moveSpeed * dt;
        }

        if (this.isMovingUp) {
            this.node.y += this.moveSpeed * dt;
        } else if (this.isMovingDown) {
            this.node.y -= this.moveSpeed * dt;
        }
    }

    moveLeft() {
        this.isMovingLeft = true;
    }

    moveRight() {
        this.isMovingRight = true;
    }

    moveUp() {
        this.isMovingUp = true;
    }

    moveDown() {
        this.isMovingDown = true;
    }

    stopMoving() {
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
    }
}