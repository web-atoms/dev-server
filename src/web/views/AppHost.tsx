// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomItemsControl} from "@web-atoms/core/dist/web/controls/AtomItemsControl";
import { AtomToggleButtonBar } from "@web-atoms/core/dist/web/controls/AtomToggleButtonBar";
import {AtomGridView} from "@web-atoms/core/dist/web/controls/AtomGridView";

    import AppHostViewModel from "../../view-models/AppHostViewModel";

    import AppHostStyle from "../styles/AppHostStyle";

    import Links from "./Links";




// @web-atoms-pack: true


export default class AppHost extends AtomGridView {

	public viewModel: AppHostViewModel;

	public create(): void {
		this.viewModel =  this.resolve(AppHostViewModel) ;
		this.defaultControlStyle = AppHostStyle;

		this.render(
		<div
			styleClass={Bind.oneTime(() => this.controlStyle.root)}
			rows="50, *">
			<header
				row="0"
				class="header">
				<input
					type="search"
					value={Bind.twoWays((x) => x.viewModel.search, ["change", "keyup", "keydown", "blur"])}
					placeholder="Search...">
				</input>
				<div
					class="topnav-right">
					Enable Debugging?
					<AtomToggleButtonBar
						items={this.viewModel.debugTypes}
						value={Bind.twoWays(() => this.viewModel.debug)}
						/>

					<AtomToggleButtonBar
						items={this.viewModel.fileTypes}
						value={Bind.twoWays(() => this.viewModel.type)}
						/>

					<a
						eventClick={Bind.event(() => this.viewModel.refreshUrl())}>
						Refresh
					</a>
				</div>
			</header>
			<div
				style="overflow: auto; width: 100%; height: 100%"
				row="1">
				<AtomItemsControl
					class="grid"
					items={Bind.oneWay((x) => x.viewModel.files)}
					valuePath="url"
					value={Bind.twoWays((x) => x.viewModel.url)}
					for="table">
					<tr
						template="itemTemplate">
						<td>
							<div
								text={Bind.oneTime((x) => x.data.name)}
								title={Bind.oneTime((x) => x.data.dir)}
								style="font-weight: 500;">
							</div>
							<div
								style="font-size: small;"
								text={Bind.oneTime((x) => x.data.dir)}>
							</div>
						</td>
						<Links
							cellWidth={150}
							label="Open"
							showQrCode={true}
							designMode={false}>
						</Links>
						<Links
							cellWidth={200}
							label="Open (Design)"
							showQrCode={true}
							designMode={true}>
						</Links>
						<Links
							cellWidth={200}
							label="Open Packed"
							showQrCode={true}
							designMode={false}
							packed={Bind.oneWay((x) => x.data.packed )}>
						</Links>
						<Links
							cellWidth={250}
							label="Open Packed (Design)"
							showQrCode={true}
							designMode={true}
							packed={Bind.oneWay((x) => x.data.packed )}>
						</Links>
						<td style="width: 300px" text=" "></td>
						{/* <td  style="width: 100px">
							<a
								class="button"
								href={Bind.oneTime((x) => x.viewModel.inspect(x.data.url))}
								target="_tab">
								Inspect 
							</a>
						</td>
						<td style="width: 200px">
							<a
								class="button"
								href={Bind.oneTime((x) => x.viewModel.inspect(x.data.urlDesignMode))}
								target="_tab">
								Inspect (Design Mode) 
							</a>
						</td> */}
					</tr>
				</AtomItemsControl>
			</div>
		</div>
		);
	}
}
