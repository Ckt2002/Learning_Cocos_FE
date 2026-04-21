import { CEventName } from "../Constant/CEventName";
import mEventEmitter from "../Event Emitter/EventEmitter";

export const Bullet = cc.Class({
    extends: cc.Component,

    properties: {
        existTime: 5,
        moveSpeed: 100,
        damage: 10,

        currentTime: {
            default: 0,
            visible: false,
        }
    },

    onEnable() {
        this.currentTime = 0;
    },

    onCollisionEnter(other, self) {
        mEventEmitter.instance.emit(CEventName.ENEMY_TAKE_DAMAGE, other, this.damage);
        mEventEmitter.instance.emit(CEventName.RETURN_BULLET, this);
    },
});