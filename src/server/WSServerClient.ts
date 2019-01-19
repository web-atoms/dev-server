import * as colors from "colors/safe";
import * as fs from "fs";
import * as W from "ws";

function once(
    f,
    n: number = 1000,
    onError: ((e) => void) = null): void {
    if (f.timeout) {
        clearTimeout(f.timeout);
    }
    f.timeout = setTimeout(() => {
        try {
            f();
        } catch (e) {
            if (onError) {
                onError(e);
            } else {
                // tslint:disable-next-line:no-console
                console.error(e);
            }
        }
    }, n);
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

    private watcher: { [key: string]: fs.FSWatcher } = {};
    private pingTimer: NodeJS.Timer;

    // tslint:disable-next-line:ban-types
    private refreshClient: Function;

    constructor(private client: W) {

        this.pingTimer = setInterval(() => {
            this.client.ping();
        }, 15000);

        client.on("message", (d) => {
            const msg = JSON.parse(d.toString()) as IWSMessage;
            this.processMessage(msg as IWSMessage);
        });

        this.refreshClient = () => this.postUpdate();
    }

    private processMessage(msg: IWSMessage): void {
        try {
            switch (msg.type) {
                case "watch":
                    this.watchPath("./dist");
                    this.watchPath("./node_modules");
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

    private logMessage(payLoad: ILogPayload): void {
        switch (payLoad.type) {
            case "error":
                // tslint:disable-next-line:no-console
                console.log(colors.red(payLoad.message));
                break;
            case "warn":
            case "warning":
                // tslint:disable-next-line:no-console
                console.log(colors.yellow(payLoad.message));
                break;
            case "log":
                // tslint:disable-next-line:no-console
                console.log(colors.gray(payLoad.message));
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
        this.watcher[d] = fs.watch(d, { recursive: true }, (e, f) => {
            once(this.refreshClient);
        });
    }

    private postUpdate(): void {
        const json = JSON.stringify({ type: "refresh" });
        this.client.send(json, (e) => {
            if (e) {
                // tslint:disable-next-line:no-console
                console.error(e);
            }
        });
    }
}
