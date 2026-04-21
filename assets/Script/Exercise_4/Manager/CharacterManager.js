import { Character } from "../Character/Character";
import { GameConfig } from "../Config/GameConfig";
import { EPlayerAction } from "../Enum/EPlayerMovement";
import { BulletManager } from "./BulletManager";
import { InputManager } from "./InputManager";
import InputMovement from "../Movement/InputMovement";
import ShootingManager from "./ShootingManager";

cc.Class({
    extends: cc.Component,

    properties: {
        currentCharacter: {
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

        inputMovement: {
            default: null,
            type: InputMovement,
            visible: false,
        },

        shootingManager: {
            default: null,
            type: ShootingManager,
            visible: false,
        },
    },

    onLoad() {
        this.characterComponent = this.currentCharacter.getComponent(Character);
    },

    start() {
        this.assignInstances();
        this.assignNewObjects();
        this.assignCallBacks();
    },

    update(dt) {
        this.inputMovement.runUpdate(dt);
        this.shootingManager.updateCoolDown(dt);
    },

    assignInstances() {
        this.inputManager = InputManager.instance;
        this.bulletManager = BulletManager.instance;
    },

    assignNewObjects() {
        this.inputMovement = new InputMovement(
            this.currentCharacter,
            GameConfig.limitPlayerVertical,
            this.characterComponent.moveSpeed
        );
        this.shootingManager = new ShootingManager(this.bulletManager, this.characterComponent);
    },

    assignCallBacks() {
        this.inputManager.assignCallBack(EPlayerAction.MOVE_UP, this.inputMovement.moveUp.bind(this.inputMovement));
        this.inputManager.assignCallBack(EPlayerAction.MOVE_DOWN, this.inputMovement.moveDown.bind(this.inputMovement));
        this.inputManager.assignCallBack(EPlayerAction.STOP_MOVING, this.inputMovement.stopMoving.bind(this.inputMovement));

        this.inputManager.assignCallBack(EPlayerAction.SHOOT, this.shootingManager.shoot.bind(this.shootingManager));
    },
});
