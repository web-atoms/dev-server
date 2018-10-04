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

        const router = express.Router();

        this.express.use(RootPage);

        this.express.use(ModuleFilesPage);

        this.express.use(e({
            root: "./",
            baseDir: "_files",
            showdir: true
        }));

    }

}

export default new WebServer().express;
