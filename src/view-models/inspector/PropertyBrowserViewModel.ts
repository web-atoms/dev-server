import { AtomViewModel, BindableReceive, Watch } from "web-atoms-core/dist/view-model/AtomViewModel";
import { AtomControl } from "web-atoms-core/dist/web/controls/AtomControl";
import HTMLNodeModel from "../../models/HTMLNodeModel";
import PropertyModel from "../../models/PropertyModel";

export default class PropertyBrowserViewModel extends AtomViewModel {

    @BindableReceive("selected-node")
    public node: HTMLNodeModel;

    public model: any;

    public properties: PropertyModel[] = [];

    @Watch
    public watchModel(): any {
        this.properties = PropertyModel.create(this.model);
    }

    @Watch
    public watchNode(): any {
        this.model = this.fetchControl(this.node.node);
    }

    private fetchControl(e: any): AtomControl {
        if (e.atomControl) {
            return e.atomControl;
        }
        e = (e as HTMLElement).parentElement;
        if (e) {
            return this.fetchControl(e);
        }
        return null;
    }

}
