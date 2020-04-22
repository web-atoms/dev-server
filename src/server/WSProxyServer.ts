import * as child_process from "child_process";
import * as W from "ws";
import * as openurl from "openurl";

interface IClientMap {
    [key: string]: W;
}

interface IProcessMap {
    [key: string]: child_process.ChildProcess;
}

const xClients: IClientMap = {};

const xBrowsers: IClientMap = {};

const xProcesses: IProcessMap = {};

export default class WSProxyServer {

    public static configure(ws: W.Server, port: number): void {
        ws.on("connection", (w, req) => {

            // check who is connecting... if no parameter, it is XF Client

            const queries = (req.url.split("?")[1] || "")
                .split("&")
                .map((s) => s.split("="))
                .reduce((p, i) => {
                    p[i[0]] = unescape(i[1] || "");
                    return p;
                 } , {}) as any;

            const xid = queries.id;

            if (xid) {
                // this is Browser connecting...
                xClients[xid] = w;
                const inspector = "devtools://devtools/bundled/inspector.html";
                const url =
                    `${inspector}?experiments=true&v8only=true&ws=127.0.0.1:${port}/__debug/${xid}`;

                console.log("Open This Link");
                console.log(url);

                // openurl.open(url, () => {
                //     w.close();
                // });
                // const httpUrl = `http://127.0.0.1:${port}/__go?url=${encodeURIComponent(url)}`;

                // const cp = child_process.exec(`start ${httpUrl}`);
                // xProcesses[xid] = cp;
                // cp.on("close", () => {
                //     delete xProcesses[xid];
                // });

                w.on("message", (data) => {
                    xBrowsers[xid].send(data);
                });

                w.on("close", () => {
                    if (xBrowsers[xid]) {
                        xBrowsers[xid].close();
                    }
                });
                return;
            }

            // this is tid
            const tid = req.url.split("/__debug/")[0];
            if (tid) {
                xBrowsers[tid] = w;
                w.on("message", (data) => {
                    xClients[tid].send(data);
                });
                w.on("close", () => {
                    if (xClients[tid]) {
                        xClients[tid].close();
                    }
                });
            }

        });
    }
}
