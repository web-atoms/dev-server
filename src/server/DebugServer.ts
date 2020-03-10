import * as fs from "fs";
import { MessageChannel, Worker } from "worker_threads";
import * as W from "ws";
import { join } from "path";

let fileResultID = 1;

export default class DebugServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {

            const pendingCalls: {[key: string]: Int32Array} = {};

            const wx = new Worker(join( __dirname , "DebugClient.js"));

            wx.on("message", (d) => {
                if (d.parentSid) {
                    pendingCalls[d.parentSid] = d.sharedArray;
                    delete d.sharedArray;
                }
                w.send(JSON.stringify(d));
            });

            w.on("message", (d: W.Data) => {
                const result = d.toString();
                const msg = JSON.parse(result);
                if (msg.parentSid) {
                    const a = pendingCalls[msg.parentSid];
                    const id = fileResultID ++;
                    fs.writeFileSync(`./tmpRemoteResult${id}.json`, result, { encoding: "utf-8"});
                    Atomics.store(a, 1, id);
                    Atomics.store(a, 0, 1);
                    Atomics.notify(a, 0, 2);
                    return;
                }
                wx.postMessage(msg);
            });
            w.on("close", (code, reason) => {
                wx.terminate();
            });
        });
    }
}
