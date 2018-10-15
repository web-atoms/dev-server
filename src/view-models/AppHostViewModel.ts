import { App } from "web-atoms-core/dist/App";
import { Atom } from "web-atoms-core/dist/Atom";
import { Inject } from "web-atoms-core/dist/di/Inject";
import { NavigationService } from "web-atoms-core/dist/services/NavigationService";
import { AtomViewModel, BindableUrlParameter, Watch } from "web-atoms-core/dist/view-model/AtomViewModel";
import IFilePath from "../models/IFilePath";
import { IWSMessage } from "../models/IWSMessage";
import { ModuleFiles } from "../ModuleFiles";
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

    public search: string;

    constructor(
        @Inject app: App,
        @Inject public readonly navigationService: NavigationService,
        @Inject public readonly fileService: FileService
    ) {
        super(app);
    }

    public onMessage(m: IWSMessage): void {
        if (m.type === "refresh") {
            this.refreshUrl();
        }
    }

    @Watch
    public onSearch(): void {
        let s = this.search;
        if (s) {
            s = s.toLowerCase();
        }
        for (const iterator of this.files) {
            iterator.visible = s ? ( iterator.name.toLowerCase().indexOf(s) !== -1 ) : true;
        }
    }

    public async init(): Promise<any> {

        const cl = this.navigationService.location;

        const platform: string = (cl.query.platform || "web").toString();

        const urls = (await this.fileService.getModules()).files;
        for (const iterator of urls) {
            iterator.url = `/uiv/$CURRENT$/${replaceSrc(iterator.dir)}/${iterator.name}`;
            iterator.visible = true;
        }
        this.files = urls.filter( (f) => {
            const fm = fileMatcher[platform];
            if (fm) {
                return fm.test(f.ext);
            }
            return true;
        } );
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
    xf: /\.xaml/gi,
    web: /\.html/gi
};
