import { AtomDisposable, IDisposable } from "web-atoms-core/dist/core/types";
import { RegisterSingleton } from "web-atoms-core/dist/di/RegisterSingleton";
import { IWSMessage } from "../models/IWSMessage";

@RegisterSingleton
export default class WebSocketService  {

    public listen(a: (d: IWSMessage) => void): IDisposable {

        const w = new WebSocket(`ws://${location.host}/listen`);

        w.onmessage = (evt) => {
            // tslint:disable-next-line:no-console
            console.log(evt.data);
            a(JSON.parse(evt.data));
        };

        return new AtomDisposable(() => {
            w.close();
        });

    }

}
