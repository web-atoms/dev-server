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
            var e6 = document.createTextNode("\r\n        ");
            e2.appendChild(e6);
            var e7 = document.createElement("a");
            e2.appendChild(e7);
            this.bind(e7, "href", [["viewModel", "url"]], false, function (v1) { return (v1); });
            this.setPrimitiveValue(e7, "target", "_tab");
            var e8 = document.createTextNode("Open in New Tab");
            e7.appendChild(e8);
            var e9 = document.createTextNode("\r\n    ");
            e2.appendChild(e9);
            var e10 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e10);
            var e11 = document.createElement("div");
            this.append(e11);
            this.setPrimitiveValue(e11, "style", "overflow: auto; width: 100%; height: 100%");
            this.setPrimitiveValue(e11, "row", "1");
            var e12 = document.createTextNode("\r\n        ");
            e11.appendChild(e12);
            var e13 = new AtomListBox_1.AtomListBox(this.app);
            var e14 = document.createTextNode("\r\n            ");
            e13.element.appendChild(e14);
            var e15 = document.createTextNode("\r\n        ");
            e13.element.appendChild(e15);
            e13.bind(e13.element, "items", [["viewModel", "files"]], false, function (v1) { return (v1); });
            e13.setPrimitiveValue(e13.element, "valuePath", "url");
            e13.bind(e13.element, "value", [["viewModel", "url"]], true);
            e13.itemTemplate = AppHost_itemTemplate_1_54Creator(this);
            e11.appendChild(e13.element);
            var e16 = document.createTextNode("\r\n    ");
            e11.appendChild(e16);
            var e17 = document.createTextNode("\r\n\r\n    ");
            this.element.appendChild(e17);
            var e18 = document.createElement("iframe");
            this.append(e18);
            this.setPrimitiveValue(e18, "row", "1");
            this.setPrimitiveValue(e18, "column", "1");
            this.bind(e18, "src", [["viewModel", "url"]], false, function (v1) { return (v1); });
            this.setPrimitiveValue(e18, "style", "border: none; padding:5px; width:100%; height:100%;");
            var e19 = document.createTextNode("\r\n\r\n");
            this.element.appendChild(e19);
        };
        return AppHost;
    }(AtomGridView_1.AtomGridView));
    exports.default = AppHost;
    function AppHost_itemTemplate_1_54Creator(__creator) {
        return /** @class */ (function (_super) {
            __extends(AppHost_itemTemplate_1_54, _super);
            function AppHost_itemTemplate_1_54() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AppHost_itemTemplate_1_54.prototype.create = function () {
                var _this = this;
                _super.prototype.create.call(this);
                ;
                this.element = document.createElement("div");
                var e1 = document.createTextNode("\r\n                ");
                this.element.appendChild(e1);
                var e2 = document.createElement("div");
                this.append(e2);
                this.runAfterInit(function () {
                    return _this.setLocalValue(e2, "text", (_this.data.name));
                });
                this.runAfterInit(function () {
                    return _this.setLocalValue(e2, "title", (_this.data.dir));
                });
                var e3 = document.createTextNode("\r\n                ");
                this.element.appendChild(e3);
                var e4 = document.createElement("div");
                this.append(e4);
                this.setPrimitiveValue(e4, "style", "font-size: small");
                this.runAfterInit(function () {
                    return _this.setLocalValue(e4, "text", (_this.data.dir));
                });
                var e5 = document.createTextNode("\r\n            ");
                this.element.appendChild(e5);
            };
            return AppHost_itemTemplate_1_54;
        }(AtomControl_1.AtomControl));
    }
});
//# sourceMappingURL=AppHost.js.map