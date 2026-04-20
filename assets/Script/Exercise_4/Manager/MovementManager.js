export default class MovementManager {
    constructor(node, moveSpeed = 100) {
        this.node = node;
        this.moveSpeed = moveSpeed;
    }

    moveLeft(dt) {
        this.node.x -= this.moveSpeed * dt;
    }

    moveRight(dt) {
        this.node.x += this.moveSpeed * dt;
    }

    moveUp(dt) {
        this.node.y += this.moveSpeed * dt;
    }

    moveDown(dt) {
        this.node.y -= this.moveSpeed * dt;
    }
}