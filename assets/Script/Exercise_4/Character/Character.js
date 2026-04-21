export const Character = cc.Class({
    extends: cc.Component,

    properties: {
        fireRate: {
            default: 0,
        },

        moveSpeed: {
            default: 300
        },

        firePoint: {
            default: null,
            type: cc.Node,
        },

        spine: {
            default: null,
            type: sp.Skeleton,
        },

        moveDirection: {
            default: 0,
            visible: false,
        },

        fireCoolDown: {
            default: 0,
            visible: false,
        }
    },

    onEnable() {
        this.resetCoolDown();
        this.changeAnimation('idle');
    },

    resetCoolDown() {
        this.fireCoolDown = this.fireRate;
    },

    isFireValid() {
        return this.fireCoolDown <= 0;
    },

    changeAnimation(animationName) {
        this.spine.setAnimation(0, animationName, true);
    }
});
