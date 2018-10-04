import { AtomDisposable, IDisposable } from "web-atoms-core/dist/core/types";
import { RegisterSingleton } from "web-atoms-core/dist/di/RegisterSingleton";
import { IWSMessage } from "../models/IWSMessage";

@RegisterSingleton
export default class WebSocketService  {

    public listen(a: (d: IWSMessage) => void): IDisposable {

        const w = new WebSocket("/listen");

        w.onmessage = (evt) => {
            a(evt.data);
        };

        return new AtomDisposable(() => {
            w.close();
        });

    }

}
