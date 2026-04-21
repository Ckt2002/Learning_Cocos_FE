export const SpawnerManager = cc.Class({
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
        if (SpawnerManager.instance === null) {
            SpawnerManager.instance = this;
        }
    },

    spawnObject(index) {
        const spawnedObject = cc.instantiate(this.prefabs[index]);
        return spawnedObject;
    }
});