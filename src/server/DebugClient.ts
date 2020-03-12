import DateTime from "@web-atoms/date-time/dist/DateTime";
import { readFileSync, unlinkSync } from "fs";
// import * as Sync from "sync";
import * as vm from "vm";
import { parentPort } from "worker_threads";
import * as W from "ws";

declare var Sync;

const valueType = {
    reference: 0b1000_0000,
    array: 0b1100_0000,
    wrapped: 0b1110_0000,
    null: 1,
    undefined: 0,
    string: 2,
    number: 3,
    boolean: 4,
    date: 5,
    global: 0b1111_0000
};
interface IRValue {
    type: number;
    value?: any;
}

interface IRTarget {
    target: IRValue;
}

interface IRProperty extends IRTarget {
    name: string;
    index: number;
    value: IRValue;
}

interface IRInvoke extends IRTarget {
    name: string;
    args: IRValue[];
}

interface IRDefineProperty extends IRTarget {
    value: IRValue;
    get: IRValue;
    set: IRValue;
    configurable: boolean;
    enumerable: boolean;
    name: string;
}

interface IEval {
    script: string;
    location: string;
}

interface IRJSOperation {
    sid: string;
    eval?: IEval;
    createArray?: IRValue[];
    createObject: number;
    get: IRProperty;
    set: IRProperty;
    invoke: IRInvoke;
    deleteProperty: IRProperty;
    createInstance: IRInvoke;
    createFunction: string;
    createWrapper: string;
    parentSid: string;
    eventInvoke: IRInvoke;
    defineProperty: IRDefineProperty;
    result: IRValue;
    error: string;
}

const sid = Symbol();

const wrapper = Symbol();

let refID = 1;

let callID = 1;

class DebugClient {
    private global: any;

    private map: Map<any, any>;

    private pendingCalls: Map<any, any>;

    private evals: { [key: string]: vm.Script };

    private s: vm.Script;

    constructor() {

        this.global = {
            ____client: this,
            setTimeout,
            setInterval,
            clearTimeout,
            clearInterval
        };

        // tslint:disable-next-line: only-arrow-functions
        // this.global.setTimeout = (function(a, b) {
        //     return setTimeout(a.bind(this), b);
        // }).bind(this.global);

        this.map = new Map();

        this.pendingCalls = new Map();

        this.evals = {};

        // this.global.global = this.global;

        vm.createContext(this.global);

        this.s = new vm.Script(`____client.onClientMessage(____msg)`, { });

    }

    public onProcessMessage(data: any) {
        process.nextTick(() => {
            this.global.____msg = data;
            this.s.runInContext(this.global);
        });
    }

    public dispose() {
        for (const key in this.pendingCalls) {
            if (this.pendingCalls.hasOwnProperty(key)) {
                const element = this.pendingCalls[key];
                try {
                    element.reject("disposing");
                } catch (e) {
                    // ignore...
                }
            }
        }
    }

    public onClientMessage(d: IRJSOperation) {
        try {
            try {
                if (d.parentSid) {
                    const {resolve, reject } = this.pendingCalls[d.parentSid];
                    if (d.error) {
                        reject(d.error);
                    } else {
                        resolve(d.result);
                    }
                    return;
                }
                Sync(() => {
                    const r = this.onMessage(d);
                    parentPort.postMessage({ sid: d.sid, result: r });
                });
            } catch (ex) {
                // tslint:disable-next-line: no-console
                console.error(ex);
                parentPort.postMessage({
                    sid: d.sid,
                    error: ex.stack ? (ex.toString() + "\r\n" + ex.stack) : ex.toString()
                });
            }
        } catch (e1) {
            // tslint:disable-next-line: no-console
            console.error(e1);
        }

    }

    private eval(text: string, filename: string, cb: any): void {
        // const s = this.evals[text] || (this.evals[text] = new vm.Script(text, { filename }));
        this.global.____cb = cb;
        this.global.Sync = Sync;
        // make this async...
        const s = new vm.Script(`Sync((function() { return (${text});
        }).async(), ____cb);`, { filename, timeout: 5000 });
        try {
            s.runInContext(this.global);
        } catch (ex) {
            // tslint:disable-next-line: no-console
            console.error(ex);
            throw ex;
        }
    }

    private toRemoteValue(o: any): IRValue {
        if (o === undefined) {
            return { type: valueType.undefined };
        }
        if (o === null) {
            return { type: valueType.null };
        }
        if (o === this.global) {
            return { type: valueType.global };
        }
        switch (typeof o) {
            case "number":
                return { type: valueType.number, value: o };
            case "boolean":
                return { type: valueType.boolean, value: o };
            case "string":
                return { type: valueType.string, value: o };
        }
        if (o[wrapper]) {
            return { type: valueType.wrapped, value: this.getSid(o)};
        }
        if (Array.isArray(o)) {
            return { type: valueType.array, value: this.getSid(o) };
        }
        if (o instanceof Date) {
            return { type: valueType.date, value: o.getTime() };
        }
        return { type: valueType.reference, value: this.getSid(o)};
    }

