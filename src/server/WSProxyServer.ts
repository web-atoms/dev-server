import * as child_process from "child_process";
import * as colors from "colors/safe";
import * as open from "open";
import * as W from "ws";
import WAClientStore from "./WAClientStore";

interface IClientMap {
    [key: string]: ProxyClient;
}

const xClients: IClientMap = {};

const xBrowsers: IClientMap = {};

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

        const close = () => {
            try {
                const a = this.other[this.id];
                if (a) {
                    a.from.close();
                }
                // remove self...
                delete this.self[id];
            } catch (e1) {
                console.error(colors.yellow(e1));
            }
        };

        from.on("error", (e) => {
            close();
            console.error(colors.red(e.stack ? e.stack : e.toString()));
        });

        from.on("close", (n, r) => {
            close();
        });

    }

}

const refresh = JSON.stringify(
    {
        id: 100000,
        method: "Runtime.evaluate",
        params: {
            awaitPromise: false,
            contextId: 1,
            expression: "bridge.refresh()",
            generatePreview: false,
            includeCommandLineAPI: true,
            objectGroup: "console",
            replMode: true,
            returnByValue: false,
            silent: false,
            userGesture: true
        }
    }
);

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

            const noDebug = queries.noDebug;

            if (xid) {

                const server = req.connection.localAddress.split(":").pop();
                const serverPort = req.connection.localPort;

                const d = WAClientStore.instance.register(xid, () => {
                    try {
                        console.log(`Requesting refresh ${xid}`);
                        w.send(refresh);
                    } catch (e) {
                        console.error(e);
                    }
                });
                w.on("close", () => {
                    d.dispose();
                });

                if (noDebug) {
                    // only support refreshing...
                    return;
                }

                // this is Browser connecting...
                xClients[xid] = new ProxyClient(xid, w, xClients, xBrowsers);
                const inspector = `http://${server}:${serverPort}/_cdt/inspector.html`;
                const wsUrl = `${server}:${serverPort}/__debug/${xid}`;
                const url =
                    `${inspector}?experiments=true&v8only=true&ws=${encodeURIComponent(wsUrl)}`;

                console.log(colors.yellow("\tOpen This Link if browser fails to open"));
                console.log(colors.green(`\t${url}`));

                if (process.argv.indexOf("--no-auto-open") === -1) {
                    open(url);
                }
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
