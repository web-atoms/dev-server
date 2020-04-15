import * as fs from "fs";
import { join } from "path";
import * as lockfile from "proper-lockfile";
import * as child_process from "child_process";
import * as readline from "readline";
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

                // const wx = new Worker(join( __dirname , "DebugClient.js"));
                const scriptPath = join( __dirname , "DebugClient.js");
                const wx = child_process.exec(`node --inspect ${scriptPath}`);

                const rl = readline.createInterface({
                    input: wx.stdout,
                    output: wx.stdin,
                    terminal: false
                });

                rl.on("line", (d) => {
                    w.send(d);
                });

                // wx.on("message", (d) => {
                //     w.send(JSON.stringify(d));
                // });

                const ping = JSON.stringify({
                    id,
                    lockFileName,
                    dataFile
                });

                // wx.postMessage(ping);

                w.on("message", (d: W.Data) => {
                    const result = d.toString();
                    if (!result) { return; }
                    const msg = result;
                    let msgList;
                    const r = lockfile.lockSync(lockFileName, { realpath: false });
                    if (fs.existsSync(dataFile)) {
                        msgList = fs.readFileSync(dataFile, "utf-8");
                        msgList += `,${msg}`;
                    } else {
                        msgList = msg;
                    }
                    fs.writeFileSync(dataFile, msgList);
                    r();
                    rl.write(ping);
                    // wx.postMessage(ping);
                });
                w.on("error", (e) => {
                    // tslint:disable-next-line: no-console
                    console.error(e);
                    // wx.terminate();
                    wx.kill();
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
