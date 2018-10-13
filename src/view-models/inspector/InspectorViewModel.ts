import { AtomViewModel, BindableBroadcast, BindableUrlParameter } from "web-atoms-core/dist/view-model/AtomViewModel";
import { AtomControl } from "web-atoms-core/dist/web/controls/AtomControl";
import { ChildEnumerator } from "web-atoms-core/dist/web/core/AtomUI";
import HTMLNodeModel from "../../models/HTMLNodeModel";
import PropertyModel from "../../models/PropertyModel";

export default class InspectorViewModel extends AtomViewModel {

    @BindableUrlParameter("url")
    public url: any;

    public owner: AtomControl;

    public frame: HTMLIFrameElement;

    @BindableBroadcast("body")
    public body: HTMLNodeModel;

    public async init(): Promise<any> {
        this.frame = (this.owner as any).frame;

        const listener = (e) => {
            // do nothing...

            this.body = new HTMLNodeModel(this.frame.contentDocument.body as HTMLBodyElement);

        };

        this.frame.addEventListener("load", listener);

        this.registerDisposable({
            dispose: () => {
                this.frame.removeEventListener("load", listener);
            }
        });
    }

}
