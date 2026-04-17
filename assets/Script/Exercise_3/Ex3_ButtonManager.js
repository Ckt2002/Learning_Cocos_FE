import mEventEmitter from "./EX3_EventEmitter";
import { EventName } from "./Ex3_EventNameConst";
import { ItemButton } from "./Ex3_ItemButton";

cc.Class({
    extends: cc.Component,

    properties: {
        spine: sp.Skeleton,
        buttonParent: cc.Node,
        buttonPrefab: cc.Prefab,
        nameArray: {
            default: [],
            type: [cc.String],
            visible: false
        }
    },

    onLoad() {
        this.nameArray = this.getAnimationNames();
        if (!mEventEmitter.instance) {
            mEventEmitter.instance = new mEventEmitter();
        }
    },

    start() {
        this.spawnButton();
        const bindThis = this.runAnimation.bind(this);
        mEventEmitter.instance.registerEvent(EventName.RunAnimation, this.runAnimation.bind(this));

        console.log(bindThis);
    },

    onDestroy() {
        mEventEmitter.instance.removeEvent(EventName.RunAnimation, this.runAnimation.bind(this));
    },

    getAnimationNames() {
        const animations = this.spine.skeletonData.skeletonJson.animations;
        return Object.keys(animations);
    },

    spawnButton() {
        for (let name of this.nameArray) {
            const spawnedButton = cc.instantiate(this.buttonPrefab);
            spawnedButton.parent = this.buttonParent;
            const itemButton = spawnedButton.getComponent(ItemButton);
            itemButton.setTitle(name);
        }
    },

    runAnimation(animationName) {
        this.spine.setAnimation(0, animationName, true);
    },
});
