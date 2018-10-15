import Colors from "web-atoms-core/dist/core/Colors";
import { AtomStyle } from "web-atoms-core/dist/web/styles/AtomStyle";
import { IStyleDeclaration } from "web-atoms-core/dist/web/styles/IStyleDeclaration";

export default class PropertyBrowserStyle extends AtomStyle {

    public get root(): IStyleDeclaration {
        return {
            fontSize: "9pt",
            padding: "2px",
            subclasses: {
                " div.item": {
                    subclasses: {
                        " > span.index": {
                            fontWeight: "bold"
                        },
                        " > span.closed-value": {
                            maxHeight: "20px",
                            maxWidth: "100px",
                            overflow: "hidden",
                            display: "inline-block"
                        },
                        " > span.close-button": {
                            color: Colors.blue,
                            cursor: "pointer"
                        },
                        " > div.items": {
                            marginLeft: "20px"
                        }
                    }
                }
            }
        };
    }

}
