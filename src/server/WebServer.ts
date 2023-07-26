import * as bodyParser from "body-parser";
import * as colors from "colors/safe";
import * as express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as querystring from "querystring";
import { ModuleFilesPage } from "./ModuleFilesPage";
import { RootPage } from "./RootPage";
import StaticFileServer from "./StaticFileServer";

class WebServer {

    public express: express.Express;

    constructor() {
        this.express = express();
        this.setupRoutes();
        this.setupProxy();
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
                    onProxyReq: (proxyReq, req, res) => {

                        let r = req.header("referer");
                        if (r) {
                            console.log(req.url);
                            console.log(`Referer: ${r}`);
                        }

                        if (!req.body || !Object.keys(req.body).length) {
                            return;
                        }
                        const contentType = proxyReq.getHeader("Content-Type").toString();
                        const writeBody = (bodyData: string) => {
                            proxyReq.setHeader("Content-Type", /charset/i.test(contentType)
                                ? contentType
                                : (contentType + "; charset=utf-8"));
                            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                            proxyReq.write(bodyData);
                        };

                        if (contentType.startsWith("application/json")) {
                            writeBody(JSON.stringify(req.body));
                        } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
                            writeBody(querystring.stringify(req.body));
                        } else {
                            writeBody(req.body);
                        }
                    },
                    onProxyRes: (proxyReq, req, res) => {

                        if (proxyReq.statusCode >= 400) {
                            console.error(colors.red(`HTTP STATUS ${proxyReq.statusCode} for ${proxyHost}${req.url}`));
                        } else if (proxyReq.statusCode >= 300) {
                            console.warn(colors.yellow(
                                `HTTP STATUS ${proxyReq.statusCode} for ${proxyHost}${req.url}`));
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
