import * as colors from "colors/safe";
import * as fs from "fs";
import * as W from "ws";
import FolderWatcher from "./FolderWatcher";

class Once {
    private timeout: any;

    public run(fx: ((... p: any[]) => any)): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(fx, 1000);
    }
}

interface ILogPayload {

    type: "error" | "warning" | "warn" | "log";
    message: string;

}

type IWSMessage = {
    type: "watch",
    path: string
} | {
    type: "console",
    payload: ILogPayload
};

export default class WSServerClient {

    public static configure(ws: W.Server): void {
        ws.on("connection", (w, req) => {
            const wx = new WSServerClient(w);
            w.on("close", (code, reason) => {
                wx.dispose();
            });
        });
    }

    private once: Once = new Once();
    private watcher: { [key: string]: FolderWatcher } = {};
    private pingTimer: NodeJS.Timer;

    private start: any;

    constructor(private client: W) {

        this.pingTimer = setInterval(() => {
            try {
                this.client.ping();
            } catch (e) {
                // tslint:disable-next-line: no-console
                console.error(e);

                // this client has been closed...
                this.dispose();
            }
        }, 15000);

        client.on("message", (d) => {
            const msg = JSON.parse(d.toString()) as IWSMessage;
            this.processMessage(msg as IWSMessage);
        });

    }

    private processMessage(msg: IWSMessage): void {
        try {
            switch (msg.type) {
                case "watch":
                    this.watchPath("./dist");
                    // this.watchPath("./node_modules");
                    this.start = (new Date()).getTime();
                    break;
                case "console":
                    this.logMessage(msg.payload);
                    break;
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
    }

    private async resolveMaps(msg: string): Promise<string> {
        // msg = msg.replace(/(http|https)\:\/\/()+/i, "");
        return msg;
    }

    private logMessage(payLoad: ILogPayload): void {
        switch (payLoad.type) {
            case "error":
                this.resolveMaps(payLoad.message).then((m) => {
                    // tslint:disable-next-line: no-console
                    console.log(colors.red(m));
                });
                break;
            case "warn":
            case "warning":
                this.resolveMaps(payLoad.message).then((m) => {
                    // tslint:disable-next-line: no-console
                    console.log(colors.yellow(m));
                });
                break;
            case "log":
                this.resolveMaps(payLoad.message).then((m) => {
                    // tslint:disable-next-line: no-console
                    console.log(colors.gray(m));
                });
                break;
        }
    }

    private dispose(): void {
        if (this.pingTimer) {
            clearInterval(this.pingTimer);
        }
        for (const key in this.watcher) {
            if (this.watcher.hasOwnProperty(key)) {
                const element = this.watcher[key];
                element.close();
            }
        }
    }

    private watchPath(d: string): void {
        const watcher = this.watcher[d];
        if (watcher) {
            watcher.close();
        }
        this.watcher[d] = new FolderWatcher(d, () => {
            this.once.run(() => this.postUpdate());
        });
    }

    private postUpdate(): void {

        const n = (new Date()).getTime();
        if (n - this.start < 5000) {
            return;
        }

        const json = JSON.stringify({ type: "refresh" });
        // tslint:disable-next-line:no-console
        console.log(`Requesting client refresh ... `);
        this.client.send(json, (e) => {
            if (e) {
                // tslint:disable-next-line:no-console
                console.error(e);
            }
        });
    }
}
