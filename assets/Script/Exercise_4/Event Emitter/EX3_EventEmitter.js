import { EventEmitter } from "events";

class mEventEmitter {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.setMaxListeners(100);
        this.listenerMap = new Map();
    }

    emit(...args) {
        this.eventEmitter.emit(...args);
    }

    registerEvent(eventName, method, owner) {
        this.eventEmitter.on(eventName, method);

        if (owner) {
            if (!this.listenerMap.has(owner)) {
                this.listenerMap.set(owner, []);
            }
            for (let detail of this.listenerMap.get(owner)) {
                if (detail.eventName === eventName) {
                    console.log("Event existed");
                    return;
                }
            }
            this.listenerMap.get(owner).push({ eventName, method });
        }
    }

    registerOne(eventName, method) {
        this.eventEmitter.once(eventName, method);
    }

    removeEvent(eventName, method) {
        // this.eventEmitter.off(eventName, method);
        this.eventEmitter.removeListener(eventName, method);
    }

    removeAllEvents(owner) {
        if (!this.listenerMap.has(owner)) {
            return;
        }

        const listeners = this.listenerMap.get(owner);

        listeners.forEach(({ eventName, method }) => {
            this.eventEmitter.removeListener(eventName, method);
        });

        this.listenerMap.delete(owner);

        console.log(`Listener remain: ${this.listenerMap}`);
    }

    destroy() {
        this.eventEmitter.removeAllListeners();
        this.eventEmitter = null;
        mEventEmitter.instance = null;
    }
}

mEventEmitter.instance = null;
export default mEventEmitter;