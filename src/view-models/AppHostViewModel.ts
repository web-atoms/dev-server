import { App } from "@web-atoms/core/dist/App";
import { Atom } from "@web-atoms/core/dist/Atom";
import { AtomUri } from "@web-atoms/core/dist/core/AtomUri";
import Markdown from "@web-atoms/core/dist/core/Markdown";
import { CancelToken } from "@web-atoms/core/dist/core/types";
import { Inject } from "@web-atoms/core/dist/di/Inject";
import { NavigationService } from "@web-atoms/core/dist/services/NavigationService";
import { AtomViewModel, Watch } from "@web-atoms/core/dist/view-model/AtomViewModel";
import BindableUrlParameter from "@web-atoms/core/dist/view-model/BindableUrlParameter";
import Load from "@web-atoms/core/dist/view-model/Load";
import IFilePath from "../models/IFilePath";
import { IWSMessage } from "../models/IWSMessage";
import { ModuleFiles } from "../ModuleFiles";
import ClipboardService from "../services/ClipboardService";
import FileService from "../services/FileService";

declare var bridge: any;

function replaceSrc(src: string): string {
    src = src.split("\\").join("/");
    const tokens = src.split("/");
    if (tokens[0] === "src") {
        tokens[0] = "dist";
    }
    return tokens.join("/");
}

export default class AppHostViewModel extends AtomViewModel {

    public files: IFilePath[];

    public file: IFilePath;

    @BindableUrlParameter("url")
    public url: string;

    public search: string = "";

    public fileTypes = [
        { label: "Packed", value: "packed"},
        { label: "All", value: "all"}
    ];

    public debugTypes = [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" }
    ];

    public designModes = [
        { label: "Design", value: "true" },
        { label: "Live", value: "false" }
    ];

    public designMode = "false";

    public showQrCode = "false";

    public type: string = "packed";

    public debug: string = "true";

    public platforms = [
        { label: "Web", value: "web" },
        { label: "XF", value: "xf" }
    ];

    public platform = "web";

    @Inject public readonly navigationService: NavigationService;
    @Inject public readonly fileService: FileService;
    @Inject public readonly clipboardService: ClipboardService;

    public onMessage(m: IWSMessage): void {
        if (m.type === "refresh") {
            this.refreshUrl();
        }
    }

    public resetPacked() {
        this.type = "all";
    }

    @Load({ init: true, watch: true, watchDelayMS: 500 })
    public async loadFiles(ct: CancelToken): Promise<any> {

        let s = this.search;
        const packed = this.type === "packed";
        if (s) {
            s = s.toLowerCase();
        }

        const urls = (await this.fileService.getModules(s, packed, ct)).files;
        for (const iterator of urls) {
            iterator.url = `/uiv/$CURRENT$/${replaceSrc(iterator.dir)}/${iterator.name}`;
            iterator.visible = true;
        }
        if (packed) {
            if (urls.length === 0) {
                this.app.callLater(() => this.resetPacked());
            }
        }
        this.files = urls;
    }

    public async copyUrl(file: IFilePath, designMode: boolean, packed: boolean) {
        const url = this.toAbsoluteUrl(file, designMode, packed);
        await this.clipboardService.copy(url);
        this.navigationService.notify(Markdown.from(`Url "${url}"\ncopied to clipboard successfully`));
    }

    public toAbsoluteUrl(file: IFilePath, designMode: boolean, packed: boolean, qrCode: boolean = false): string {
        if (!qrCode) {
            let url = file.url;
            if (designMode) {
                if (url.indexOf("?") === -1) {
                    url += "?";
                }
                url += "&designMode=true";
            }
            return `${location.protocol}//${location.host}${url}`;
        }
        const uri = new AtomUri("http://debug.webatoms.in/_go");
        uri.query.hostUrl = file.hostUrl;
        uri.query.package = file.package;
        uri.query.view = file.module;
        if (designMode) {
            uri.query.design = true;
        }
        if (packed && file.packed) {
            uri.query.packed = file.packed;
        }
        uri.query.debug = this.debug;
        // uri.query.debugUrl = `${location.protocol}//${location.host}/__debug`;
        return uri.toString();
    }

    public refreshUrl(): void {
        this.refresh("url");
    }

    public inspect(url: string): string {
        return Atom.url("/_inspect", { url });
    }

    public openUrl(data: IFilePath): void {
        this.app.runAsync(() =>
            this.navigationService.openPage(data.module, null, { clearHistory: true }));
    }
}
