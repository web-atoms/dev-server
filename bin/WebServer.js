(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "ecstatic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express = require("express");
    var e = require("ecstatic");
    var WebServer = /** @class */ (function () {
        function WebServer() {
            this.express = express();
            this.mountRoutes();
        }
        WebServer.prototype.mountRoutes = function () {
            var router = express.Router();
            router.get("/", function (req, res) {
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
        };
        return WebServer;
    }());
    exports.default = new WebServer().express;
});
//# sourceMappingURL=WebServer.js.map