import * as child_process from "child_process";
import * as open from "open";
import * as W from "ws";
import * as colors from "colors/safe";

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

                const server = req.connection.localAddress.split(":").pop();
                const serverPort = req.connection.localPort;

                // this is Browser connecting...
                xClients[xid] = w;
                const inspector = `http://${server}:${serverPort}/_cdt/inspector.html`;
                const wsUrl = `${server}:${serverPort}/__debug/${xid}`;
                const url =
                    `${inspector}?experiments=true&v8only=true&ws=${encodeURIComponent(wsUrl)}`;

                console.log(colors.yellow("\tOpen This Link if browser fails to open"));
                console.log(colors.green(`\t${url}`));

                open(url);

                w.on("message", (data) => {
                    xBrowsers[xid].send(data.toString());
                });

                w.on("close", () => {
                    if (xBrowsers[xid]) {
                        xBrowsers[xid].close();
                    }
                });
                return;
            }

            // console.log(`${req.url} connected from browser`);
            // this is tid
            const tid = req.url.substr("/__debug/".length);
            if (tid) {
                // console.log(`${tid} connected from browser, forwarding request`);
                xBrowsers[tid] = w;
                w.on("message", (data) => {
                    xClients[tid].send(data.toString());
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
