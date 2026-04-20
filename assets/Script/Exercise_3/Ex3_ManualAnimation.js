class ManualAnimation {
    constructor(node, animationComponent) {
        this.node = node;
        this.animationComponent = animationComponent;
        this.currentTween = null;
    }

    tweenAnimation() {
        this.currentTween = cc.tween(this.node)
            .tag(10)
            .to(2, { scale: 0.1, position: cc.v2(0, 0), angle: -180 }, { easing: 'backInOut' })
            .delay(1)
            .to(1, { scale: 0.5, angle: 0 }, { easing: 'bounceOut' })
            .call(() => { cc.log('End Tween') })

        this.currentTween.start();
    }

    actionAnimation() {
        const actionSequence = cc.sequence(
            cc.spawn(
                cc.moveBy(1, 200, 0),
                cc.scaleTo(1, 1, 1),
                cc.rotateBy(2, 360).easing(cc.easeBounceOut()),
            ),

            cc.delayTime(1),

            cc.spawn(
                cc.moveBy(2, -200, 0),
                cc.scaleTo(2, 0.5, 0.5),
                cc.rotateBy(2, -360),
            ).speed(2),
        ).repeat(2);
        this.node.runAction(actionSequence);
    }

    animationClip(animationName) {
        this.animationComponent.play(animationName);
    }

    stopAllAnimations() {
        if (this.currentTween !== null) {
            this.currentTween.stop();
            this.currentTween = null;
        }
        // cc.Tween.stopAllByTag(10);
        // cc.Tween.stopAll();

        this.node.stopAllActions();

        this.animationComponent.stop();
    }
}

export default ManualAnimation;