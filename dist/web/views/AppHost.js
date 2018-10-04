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
        define(["require", "exports", "web-atoms-core/dist/web/controls/AtomListBox", "web-atoms-core/dist/web/controls/AtomGridView", "web-atoms-core/dist/web/controls/AtomControl", "../../view-models/AppHostViewModel", "../styles/AppHostStyle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AtomListBox_1 = require("web-atoms-core/dist/web/controls/AtomListBox");
    var AtomGridView_1 = require("web-atoms-core/dist/web/controls/AtomGridView");
    var AtomControl_1 = require("web-atoms-core/dist/web/controls/AtomControl");
    var AppHostViewModel_1 = require("../../view-models/AppHostViewModel");
    var AppHostStyle_1 = require("../styles/AppHostStyle");
    var AppHost = /** @class */ (function (_super) {
        __extends(AppHost, _super);
        function AppHost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppHost.prototype.create = function () {
            _super.prototype.create.call(this);
            var __creator = this;
            this.defaultControlStyle = AppHostStyle_1.default;
            this.viewModel = this.resolve(AppHostViewModel_1.AppHostViewModel);
            this.setPrimitiveValue(this.element, "columns", "200, *");
            this.setPrimitiveValue(this.element, "rows", "*");
            var e1 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e1);
            var e2 = new AtomListBox_1.AtomListBox(this.app);
            var e3 = document.createTextNode("\r\n        ");
            e2.element.appendChild(e3);
            var e4 = document.createTextNode("\r\n    ");
            e2.element.appendChild(e4);
            e2.bind(e2.element, "items", [["viewModel", "files"]], false, function (v1) { return (v1); });
            e2.setPrimitiveValue(e2.element, "valuePath", "url");
            e2.bind(e2.element, "value", [["viewModel", "url"]], true);
            e2.itemTemplate = AppHost_itemTemplate_1_11Creator(this);
            this.append(e2);
            var e5 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e5);
            var e6 = document.createElement("iframe");
            this.append(e6);
            this.setPrimitiveValue(e6, "column", "1");
            this.bind(e6, "src", [["viewModel", "url"]], false, function (v1) { return (v1); });
            this.setPrimitiveValue(e6, "style", "border: none; padding:5px; width:100%; height:100%;");
            var e7 = document.createTextNode("\r\n\r\n");
            this.element.appendChild(e7);
        };
        return AppHost;
    }(AtomGridView_1.AtomGridView));
    exports.default = AppHost;
    function AppHost_itemTemplate_1_11Creator(__creator) {
        return /** @class */ (function (_super) {
            __extends(AppHost_itemTemplate_1_11, _super);
            function AppHost_itemTemplate_1_11() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AppHost_itemTemplate_1_11.prototype.create = function () {
                var _this = this;
                _super.prototype.create.call(this);
                ;
                this.element = document.createElement("div");
                this.runAfterInit(function () {
                    return _this.setLocalValue(_this.element, "text", (_this.data.dir) + "/" + (_this.data.name));
                });
            };
            return AppHost_itemTemplate_1_11;
        }(AtomControl_1.AtomControl));
    }
});
//# sourceMappingURL=AppHost.js.map