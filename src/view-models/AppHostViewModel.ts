import { App } from "@web-atoms/core/dist/App";
import { Atom } from "@web-atoms/core/dist/Atom";
import Markdown from "@web-atoms/core/dist/core/Markdown";
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

    @Load({ init: true, watch: true })
    public async loadFiles(): Promise<any> {

        const cl = this.navigationService.location;
        let s = this.search;
        if (s) {
            s = s.toLowerCase();
        }

        const urls = (await this.fileService.getModules()).files;
        for (const iterator of urls) {
            iterator.url = `/uiv/$CURRENT$/${replaceSrc(iterator.dir)}/${iterator.name}`;
            iterator.urlDesignMode = `/uiv/$CURRENT$/${replaceSrc(iterator.dir)}/${iterator.name}?designMode=true`;
            iterator.visible = true;
            if (iterator.packed) {
                iterator.urlPacked = `/`;
            }
        }
        const fm: RegExp = fileMatcher[this.platform];
        this.files = urls.filter( (f) => {
            fm.lastIndex = 0;
            f.visible = true;
            if (s) {
                f.visible = f.name.toLowerCase().indexOf(s) !== -1;
            }
            if (fm) {
                return fm.test(f.ext);
            }
            return true;
        } );
    }

    public async copyUrl(url: string) {
        url = this.toAbsoluteUrl(url);
        await this.clipboardService.copy(url);
        this.navigationService.notify(Markdown.from(`Url "${url}"\ncopied to clipboard successfully`));
    }

    public toAbsoluteUrl(url: string): string {
        return `${location.protocol}//${location.host}${url}`;
    }

    public refreshUrl(): void {
        this.refresh("url");
    }

    public inspect(url: string): string {
        return Atom.url("/_inspect", { url });
    }

    public openUrl(data: IFilePath): void {
        const url = this.navigationService.location;
        url.path = data.url;
        this.navigationService.location = url;
    }
}

const fileMatcher = {
    xf: /\.(xaml|tsx)/gi,
    web: /\.html/gi
};
