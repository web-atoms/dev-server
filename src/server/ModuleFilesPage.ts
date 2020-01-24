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
    packed?: boolean;
    xf?: boolean;
    module?: string;
}

router.get("/flat-modules", (req: Request, res: Response) => {

    const files: ParsedPath [] = [];
    populate("./", files);
    res.setHeader("cache-control", "no-cache");

    return res.send({ files });

});

function populate(dir: string, files: ParsedPath[]): void {
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
            const packedFile = path.join(dir, `${p.name}.pack.js`);
            p.packed = existsSync(packedFile);
            files.push(p);
            continue;
        }
        const s = statSync(filePath);
        if (s.isDirectory()) {
            populate(filePath, files);
        }
    }
}

export const ModuleFilesPage: Router = router;
