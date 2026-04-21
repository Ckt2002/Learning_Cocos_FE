import { CEventName } from "../Constant/CEventName";
import { Enemy } from "../Enemy/Enemy";
import { GameConfig } from "../Config/GameConfig";
import AutoMovement from "../Movement/EnemyMovement";
import mEventEmitter from "../Event Emitter/EventEmitter";

cc.Class({
    extends: cc.Component,

    properties: {
        enemies: {
            default: [],
            type: [cc.Node],
        },

        autoMovement: {
            default: null,
            type: AutoMovement,
            visible: false,
        }
    },

    statics: {
        instance: null,
    },

    start() {
        this.assignNewObjects();
        this.registerEvents();
    },

    update(dt) {
        this.autoMovement.runUpdate(dt);
    },

    onDestroy() {
        mEventEmitter.instance.removeAllEvents(this);
    },

    assignNewObjects() {
        this.autoMovement = new AutoMovement(this.enemies, GameConfig.limitEnemyVertical, Enemy);
    },

    registerEvents() {
        mEventEmitter.instance.registerEvent(CEventName.ENEMY_TAKE_DAMAGE, this.takeDamage.bind(this), this);
    },

    takeDamage(targetObject, damage) {
        const target = targetObject.getComponent(Enemy);
        for (let enemy of this.enemies) {
            if (enemy.getComponent(Enemy) !== target) {
                continue;
            }
            enemy.getComponent(Enemy).takeDamage(damage);
            return;
        }
    }
});