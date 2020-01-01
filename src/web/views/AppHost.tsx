// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomItemsControl} from "@web-atoms/core/dist/web/controls/AtomItemsControl";
import {AtomGridView} from "@web-atoms/core/dist/web/controls/AtomGridView";

    import AppHostViewModel from "../../view-models/AppHostViewModel";

    import AppHostStyle from "../styles/AppHostStyle";

    import Links from "./Links";



export default class AppHost extends AtomGridView {

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
					{/* e4

					//  <a href="[$viewModel.url]" target="_tab">Open New Tab</a>

					//             <a href="[$viewModel.inspect($viewModel.url)]">Inspect</a>  */}
					<a
						eventClick={Bind.event((x) => (x.viewModel).refreshUrl())}>
						Refresh
					</a>
				</div>
				{/* e7

				//  <button event-click="{ () => $viewModel.refreshUrl() }">Refresh</button>

				//         <a href="[$viewModel.inspect($viewModel.url)]" target="_tab">Inspect</a>  */}
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
						styleDisplay={Bind.oneWay((x) => x.data.visible ? '' : 'none')}
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
							label="Open"
							showQrCode={true}
							url={Bind.oneTime((x) => x.data.url)}>
						</Links>
						<Links
							label="Open (Design)"
							showQrCode={true}
							url={Bind.oneTime((x) => x.data.urlDesignMode)}>
						</Links>
						<Links
							label="Open Packed"
							showQrCode={true}
							url={Bind.oneTime((x) => x.data.urlPacked)}>
						</Links>
						<Links
							label="Open Packed (Design)"
							showQrCode={true}
							url={Bind.oneTime((x) => x.data.urlDesignModePacked)}>
						</Links>
						<td>
							<a
								class="button"
								href={Bind.oneTime((x) => x.viewModel.inspect(x.data.url))}
								target="_tab">
								Inspect 
							</a>
						</td>
						<td>
							<a
								class="button"
								href={Bind.oneTime((x) => x.viewModel.inspect(x.data.urlDesignMode))}
								target="_tab">
								Inspect (Design Mode) 
							</a>
						</td>
					</tr>
				</AtomItemsControl>
			</div>
		</div>
		);
	}
}
