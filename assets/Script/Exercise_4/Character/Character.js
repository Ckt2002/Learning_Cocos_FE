import { CharacterConfig } from "../Config/CharacterConfig";

export const Character = cc.Class({
    extends: cc.Component,

    properties: {
        characterConfig: {
            default: null,
            type: CharacterConfig,
        },

        firePoint: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad() {
        this.characterConfig = new CharacterConfig();
    }
});
