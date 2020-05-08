// import DateTime from "@web-atoms/date-time/dist/DateTime";
// import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
// import * as vm from "vm";

// import locker from "./locker";

// const empty = [];

// const valueType = {
//     reference: 0b1000_0000,
//     array: 0b1100_0000,
//     wrapped: 0b1110_0000,
//     null: 1,
//     undefined: 0,
//     string: 2,
//     number: 3,
//     boolean: 4,
//     date: 5,
//     global: 0b1111_0000
// };
// interface IRValue {
//     type: number;
//     value?: any;
// }

// interface IRTarget {
//     target: IRValue;
// }

// interface IRProperty extends IRTarget {
//     name: string;
//     index: number;
//     value: IRValue;
// }

// interface IRInvoke extends IRTarget {
//     name: string;
//     args: IRValue[];
// }

// interface IRDefineProperty extends IRTarget {
//     value: IRValue;
//     get: IRValue;
//     set: IRValue;
//     configurable: boolean;
//     enumerable: boolean;
//     name: string;
// }

// interface IEval {
//     script: string;
//     location: string;
// }

// interface IRJSOperation {
//     sid: string;
//     eval?: IEval;
//     createArray?: IRValue[];
//     createObject: number;
//     get: IRProperty;
//     set: IRProperty;
//     invoke: IRInvoke;
//     deleteProperty: IRProperty;
//     createInstance: IRInvoke;
//     createFunction: string;
//     createWrapper: string;
//     parentSid: number;
//     eventInvoke: IRInvoke;
//     defineProperty: IRDefineProperty;
//     result: IRValue;
//     error: string;
// }

// const sid = Symbol();

// const wrapper = Symbol();

// let refID = 1;

// let callID = 1;

// class DebugClient {
//     private global: any;

//     private map: Map<any, any>;

//     private pendingCalls: Map<any, any>;

//     private evals: { [key: string]: vm.Script };

//     private s: vm.Script;

//     private clientInfo: { id: string, dataFile: string, lockFileName: string };

//     constructor() {

//         this.global = {
//             ____client: this,
//             setTimeout,
//             setInterval,
//             clearTimeout,
//             clearInterval
//         };

//         this.map = new Map();

//         this.pendingCalls = new Map();

//         this.evals = {};

//         vm.createContext(this.global);

//         if (typeof this.global.global === "undefined") {
//             this.global.global = this.global;
//         }

//         this.s = new vm.Script(`____client.onClientMessage(____msg)`, { });

//     }

//     public readMessages(): IRJSOperation[] {
//         try {
//             const m = this.clientInfo;
//             let msg = empty;
//             // console.log(`Locking`);
//             const r = locker(m.lockFileName);
//             // console.log(`Reading`);
//             if (existsSync(m.dataFile)) {
//                 const t = readFileSync(m.dataFile, "utf-8");
//                 if (t) {
//                     msg = JSON.parse(`[${t}]`);
//                     // console.log(`Returning [${t}]`);
//                 }
//                 writeFileSync(m.dataFile, "");
//             }
//             r();
//             return msg;

//         } catch (e) {
//             console.error(e);
//             this.send({
//                 error: e.stack ? (e.toString() + "\r\n" + e.stack) : e.toString()
//             });
//         }
//     }

//     public send(o) {
//         // debugger;
//         // rl.write(`json:${JSON.stringify(o)}\n`);
//         process.send(JSON.stringify(o));
//     }

//     public processIncomingMessages() {
//         const r = this.readMessages();
//         if (!r) {
//             return;
//         }
//         for (const iterator of r) {
//             this.invoke(iterator);
//         }
//     }

//     public begin(m) {
//         this.clientInfo = m;
//         this.processIncomingMessages();
//     }

//     public dispose() {
//         for (const key in this.pendingCalls) {
//             if (this.pendingCalls.hasOwnProperty(key)) {
//                 const element = this.pendingCalls[key];
//                 try {
//                     element.reject("disposing");
//                 } catch (e) {
//                     // ignore...
//                 }
//             }
//         }
//     }

//     private eval(text: string, filename: string): any {
//         // console.log(`Running eval ${text}`);
//         const s = new vm.Script(text, {
//             filename: filename || "vm",
//             timeout: 5000
//         });
//         try {
//             const r = s.runInContext(this.global);
//             // console.log(`Result  ${r}`);
//             return r;
//         } catch (ex) {
//             // tslint:disable-next-line: no-console
//             console.error(ex);
//             throw ex;
//         }
//     }

//     private toRemoteValue(o: any): IRValue {
//         if (o === undefined) {
//             return { type: valueType.undefined };
//         }
//         if (o === null) {
//             return { type: valueType.null };
//         }
//         if (o === this.global) {
//             return { type: valueType.global };
//         }
//         switch (typeof o) {
//             case "number":
//                 return { type: valueType.number, value: o };
//             case "boolean":
//                 return { type: valueType.boolean, value: o };
//             case "string":
//                 return { type: valueType.string, value: o };
//         }
//         if (o[wrapper]) {
//             return { type: valueType.wrapped, value: this.getSid(o)};
//         }
//         if (Array.isArray(o)) {
//             return { type: valueType.array, value: this.getSid(o) };
//         }
//         if (o instanceof Date) {
//             return { type: valueType.date, value: o.getTime() };
//         }
//         return { type: valueType.reference, value: this.getSid(o)};
//     }

