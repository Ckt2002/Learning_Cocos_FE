import { EventEmitter } from "events";

class mEventEmitter {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.setMaxListeners(100);
    }

    emit(...args) {
        this.eventEmitter.emit(...args);
    }

    registerEvent(eventName, method) {
        this.eventEmitter.on(eventName, method);
    }

    registerOne(eventName, method) {
        this.eventEmitter.once(eventName, method);
    }

    removeEvent(eventName, method) {
        this.eventEmitter.off(eventName, method);
    }

    destroy() {
        this.eventEmitter.removeAllListeners();
        this.eventEmitter = null;
        mEventEmitter.instance = null;
    }
}

mEventEmitter.instance = null;
export default mEventEmitter;