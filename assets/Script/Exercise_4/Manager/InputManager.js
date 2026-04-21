import { EPlayerAction } from "../Enum/EPlayerMovement"

export const InputManager = cc.Class({
    extends: cc.Component,

    properties: {
        callBackMap: {
            default: null,
            type: Map,
        },
    },

    statics: {
        instance: null,
    },

    onLoad() {
        if (InputManager.instance == null) {
            InputManager.instance = this;
        }

        this.callBackMap = new Map();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        this.callBackMap.clear();
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.callBackMap.get(EPlayerAction.MOVE_UP)();
                break;

            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.callBackMap.get(EPlayerAction.MOVE_DOWN)();
                break;

            case cc.macro.KEY.space:
                this.callBackMap.get(EPlayerAction.SHOOT)();
                break;

            case cc.macro.KEY.e:
                console.log(this.callBackMap);
                console.log(this.callBackMap.get(EPlayerAction.SWITCH_BULLET));
                this.callBackMap.get(EPlayerAction.SWITCH_BULLET)();
                break;

            default:
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.callBackMap.get(EPlayerAction.STOP_MOVING)();
                break;

            default:
                break;
        }
    },

    assignCallBack(key, callBack) {
        this.callBackMap.set(key, callBack);
    }
});
