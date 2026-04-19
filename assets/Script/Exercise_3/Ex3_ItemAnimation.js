import mEventEmitter from "./EX3_EventEmitter";
import { EventName } from "./Ex3_Constant";

export const ItemAnimation = cc.Class({
    extends: cc.Component,

    properties: {
        labelTitle: cc.Label,
        itemName: {
            default: "",
            visible: false,
        }
    },

    setTitle(title) {
        this.itemName = title;
        this.labelTitle.string = title;
    },

    runEvent() {
        mEventEmitter.instance.emit(EventName.SPINE_ANIMATION, this.itemName);
    }
});
