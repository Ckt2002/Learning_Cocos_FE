export default class ShootingManager {
    constructor(bulletManager, characterComponent = null) {
        this.bulletManager = bulletManager;
        this.moveSpeed = 100;
        this.characterComponent = characterComponent;
    }

    shoot() {
        const bulletComponent = this.bulletManager.getBullet();
        bulletComponent.node.active = true;
        if (this.characterComponent) {
            const posFire = this.bulletManager.node.convertToNodeSpaceAR(
                this.characterComponent.firePoint.convertToWorldSpaceAR(cc.v2(0, 0))
            );
            bulletComponent.node.setPosition(posFire.x, posFire.y);
        }
    }
}