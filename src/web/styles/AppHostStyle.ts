import { AtomStyle } from "web-atoms-core/dist/web/styles/AtomStyle";
import { AtomStyleClass } from "web-atoms-core/dist/web/styles/AtomStyleClass";

export default class AppHostStyle extends AtomStyle {

    public root: AtomStyleClass = this.createClass("root", () => ({
        fontFamily: "arial"
    }));

}
