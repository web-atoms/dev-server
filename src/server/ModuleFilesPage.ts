import { Request, Response, Router } from "express";
import { existsSync, fstatSync, ftruncateSync, readdirSync, readFileSync, statSync } from "fs";
import { parse, ParsedPath } from "path";
import * as path from "path";

// Assign router to the express.Router() instance
const router: Router = Router();

export interface IPackedFile extends ParsedPath {
    packed?: boolean;
    xf?: boolean;
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
        if (/\.(html|xaml)/i.test(p.ext)) {
            const packedFile = path.join(dir, `${p.name}.pack.js`);
            p.packed = existsSync(packedFile);
            p.xf = /xaml/i.test(p.ext);
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
