(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "fs", "path", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express_1 = require("express");
    var fs_1 = require("fs");
    var path_1 = require("path");
    var path = require("path");
    // Assign router to the express.Router() instance
    var router = express_1.Router();
    router.get("/flat-modules", function (req, res) {
        var files = [];
        populate("./", files);
        res.setHeader("cache-control", "no-cache");
        return res.send({ files: files });
    });
    function populate(dir, files) {
        for (var _i = 0, _a = fs_1.readdirSync(dir); _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (iterator === "node_modules") {
                continue;
            }
            var filePath = path.join(dir, iterator);
            var p = path_1.parse(filePath);
            if (/\.(html|xaml)/i.test(p.ext)) {
                files.push(p);
                continue;
            }
            var s = fs_1.statSync(filePath);
            if (s.isDirectory()) {
                populate(filePath, files);
            }
        }
    }
    exports.ModuleFilesPage = router;
});
//# sourceMappingURL=ModuleFilesPage.js.map