export default class InputMovement {
    constructor(node, limitVertical, moveSpeed) {
        this.node = node;
        this.limitVertical = limitVertical;
        this.moveSpeed = moveSpeed;
        this.verticalDirection = 0;
    }

    runUpdate(dt) {
        if (this.verticalDirection === 0 || !this.isValidVerticalMovement(this.node)) {
            return;
        }
        this.node.y += this.verticalDirection * this.moveSpeed * dt;
    }

    isValidVerticalMovement(node) {
        return this.verticalDirection > 0 && node.y < this.limitVertical.max ||
            this.verticalDirection < 0 && node.y > this.limitVertical.min;
    }

    moveUp() {
        this.verticalDirection = 1;
    }

    moveDown() {
        this.verticalDirection = -1;
    }

    stopMoving() {
        this.verticalDirection = 0;
    }
}