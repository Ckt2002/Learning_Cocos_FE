import mEventEmitter from "../Event Emitter/EventEmitter";

cc.Class({
    extends: cc.Component,

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        mEventEmitter.instance = new mEventEmitter();
    }
});