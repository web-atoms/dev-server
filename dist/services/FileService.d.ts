import { BaseService } from "web-atoms-core/dist/services/http/RestService";
import IFilePathResult from "../models/IFilePathResult";
export default class FileService extends BaseService {
    getModules(): Promise<IFilePathResult>;
}
