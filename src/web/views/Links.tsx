// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomPageLink} from "@web-atoms/core/dist/web/controls/AtomPageLink";
import {AtomControl} from "@web-atoms/core/dist/web/controls/AtomControl";

    import QRCodeView from "./qr/QRCodeView";


export default class Links extends AtomControl {

	@BindableProperty
	public label: string ;

	@BindableProperty
	public url: string ;

	@BindableProperty
	public showQrCode: boolean ;

	public create(): void {

		this.label = 'Open';
		this.url = null;
		this.showQrCode = false;
		this.render(
		<div
			styleDisplay={Bind.oneWay(() => this.url ? '' : 'none')}>
			<a
				class="button"
				href={Bind.oneWay(() => this.url)}
				target="_tab"
				text={Bind.oneWay(() => this.label)}>
			</a>
			<i
				class="fas fa-copy"
				title="Copy Url"
				style="margin: 5px; cursor: pointer;"
				eventClick={Bind.event((x) => this.viewModel.copyUrl(((x.data) ? x.data.url : undefined)))}>
			</i>
			<AtomPageLink
				styleDisplay={Bind.oneWay(() => this.showQrCode ? '' : 'none')}
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
