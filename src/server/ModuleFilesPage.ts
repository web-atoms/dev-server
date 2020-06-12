import { Request, Response, Router } from "express";
import { existsSync, fstatSync, ftruncateSync, readdirSync, readFileSync, statSync } from "fs";
import { parse, ParsedPath } from "path";
import * as path from "path";

// Assign router to the express.Router() instance
const router: Router = Router();

const packageConfig = JSON.parse(readFileSync("./package.json", { encoding: "utf-8", flag: "r"}));

function replaceSrc(src: string): string {
    src = src.split("\\").join("/");
    const tokens = src.split("/");
    if (tokens[0] === "src") {
        tokens[0] = "dist";
    }
    return tokens.join("/");
}

export interface IPackedFile extends ParsedPath {
    packed?: string;
    xf?: boolean;
    module?: string;
    package?: string;
    hostUrl?: string;
}

router.get("/flat-modules", (req: Request, res: Response) => {
    const search = (req.query.search as string || "").toLowerCase();
    const packed = req.query.packed as string === "true";

    const files: IPackedFile [] = [];
    populate("./", files, search, packed);
    res.setHeader("cache-control", "no-cache");

    const server = req.connection.localAddress.split(":").pop();
    const serverPort = req.connection.localPort;

    for (const iterator of files) {
        iterator.hostUrl = `http://${server}:${serverPort}`;
        iterator.package = packageConfig.name;
    }

    return res.send({ files });

});

const shortCodes = {};
const last = 0;

router.get(/^\/\_r\//g, (req: Request, res: Response) => {
    let id: number;
    let url = req.param("url", null);
    if (url) {
        id = shortCodes[url];
        if (!id) {
            id = last + 1;
            shortCodes[url] = id;
            shortCodes[id] = url;
        }
        return res.send({id});
    }
    const rp = req.path.substr("/_r/".length);
    id = parseInt(rp, 10);
    url = shortCodes[id];
    res.redirect(url);
});

function populate(dir: string, files: ParsedPath[], search: string, packed: boolean): void {
    for (const iterator of readdirSync(dir)) {
        if (iterator === "node_modules") {
            continue;
        }
        const filePath = path.join(dir, iterator);
        const p = parse(filePath) as IPackedFile;
        if (/\.(tsx)/i.test(p.ext)) {
            p.module = [packageConfig.name, replaceSrc(p.dir), p.name]
                .filter((x) => x)
                .join("/");
            const fp = path.join(dir, `${p.name}${p.ext}`);
            const t = readFileSync(fp, "utf-8");
            if (/\/\/\s*\@web\-atoms\-pack\:\s*true/gi.test(t)) {
                p.packed = path.join(dir, `${p.name}.pack.js`).split("\\").join("/").replace("src/", "dist/");
            }
            if (packed && !p.packed) {
                continue;
            }
            if (search && p.module.toLowerCase().indexOf(search) === -1 ) {
                continue;
            }
            files.push(p);
            continue;
        }
        const s = statSync(filePath);
        if (s.isDirectory()) {
            populate(filePath, files, search, packed);
        }
    }
}

export const ModuleFilesPage: Router = router;
