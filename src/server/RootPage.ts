import { Request, Response, Router } from "express";
import { readFileSync } from "fs";

const args = process.argv;

// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get("/", (req: Request, res: Response) => {

    const url = req.path.substr(5);

    const dev = args.find((a) => a === "dev");

    const devServer = dev ? "/_files/" : "/_files/node_modules/web-atoms-dev-server/";

    const text: string = readFileSync("./package.json", { encoding: "utf-8", flag: "r" });

    const json: any = JSON.parse(text);

    const d = json.dependencies || {};

    const da: string[] = [];
    for (const key in d) {
        if (d.hasOwnProperty(key)) {
            const element = key;
            if (element === "reflect-metadata") {
                da.push(`\t\t\t\tUMD.map("reflect-metadata","/_files/node_modules/reflect-metadata/Reflect.js");`);
            } else {
                da.push(`\t\t\t\tUMD.map("${element}","/_files/node_modules/${element}");`);
            }
        }
    }

    res.send(`<!DOCTYPE html>

    <html>
    <head>

        <meta name="viewport"   content="width=device-width"/>
        <title>Web Atoms - </title>
        <script src="/_files/node_modules/web-atoms-amd-loader/umd.js"></script>
    </head>
    <body>
        <script>
                ${da.join("\r\n")}
                UMD.map("CURRENT","/_files/");
                UMD.map("web-atoms-dev-server", "${devServer}");
                UMD.lang = "en-US";
                UMD.loadView("web-atoms-dev-server/dist/web/views/AppHost", true);
        </script>
    </body>
    </html>
    `);
});

export const RootPage: Router = router;
