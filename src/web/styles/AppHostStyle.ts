import { AtomStyle } from "web-atoms-core/dist/web/styles/AtomStyle";
import { IStyleDeclaration } from "web-atoms-core/dist/web/styles/IStyleDeclaration";

export default class AppHostStyle extends AtomStyle {

    public get root(): IStyleDeclaration {
        return {
            fontFamily: "arial"
        };
    }

}
