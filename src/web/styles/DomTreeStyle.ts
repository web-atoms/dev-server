import { AtomStyle } from "web-atoms-core/dist/web/styles/AtomStyle";
import { AtomTheme } from "web-atoms-core/dist/web/styles/AtomTheme";
import { IStyleDeclaration } from "web-atoms-core/dist/web/styles/IStyleDeclaration";
import DownArrowDataUrl from "../images/DownArrowDataUrl";
import RightArrowDataUrl from "../images/RightArrowDataUrl";

export default class DomTreeStyle extends AtomStyle {

    public get theme(): AtomTheme {
        return this.styleSheet as AtomTheme;
    }

    public get root(): IStyleDeclaration {

        return {
            subclasses: {
                " > div.node": {
                    padding: "2px",
                    fontSize: "9pt",
                    subclasses: {
                        " > img": {
                            display: "none",
                        },
                        " > span.unselected" : {
                            backgroundColor: this.theme.bgColor,
                            color: this.theme.color
                        },
                        " > span.selected" : {
                            backgroundColor: this.theme.selectedBgColor,
                            color: this.theme.selectedColor
                        }
                    }
                },
                " > div.control": {
                    fontWeight: "bold",
                },
                " > div.closed": {
                    paddingLeft: "16px",
                    subclasses: {
                        " > img": {
                            display: "inline-block",
                            maxWidth: "16px",
                            maxHeight: "16px"
                        }
                    }
                },
                " > div.expanded": {
                    paddingLeft: "16px",
                    subclasses: {
                        " > img": {
                            display: "inline-block",
                            maxWidth: "16px",
                            maxHeight: "16px"
                        }
                    }
                }
            }
        };

    }

}
