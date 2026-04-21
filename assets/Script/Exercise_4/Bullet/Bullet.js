export const Bullet = cc.Class({
    extends: cc.Component,

    properties: {
        existTime: 5,
        moveSpeed: 100,

        currentTime: {
            default: 0,
            visible: false,
        }
    },

    onEnable() {
        this.currentTime = 0;
    }
});