import { EventName } from "./Ex3_Constant";
import mEventEmitter from "./EX3_EventEmitter";

export const Character = cc.Class({
    extends: cc.Component,

    properties: {
        originPosition: {
            default: new cc.Vec2(),
            visible: false,
        },

        originScale: {
            default: new cc.Vec2(),
            visible: false,
        },

        originRotation: {
            default: 0,
            visible: false,
        }
    },

    onLoad() {
        this.originPosition = this.node.position;
        this.originScale = this.node.scale;
        this.originRotation = this.node.angle;

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.callback, this);
    },

    callback() {
        console.log("Active UI");
        mEventEmitter.instance.emit(EventName.ACTIVE_UI);
    },

    resetCharacter() {
        this.node.position = this.originPosition;
        this.node.scale = this.originScale;
        this.node.angle = this.originRotation;
    }
});
