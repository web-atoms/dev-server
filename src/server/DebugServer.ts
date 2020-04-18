import * as child_process from "child_process";
import * as fs from "fs";
import { join } from "path";
import * as W from "ws";
import locker from "./locker";

let clientID = 1;

if (!fs.existsSync("./tmp")) {
    fs.mkdirSync("./tmp");
}

export default class DebugServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {
            try {

                // tslint:disable-next-line: no-console
                console.log(`Client connected`);

                const id = clientID++;

                const lockFileName = `./tmp/lock-${id}-l1`;
                const dataFile = `./tmp/data-${id}.json`;

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
                    try {
                        const result = d.toString();
                        if (!result) { return; }
                        const msg = result;
                        let msgList;
                        // console.log(`S: Locking`);
                        const r = locker(lockFileName);
                        // console.log(`S: Writing`);
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
                        // console.log(`S: Sending Ping`);
                        wx.send(ping);
                    } catch (e) {
                        console.error(e);
                    }
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
