import { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import * as path from "path";

const args = process.argv;

// Assign router to the express.Router() instance
const router: Router = Router();

function prepareHtml(req: Request, res: Response, viewPath: string, autoRefresh: boolean): string {

    while (viewPath.startsWith("/")) {
        viewPath = viewPath.substr(1);
    }

    const designMode =
        req.query.designMode ||
        (process.argv[2] ? false : true);

    const devServer = "/_dev";

    const text: string = readFileSync("./package.json", { encoding: "utf-8", flag: "r" });

    const json: any = JSON.parse(text);

    const current = json.name;
    viewPath = viewPath.replace("$CURRENT$", current);

    // const d = json.dependencies || {};

    // const da: string[] = [];
    // for (const key in d) {
    //     if (d.hasOwnProperty(key)) {
    //         const element = key;
    //         if (element === "reflect-metadata") {
    //             da.push(`\t\t\t\tUMD.map("reflect-metadata","/_files/node_modules/reflect-metadata/Reflect.js");`);
    //         } else {
    //             da.push(`\t\t\t\tUMD.map("${element}","/_files/node_modules/${element}");`);
    //         }
    //     }
    // }

    const refresh = autoRefresh ? `<script src="${devServer}/refresh.js"></script>` : "";

    const body = `
            UMD.map("@web-atoms/dev-server", "${devServer}");
            UMD.map("reflect-metadata","/_files/node_modules/reflect-metadata/Reflect.js");
            UMD.map("qrcode", "${devServer}/node_modules/qrcode");
            UMD.setupRoot("${current}","/_files");
            UMD.lang = "en-US";
            UMD.loadView("${viewPath}", ${ designMode });
`;

    const debug = req.query.debug === undefined ? true : req.query.debug;

    if (req.query.platform === "xf" && debug) {
        return `${body}
        bridge.connectDebugger("/listen");`;
    }

    return `<!DOCTYPE html>

    <html>
    <head>

        <meta name="viewport"   content="width=device-width"/>
        <title>Web Atoms - </title>
        <script src="/_files/node_modules/@web-atoms/module-loader/umd.js"></script>
        <style>
        html, body {
            margin: 0;
            padding: 0;
        }
        </style>
        ${refresh}
    </head>
    <body>
        <script>
            ${body}
        </script>
    </body>
    </html>`;

}

router.get(/^\/uiv\//, (req, res) => {
    const p = req.path.replace("uiv/", "");
    const html = prepareHtml(req, res, p, true);
    res.setHeader("cache-control", "no-cache");
    return res.send(html);
});

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get("/", (req: Request, res: Response) => {

    const pf = req.query.platform || "web";

    const html = prepareHtml(req, res, `@web-atoms/dev-server/dist/${pf}/views/AppHost`, false);
    res.setHeader("cache-control", "no-cache");
    return res.send(html);
});

router.get("/_inspect", (req, res) => {
    const html = prepareHtml(req, res, "@web-atoms/dev-server/dist/web/views/inspector/Inspector", false);
    res.setHeader("cache-control", "no-cache");
    return res.send(html);
});

export const RootPage: Router = router;
