import * as colors from "colors/safe";
import { Router } from "express";
import { existsSync, readFileSync } from "fs";
import { isAbsolute, join, resolve } from "path";
import Packed from "./Packed";
// import WAClientStore from "./WAClientStore";

export default class StaticFileServer {

    public static route({
        root,
        baseDir,
        showdir,
        cache,
        checkPacked
    }: {
        root: string,
        baseDir: string,
        showdir: boolean,
        cache: string,
        checkPacked: boolean
    }): Router {
        const router = Router();

        if (baseDir) {
            if (!baseDir.startsWith("/")) {
                baseDir = "/" + baseDir;
            }
        }

        router.use((req, res, next) => {

            let path = req.path;
            if (baseDir) {
                if (!path.startsWith(baseDir)) {
                    next();
                    return;
                }
                path = path.substr(baseDir.length);
            }
            path = join(root, path);

            if (checkPacked) {

                // const id = req.headers["x-debug-id"] as string;
                // if (id) {
                //     WAClientStore.instance.watch(id, path);
                // }

                if (Packed.checkPacked(path)) {
                    // check...
                    Packed.packAndDeliver(root, path, res).catch((e) => {
                        res.statusCode = 500;
                        res.send( e.stack ? (e.message + "\r\n" + e.stack) : e.toString());
                    });
                    return;
                }
            }

            if (!isAbsolute(path)) {
                path = resolve(path);
            }

            if (existsSync(path)) {

                res.set("Cache-Control", "no-cache");

                // since map fails
                if (/\.map$/i.test(path)) {

                    const text = readFileSync(path, { encoding: "utf-8" });
                    res.set("Content-Type", "application/json; charset=utf-8");
                    res.send(text);
                    return;
                }

                if (/\.ts$/i.test(path)) {
                    const text = readFileSync(path, { encoding: "utf-8"});
                    res.set("Content-Type", "application/x-typescript; charset=utf-8");
                    res.send(text);
                    return;
                }

                if (/\.js$/i.test(path)) {
                    const text = readFileSync(path, { encoding: "utf-8"});
                    res.set("Content-Type", "application/javascript; charset=utf-8");
                    res.send(text);
                    return;
                }

                res.sendFile(path, {  }, (e) => {
                    if (e) {
                        // tslint:disable-next-line: no-console
                        console.error(colors.red(`Failed: ${e}`));
                    }
                });
                return;
            }

            next();
        });

        return router;
    }

}
