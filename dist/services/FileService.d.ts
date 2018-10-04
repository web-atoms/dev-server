import { BaseService } from "web-atoms-core/dist/services/http/RestService";
import IFilePath from "../models/IFilePath";
export default class FileService extends BaseService {
    getModules(): Promise<IFilePath[]>;
}
