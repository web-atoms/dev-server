import { CancelToken } from "@web-atoms/core/dist/core/types";
import { RegisterSingleton } from "@web-atoms/core/dist/di/RegisterSingleton";
import { BaseService, Get, Query } from "@web-atoms/core/dist/services/http/RestService";
import IFilePath from "../models/IFilePath";
import IFilePathResult from "../models/IFilePathResult";

@RegisterSingleton
export default class FileService extends BaseService {

    public async getModules(search: string, packed: boolean, cancelToken: CancelToken) {
        const result = await this.getRemoteModules(search, packed, cancelToken);
        return result.files;
    }

    @Get("/flat-modules")
    private getRemoteModules(
        @Query("search") search: string,
        @Query("packed") packed: boolean,
        ct?: CancelToken): Promise<IFilePathResult> {
        return null;
    }

}
