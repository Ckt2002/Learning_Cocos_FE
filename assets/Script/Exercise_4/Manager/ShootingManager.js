export default class ShootingManager {
    constructor(bulletManager, characterComponent = null) {
        this.bulletManager = bulletManager;
        this.characterComponent = characterComponent;
    }

    shoot() {
        if (!this.characterComponent.isFireValid()) {
            return;
        }
        this.characterComponent.resetCoolDown();

        this.characterComponent.changeAnimation('shoot');
        this.characterComponent.spine.addAnimation(0, 'idle', true, 0);

        const bulletComponent = this.bulletManager.getBullet();
        bulletComponent.node.active = true;
        const posFire = this.bulletManager.node.convertToNodeSpaceAR(
            this.characterComponent.firePoint.convertToWorldSpaceAR(cc.v2(0, 0))
        );
        bulletComponent.node.setPosition(posFire.x, posFire.y);
    }

    updateCoolDown(dt) {
        this.characterComponent.fireCoolDown -= dt;
    }
}