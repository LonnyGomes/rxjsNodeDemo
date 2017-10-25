var Rx = require('rxjs/Rx');

module.exports = class Logger {
    constructor() {
        this.logSubject = new Rx.Subject();
        this.buffered = this.logSubject.bufferTime(1000);
        this.subscription = this.buffered
            .map((val) => { return {entries: val} })
            .mergeMap((val) => this._getId(val))
            .subscribe(x => console.log(x));
    }

    _getId(obj) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if (obj.entries && obj.entries.length > 0) {
                    obj.id = Math.round(Math.random() * 500);
                }
                resolve(obj);
            }, Math.random() * 2500);
        });
    }

    log(msg) {
        this.logSubject.next(msg);
    }
}