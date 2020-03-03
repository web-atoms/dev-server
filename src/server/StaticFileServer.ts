import { Router } from "express";
import { join, resolve, isAbsolute } from "path";
import { existsSync, readFileSync } from "fs";
import { RSA_NO_PADDING } from "constants";

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

        if (!baseDir.startsWith("/")) {
            baseDir = "/" + baseDir;
        }

        router.use((req, res, next) => {

            let path = req.path;
            if (baseDir) {
                if (!path.startsWith(baseDir)) {
                    next();
                    return;
                }
                path = path.substr(baseDir.length);
                if (path.startsWith("/")) {
                    path = path.substr(1);
                }
            }
            path = join(root, path);
            if (!isAbsolute(path)) {
                path = resolve(path);
            }
            if (existsSync(path)) {

                // since map fails
                if (/\.map$/i.test(path)) {

                    const text = readFileSync(path, { encoding: "utf-8" });
                    res.charset = "utf-8";
                    res.set("Content-Type", "application/json");
                    res.send(text);
                    return;
                }

                if (/\.ts$/i.test(path)) {
                    const text = readFileSync(path, { encoding: "utf-8"});
                    res.charset = "utf-8";
                    res.set("Content-Type", "application/x-typescrip");
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