//     private getSid(o: any): string {
//         let id = o[sid];
//         if (!id) {
//             id = "rid:" + refID++;
//             o[sid] = id;
//             this.map[id] = o;
//         }
//         return id;
//     }

//     private nativeValue(s: IRValue) {
//         if (s === null || s === undefined) {
//             return s;
//         }
//         const vt = s.type;
//         if (vt === valueType.global) {
//             return this.global;
//         }
//         if (vt === valueType.undefined) { return undefined; }
//         if (vt === valueType.null) { return null; }
//         if (vt === valueType.reference || vt === valueType.array || vt === valueType.wrapped) {
//             return this.map[s.value];
//         }
//         if (vt === valueType.date) {
//             // we need to create DateTime...
//             return new DateTime(s.value);
//         }
//         return s.value;
//     }

//     private onMessage(op: IRJSOperation): IRValue {
//         const createArray = op.createArray;
//         if (createArray) {
//             return this.toRemoteValue(createArray.map((a) => this.nativeValue(a) ));
//         }
//         const cf = op.createFunction;
//         if (cf) {
//             return this.createFunction(cf);
//         }
//         const ci = op.createInstance;
//         if (ci) {
//             const o = new ( this.nativeValue(ci.target))( ... ci.args.map((a) => this.nativeValue(a)));
//             return this.toRemoteValue(o);
//         }
//         if (op.createObject) {
//             return this.toRemoteValue({});
//         }
//         if (op.createWrapper) {
//             const o = {};
//             o[wrapper] = op.createWrapper;
//             return this.toRemoteValue(o);
//         }
//         const dp = op.defineProperty;
//         if (dp) {
//             const target = this.nativeValue(dp.target);
//             const d = {} as any;
//             if (dp.get) {
//                 d.get = this.nativeValue(dp.get);
//             }
//             if (dp.set) {
//                 d.set = this.nativeValue(dp.set);
//             }
//             if (dp.value !== undefined) {
//                 d.value = this.nativeValue(dp.value);
//             }
//             if (dp.configurable) {
//                 d.configurable = dp.configurable;
//             }
//             if (dp.enumerable) {
//                 d.enumerable = dp.enumerable;
//             }
//             Object.defineProperty(target, dp.name, d);
//             return this.toRemoteValue(null);
//         }
//         const tdp = op.deleteProperty;
//         if (tdp) {
//             const target = this.nativeValue(tdp.target);
//             delete target[tdp.name];
//             return this.toRemoteValue(null);
//         }
//         const ev = op.eval;
//         if (ev) {
//             return this.toRemoteValue(this.eval(ev.script, ev.location));
//         }
//         const g = op.get;
//         if (g) {
//             const target = this.nativeValue(g.target);
//             return this.toRemoteValue(target[g.name === undefined ? g.index : g.name]);
//         }
//         const s = op.set;
//         if (s) {
//             const target = this.nativeValue(s.target);
//             target[s.name === undefined ? s.index : s.name] = this.nativeValue(s.value);
//             return s.value;
//         }
//         const i = op.invoke;
//         if (i) {
//             const target = this.nativeValue(i.target);
//             if (i.name) {
//                 return this.toRemoteValue(target[i.name]( ... i.args));
//             } else {
//                 return this.toRemoteValue(target.apply(target, i.args ));
//             }
//         }
//     }

//     private invoke(d: IRJSOperation) {
//         try {
//             const r = this.onMessage(d);
//             this.send({ sid: d.sid, result: r });
//         } catch (ex) {
//             // tslint:disable-next-line: no-console
//             console.error(ex);
//             this.send({
//                 sid: d.sid,
//                 error: ex.stack ? (ex.toString() + "\r\n" + ex.stack) : ex.toString()
//             });
//         }
//     }

//     private createFunction(name: string): IRValue {
//         const f = ( ... args: any[] ) => {

//             try {

//                 // const a = new SharedArrayBuffer(32);
//                 // const ua = new Int32Array(a);

//                 const op = {
//                     parentSid: callID++,
//                     eventInvoke: {
//                         target: this.toRemoteValue(f),
//                         args: args.map((a1) => this.toRemoteValue(a1))
//                     }
//                 };

//                 // tslint:disable-next-line: no-console
//                 // console.log(`Invoking ${name}`);
//                 // parentPort.postMessage(op);
//                 this.send(op);

//                 // now read all messages here..
//                 // till you get response for
//                 // current call id
//                 let result;
//                 const r = this.readMessages();
//                 for (const iterator of r) {
//                     if (iterator.parentSid === op.parentSid) {
//                         // we found the result...
//                         result = this.nativeValue(iterator.result);
//                     } else {
//                         setTimeout(() => {
//                             this.invoke(iterator);
//                         }, 1);
//                     }
//                 }

//                 // tslint:disable-next-line: no-console
//                 // console.log(`Invoke success ${name}`);

//                 return result;
//             } catch (ex) {
//                 // tslint:disable-next-line: no-console
//                 console.error(ex);
//                 throw ex;
//             }

//         };
//         return this.toRemoteValue(f);
//     }

// }

// const c = new DebugClient();

// // parentPort.on("message", (v) => {
// //     c.begin(v);
// // });

// // rl.on("line", (line) => {
// //     debugger;
// //     c.begin(JSON.parse(line));
// // });

// process.on("message", (line) => {
//     // console.log(`Received Ping`);
//     c.begin(JSON.parse(line));
// });
