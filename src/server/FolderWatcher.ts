import { existsSync, readdirSync, readFileSync, statSync, watch } from "fs";
import * as md5 from "md5";

// prevent recursive and wait..


export default class FolderWatcher {

    public static busy: boolean = false;

    /**
     * Store md5 of previous files...
     */
    private static files: { [key: string]: string } = {};

    private watch: any;

    private last: any;

    /**
     *
     */
    constructor(
        private readonly path: string,
        private readonly callback: (delayed?: boolean) => void) {
        this.readFiles(path);
        this.watch = watch(
            path,
            { recursive: true },
            (e, filename) => {

            if (FolderWatcher.busy) {
                if (this.last) {
                    clearTimeout(this.last);
                    this.last = null;
                }
                this.last = setTimeout(() => {
                    this.onFileChange(filename, true);
                }, 500);
            } else {
                this.onFileChange(filename);
            }
        });
    }

    public close(): void {
        if (this.watch) {
            this.watch.close();
        }
    }

    private onFileChange(f: string, delayed?: boolean): void {
        const filename = `${this.path}/${f}`;
        const old = FolderWatcher.files[filename];
        if (!existsSync(filename)) {
            // tslint:disable-next-line: no-console
            // console.log(`File ${filename} deleted`);
            delete FolderWatcher.files[filename];
            return;
        }

        // check if it is a folder...
        const s = statSync(filename);
        if (s.isDirectory()) {
            return;
        }
        const n = md5(readFileSync(filename));
        if (old) {
            if (n === old) {
                return;
            }
        }
        FolderWatcher.files[filename] = n;
        this.callback(delayed);
    }

    private readFiles(path: string): void {
        const files = readdirSync(path);
        for (const iterator of files) {
            const filePath = `${path}/${iterator}`;
            const s = statSync(filePath);
            if (s.isDirectory()) {
                this.readFiles(filePath);
            } else {
                if (FolderWatcher.files[filePath]) {
                    continue;
                }
                FolderWatcher.files[filePath] = md5(readFileSync(filePath));
            }
        }
    }

}
