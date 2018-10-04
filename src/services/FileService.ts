import { RegisterSingleton } from "web-atoms-core/dist/di/RegisterSingleton";
import { BaseService, Get } from "web-atoms-core/dist/services/http/RestService";
import IFilePath from "../models/IFilePath";

@RegisterSingleton
export default class FileService extends BaseService {

    @Get("/flat-modules")
    public getModules(): Promise<IFilePath[]> {
        return null;
    }

}
