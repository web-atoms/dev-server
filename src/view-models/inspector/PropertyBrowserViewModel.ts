import { AtomViewModel, BindableReceive, Watch } from "web-atoms-core/dist/view-model/AtomViewModel";
import { AtomControl } from "web-atoms-core/dist/web/controls/AtomControl";
import HTMLNodeModel from "../../models/HTMLNodeModel";
import PropertyModel from "../../models/PropertyModel";

export default class PropertyBrowserViewModel extends AtomViewModel {

    @BindableReceive("selected-node")
    public node: HTMLNodeModel;

    public search: string = "";

    public filter: (p: PropertyModel) => boolean;

    public model: any;

    public properties: PropertyModel[] = [];

    @Watch
    public watchSearch(): void {
        this.setupSearch(this.search);
    }

    @Watch
    public watchModel(): any {
        this.properties = PropertyModel.create(this.model);
    }

    @Watch
    public watchNode(): any {
        const node = this.node;
        if (!node) {
            return;
        }
        this.model = this.fetchControl(node.node);
    }

    public toggle(node: PropertyModel): void {
        node.expanded = !node.expanded;
    }

    private setupSearch(text: string): void {
        if (!text) {
            this.filter = null;
            return;
        }
        text = text.toLowerCase();
        this.filter = !text ? null : (p) => p.index.toString().toLowerCase().indexOf(text) !== -1;
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
