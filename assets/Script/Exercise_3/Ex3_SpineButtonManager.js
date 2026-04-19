import { ItemAnimation } from "./Ex3_ItemAnimation";
import { AnimationManager } from "./Ex3_AnimationManager";

cc.Class({
    extends: cc.Component,

    properties: {
        animationManager: {
            default: null,
            type: AnimationManager,
            visible: false,
        },

        buttonContainer: cc.Node,
        animationItemPrefab: cc.Prefab,

        nameArray: {
            default: [],
            type: [cc.String],
            visible: false
        },
    },

    start() {
        this.animationManager = AnimationManager.instance;
        this.nameArray = this.animationManager.getSpineAnimationNames();
        this.spawnButton();
    },

    spawnButton() {
        for (let name of this.nameArray) {
            const spawnedButton = cc.instantiate(this.animationItemPrefab);
            spawnedButton.parent = this.buttonContainer;
            const itemButton = spawnedButton.getComponent(ItemAnimation);
            itemButton.setTitle(name);
        }
    },
});
