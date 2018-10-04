(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express_1 = require("express");
    var fs_1 = require("fs");
    var args = process.argv;
    // Assign router to the express.Router() instance
    var router = express_1.Router();
    // The / here corresponds to the route that the WelcomeController
    // is mounted on in the server.ts file.
    // In this case it's /welcome
    router.get("/", function (req, res) {
        var url = req.path.substr(5);
        var dev = args.find(function (a) { return a === "dev"; });
        var devServer = dev ? "/_files/" : "/_files/node_modules/web-atoms-dev-server/";
        var text = fs_1.readFileSync("./package.json", { encoding: "utf-8", flag: "r" });
        var json = JSON.parse(text);
        var d = json.dependencies || {};
        var da = [];
        for (var key in d) {
            if (d.hasOwnProperty(key)) {
                var element = key;
                if (element === "reflect-metadata") {
                    da.push("\t\t\t\tUMD.map(\"reflect-metadata\",\"/_files/node_modules/reflect-metadata/Reflect.js\");");
                }
                else {
                    da.push("\t\t\t\tUMD.map(\"" + element + "\",\"/_files/node_modules/" + element + "\");");
                }
            }
        }
        res.send("<!DOCTYPE html>\n\n    <html>\n    <head>\n\n        <meta name=\"viewport\"   content=\"width=device-width\"/>\n        <title>Web Atoms - </title>\n        <script src=\"/_files/node_modules/web-atoms-amd-loader/umd.js\"></script>\n    </head>\n    <body>\n        <script>\n                " + da.join("\r\n") + "\n                UMD.map(\"CURRENT\",\"/_files/\");\n                UMD.map(\"web-atoms-dev-server\", \"" + devServer + "\");\n                UMD.lang = \"en-US\";\n                UMD.loadView(\"web-atoms-dev-server/dist/web/views/AppHost\", true);\n        </script>\n    </body>\n    </html>\n    ");
    });
    exports.RootPage = router;
});
//# sourceMappingURL=RootPage.js.map