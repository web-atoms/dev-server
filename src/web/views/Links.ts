// tslint:disable
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomControl} from "@web-atoms/core/dist/web/controls/AtomControl";
import {AtomPageLink} from "@web-atoms/core/dist/web/controls/AtomPageLink";
	
	    import QRCodeView from "./qr/QRCodeView";
	
	
	declare var UMD: any;
	const __moduleName = this.filename;
	export default class Links extends AtomControl {
		public static readonly _$_url = __moduleName ;
		
		@BindableProperty
		public  label:  string  ;
		
		@BindableProperty
		public  url:  string  ;
		
		constructor(app: any, e?: any) {
			super(app, e || document.createElement("td"));
		}
		
		public create(): void {
			
			super.create();
			
			this. label =  'Open';
			
			this. url =  null;
			
			const __creator = this;
			
			this.bind(this.element, "styleDisplay",  [["this","url"]], false , (v1) => (v1) ? '' : 'none' , __creator);
			
			const e1 = document.createElement("a");
			
			this.append(e1);
			
			this.setPrimitiveValue(e1, "class", "button" );
			
			this.bind(e1, "href",  [["this","url"]], false , null , __creator);
			
			this.setPrimitiveValue(e1, "target", "_tab" );
			
			this.bind(e1, "text",  [["this","label"]], false , null , __creator);
			
			const e2 = document.createElement("i");
			
			this.append(e2);
			
			this.setPrimitiveValue(e2, "class", "fas fa-copy" );
			
			this.setPrimitiveValue(e2, "title", "Copy Url" );
			
			this.setPrimitiveValue(e2, "style", "margin: 5px; cursor: pointer;" );
			
			this.runAfterInit( () => this.setLocalValue(e2, "eventClick",  () => this.viewModel.copyUrl(((this.data) ? this.data.url : undefined)) ) );
			
			const e3 = new AtomPageLink(this.app, document.createElement("i"));
			
			e3.bind(e3.element, "styleDisplay",  [["this","showQrCode"]], false , (v1) => (v1) ? '' : 'none' , __creator);
			
			e3.setPrimitiveValue(e3.element, "style", "margin: 5px; cursor: pointer;" );
			
			e3.setPrimitiveValue(e3.element, "class", "fas fa-qrcode" );
			
			e3.setPrimitiveValue(e3.element, "title", "QR Code" );
			
			e3.page = Links_page_1_14Creator(this);
			
			this.append(e3);
		}
	}
	
	function Links_page_1_14Creator(__creator) {
		return class Links_page_1_14 extends AtomControl {
			
			constructor(app: any, e?: any) {
				super(app, e || document.createElement("div"));
			}
			
			public create(): void {
				
				super.create();
				
				const e1 = new QRCodeView(this.app);
				
				e1.runAfterInit( () => e1.setLocalValue(e1.element, "code", ((e1.data) ? e1.data.url : undefined)) );
				
				this.append(e1);
			}
		}
	}