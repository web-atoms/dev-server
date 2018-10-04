import * as fs from "fs";
import * as W from "ws";

export default class WSServer {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {
            const wx = new WSServer(w);
            w.on("close", (code, reason) => {
                wx.dispose();
            });
        });
    }

    private watcher: fs.FSWatcher;
    private lastTimeout: NodeJS.Timer;
    private pingTimer: NodeJS.Timer;

    constructor(private client: W) {

        this.pingTimer = setInterval(() => {
            this.client.ping();
        }, 15000);

        this.watchPath("./dist");
        client.on("message", (d) => {
            const msg = JSON.parse(d.toString());
            if (msg.type === "watch") {
                this.watchPath(msg.path);
            }
        });
    }

    private dispose(): void {
        if (this.pingTimer) {
            clearInterval(this.pingTimer);
        }
        if (this.watcher) {
            this.watcher.close();
        }
        if (this.lastTimeout) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = null;
        }
    }

    private watchPath(d: any): void {
        if (this.watcher) {
            this.watcher.close();
        }
        this.watcher = fs.watch(d, { recursive: true }, (e, f) => {
            this.postUpdate();
        });
    }

    private postUpdate(): void {
        if (this.lastTimeout) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = null;
        }
        this.lastTimeout = setTimeout(() => {
            const json = JSON.stringify({ type: "refresh" });
            this.client.send(json, (e) => {
                if (e) {
                    // tslint:disable-next-line:no-console
                    console.error(e);
                }
            });
        }, 500);
    }
}
