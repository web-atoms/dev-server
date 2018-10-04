import { App } from "web-atoms-core/dist/App";
import { NavigationService } from "web-atoms-core/dist/services/NavigationService";
import { AtomViewModel } from "web-atoms-core/dist/view-model/AtomViewModel";
import IFilePath from "../models/IFilePath";
import FileService from "../services/FileService";
export declare class AppHostViewModel extends AtomViewModel {
    readonly navigationService: NavigationService;
    readonly fileService: FileService;
    files: IFilePath[];
    file: IFilePath;
    url: string;
    constructor(app: App, navigationService: NavigationService, fileService: FileService);
    init(): Promise<any>;
    refreshUrl(): void;
}
