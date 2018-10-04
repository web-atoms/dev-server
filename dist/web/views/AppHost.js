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
            var _this = this;
            _super.prototype.create.call(this);
            var __creator = this;
            this.defaultControlStyle = AppHostStyle_1.default;
            this.setPrimitiveValue(this.element, "styleClass", this.controlStyle.root);
            this.viewModel = this.resolve(AppHostViewModel_1.AppHostViewModel);
            this.setPrimitiveValue(this.element, "columns", "200, *");
            this.setPrimitiveValue(this.element, "rows", "50, *");
            var e1 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e1);
            var e2 = document.createElement("header");
            this.append(e2);
            this.setPrimitiveValue(e2, "row", "0:2");
            this.setPrimitiveValue(e2, "style", "padding:5px");
            var e3 = document.createTextNode("\r\n        ");
            e2.appendChild(e3);
            var e4 = document.createElement("button");
            e2.appendChild(e4);
            this.runAfterInit(function () {
                return _this.setLocalValue(e4, "eventClick", function () { return (_this.viewModel).refreshUrl(); });
            });
            var e5 = document.createTextNode("Refresh");
            e4.appendChild(e5);
            var e6 = document.createTextNode("\r\n    ");
            e2.appendChild(e6);
            var e7 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e7);
            var e8 = new AtomListBox_1.AtomListBox(this.app);
            var e9 = document.createTextNode("\r\n        ");
            e8.element.appendChild(e9);
            var e10 = document.createTextNode("\r\n    ");
            e8.element.appendChild(e10);
            e8.setPrimitiveValue(e8.element, "row", "1");
            e8.bind(e8.element, "items", [["viewModel", "files"]], false, function (v1) { return (v1); });
            e8.setPrimitiveValue(e8.element, "valuePath", "url");
            e8.bind(e8.element, "value", [["viewModel", "url"]], true);
            e8.itemTemplate = AppHost_itemTemplate_1_43Creator(this);
            this.append(e8);
            var e11 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e11);
            var e12 = document.createElement("iframe");
            this.append(e12);
            this.setPrimitiveValue(e12, "row", "1");
            this.setPrimitiveValue(e12, "column", "1");
            this.bind(e12, "src", [["viewModel", "url"]], false, function (v1) { return (v1); });
            this.setPrimitiveValue(e12, "style", "border: none; padding:5px; width:100%; height:100%;");
            var e13 = document.createTextNode("\r\n\r\n");
            this.element.appendChild(e13);
        };
        return AppHost;
    }(AtomGridView_1.AtomGridView));
    exports.default = AppHost;
    function AppHost_itemTemplate_1_43Creator(__creator) {
        return /** @class */ (function (_super) {
            __extends(AppHost_itemTemplate_1_43, _super);
            function AppHost_itemTemplate_1_43() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AppHost_itemTemplate_1_43.prototype.create = function () {
                var _this = this;
                _super.prototype.create.call(this);
                ;
                this.element = document.createElement("div");
                var e1 = document.createTextNode("\r\n            ");
                this.element.appendChild(e1);
                var e2 = document.createElement("div");
                this.append(e2);
                this.runAfterInit(function () {
                    return _this.setLocalValue(e2, "text", (_this.data.name));
                });
                this.runAfterInit(function () {
                    return _this.setLocalValue(e2, "title", (_this.data.dir));
                });
                var e3 = document.createTextNode("\r\n            ");
                this.element.appendChild(e3);
                var e4 = document.createElement("div");
                this.append(e4);
                this.setPrimitiveValue(e4, "style", "font-size: small");
                this.runAfterInit(function () {
                    return _this.setLocalValue(e4, "text", (_this.data.dir));
                });
                var e5 = document.createTextNode("\r\n        ");
                this.element.appendChild(e5);
            };
            return AppHost_itemTemplate_1_43;
        }(AtomControl_1.AtomControl));
    }
});
//# sourceMappingURL=AppHost.js.map