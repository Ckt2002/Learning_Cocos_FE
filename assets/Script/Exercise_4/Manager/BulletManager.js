import { Bullet } from "../Bullet/Bullet";
import { CEventName } from "../Constant/CEventName";
import { EBulletType } from "../Enum/EBulletType";
import mEventEmitter from "../Event Emitter/EventEmitter";
import { SpawnerManager } from "./SpawnerManager";

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

        bullets: {
            default: null,
            type: Map,
            visible: false,
        },

        spawnerManager: {
            default: null,
            type: SpawnerManager,
            visible: false,
        },

        currentBullets: {
            default: [],
            type: [Bullet],
            // visible: false,
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
        this.bullets = new Map();
    },

    start() {
        this.spawnerManager = SpawnerManager.instance;
        this.spawnBulletsByNumber();
        this.registerEvents();
    },

    update(dt) {
        if (this.currentBullets.length > 0) {
            for (let bullet of this.currentBullets) {
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
        if (!this.bullets.has(type)) {
            this.bullets.set(type, []);
        }
        this.bullets.get(type).push(bulletNode);
    },

    switchBullet(bulletType) {
        currentBulletType = bulletType;
    },

    getBullet() {
        const bulletArray = this.bullets.get(this.currentBulletType);
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

        this.currentBullets.push(gottenBullet);
        return gottenBullet;
    },

    returnBullet(bulletToReturn) {
        bulletToReturn.node.active = false;

        for (let index = 0; index < this.currentBullets.length; index++) {
            if (this.currentBullets[index] === bulletToReturn) {
                this.currentBullets.splice(index, 1);
                return;
            }
        }
    }
});