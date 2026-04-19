import { EAnimationType, EventName } from "./Ex3_Constant";
import mEventEmitter from "./EX3_EventEmitter";
import { AnimationManager } from "./Ex3_AnimationManager";

cc.Class({
    extends: cc.Component,

    properties: {
        animationType: {
            default: EAnimationType.TWEEN,
            type: EAnimationType
        },

        spineManager: {
            default: null,
            type: AnimationManager,
            visible: false,
        },

        button: {
            default: null,
            type: cc.Button,
            visible: false,
        }
    },

    onLoad() {
        this.button = this.node.getComponent(cc.Button);
        this.setupButtonEvent();
    },

    start() {
        this.spineManager = AnimationManager.instance;
    },

    setupButtonEvent() {
        const clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = cc.js.getClassName(this);
        clickEventHandler.handler = "runAnimation";
        this.button.clickEvents.push(clickEventHandler);

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        }, this);
    },

    runAnimation() {
        mEventEmitter.instance.emit(EventName.MANUAL_ANIMATION, this.animationType);
    }
});