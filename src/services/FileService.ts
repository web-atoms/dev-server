import { CancelToken } from "@web-atoms/core/dist/core/types";
import { RegisterSingleton } from "@web-atoms/core/dist/di/RegisterSingleton";
import { BaseService, Get, Query } from "@web-atoms/core/dist/services/http/RestService";
import IFilePath from "../models/IFilePath";
import IFilePathResult from "../models/IFilePathResult";

@RegisterSingleton
export default class FileService extends BaseService {

    @Get("/flat-modules")
    public getModules(
        @Query("search") search: string,
        @Query("packed") packed: boolean,
        ct?: CancelToken): Promise<IFilePathResult> {
        return null;
    }

}
