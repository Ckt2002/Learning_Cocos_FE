export const InputManager = cc.Class({
    extends: cc.Component,

    properties: {
        movementCallBacks: {
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

        this.movementCallBacks = new Map();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        this.movementCallBacks.clear();
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.movementCallBacks.get(EPlayerAction.MOVE_UP)();
                break;

            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.movementCallBacks.get(EPlayerAction.MOVE_DOWN)();
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
                this.movementCallBacks.get(EPlayerAction.STOP_MOVING)();
                break;

            default:
                break;
        }
    },

    assignCallBack(key, callBack) {
        this.movementCallBacks.set(key, callBack);
    }
});
