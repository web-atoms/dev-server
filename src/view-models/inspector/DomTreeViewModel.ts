import { AtomViewModel, BindableBroadcast, BindableReceive, Watch } from "web-atoms-core/dist/view-model/AtomViewModel";
import HTMLNodeModel from "../../models/HTMLNodeModel";

export default class DomTreeViewModel extends AtomViewModel {

    @BindableReceive("body")
    public body: HTMLNodeModel;

    @BindableBroadcast("selected-node")
    public node: HTMLNodeModel;

    @Watch
    public watchBody(): void {
        if (!this.body) {
            return;
        }
        this.body.expanded = true;
        this.selectNode(this.body);
    }

    public toggleChildren(node: HTMLNodeModel): void {
        node.expanded = !node.expanded;
    }

    public selectNode(node: HTMLNodeModel): void {
        this.node = node;
    }

}
