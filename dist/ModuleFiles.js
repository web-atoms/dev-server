(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    UMD = UMD || { resolvePath: function (v) { return v; } };
    exports.ModuleFiles = {
        "views": {
            "AppHost": "web-atoms-dev-server/dist/{platform}/views/AppHost",
            "Start": "web-atoms-dev-server/dist/{platform}/views/Start"
        }
    };
});
//# sourceMappingURL=ModuleFiles.js.map