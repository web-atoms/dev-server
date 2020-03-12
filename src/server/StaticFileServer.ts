import { Router } from "express";
import { existsSync, readFileSync } from "fs";
import { isAbsolute, join, resolve } from "path";

export default class StaticFileServer {

    public static route({
        root,
        baseDir,
        showdir,
        cache
    }: {
        root: string,
        baseDir: string,
        showdir: boolean,
        cache: string
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
                        console.error(`Failed: ${e}`);
                    }
                });
                return;
            }

            next();
        });

        return router;
    }

}
