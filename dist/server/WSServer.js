(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var WSServer = /** @class */ (function () {
        function WSServer(client) {
            var _this = this;
            this.client = client;
            this.watchPath("./dist");
            client.on("message", function (d) {
                _this.watchPath(d);
            });
        }
        WSServer.configure = function (ws) {
            ws.on("connection", function (w, req) {
                var wx = new WSServer(w);
                w.on("close", function (code, reason) {
                    wx.dispose();
                });
            });
        };
        WSServer.prototype.dispose = function () {
            if (this.watcher) {
                this.watcher.close();
            }
            if (this.lastTimeout) {
                clearTimeout(this.lastTimeout);
                this.lastTimeout = null;
            }
        };
        WSServer.prototype.watchPath = function (d) {
            var _this = this;
            if (this.watcher) {
                this.watcher.close();
            }
            this.watcher = fs.watch(d, { recursive: true }, function (e, f) {
                _this.postUpdate();
            });
        };
        WSServer.prototype.postUpdate = function () {
            var _this = this;
            if (!this.lastTimeout) {
                clearTimeout(this.lastTimeout);
                this.lastTimeout = null;
            }
            this.lastTimeout = setTimeout(function () {
                _this.client.send({ type: "refresh" }, function (e) {
                    // tslint:disable-next-line:no-console
                    console.error(e);
                });
            }, 100);
        };
        return WSServer;
    }());
    exports.default = WSServer;
});
//# sourceMappingURL=WSServer.js.map