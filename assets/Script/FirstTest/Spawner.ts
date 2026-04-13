import IsValid from "./CheckValid";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    public prefabToSpawn: cc.Prefab | null = null;
    @property
    public numberToSpawn: number = 10;

    private timer: number = 0.5;
    private spawnedObjects: cc.Node[] = [];

    protected start(): void {
        this.spawnObject(this.numberToSpawn);
    }

    protected update(dt: number): void {
        this.timer += dt;
        if (this.timer >= 1) {
            for (let target of this.spawnedObjects) {
                if (target.active === false) {
                    target.setPosition(Math.random(), 300);
                    target.active = true;
                    break;
                }
            }
            this.timer = 0;
        }

        for (let target of this.spawnedObjects) {
            if (target.active === true) {
                target.y -= 300 * dt;
            }
        }
    }

    private spawnObject(numberToSpawn: number): void {
        if (IsValid(this.prefabToSpawn)) {
            for (let index = 0; index < numberToSpawn; index++) {
                const newNode = cc.instantiate(this.prefabToSpawn) as cc.Node | null;
                newNode!.setParent(this.node);
                newNode!.active = false;
                this.spawnedObjects.push(newNode!);
            }
        }
    }
}
