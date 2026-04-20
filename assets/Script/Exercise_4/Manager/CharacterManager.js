import { InputManager } from "./InputManager";
import MovementManager from "./MovementManager";

cc.Class({
    extends: cc.Component,

    properties: {
        currentPlayer: {
            default: null,
            type: cc.Node,
        },

        movementManager: {
            default: null,
            type: MovementManager,
            visible: false,
        },

        inputManager: {
            default: null,
            type: InputManager,

        },

        isMovingUp: {
            default: false,
            visible: false,
        },

        isMovingDown: {
            default: false,
            visible: false,
        },
    },

    onLoad() {
        // this.movementManager = new MovementManager(this.currentPlayer, 100);
    },

    start() {
        this.inputManager = InputManager.instance;
        this.assignCallBack();
    },

    update(dt) {
        if (this.isMovingUp) {
            this.node.y += this.moveSpeed * dt;
        } else if (this.isMovingDown) {
            this.node.y -= this.moveSpeed * dt;
        }
    },

    assignCallBacks() {
        this.inputManager.assignCallBack(EPlayerAction.MOVE_UP, this.moveUp.bind(this));
        this.inputManager.assignCallBack(EPlayerAction.MOVE_DOWN, this.moveDown.bind(this));
        this.inputManager.assignCallBack(EPlayerAction.STOP_MOVING, this.stopMoving.bind(this));
    },

    moveUp() {
        this.isMovingUp = true;
    },

    moveDown() {
        this.isMovingDown = true;
    },

    stopMoving() {
        this.isMovingUp = false;
        this.isMovingDown = false;
    }
});
