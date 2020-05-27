import * as bodyParser from "body-parser";
import * as express from "express";
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

        this.express.use(bodyParser.json({
            limit: "50mb"
        }));
        this.express.use(bodyParser.urlencoded( {
            extended: true,
            limit: "50mb",
            parameterLimit: 100000
        } ));
        // this.express.use(bodyParser.raw());

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
