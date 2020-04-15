import * as fs from "fs";
import { join } from "path";
import * as lockfile from "proper-lockfile";
import { MessageChannel, Worker } from "worker_threads";
import * as W from "ws";

let clientID = 1;

export default class DebugServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {
            try {

                // tslint:disable-next-line: no-console
                console.log(`Client connected`);

                const id = clientID++;

                const lockFileName = `./lock-${id}-l1`;
                const dataFile = `./data-${id}.json`;

                if (fs.existsSync(dataFile)) {
                    fs.unlinkSync(dataFile);
                }

                const pendingCalls: {[key: string]: Int32Array} = {};

                const wx = new Worker(join( __dirname , "DebugClient.js"));

                wx.on("message", (d) => {
                    w.send(JSON.stringify(d));
                });

                const ping = {
                    id,
                    lockFileName,
                    dataFile
                };

                // wx.postMessage(ping);

                w.on("message", (d: W.Data) => {
                    const result = d.toString();
                    if (!result) { return; }
                    const msg = result;
                    let msgList;
                    const r = lockfile.lockSync(lockFileName);
                    if (fs.existsSync(dataFile)) {
                        msgList = fs.readFileSync(dataFile, "utf-8");
                        msgList += `,${msg}`;
                    } else {
                        msgList = msg;
                    }
                    fs.writeFileSync(dataFile, msgList);
                    r();
                    wx.postMessage(ping);
                });
                w.on("error", (e) => {
                    // tslint:disable-next-line: no-console
                    console.error(e);
                    wx.terminate();
                });
                w.on("close", (code, reason) => {
                    for (const key in pendingCalls) {
                        if (pendingCalls.hasOwnProperty(key)) {
                            delete pendingCalls[key];
                        }
                    }
                    // tslint:disable-next-line: no-console
                    console.log(`Client disconnected`);
                    wx.terminate();
                });
            } catch (e) {
                // tslint:disable-next-line: no-console
                console.error(e);
            }
        });
    }
}
