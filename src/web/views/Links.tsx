// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomPageLink} from "@web-atoms/core/dist/web/controls/AtomPageLink";
import {AtomControl} from "@web-atoms/core/dist/web/controls/AtomControl";

    import QRCodeView from "./qr/QRCodeView";



export default class Links extends AtomControl {
	
	constructor(app: any, e: any) {
		super(app, e || document.createElement("td"));
	}

	@BindableProperty
	public label: string ;

	@BindableProperty
	public url: string ;

	@BindableProperty
	public showQrCode: boolean ;

	public cellWidth: number;

	public create(): void {
		
		this.label = 'Open';
		this.url = null;
		this.showQrCode = false;
		this.cellWidth = null;
		this.render(
		<div
			styleWidth={Bind.oneTime(() => this.cellWidth + "px")}>
			<a
				styleDisplay={Bind.oneWay(() => this.url ? '' : 'none')}
				class="button"
				href={Bind.oneWay(() => this.url)}
				target="_tab"
				text={Bind.oneWay(() => this.label)}>
			</a>
			<i
				styleDisplay={Bind.oneWay(() => this.url ? '' : 'none')}
				class="fas fa-copy"
				title="Copy Url"
				style="margin: 5px; cursor: pointer;"
				eventClick={Bind.event((x) => this.viewModel.copyUrl(((x.data) ? x.data.url : undefined)))}>
			</i>
			<AtomPageLink
				styleDisplay={Bind.oneWay(() => (this.url && this.showQrCode) ? '' : 'none')}
				style="margin: 5px; cursor: pointer;"
				class="fas fa-qrcode"
				title="QR Code"
				for="i">
				<div
					template="page">
					<QRCodeView
						code={Bind.oneTime((x) => x.viewModel.parent.toAbsoluteUrl(x.data.url))}>
					</QRCodeView>
				</div>
			</AtomPageLink>
		</div>
		);
	}
}