    private getSid(o: any): string {
        let id = o[sid];
        if (!id) {
            id = "rid:" + refID++;
            o[sid] = id;
            this.map[id] = o;
        }
        return id;
    }

    private nativeValue(s: IRValue) {
        if (s === null || s === undefined) {
            return s;
        }
        const vt = s.type;
        if (vt === valueType.global) {
            return this.global;
        }
        if (vt === valueType.undefined) { return undefined; }
        if (vt === valueType.null) { return null; }
        if (vt === valueType.reference || vt === valueType.array || vt === valueType.wrapped) {
            return this.map[s.value];
        }
        if (vt === valueType.date) {
            // we need to create DateTime...
            return new DateTime(s.value);
        }
        return s.value;
    }

    private onMessage(op: IRJSOperation): IRValue {
        const createArray = op.createArray;
        if (createArray) {
            return this.toRemoteValue(createArray.map((a) => this.nativeValue(a) ));
        }
        const cf = op.createFunction;
        if (cf) {
            return this.createFunction(cf);
        }
        const ci = op.createInstance;
        if (ci) {
            const o = new ( this.nativeValue(ci.target))( ... ci.args.map((a) => this.nativeValue(a)));
            return this.toRemoteValue(o);
        }
        if (op.createObject) {
            return this.toRemoteValue({});
        }
        if (op.createWrapper) {
            const o = {};
            o[wrapper] = op.createWrapper;
            return this.toRemoteValue(o);
        }
        const dp = op.defineProperty;
        if (dp) {
            const target = this.nativeValue(dp.target);
            const d = {} as any;
            if (dp.get) {
                d.get = this.nativeValue(dp.get);
            }
            if (dp.set) {
                d.set = this.nativeValue(dp.set);
            }
            if (dp.value !== undefined) {
                d.value = this.nativeValue(dp.value);
            }
            if (dp.configurable) {
                d.configurable = dp.configurable;
            }
            if (dp.enumerable) {
                d.enumerable = dp.enumerable;
            }
            Object.defineProperty(target, dp.name, d);
            return this.toRemoteValue(null);
        }
        const tdp = op.deleteProperty;
        if (tdp) {
            const target = this.nativeValue(tdp.target);
            delete target[tdp.name];
            return this.toRemoteValue(null);
        }
        const ev = op.eval;
        if (ev) {
            // tslint:disable-next-line: no-eval
            return this.toRemoteValue((this.eval.bind(this) as any).sync(null, ev.script, ev.location));
        }
        const g = op.get;
        if (g) {
            const target = this.nativeValue(g.target);
            return this.toRemoteValue(target[g.name === undefined ? g.index : g.name]);
        }
        const s = op.set;
        if (s) {
            const target = this.nativeValue(s.target);
            target[s.name === undefined ? s.index : s.name] = this.nativeValue(s.value);
            return s.value;
        }
        const i = op.invoke;
        if (i) {
            const target = this.nativeValue(i.target);
            if (i.name) {
                return this.toRemoteValue(target[i.name]( ... i.args));
            } else {
                return this.toRemoteValue(target.apply(target, i.args ));
            }
        }
    }

    private createFunction(name: string): IRValue {
        const f = ( ... args: any[] ) => {

            try {

                // const a = new SharedArrayBuffer(32);
                // const ua = new Int32Array(a);

                const op = {
                    parentSid: callID++,
                    eventInvoke: {
                        target: this.toRemoteValue(f),
                        args: args.map((a1) => this.toRemoteValue(a1))
                    }
                };

                const af = (cb) => {
                    this.pendingCalls[op.parentSid] = {
                        resolve: (r1) => cb(null, r1),
                        reject: (e) => cb(e)
                    };
                };

                // tslint:disable-next-line: no-console
                console.log(`Invoking ${name}`);
                parentPort.postMessage(op);

                const r = (af as any).sync(null);

                // deasync.loopWhile(() => {
                //     deasync.sleep(100);
                //     return ua[0] === 0;
                // });
                // tslint:disable-next-line: no-console
                console.log(`Invoke success ${name}`);

                // const id = ua[1];

                // const fileName = `./tmpRemoteResult${id}.json`;

                // const r = JSON.parse(readFileSync(fileName, { encoding: "utf-8"}));
                // unlinkSync(fileName);

                // if (r.error) {
                //     throw r.error;
                // }

                return this.nativeValue(r);
            } catch (ex) {
                // tslint:disable-next-line: no-console
                console.error(ex);
                throw ex;
            }

        };
        return this.toRemoteValue(f);
    }

}

const c = new DebugClient();

parentPort.on("message", (v) => {
    c.onProcessMessage(v);
});
