// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomItemsControl} from "@web-atoms/core/dist/web/controls/AtomItemsControl";

    import PropertyBrowserViewModel from "../../../view-models/inspector/PropertyBrowserViewModel";
    import PropertyBrowserStyle from "../../styles/PropertyBrowserStyle";


export default class PropertyBrowser extends AtomItemsControl {	
	constructor(app: any, e: any) {		super(app, e || document.createElement("AtomItemsControl"));	}

	public create(): void {		this.viewModel =  this.resolve(PropertyBrowserViewModel) ;
		this.defaultControlStyle = PropertyBrowserStyle;

		this.render(
		<div
			styleClass={Bind.oneTime(() => this.controlStyle.root)}
			items={Bind.oneWay((x) => x.viewModel.properties)}
			filter={Bind.oneWay((x) => x.viewModel.filter)}>
			<input
				type="search"
				value={Bind.twoWays((x) => x.viewModel.search, ["change", "keyup", "keydown", "blur"])}>			</input>
			<div
				class="presenter">			</div>
			<div
				class="item"
				template="itemTemplate">
				<span
					class="index"
					text={Bind.oneTime((x) => x.data.index)}>				</span>
				<span
					class="closed-value"
					title={Bind.oneWay((x) => x.data.isObject ? 'Click to see more...' : x.data.value)}
					styleDisplay={Bind.oneWay((x) => x.data.expanded ? 'none' : 'inline-block')}
					styleColor={Bind.oneWay((x) => x.data.isObject ? 'blue' : '')}
					styleCursor={Bind.oneWay((x) => x.data.isObject ? 'pointer': '')}
					eventClick={Bind.event((x) => (x.viewModel).toggle((x.data)))}
					text={Bind.oneWay((x) => x.data.isObject ? '(...)' : x.data.value)}>				</span>
				<span
					class="close-button"
					eventClick={Bind.event((x) => (x.viewModel).toggle((x.data)))}
					styleDisplay={Bind.oneWay((x) => x.data.expanded ? 'inline-block' : 'none')}
					text="( ^ )">				</span>
				<AtomItemsControl
					class="items"
					items={Bind.oneWay((x) => x.data.expanded ? ( x.data.isObject ? x.data.value : []) : [])}
					styleDisplay={Bind.oneWay((x) => x.data.expanded ? '' : 'none')}
					itemTemplate={Bind.oneTime(() => this.itemTemplate)}>				</AtomItemsControl>			</div>		</div>
		);	}}
