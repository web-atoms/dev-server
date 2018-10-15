import { AtomBinder } from "web-atoms-core/dist/core/AtomBinder";
import { IDisposable } from "web-atoms-core/dist/core/types";
import { AtomControl } from "web-atoms-core/dist/web/controls/AtomControl";
import { ChildEnumerator } from "web-atoms-core/dist/web/core/AtomUI";

export default class HTMLNodeModel implements IDisposable {

    public dispose: () => void;

    public expanded: boolean = false;

    public get hasChildren(): boolean {
        return this.node.children.length ? true : false;
    }

    public get className(): string {
        const a = ["node"];
        if (this.atomControl) {
            a.push("control");
        }
        if (this.hasChildren) {
            a.push(this.expanded ? "expanded" : "closed");
        }
        return a.join(" ");
    }

    public get children(): HTMLNodeModel[] {
        if (!this.expanded) {
            return [];
        }
        const a = [];
        const ce = new ChildEnumerator(this.node);
        while (ce.next()) {
            const node = ce.current;
            if ( /script/i.test(node.nodeName) ) {
                continue;
            }
            a.push(new HTMLNodeModel(node));
        }
        return a;
    }

    constructor(
        public node: HTMLElement,
        public atomControl?: AtomControl,
        public label?: string) {
        this.atomControl = (node as any).atomControl;
        if (this.atomControl) {
            this.label = `${this.atomControl.constructor.name}.<${this.node.nodeName.toLowerCase()}>`;
        } else {
            this.label = `<${this.node.nodeName.toLowerCase()}>`;
        }
        const me = new MutationObserver((list, e) => {
            for (const iterator of list) {
                if (iterator.type === "childList") {
                    AtomBinder.refreshValue(this, "children");
                    AtomBinder.refreshValue(this, "className");
                    AtomBinder.refreshValue(this, "hasChildren");
                }
                if (iterator.type === "attributes") {
                    AtomBinder.refreshValue(this, "node");
                }
            }
        });

        me.observe(this.node, { childList: true, attributes: true});

        this.dispose = () => {
            me.disconnect();
        };
    }

}
