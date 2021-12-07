import { App } from "@web-atoms/core/dist/App";
import { BindableProperty } from "@web-atoms/core/dist/core/BindableProperty";
import DISingleton from "@web-atoms/core/dist/di/DISingleton";
import { BaseService, Get, Query } from "@web-atoms/core/dist/services/http/RestService";
import { AtomControl } from "@web-atoms/core/dist/web/controls/AtomControl";
import WebApp from "@web-atoms/core/dist/web/WebApp";
import * as QRCode from "qrcode/build/qrcode.js";

@DISingleton()
class UrlService extends BaseService {

    @Get("/_r/a")
    public async getShortUrl(@Query("url") url: string): Promise<{ url: string}> {
        return null;
    }

}

export default class QRCodeView extends AtomControl {

    @BindableProperty
    public code: string;

    public get webApp(): WebApp {
        return this.app as WebApp;
    }

    constructor(app: App, e?: HTMLElement) {
        super(app, e || document.createElement("canvas"));
    }

    public onPropertyChanged(name: keyof  QRCodeView): void {
        if (name === "code") {
            this.app.runAsync(() => this.prepareCode(this.code));
        }
    }

    protected async prepareCode(v) {
        if (!v) {
            return;
        }
        const urlService = this.resolve(UrlService);
        const r = await urlService.getShortUrl(v);
        v = r.url;
        await QRCode.toCanvas(this.element, v);
    }

}
