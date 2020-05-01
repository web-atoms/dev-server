// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomPageLink} from "@web-atoms/core/dist/web/controls/AtomPageLink";
import {AtomControl} from "@web-atoms/core/dist/web/controls/AtomControl";

    import QRCodeView from "./qr/QRCodeView";
import AppHostViewModel from "../../view-models/AppHostViewModel";
import IFilePath from "../../models/IFilePath";



export default class Links extends AtomControl {

	public viewModel: AppHostViewModel;

	public data: IFilePath;
	
	constructor(app: any, e: any) {
		super(app, e || document.createElement("td"));
	}

	public label: string ;

	public designMode: boolean ;

	public showQrCode: boolean ;

	public cellWidth: number;

	public url: string;

	public packed: boolean;

	public show: boolean;

	public create(): void {
		
		this.label = 'Open';
		this.show = true;
		this.designMode = false;
		this.showQrCode = false;
		this.cellWidth = null;
		this.packed = false;
		this.render(
		<div
			show={Bind.oneWay(() => this.packed ? this.data.packed : true)}
			styleWidth={Bind.oneTime(() => this.cellWidth + "px")}>
			<a
				styleDisplay={Bind.oneWay(() => this.show ? '' : 'none')}
				class="button"
				href={Bind.oneWay(() => this.viewModel.toAbsoluteUrl(this.data, this.designMode, this.packed))}
				target="_tab"
				text={Bind.oneWay(() => this.label)}>
			</a>
			<i
				styleDisplay={Bind.oneWay(() => this.show ? '' : 'none')}
				class="fas fa-copy"
				title="Copy Url"
				style="margin: 5px; cursor: pointer;"
				eventClick={Bind.event(() => this.viewModel.copyUrl(this.data, this.designMode, this.packed))}>
			</i>
			<AtomPageLink
				styleDisplay={Bind.oneWay(() => (this.show && this.showQrCode) ? '' : 'none')}
				style="margin: 5px; cursor: pointer;"
				class="fas fa-qrcode"
				title="QR Code"
				for="i">
				<div
					template="page">
					<QRCodeView
						code={Bind.oneTime(() => this.viewModel.toAbsoluteUrl(this.data, this.designMode, this.packed, true))}>
					</QRCodeView>
				</div>
			</AtomPageLink>
		</div>
		);
	}
}
