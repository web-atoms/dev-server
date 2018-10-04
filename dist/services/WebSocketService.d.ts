import { IDisposable } from "web-atoms-core/dist/core/types";
import { IWSMessage } from "../models/IWSMessage";
export default class WebSocketService {
    listen(a: (d: IWSMessage) => void): IDisposable;
}
