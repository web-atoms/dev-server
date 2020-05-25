import * as express from "express";
import * as bodyParser from "body-parser";
import { ModuleFilesPage } from "./ModuleFilesPage";
import { RootPage } from "./RootPage";
import StaticFileServer from "./StaticFileServer";

class WebServer {

    public express: express.Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {

        // this.express.use();
        // this.express.use(express.json());

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded( { extended: true } ));
        this.express.use(bodyParser.raw());

        this.express.use(RootPage);

        this.express.use(ModuleFilesPage);

        this.express.use(StaticFileServer.route({
            root: __dirname + "/../../cdt",
            baseDir: "_cdt",
            showdir: true,
            cache: "no-cache",
            checkPacked: false
        }));

        this.express.use(StaticFileServer.route({
            root: __dirname + "/../../",
            baseDir: "_dev",
            showdir: true,
            cache: "no-cache",
            checkPacked: false
        }));

        this.express.use(StaticFileServer.route({
            root: "./",
            baseDir: "",
            showdir: true,
            cache: "no-cache",
            checkPacked: true
        }));
    }

}

export default new WebServer().express;
