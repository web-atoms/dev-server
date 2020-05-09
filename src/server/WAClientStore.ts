import { IDisposable } from "@web-atoms/core/dist/core/types";
import FolderWatcher from "./FolderWatcher";

class WAClient {

    private timeout: any;

    constructor(
        private readonly refreshCallback: () => void,
        public readonly files = []) {
    }

    public refresh() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = 0;
        }
        this.timeout = setTimeout(() => {
            this.timeout = 0;
            this.refreshCallback();
        }, 1000);
    }

}

export default class WAClientStore {

    public static instance = new WAClientStore();

    private clients: {[key: string]: WAClient} = {};

    private watcher: FolderWatcher;
    constructor() {
        this.watcher = new FolderWatcher("./dist", (fn, time) => {
            this.onFileChanged(fn.substr(2));
        }, true);
    }

    public register(id: string, onRefresh: () => void): IDisposable {
        // console.log(`Register ${id}`);
        this.clients[id] = new WAClient(onRefresh);
        return {
            dispose: () => {
                delete this.clients[id];
            }
        };
    }

    public watch(id: string, path: string) {
        path = path.split("\\").join("/");
        // console.log(`Watching for ${path} for ${id}`);
        const watcher = this.clients[id];
        if (watcher) {
            watcher.files[path] = 1;
        }
    }

    private onFileChanged(file: string) {
        file = file.split("\\").join("/");
        // console.log(`WAClientStore File changed ${file}`);
        for (const id in this.clients) {
            if (this.clients.hasOwnProperty(id)) {
                const client = this.clients[id];
                if (client.files[file]) {
                    // console.log(`Requesting refresh for ${id}`);
                    client.refresh();
                }
            }
        }
    }

}
