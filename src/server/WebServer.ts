import * as express from "express";

import * as e from "ecstatic";
import { ModuleFilesPage } from "./ModuleFilesPage";
import { RootPage } from "./RootPage";

class WebServer {

    public express: express.Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {

        // this.express.use();
        this.express.use(RootPage);

        this.express.use(ModuleFilesPage);

        this.express.use(e({
            root: __dirname + "/../../",
            baseDir: "_dev",
            showdir: true,
            cache: 1
        }));

        this.express.use(e({
            root: "./",
            baseDir: "",
            showdir: true,
            cache: 1
        }));
    }

}

export default new WebServer().express;
