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

    constructor(private client: W) {
        this.watchPath("./dist");
        client.on("message", (d) => {
            this.watchPath(d);
        });
    }

    private dispose(): void {
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
        if (!this.lastTimeout) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = null;
        }
        this.lastTimeout = setTimeout(() => {
            this.client.send({ type: "refresh" }, (e) => {
                // tslint:disable-next-line:no-console
                console.error(e);
            });
        }, 100);
    }
}
