import FilePacker from "@web-atoms/pack/dist/FilePacker";
import PackageVersion from "@web-atoms/pack/dist/PackageVersion";
import * as colors from "colors/safe";
import { existsSync, readFileSync, statSync, utimesSync } from "fs";

const r = /\.pack\.js$/i;

PackageVersion.isV2 = true;

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
            console.log(colors.yellow(`No packed file for ${name}, it will be generated`));
            return true;
        }

        // check file write time of packed...
        const p = statSync(name);
        const o = statSync(original);
        if (o.mtimeMs > p.mtimeMs) {
            // packed file should be generated...
            // tslint:disable-next-line: no-console
            console.log(colors.yellow(`Original file for ${name} is not same, it will be generated`));
            return true;
        }
        // tslint:disable-next-line: no-console
        console.log(colors.green(`Original file for ${name} is same, it will not be generated`));
        return false;
    }

    public static async packAndDeliver(baseDir: string, path: string, res: any) {

        try {

            const original = path.substr(0, path.length - 8);

            const pkg = JSON.parse(readFileSync(baseDir + "/package.json", { encoding: "utf-8" }));

            const fp = new FilePacker(baseDir, original, pkg);

            await fp.pack();

            // const text = readFileSync(path, { encoding: "utf-8"});

            // update modified time...
            // const sp = statSync(path);
            // utimesSync(path, sp.atime, new Date());

            // res.set("Content-Type", "application/javascript; charset=utf-8");
            // res.send(text);
            res.sendFile(path);
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.error(colors.red(`Generating packed file failed for ${baseDir}, ${path}
${e.stack ? ( e.message + "\r\n" + e.stack) : e}`));
            throw e;
        }
    }

}
