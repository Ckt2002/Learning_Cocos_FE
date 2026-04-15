cc.Class({
    extends: cc.Component,

    properties: {
        characterName: cc.String,
        nameLabel: cc.Label,

        maxMana: 100,
        manaBar: cc.ProgressBar,

        direction: 1,
        moveSpeed: 10,
        isFlip: false,

        spineNode: cc.Node,
        timeToReduceMana: 1,
        targetLeftX: -600,
        targetRightX: 600,
    },

    isMoving: false,
    currentTime: 0,
    currentMana: 0,
    currentTargetX: 0,

    onLoad() {
        this.currentTargetX = this.node.x;
        this.currentTime = 0;
        this.nameLabel.string = this.characterName;
        this.currentMana = this.maxMana;
        if (this.isFlip) {
            this.flip();
        }
    },

    update(dt) {
        if (this.isMoving && this.currentMana > 0) {
            this.node.x += this.direction * this.moveSpeed * dt;
            this.currentTime += dt;
            if (this.currentTime >= this.timeToReduceMana) {
                this.updateMana(-1);
                this.currentTime = 0;
            }
        }

        this.isMoving = !this.checkReachTargetPosition();
    },

    updateMana(value) {
        this.currentMana += value;
        if (this.currentMana < 0) {
            this.currentMana = 0;
        }
        this.manaBar.progress = this.currentMana / this.maxMana;
    },

    checkReachTargetPosition() {
        if (this.direction < 0) {
            return this.node.x <= this.currentTargetX;
        }
        return this.node.x >= this.currentTargetX;
    },

    flip() {
        const scaleX = this.spineNode.scaleX;
        this.spineNode.scaleX = scaleX * -1;
    },

    moveLeft() {
        this.direction = -1;
        this.currentTargetX = this.targetLeftX;
        if (this.spineNode.scaleX > 0) {
            this.flip();
        }
    },

    moveRight() {
        this.direction = 1;
        this.currentTargetX = this.targetRightX;
        if (this.spineNode.scaleX < 0) {
            this.flip();
        }
    }
});
