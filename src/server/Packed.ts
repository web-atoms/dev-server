import FilePacker, { IFileLastModifiedMap } from "@web-atoms/pack/dist/FilePacker";
import PackageVersion from "@web-atoms/pack/dist/PackageVersion";
import * as colors from "colors/safe";
import { existsSync, readFileSync, statSync, unlinkSync } from "fs";
import { isAbsolute, resolve } from "path";
import FolderWatcher from "./FolderWatcher";

const r = /\.pack\.js$/i;

function fixPathStyle(path: string) {
    return path.split("\\").join("/");
}

PackageVersion.isV2 = true;

const generatedOnce: {[key: string]: boolean } = {};

export const fileMap: { [key: string]: IFileLastModifiedMap} = {};

export const fw = new FolderWatcher("./dist", (file, time) => {
    file = fixPathStyle(file).substr(2);
    for (const key in fileMap) {
        if (fileMap.hasOwnProperty(key)) {
            const element = fileMap[key];
            const lastModified = element[file];
            if (lastModified) {
                element[file] = time;
                if (existsSync(key)) {
                    console.log(`File ${file} modified... deleting ${key}`);
                    // delete file...
                    unlinkSync(key);
                }
            }
        }
    }
});

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

        if (!generatedOnce[original]) {
            generatedOnce[original] = true;
            console.log(colors.yellow(`Since it is first request for ${name}, it will be generated`));
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

            const fm = await fp.pack();

            fileMap["./" + fixPathStyle(path)] = fm;

            // const text = readFileSync(path, { encoding: "utf-8"});

            // update modified time...
            // const sp = statSync(path);
            // utimesSync(path, sp.atime, new Date());

            // res.set("Content-Type", "application/javascript; charset=utf-8");
            // res.send(text);
            if (!isAbsolute(path)) {
                path = resolve(path);
            }
            res.sendFile(path);
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.error(colors.red(`Generating packed file failed for ${baseDir}, ${path}
${e.stack ? ( e.message + "\r\n" + e.stack) : e}`));
            throw e;
        }
    }

}
