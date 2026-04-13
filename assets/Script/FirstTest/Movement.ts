const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    public moveSpeed: number = 10;

    private moveLeft: boolean = false;
    private moveRight: boolean = false;


    protected onLoad(): void {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onMouseDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onMouseUp, this);
    }

    protected onDestroy(): void {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onMouseDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onMouseUp, this);
    }

    protected update(dt: number): void {
        if (this.moveRight) {
            this.node.x += this.moveSpeed * dt;
        } else if (this.moveLeft) {
            this.node.x -= this.moveSpeed * dt;
        }
    }

    onMouseDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveLeft = true;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveRight = true;
                break;
        }
    }

    onMouseUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveRight = false;
                break;
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        console.log("Player hit Target!");
        other.node.active = false;
    }
}
