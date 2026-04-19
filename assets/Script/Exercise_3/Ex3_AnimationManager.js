import { EAnimationType, EventName, NodeName } from "./Ex3_Constant";
import mEventEmitter from "./EX3_EventEmitter";
import { Character } from "./Ex3_Character";
import ManualAnimation from "./Ex3_ManualAnimation";

export const AnimationManager = cc.Class({
    extends: cc.Component,

    properties: {
        characterSpine: {
            default: null,
            type: sp.Skeleton,
            visible: false,
        },

        animationComponent: {
            default: null,
            type: cc.Animation,
            visible: false,
        },

        manualAnimation: {
            default: null,
            type: ManualAnimation,
            visible: false,
        },
    },

    statics: {
        instance: null,
    },

    onLoad() {
        if (!mEventEmitter.instance) {
            mEventEmitter.instance = new mEventEmitter();
        }
        if (AnimationManager.instance === null) {
            AnimationManager.instance = this;
        }

        const childNode = this.node.getChildByName(NodeName.CHARACTER);
        this.characterSpine = childNode.getComponent(sp.Skeleton);
        this.animationComponent = childNode.getComponent(cc.Animation);
        this.manualAnimation = new ManualAnimation(childNode, this.animationComponent);
    },

    start() {
        mEventEmitter.instance.registerEvent(EventName.SPINE_ANIMATION, this.runSpineAnimation.bind(this), this);
        mEventEmitter.instance.registerEvent(EventName.MANUAL_ANIMATION, this.runManualAnimation.bind(this), this);
    },

    onDestroy() {
        mEventEmitter.instance.removeAllEvents(this);
    },

    getSpineAnimationNames() {
        if (this.characterSpine === null) {
            return [];
        }

        const animations = this.characterSpine.skeletonData.skeletonJson.animations;
        return Object.keys(animations);
    },

    runSpineAnimation(animationName) {
        this.characterSpine.setAnimation(0, animationName, true);
    },

    runManualAnimation(animationType) {
        this.manualAnimation.stopAllAnimations();
        this.characterSpine.getComponent(Character).resetCharacter();

        switch (animationType) {
            case EAnimationType.TWEEN:
                this.manualAnimation.tweenAnimation();
                break;

            case EAnimationType.RUN_ACTION:
                this.manualAnimation.actionAnimation();
                break;

            case EAnimationType.ANIMATION_CLIP:
                this.manualAnimation.animationClip("Spine Clip");
                break;

            default:
                break;
        }
    },
});