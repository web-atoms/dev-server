import { Request, Response, Router } from "express";
import { fstatSync, ftruncateSync, readdirSync, readFileSync, statSync } from "fs";
import { parse, ParsedPath } from "path";
import * as path from "path";

// Assign router to the express.Router() instance
const router: Router = Router();

router.get("/flat-modules", (req: Request, res: Response) => {

    const files: ParsedPath [] = [];
    populate("./", files);

    return res.send({ files });

});

function populate(dir: string, files: ParsedPath[]): void {
    for (const iterator of readdirSync(dir)) {
        if (iterator === "node_modules") {
            continue;
        }
        const filePath = path.join(dir, iterator);
        const p = parse(filePath);
        if (/\.(html|xaml)/i.test(p.ext)) {
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
