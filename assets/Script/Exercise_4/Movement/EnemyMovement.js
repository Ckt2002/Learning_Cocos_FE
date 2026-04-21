
// Fix this to check direction for each element, not use one
export default class AutoMovement {
    constructor(nodeArray, limitVertical, componentType) {
        this.nodeArray = nodeArray;
        this.limitVertical = limitVertical;
        this.componentType = componentType;
    }

    runUpdate(dt) {
        for (let node of this.nodeArray) {
            const nodeComponent = node.getComponent(this.componentType);
            const direction = nodeComponent.currentDirection;
            if (this.isValidVerticalMovement(node, direction)) {
                node.y += direction * nodeComponent.moveSpeed * dt;
            }

            if (!this.isValidVerticalMovement(node, direction)) {
                nodeComponent.currentDirection *= -1;
            }
        }
    }

    isValidVerticalMovement(node, direction) {
        return direction > 0 && node.y < this.limitVertical.max ||
            direction < 0 && node.y > this.limitVertical.min;
    }
}