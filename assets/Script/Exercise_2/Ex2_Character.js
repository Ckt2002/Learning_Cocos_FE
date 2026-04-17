cc.Class({
    extends: cc.Component,

    properties: {

        characterName: cc.String,
        nameLabel: cc.Label,

        maxMana: 100,
        manaRecovering: 5,
        manaConsuming: 8,
        manaBar: cc.ProgressBar,

        direction: 1,
        moveSpeed: 10,
        isFlip: false,

        movingNode: cc.Node,
        spineNode: cc.Node,
        timeRoRecoverMana: 1,
        timeToReduceMana: 1,
        targetLeftX: -600,
        targetRightX: 600,
    },

    isMoving: false,
    currentTime: 0,
    currentMana: 0,
    currentTargetX: 0,

    onLoad() {
        this.currentTargetX = this.movingNode.x;
        this.currentTime = 0;
        this.nameLabel.string = this.characterName;
        this.currentMana = this.maxMana;
        if (this.isFlip) {
            this.flip();
        }
    },

    update(dt) {
        if (this.isMoving) {
            this.movingNode.x += this.direction * this.moveSpeed * dt;
            this.currentTime += dt;
            if (this.currentTime >= this.timeToReduceMana) {
                this.updateMana(-this.manaConsuming);
                this.currentTime = 0;
            }
        }

        if (!this.isMoving && this.currentMana < this.maxMana) {
            this.currentTime += dt;
            if (this.currentTime >= this.timeRoRecoverMana) {
                this.updateMana(this.manaRecovering);
                this.currentTime = 0;
            }
        }

        this.isMoving = this.currentMana > 0 && !this.checkReachTargetPosition();
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
            return this.movingNode.x <= this.currentTargetX;
        }
        return this.movingNode.x >= this.currentTargetX;
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
