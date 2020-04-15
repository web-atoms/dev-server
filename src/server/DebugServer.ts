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
                    fs.writeFileSync(dataFile, "");
                }

                const pendingCalls: {[key: string]: Int32Array} = {};

                // const wx = new Worker(join( __dirname , "DebugClient.js"));
                const scriptPath = join( __dirname , "DebugClient.js");
                // const wx = child_process.exec(`node --inspect ${scriptPath}`);
                const wx = child_process.fork(
                    scriptPath,
                    [],
                    { execArgv: ["--inspect"] });

                // const rl = readline.createInterface({
                //     input: wx.stdout,
                //     output: wx.stdin,
                //     terminal: false
                // });

                // rl.on("line", (d) => {
                //     console.log(`From Child: ${d}`);
                //     if (/^json\:/.test(d)) {
                //         w.send(d.substr(5));
                //     }
                // });

                wx.on("message", (d) => {
                     w.send(d);
                });

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
                    let r = null;
                    while (true) {
                        try {
                            r = lockfile.lockSync(lockFileName, { realpath: false });
                            break;
                        } catch (ex) {
                            continue;
                        }
                    }
                    if (fs.existsSync(dataFile)) {
                        msgList = fs.readFileSync(dataFile, "utf-8");
                        if (msgList) {
                            msgList += `,${msg}`;
                        } else {
                            msgList = msg;
                        }
                    } else {
                        msgList = msg;
                    }
                    fs.writeFileSync(dataFile, msgList);
                    r();
                    wx.send(ping);
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
                    wx.kill();
                });
            } catch (e) {
                // tslint:disable-next-line: no-console
                console.error(e);
            }
        });
    }
}
