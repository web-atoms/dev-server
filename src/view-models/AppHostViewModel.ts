import { App } from "web-atoms-core/dist/App";
import { Inject } from "web-atoms-core/dist/di/Inject";
import { NavigationService } from "web-atoms-core/dist/services/NavigationService";
import { AtomViewModel, Watch } from "web-atoms-core/dist/view-model/AtomViewModel";
import IFilePath from "../models/IFilePath";
import { ModuleFiles } from "../ModuleFiles";
import FileService from "../services/FileService";

export class AppHostViewModel extends AtomViewModel {

    public files: IFilePath[];

    public file: IFilePath;

    constructor(
        @Inject app: App,
        @Inject public readonly navigationService: NavigationService,
        @Inject public readonly fileService: FileService
    ) {
        super(app);
    }

    @Watch
    public get url(): string {
        return `CURRENT/${this.file.dir}/${this.file.name}`;
    }

    public async init(): Promise<any> {
        this.files = await this.fileService.getModules();

    }
}
