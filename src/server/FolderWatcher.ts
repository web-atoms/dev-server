import * as colors from "colors/safe";
import { existsSync, readdirSync, readFileSync, Stats, statSync, watch } from "fs";
// import * as md5 from "md5-file";

// prevent recursive and wait..

export default class FolderWatcher {

    private static ready: any = {};

    /**
     * Store md5 of previous files...
     */
    private static files: { [key: string]: number } = {};

    private static async readFiles(path: string) {
        const files = readdirSync(path);
        const all = [];

        for (const iterator of files) {
            const filePath = `${path}/${iterator}`;
            const s = statSync(filePath);
            if (s.isDirectory()) {
                await FolderWatcher.readFiles(filePath);
            } else {
                all.push((async () => {
                    if (FolderWatcher.files[filePath]) { return; }
                    FolderWatcher.files[filePath] = s.mtimeMs;
                })());
            }
        }

        if (all.length) {
            await Promise.all(all);
        }
    }

    private watch: any;

    /**
     *
     */
    constructor(
        private readonly path: string,
        private readonly callback: (fileName: string, time: number) => void) {

        if (!FolderWatcher.ready[path]) {

            // tslint:disable-next-line: no-console
            console.log(colors.grey(`Reading hash of path ${path}`));
            FolderWatcher.readFiles(path)
                .catch((e) => {
                    // tslint:disable-next-line: no-console
                    console.error(colors.red(e.stack ? e.message + "\r\n" + e.stack : e));
                    FolderWatcher.ready[path] = true;
                }).then(() => {
                    FolderWatcher.ready[path] = true;
                    // tslint:disable-next-line: no-console
                    console.log(colors.grey(`Reading hash of path ${path} finished.`));
                });
        }
        this.watch = watch(
            path,
            { recursive: true },
            (e, filename) => {

            // ignore .pack.js files...
            if (/\.pack(\.min)?\.js(\.map)?$/i.test(filename)) {
                return;
            }

            if (!FolderWatcher.ready[path]) {
                return;
            }
            this.onFileChange(filename);
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
        const n = s.mtimeMs;
        if (old) {
            if (n === old) {
                return;
            }
        }
        FolderWatcher.files[filename] = n;
        const st = statSync(filename);
        this.callback(filename, st.mtimeMs);
    }

}
