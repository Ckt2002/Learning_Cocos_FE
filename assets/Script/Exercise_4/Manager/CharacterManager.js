import { Character } from "../Character/Character";
import { EPlayerAction } from "../Enum/EPlayerMovement";
import { BulletManager } from "./BulletManager";
import { InputManager } from "./InputManager";
import MovementManager from "./MovementManager";
import ShootingManager from "./ShootingManager";

cc.Class({
    extends: cc.Component,

    properties: {
        currentPlayer: {
            default: null,
            type: cc.Node,
        },

        characterComponent: {
            default: null,
            type: Character,
            visible: false,
        },

        bulletManager: {
            default: null,
            type: BulletManager,
            visible: false,
        },

        inputManager: {
            default: null,
            type: InputManager,
            visible: false,
        },

        movementManager: {
            default: null,
            type: MovementManager,
            visible: false,
        },

        shootingManager: {
            default: null,
            type: ShootingManager,
            visible: false,
        },
    },

    onLoad() {
        this.characterComponent = this.currentPlayer.getComponent(Character);
    },

    start() {
        this.assignInstances();
        this.assignNewObjects();
        this.assignCallBacks();
    },

    update(dt) {
        this.movementManager.runUpdate(dt);
    },

    assignInstances() {
        this.inputManager = InputManager.instance;
        this.bulletManager = BulletManager.instance;
    },

    assignNewObjects() {
        this.movementManager = new MovementManager(this.currentPlayer, this.characterComponent.characterConfig.moveSpeed);
        this.shootingManager = new ShootingManager(this.bulletManager, this.characterComponent);
    },

    assignCallBacks() {
        this.inputManager.assignCallBack(EPlayerAction.MOVE_UP, this.movementManager.moveUp.bind(this.movementManager));
        this.inputManager.assignCallBack(EPlayerAction.MOVE_DOWN, this.movementManager.moveDown.bind(this.movementManager));
        this.inputManager.assignCallBack(EPlayerAction.STOP_MOVING, this.movementManager.stopMoving.bind(this.movementManager));

        this.inputManager.assignCallBack(EPlayerAction.SHOOT, this.shootingManager.shoot.bind(this.shootingManager));
    },
});
