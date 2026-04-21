import { Bullet } from "../Bullet/Bullet";
import { CEventName } from "../Constant/CEventName";
import { EBulletType } from "../Enum/EBulletType";
import { EPlayerAction } from "../Enum/EPlayerMovement";
import mEventEmitter from "../Event Emitter/EventEmitter";
import { BulletSpawner } from "../Spawner/BulletSpawner";
import { InputManager } from "./InputManager";

export const BulletManager = cc.Class({
    extends: cc.Component,

    properties: {
        bulletTypes: {
            default: [],
            type: [EBulletType],
        },

        spawnNumber: {
            default: 10,
        },

        bulletMap: {
            default: null,
            type: Map,
            visible: false,
        },

        spawnerManager: {
            default: null,
            type: BulletSpawner,
            visible: false,
        },

        inputManager: {
            default: null,
            type: InputManager,
            visible: false,
        },

        activatedBullets: {
            default: [],
            type: [Bullet],
            visible: false,
        },

        currentBulletType: {
            default: EBulletType.TV,
            type: EBulletType,
            visible: false,
        }
    },

    statics: {
        instance: null,
    },

    onLoad() {
        if (BulletManager.instance === null) {
            BulletManager.instance = this;
        }
        this.bulletMap = new Map();
    },

    start() {
        this.assignInstances();
        this.assignCallbacks();
        this.spawnBulletsByNumber();
        this.registerEvents();
    },

    update(dt) {
        if (this.activatedBullets.length > 0) {
            for (let bullet of this.activatedBullets) {
                if (bullet.currentTime >= bullet.existTime) {
                    this.returnBullet(bullet);
                    continue;
                }
                bullet.currentTime += dt;
                bullet.node.x += bullet.moveSpeed * dt;
            }
        }
    },

    onDestroy() {
        this.removeAllEvents();
    },

    assignInstances() {
        this.spawnerManager = BulletSpawner.instance;
        this.inputManager = InputManager.instance;
    },

    assignCallbacks() {
        this.inputManager.assignCallBack(EPlayerAction.SWITCH_BULLET, this.switchBullet.bind(this));
    },

    registerEvents() {
        mEventEmitter.instance.registerEvent(CEventName.RETURN_BULLET, this.returnBullet.bind(this), this);
    },

    removeEvents() {
        mEventEmitter.instance.removeAllEvents(this);
    },

    spawnBulletsByNumber() {
        for (let type of this.bulletTypes) {
            for (let index = 0; index < this.spawnNumber; index++) {
                this.spawnOneBullet(type);
            }
        }
    },

    spawnOneBullet(type) {
        const newBullet = this.spawnerManager.spawnObject(type);
        newBullet.active = false;
        this.assignBullet(type, newBullet);
        newBullet.parent = this.node;
    },

    assignBullet(type, bulletNode) {
        if (!this.bulletMap.has(type)) {
            this.bulletMap.set(type, []);
        }
        this.bulletMap.get(type).push(bulletNode);
    },

    switchBullet() {
        let index = this.bulletTypes.indexOf(this.currentBulletType);
        index++;
        if (index === this.bulletTypes.length) {
            index = 0;
        }
        this.currentBulletType = this.bulletTypes[index];
        console.log(this.currentBulletType);
    },

    getBullet() {
        const bulletArray = this.bulletMap.get(this.currentBulletType);
        let gottenBullet = null;
        for (let bullet of bulletArray) {
            if (!bullet.active) {
                gottenBullet = bullet.getComponent(Bullet);
                break;
            }
        }

        if (gottenBullet === null) {
            this.spawnOneBullet(this.currentBulletType);
            gottenBullet = bulletArray[bulletArray.length - 1].getComponent(Bullet);
        }

        this.activatedBullets.push(gottenBullet);
        return gottenBullet;
    },

    returnBullet(bulletToReturn) {
        bulletToReturn.node.active = false;

        for (let index = 0; index < this.activatedBullets.length; index++) {
            if (this.activatedBullets[index] === bulletToReturn) {
                this.activatedBullets.splice(index, 1);
                return;
            }
        }
    }
});