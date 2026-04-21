export const Enemy = cc.Class({
    extends: cc.Component,

    properties: {
        maxHealth: 100,
        moveSpeed: 200,

        healthBar: {
            default: null,
            type: cc.ProgressBar
        },

        currentHealth: {
            default: 0,
            visible: false,
        },

        currentDirection: {
            default: 1,
            visible: false,
        },
    },

    onEnable() {
        this.currentHealth = this.maxHealth;
        this.updateHealthBar();
    },

    takeDamage(damage) {
        this.currentHealth -= damage;
        this.updateHealthBar();
        if (this.currentHealth <= 0) {
            this.die();
        }
    },

    updateHealthBar() {
        this.healthBar.progress = this.currentHealth / this.maxHealth;
    },

    die() {
        this.node.active = false;
    }
});