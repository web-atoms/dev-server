import { MessageChannel, Worker } from "worker_threads";
import * as W from "ws";

export default class DebugServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {

            const pendingCalls: {[key: string]: Uint8Array} = {};

            const wx = new Worker("./DebugClient");

            wx.on("message", (d) => {
                if (d.parentSid) {
                    pendingCalls[d.parentSid] = d.sharedArray;
                    delete d.sharedArray;
                }
                w.send(JSON.stringify(d));
            });

            w.on("message", (d: W.Data) => {
                const msg = JSON.parse(d.toString());
                if (msg.parentSid) {
                    const a = pendingCalls[msg.parentSid];
                    a[0] = 1;
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
