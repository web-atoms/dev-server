import * as express from "express";

import * as e from "ecstatic";

class WebServer {

    public express: express.Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {

        const router = express.Router();

        router.get("/", (req, res) => {
            res.json({
                message: "Hello World!"
            });
        });

        this.express.use("/", router);

        this.express.use(e({
            root: "./",
            baseDir: "_files",
            showdir: true
        }));

    }

}

export default new WebServer().express;
