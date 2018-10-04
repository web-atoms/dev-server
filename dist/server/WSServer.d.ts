/// <reference types="ws" />
import * as W from "ws";
export default class WSServer {
    private client;
    static configure(ws: W.Server): void;
    private watcher;
    private lastTimeout;
    private pingTimer;
    constructor(client: W);
    private dispose();
    private watchPath(d);
    private postUpdate();
}
