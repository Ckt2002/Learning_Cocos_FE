const { EventName } = require("./Ex3_Constant");
import mEventEmitter from "./EX3_EventEmitter";

cc.Class({
    extends: cc.Component,

    properties: {
        isShowUI: {
            default: true,
            visible: false,
        },

        spineAnimationList: cc.Node,
        animationButtons: cc.Node,
    },

    onLoad() {
        if (mEventEmitter.instance === null) {
            mEventEmitter.instance = new mEventEmitter();
        }

        this.isShowUI = true;
    },

    start() {
        mEventEmitter.instance.registerEvent(EventName.ACTIVE_UI, this.activeUI.bind(this), this);
    },

    onDestroy() {
        mEventEmitter.instance.removeAllEvents(this);
    },

    activeUI() {
        this.isShowUI = !this.isShowUI;

        let scaleValue = 0;
        if (this.isShowUI) {
            scaleValue = 1;
            // this.spineAnimationList.active = this.isShowUI;
            // this.animationButtons.active = this.isShowUI;
        }

        const actionSequence = cc.scaleTo(0.2, scaleValue, scaleValue).easing(cc.easeSineInOut());

        // const actionSequence = cc.sequence(
        //     cc.scaleTo(0.2, scaleValue, scaleValue).easing(cc.easeSineInOut()),
        //     cc.callFunc(function (target) {
        //         target.active = this.isShowUI;
        //     }, this)
        // );

        this.spineAnimationList.runAction(actionSequence.clone());
        this.animationButtons.runAction(actionSequence.clone());
    }
});