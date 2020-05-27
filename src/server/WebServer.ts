import * as bodyParser from "body-parser";
import * as colors from "colors/safe";
import * as express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ModuleFilesPage } from "./ModuleFilesPage";
import { RootPage } from "./RootPage";
import StaticFileServer from "./StaticFileServer";

class WebServer {

    public express: express.Express;

    constructor() {
        this.express = express();
        this.setupProxy();
        this.setupRoutes();
    }

    public setupProxy(): void {
        const proxyHost = process.argv.find((s) => /^(http|https)\:\/\//.test(s));

        if (proxyHost) {
            const apiProxy = createProxyMiddleware(
                (pathName) => pathName !== "/__debug" && !pathName.startsWith("/__debug/") && pathName !== "/__listen",
                {
                    target: proxyHost,
                    changeOrigin: true,
                    ws: true,
                    cookieDomainRewrite: "",
                    onProxyRes: (proxyReq, req, res) => {

                        if (proxyReq.statusCode > 300) {
                            console.error(colors.red(`HTTP STATUS ${proxyReq.statusCode} for ${proxyHost}${req.url}`));
                        }
                        let cookie = proxyReq.headers["set-cookie"];
                        if (cookie) {
                            cookie = cookie.map((s) => s.replace("secure;", "") );
                            proxyReq.headers["set-cookie"] = cookie;
                        }
                    }
                });

            this.express.use(apiProxy);
        }
    }

    public setupRoutes(): void {

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
