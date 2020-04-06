import FilePacker from "@web-atoms/pack/dist/FilePacker";
import { existsSync, readFileSync, statSync } from "fs";

const r = /\.pack\.js$/i;

export default class Packed {

    public static checkPacked(name: string): boolean {
        if (!r.test(name)) {
            return false;
        }

        const original = name.substr(0, name.length - 8) + ".js";
        if (!existsSync(original)) {
            // tslint:disable-next-line: no-console
            console.warn(`No original file for ${name}`);
            return false;
        }

        if (!existsSync(name)) {
            // packed file should be generated...
            // tslint:disable-next-line: no-console
            console.log(`No packed file for ${name}, it will be generated`);
            return true;
        }

        // check file write time of packed...
        const p = statSync(name);
        const o = statSync(original);
        if (o.mtimeMs > p.mtimeMs) {
            // packed file should be generated...
            // tslint:disable-next-line: no-console
            console.log(`Original file for ${name} is not same, it will be generated`);
            return true;
        }
        // tslint:disable-next-line: no-console
        console.log(`Original file for ${name} is same, it will not be generated`);
        return false;
    }

    public static async packAndDeliver(baseDir: string, path: string, res: any) {

        try {

            const original = path.substr(0, 8) + ".js";

            const pkg = JSON.parse(readFileSync(baseDir + "/package.json", { encoding: "utf-8" }));

            const fp = new FilePacker(baseDir, original, pkg);

            await fp.pack();

            const text = readFileSync(path, { encoding: "utf-8"});
            res.set("Content-Type", "application/javascript; charset=utf-8");
            res.send(text);
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.error(`Generating packed file failed ${e.stack ? ( e.message + "\r\n" + e.stack) : e}`);
        }
    }

}
