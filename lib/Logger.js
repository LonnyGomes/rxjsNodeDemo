var Rx = require('rxjs/Rx');

module.exports = class Logger {
    constructor() {
        this.logSubject = new Rx.Subject();
        this.buffered = this.logSubject.bufferTime(1000);
        this.subscription = this.buffered
            .filter(vals => vals.length > 0)
            .map((vals) => (state) => Object.assign({}, state, {entries: vals, count: state.count + 1}))
            .mergeMap((val) => this._getId(val))
            .scan((state, changeFn) => changeFn(state), {count: 0})
            .subscribe(x => console.log(x));
    }

    _getId(obj) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if (obj.entries && obj.entries.length > 0) {
                    obj.id = Math.round(Math.random() * 500);
                }

                if (obj.count)
                    obj.count++;

                resolve(obj);
            }, Math.random() * 2500);
        });
    }

    log(msg) {
        this.logSubject.next(msg);
    }
}