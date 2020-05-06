import * as child_process from "child_process";
import * as colors from "colors/safe";
import * as open from "open";
import * as W from "ws";

interface IClientMap {
    [key: string]: ProxyClient;
}

interface IProcessMap {
    [key: string]: child_process.ChildProcess;
}

const xClients: IClientMap = {};

const xBrowsers: IClientMap = {};

const xProcesses: IProcessMap = {};

class ProxyClient {

    constructor(
        private id: string,
        private from: W,
        private self: IClientMap,
        private other: IClientMap) {

        from.on("message", (data) => {
            try {
                const a = this.other[this.id];
                if (a) {
                    a.from.send(data);
                }
            } catch (e) {
                console.error(colors.yellow(e));
            }
        });

        from.on("error", (e) => {
            try {
                // remove self...
                delete this.self[id];
            } catch (e1) {
                console.error(colors.yellow(e1));
            }
            console.error(colors.red(e.stack ? e.stack : e.toString()));
        });

        from.on("close", (n, r) => {
            try {
                delete this.self[id];
            } catch (e) {
                console.error(colors.yellow(e));
            }
        });

    }

}

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
                xClients[xid] = new ProxyClient(xid, w, xClients, xBrowsers);
                const inspector = `http://${server}:${serverPort}/_cdt/inspector.html`;
                const wsUrl = `${server}:${serverPort}/__debug/${xid}`;
                const url =
                    `${inspector}?experiments=true&v8only=true&ws=${encodeURIComponent(wsUrl)}`;

                console.log(colors.yellow("\tOpen This Link if browser fails to open"));
                console.log(colors.green(`\t${url}`));

                open(url);
                return;
            }

            // console.log(`${req.url} connected from browser`);
            // this is tid
            const tid = req.url.substr("/__debug/".length);
            if (tid) {
                // console.log(`${tid} connected from browser, forwarding request`);
                xBrowsers[tid] = new ProxyClient(tid, w, xBrowsers, xClients);
            }

        });
    }
}
