// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomItemsControl} from "@web-atoms/core/dist/web/controls/AtomItemsControl";

    import DomTreeViewModel from "../../../view-models/inspector/DomTreeViewModel";
    import DomTreeStyle from "../../styles/DomTreeStyle";
    import RightArrowDataUrl from "../../images/RightArrowDataUrl";
    import DownArrowDataUrl from "../../images/DownArrowDataUrl";


export default class DomTree extends AtomItemsControl {	
	constructor(app: any, e: any) {		super(app, e || document.createElement("AtomItemsControl"));	}

	public create(): void {		this.viewModel =  this.resolve(DomTreeViewModel) ;
		this.defaultControlStyle = DomTreeStyle;

		this.render(
		<div
			styleClass={Bind.oneTime(() => this.controlStyle.root)}
			items={Bind.oneWay((x) => x.viewModel.body.children)}>
			<div
				template="itemTemplate"
				class={Bind.oneWay((x) => x.data.className)}>
				<img
					src={Bind.oneWay((x) => x.data.expanded ? DownArrowDataUrl : RightArrowDataUrl)}
					eventClick={Bind.event((x) => (x.viewModel).toggleChildren((x.data)))}>				</img>
				<span
					eventClick={Bind.event((x) => (x.viewModel).selectNode((x.data)))}
					class={Bind.oneWay((x) => x.viewModel.node == x.data ? 'selected' : 'unselected')}
					text={Bind.oneTime((x) => x.data.label)}>				</span>
				<AtomItemsControl
					items={Bind.oneWay((x) => x.data.expanded ? x.data.children : [])}
					styleClass={Bind.oneTime(() => this.controlStyle.root)}
					styleDisplay={Bind.oneWay((x) => x.data.expanded ? '' : 'none')}
					itemTemplate={Bind.oneTime(() => this.itemTemplate)}>				</AtomItemsControl>			</div>		</div>
		);	}}
