var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "web-atoms-core/dist/core/types", "web-atoms-core/dist/di/RegisterSingleton"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var types_1 = require("web-atoms-core/dist/core/types");
    var RegisterSingleton_1 = require("web-atoms-core/dist/di/RegisterSingleton");
    var WebSocketService = /** @class */ (function () {
        function WebSocketService() {
        }
        WebSocketService.prototype.listen = function (a) {
            var w = new WebSocket("/listen");
            w.onmessage = function (evt) {
                a(evt.data);
            };
            return new types_1.AtomDisposable(function () {
                w.close();
            });
        };
        WebSocketService = __decorate([
            RegisterSingleton_1.RegisterSingleton
        ], WebSocketService);
        return WebSocketService;
    }());
    exports.default = WebSocketService;
});
//# sourceMappingURL=WebSocketService.js.map