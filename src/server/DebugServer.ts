import DateTime from "@web-atoms/date-time/dist/DateTime";
import * as vm from "vm";
import * as W from "ws";
export default class DebugServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {
            const wx = new DebugClient(w);
            w.on("close", (code, reason) => {
                // wx.dispose();
            });
        });
    }

}

const valueType = {
    reference: 0b1000_0000,
    array: 0b1100_0000,
    wrapped: 0b1110_0000,
    null: 1,
    undefined: 0,
    string: 2,
    number: 3,
    boolean: 4,
    date: 4
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

interface IRJSOperation {
    sid: string;
    eval?: string;
    createArray?: IRValue[];
    createObject: number;
    get: IRProperty;
    set: IRProperty;
    invoke: IRInvoke;
    deleteProperty: IRProperty;
    createInstance: IRInvoke;
    createFunction: number;
    createWrapper: number;
    parentSid: string;
    eventInvoke: IRInvoke;
    defineProperty: IRDefineProperty;
    result: IRValue;
}

const sid = Symbol();

const wrapper = Symbol();

let refID = 1;

let callID = 1000000000;

class DebugClient {

    private global: any;

    private map: Map<any, any>;

    private pendingCalls: Map<any, any>;

    private evals: { [key: string]: vm.Script };

    constructor(private client: W) {

        this.global = {  ____client: this };

        this.map = new Map();

        this.pendingCalls = new Map();

        this.evals = {};

        // this.global.global = this.global;

        vm.createContext(this.global);

        const s = new vm.Script(`____client.onClientMessage(____msg)`, { });

        client.on("message", (data) => {
            this.global.____msg = data;
            s.runInContext(this.global);
        });

    }

    public onClientMessage(data) {
        try {
            const d = JSON.parse(data.toString()) as IRJSOperation;

            if (d.parentSid) {
                const a = this.pendingCalls[d.parentSid] as SharedArrayBuffer;
                a[1] = this.nativeValue(d.result);
                a[0] = 1;
                return;
            }

            const r = this.onMessage(d);
            this.client.send(JSON.stringify({ sid: d.sid, result: r }), (e) => {
                // tslint:disable-next-line: no-console
                if (e) { console.error(e); }
            });
        } catch (e1) {
            // tslint:disable-next-line: no-console
            console.error(e1);
        }

    }

    private eval(text: string): any {
        const s = this.evals[text] || (this.evals[text] = new vm.Script(text));
        return s.runInContext(this.global);
    }

    private toRemoteValue(o: any): IRValue {
        if (o === undefined) {
            return { type: valueType.undefined };
        }
        if (o === null) {
            return { type: valueType.null };
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
        if (s === null) {
            return s;
        }
        if (s === undefined) {
            return this.global;
        }
        const vt = s.type;
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
            return this.createFunction();
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
            o[wrapper] = true;
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
            return this.toRemoteValue(this.eval(ev));
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

    private createFunction(): IRValue {
        const f = ( ... args: any[] ) => {
            const s = new SharedArrayBuffer(4);
            const i = new Int32Array(s);

            const op = {
                parentSid: callID++,
                eventInvoke: {
                    target: this.toRemoteValue(f),
                    args: args.map((a) => this.toRemoteValue(a))
                }
            };

            this.pendingCalls[op.parentSid] = s;

            while (Atomics.wait(i, 0, 0, 100) === "not-equal") {
                // do nothing..
                if (s[0] !== 0) {
                    break;
                }
            }

            return s[1];

        };
        return this.toRemoteValue(f);
    }

}
