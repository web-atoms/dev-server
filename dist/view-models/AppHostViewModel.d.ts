import { App } from "web-atoms-core/dist/App";
import { NavigationService } from "web-atoms-core/dist/services/NavigationService";
import { AtomViewModel } from "web-atoms-core/dist/view-model/AtomViewModel";
import IFilePath from "../models/IFilePath";
import { IWSMessage } from "../models/IWSMessage";
import FileService from "../services/FileService";
import WebSocketService from "../services/WebSocketService";
export declare class AppHostViewModel extends AtomViewModel {
    readonly navigationService: NavigationService;
    readonly fileService: FileService;
    private readonly webSocketService;
    files: IFilePath[];
    file: IFilePath;
    url: string;
    constructor(app: App, navigationService: NavigationService, fileService: FileService, webSocketService: WebSocketService);
    onMessage(m: IWSMessage): void;
    init(): Promise<any>;
    refreshUrl(): void;
}
