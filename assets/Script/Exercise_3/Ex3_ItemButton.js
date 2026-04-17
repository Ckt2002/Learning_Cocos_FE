import mEventEmitter from "./EX3_EventEmitter";
import { EventName } from "./Ex3_EventNameConst";

export const ItemButton = cc.Class({
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
        mEventEmitter.instance.emit(EventName.RunAnimation, this.itemName);
    }
});
