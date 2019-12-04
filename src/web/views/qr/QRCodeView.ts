import { App } from "@web-atoms/core/dist/App";
import { AtomControl } from "@web-atoms/core/dist/web/controls/AtomControl";
import WebApp from "@web-atoms/core/dist/web/WebApp";
import * as QRCode from "qrcode/build/qrcode.min.js";

export default class QRCodeView extends AtomControl {

    public code: string;

    public get webApp(): WebApp {
        return this.app as WebApp;
    }

    constructor(app: App, e?: HTMLElement) {
        super(app, e || document.createElement("canvas"));
    }

    public preCreate() {
        this.code = null;
        this.runAfterInit(() => {
            this.app.runAsync(() => this.setupQrCode());
        });
    }

    protected async setupQrCode() {
        // await this.webApp.installScript("/_files/node_modules/qrcode/build/qrcode.min.js");
        this.bind(this.element, "none", [["this", "code"]], false, (v) => this.prepareCode(v), this);
    }

    protected async prepareCode(v) {
        await QRCode.toCanvas(this.element, v);
    }

}
