import Colors from "@web-atoms/core/dist/core/Colors";
import { AtomStyle } from "@web-atoms/core/dist/web/styles/AtomStyle";
import { IStyleDeclaration } from "@web-atoms/core/dist/web/styles/IStyleDeclaration";

export default class AppHostStyle extends AtomStyle {

    public get root(): IStyleDeclaration {
        return {
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans," +
            "Ubuntu, Cantarell, 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
            fontSize: "14px",
            color: "#3c4144",
            subclasses: {
                " table.grid": {
                    width: "100%",
                    subclasses: {
                        " tr": {
                            subclasses: {
                                " td": {
                                    borderSpacing: "0",
                                    verticalAlign: "top"
                                },
                                ":hover": {
                                    backgroundColor: Colors.lightGreen
                                }
                            }
                        }
                    }
                },
                " a.button": {
                    backgroundColor: "#168eea",
                    borderRadius: "3px",
                    padding: "5px 10px",
                    color: "white",
                    textDecoration: "none",
                    cursor: "pointer"
                },
                " .header": {
                    padding: "10px",
                    background: "#f5f5f5",
                    subclasses: {
                        " input": {
                            border: "1px solid #bbb",
                            padding: "5px",
                            borderRadius: "3px"
                        },
                        " button": {
                            border: "1px solid #13a538",
                            backgroundColor: "#13a538",
                            color: "#f2fff5",
                            padding: "5px",
                            borderRadius: "3px",
                            marginTop: "5px"
                        },
                        " .topnav-right": {
                            float: "right",
                            textAlign: "left",
                            subclasses: {
                                " > *": {
                                    marginLeft: "5px",
                                    marginRight: "5px"
                                },
                                " > span": {
                                    textAlign: "right"
                                },
                                " > ul": {
                                    marginRight: "50px",
                                    paddingInlineStart: "0"
                                },
                                " a": {
                                    backgroundColor: "#168eea",
                                    borderRadius: "3px",
                                    padding: "5px 10px",
                                    color: "white",
                                    textDecoration: "none",
                                    cursor: "pointer"
                                }
                            }
                        }
                    }
                }
            }
        };
    }

}
