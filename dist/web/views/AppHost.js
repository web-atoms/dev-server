var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "web-atoms-core/dist/web/controls/AtomListBox", "web-atoms-core/dist/web/controls/AtomFrame", "web-atoms-core/dist/web/controls/AtomGridView", "../../view-models/AppHostViewModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AtomListBox_1 = require("web-atoms-core/dist/web/controls/AtomListBox");
    var AtomFrame_1 = require("web-atoms-core/dist/web/controls/AtomFrame");
    var AtomGridView_1 = require("web-atoms-core/dist/web/controls/AtomGridView");
    var AppHostViewModel_1 = require("../../view-models/AppHostViewModel");
    var AppHost = /** @class */ (function (_super) {
        __extends(AppHost, _super);
        function AppHost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppHost.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            var __creator = this;
            this.viewModel = this.resolve(AppHostViewModel_1.AppHostViewModel);
            this.setPrimitiveValue(this.element, "columns", "200, *");
            this.setPrimitiveValue(this.element, "rows", "*");
            var e1 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e1);
            var e2 = new AtomListBox_1.AtomListBox(this.app);
            var e3 = document.createTextNode("\r\n        ");
            e2.element.appendChild(e3);
            var e4 = document.createElement("div");
            e2.append(e4);
            e2.runAfterInit(function () {
                return e2.setLocalValue(e4, "text", (_this.data.dir) + "/" + (_this.data.name));
            });
            var e5 = document.createTextNode("\r\n    ");
            e2.element.appendChild(e5);
            e2.bind(e2.element, "items", [["viewModel", "files"]], false, function (v1) { return (v1); });
            e2.bind(e2.element, "selectedItem", [["viewModel", "file"]], true);
            this.append(e2);
            var e6 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e6);
            var e7 = new AtomFrame_1.AtomFrame(this.app);
            e7.setPrimitiveValue(e7.element, "column", "1");
            e7.bind(e7.element, "url", [["viewModel", "url"]], false, function (v1) { return (v1); });
            this.append(e7);
            var e8 = document.createTextNode("\r\n\r\n");
            this.element.appendChild(e8);
        };
        return AppHost;
    }(AtomGridView_1.AtomGridView));
    exports.default = AppHost;
});
//# sourceMappingURL=AppHost.js.map