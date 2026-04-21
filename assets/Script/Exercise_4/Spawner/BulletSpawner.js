export const BulletSpawner = cc.Class({
    extends: cc.Component,

    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab],
        },
    },

    statics: {
        instance: null,
    },

    onLoad() {
        if (BulletSpawner.instance === null) {
            BulletSpawner.instance = this;
        }
    },

    spawnObject(index) {
        const spawnedObject = cc.instantiate(this.prefabs[index]);
        return spawnedObject;
    }
});