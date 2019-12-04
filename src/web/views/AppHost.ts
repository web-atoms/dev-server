// tslint:disable
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomToggleButtonBar} from "@web-atoms/core/dist/web/controls/AtomToggleButtonBar";
import {AtomItemsControl} from "@web-atoms/core/dist/web/controls/AtomItemsControl";
import {AtomGridView} from "@web-atoms/core/dist/web/controls/AtomGridView";
import {AtomControl} from "@web-atoms/core/dist/web/controls/AtomControl";
	
	    import AppHostViewModel from "../../view-models/AppHostViewModel";
	    import AppHostStyle from "../styles/AppHostStyle";
	    import Links from "./Links";
	
	
	declare var UMD: any;
	const __moduleName = this.filename;
	export default class AppHost extends AtomGridView {
		public static readonly _$_url = __moduleName ;
		
		public create(): void {
			
			super.create();
			
			const __creator = this;
			
			this.defaultControlStyle =  AppHostStyle ;
			
			this.runAfterInit(() => this.setPrimitiveValue(this.element, "styleClass",  this.controlStyle.root ));
			
			this.viewModel =  this.resolve(AppHostViewModel) ;
			
			this.setPrimitiveValue(this.element, "rows", "50, *" );
			
			const e1 = document.createElement("header");
			
			this.append(e1);
			
			this.setPrimitiveValue(e1, "row", "0" );
			
			this.setPrimitiveValue(e1, "class", "header" );
			
			const e2 = new AtomToggleButtonBar(this.app);
			
			e2.setPrimitiveValue(e2.element, "labelPath", "label" );
			
			e2.setPrimitiveValue(e2.element, "valuePath", "value" );
			
			e2.setPrimitiveValue(e2.element, "items", this.viewModel.platforms);
			
			e2.bind(e2.element, "value",  [["viewModel","platform"]], true  );
			
			e1.appendChild(e2.element);
			
			const e3 = document.createElement("input");
			
			e1.appendChild(e3);
			
			this.setPrimitiveValue(e3, "type", "search" );
			
			this.bind(e3, "value",  [["viewModel","search"]], ["change", "keyup", "keydown", "blur"]  );
			
			this.setPrimitiveValue(e3, "placeholder", "Search..." );
			
			const e4 = document.createElement("div");
			
			e1.appendChild(e4);
			
			this.setPrimitiveValue(e4, "class", "topnav-right" );
			// e5
			//  <a href="[$viewModel.url]" target="_tab">Open New Tab</a>
			//             <a href="[$viewModel.inspect($viewModel.url)]">Inspect</a> 
			
			const e6 = document.createElement("a");
			
			e4.appendChild(e6);
			
			this.runAfterInit( () => this.setLocalValue(e6, "eventClick",  () => (this.viewModel).refreshUrl() ) );
			
			const e7 = document.createTextNode("Refresh");
			e6.appendChild(e7);
			// e8
			//  <button event-click="{ () => $viewModel.refreshUrl() }">Refresh</button>
			//         <a href="[$viewModel.inspect($viewModel.url)]" target="_tab">Inspect</a> 
			
			const e9 = document.createElement("div");
			
			this.append(e9);
			
			this.setPrimitiveValue(e9, "style", "overflow: auto; width: 100%; height: 100%" );
			
			this.setPrimitiveValue(e9, "row", "1" );
			
			const e10 = new AtomItemsControl(this.app, document.createElement("table"));
			
			e10.setPrimitiveValue(e10.element, "class", "grid" );
			
			e10.bind(e10.element, "items",  [["viewModel","files"]], false , null );
			
			e10.setPrimitiveValue(e10.element, "valuePath", "url" );
			
			e10.bind(e10.element, "value",  [["viewModel","url"]], true  );
			
			e10.itemTemplate = AppHost_itemTemplate_1_13Creator(this);
			
			e9.appendChild(e10.element);
		}
	}
	
	function AppHost_itemTemplate_1_13Creator(__creator) {
		return class AppHost_itemTemplate_1_13 extends AtomControl {
			
			constructor(app: any, e?: any) {
				super(app, e || document.createElement("tr"));
			}
			
			public create(): void {
				
				super.create();
				
				this.bind(this.element, "styleDisplay",  [["data","visible"]], false , (v1) => (v1) ? '' : 'none' );
				
				const e1 = document.createElement("td");
				
				this.append(e1);
				
				const e2 = document.createElement("div");
				
				e1.appendChild(e2);
				
				this.runAfterInit( () => this.setLocalValue(e2, "text", ((this.data) ? this.data.name : undefined)) );
				
				this.runAfterInit( () => this.setLocalValue(e2, "title", ((this.data) ? this.data.dir : undefined)) );
				
				this.setPrimitiveValue(e2, "style", "font-weight: 500;" );
				
				const e3 = document.createElement("div");
				
				e1.appendChild(e3);
				
				this.setPrimitiveValue(e3, "style", "font-size: small;" );
				
				this.runAfterInit( () => this.setLocalValue(e3, "text", ((this.data) ? this.data.dir : undefined)) );
				
				const e4 = new Links(this.app);
				
				e4.setPrimitiveValue(e4.element, "label", "Open" );
				
				e4.runAfterInit( () => e4.setLocalValue(e4.element, "url", ((e4.data) ? e4.data.url : undefined)) );
				
				this.append(e4);
				
				const e5 = new Links(this.app);
				
				e5.setPrimitiveValue(e5.element, "label", "Open (Design)" );
				
				e5.runAfterInit( () => e5.setLocalValue(e5.element, "url", ((e5.data) ? e5.data.urlDesignMode : undefined)) );
				
				this.append(e5);
				
				const e6 = new Links(this.app);
				
				e6.setPrimitiveValue(e6.element, "label", "Open Packed" );
				
				e6.runAfterInit( () => e6.setLocalValue(e6.element, "url", ((e6.data) ? e6.data.urlPacked : undefined)) );
				
				this.append(e6);
				
				const e7 = new Links(this.app);
				
				e7.setPrimitiveValue(e7.element, "label", "Open Packed (Design)" );
				
				e7.runAfterInit( () => e7.setLocalValue(e7.element, "url", ((e7.data) ? e7.data.urlDesignModePacked : undefined)) );
				
				this.append(e7);
				
				const e8 = document.createElement("td");
				
				this.append(e8);
				
				const e9 = document.createElement("a");
				
				e8.appendChild(e9);
				
				this.setPrimitiveValue(e9, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e9, "href", (this.viewModel).inspect(((this.data) ? this.data.url : undefined))) );
				
				this.setPrimitiveValue(e9, "target", "_tab" );
				
				const e10 = document.createTextNode("Inspect ");
				e9.appendChild(e10);
				
				const e11 = document.createElement("td");
				
				this.append(e11);
				
				const e12 = document.createElement("a");
				
				e11.appendChild(e12);
				
				this.setPrimitiveValue(e12, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e12, "href", (this.viewModel).inspect(((this.data) ? this.data.urlDesignMode : undefined))) );
				
				this.setPrimitiveValue(e12, "target", "_tab" );
				
				const e13 = document.createTextNode("Inspect (Design Mode) ");
				e12.appendChild(e13);
			}
		}
	}