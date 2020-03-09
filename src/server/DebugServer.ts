import { Worker } from "worker_threads";
import * as W from "ws";

export default class DebugServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {
            const wx = new Worker("./DebugClient", { });
            w.on("message", (d: W.Data) => {
                wx.postMessage(d.toString());
            });
            w.on("close", (code, reason) => {
                wx.terminate();
            });
        });
    }
}
