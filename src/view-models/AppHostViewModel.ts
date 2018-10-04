import { App } from "web-atoms-core/dist/App";
import { Inject } from "web-atoms-core/dist/di/Inject";
import { NavigationService } from "web-atoms-core/dist/services/NavigationService";
import { AtomViewModel, BindableUrlParameter, Watch } from "web-atoms-core/dist/view-model/AtomViewModel";
import IFilePath from "../models/IFilePath";
import { ModuleFiles } from "../ModuleFiles";
import FileService from "../services/FileService";

function replaceSrc(src: string): string {
    src = src.split("\\").join("/");
    const tokens = src.split("/");
    if (tokens[0] === "src") {
        tokens[0] = "dist";
    }
    return tokens.join("/");
}

export class AppHostViewModel extends AtomViewModel {

    public files: IFilePath[];

    public file: IFilePath;

    @BindableUrlParameter("url")
    public url: string;

    constructor(
        @Inject app: App,
        @Inject public readonly navigationService: NavigationService,
        @Inject public readonly fileService: FileService
    ) {
        super(app);
    }

    public async init(): Promise<any> {
        const urls = (await this.fileService.getModules()).files;
        for (const iterator of urls) {
            iterator.url = `/uiv/$CURRENT$/${replaceSrc(iterator.dir)}/${iterator.name}`;
        }
        this.files = urls;
    }
}
