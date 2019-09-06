// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomItemsControl} from "web-atoms-core/dist/web/controls/AtomItemsControl";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";
	
	    import AppHostViewModel from "../../view-models/AppHostViewModel";
	    import AppHostStyle from "../styles/AppHostStyle";
	
	
	export default class AppHost extends AtomGridView {
		
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
			
			const e2 = document.createElement("input");
			
			e1.appendChild(e2);
			
			this.setPrimitiveValue(e2, "type", "search" );
			
			this.bind(e2, "value",  [["viewModel","search"]], ["change", "keyup", "keydown", "blur"]  );
			
			this.setPrimitiveValue(e2, "placeholder", "Search..." );
			
			const e3 = document.createElement("div");
			
			e1.appendChild(e3);
			
			this.setPrimitiveValue(e3, "class", "topnav-right" );
			// e4
			//  <a href="[$viewModel.url]" target="_tab">Open New Tab</a>
			//             <a href="[$viewModel.inspect($viewModel.url)]">Inspect</a> 
			
			const e5 = document.createElement("a");
			
			e3.appendChild(e5);
			
			this.runAfterInit( () => this.setLocalValue(e5, "eventClick",  () => (this.viewModel).refreshUrl() ) );
			
			const e6 = document.createTextNode("Refresh");
			e5.appendChild(e6);
			// e7
			//  <button event-click="{ () => $viewModel.refreshUrl() }">Refresh</button>
			//         <a href="[$viewModel.inspect($viewModel.url)]" target="_tab">Inspect</a> 
			
			const e8 = document.createElement("div");
			
			this.append(e8);
			
			this.setPrimitiveValue(e8, "style", "overflow: auto; width: 100%; height: 100%" );
			
			this.setPrimitiveValue(e8, "row", "1" );
			
			const e9 = new AtomItemsControl(this.app, document.createElement("table"));
			
			e9.setPrimitiveValue(e9.element, "class", "grid" );
			
			e9.bind(e9.element, "items",  [["viewModel","files"]], false , null );
			
			e9.setPrimitiveValue(e9.element, "valuePath", "url" );
			
			e9.bind(e9.element, "value",  [["viewModel","url"]], true  );
			
			e9.itemTemplate = AppHost_itemTemplate_1_1Creator(this);
			
			e8.appendChild(e9.element);
		}
	}
	
	function AppHost_itemTemplate_1_1Creator(__creator) {
		return class AppHost_itemTemplate_1_1 extends AtomControl {
			
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
				
				const e4 = document.createElement("td");
				
				this.append(e4);
				
				const e5 = document.createElement("a");
				
				e4.appendChild(e5);
				
				this.setPrimitiveValue(e5, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e5, "href", ((this.data) ? this.data.url : undefined)) );
				
				this.setPrimitiveValue(e5, "target", "_tab" );
				
				const e6 = document.createTextNode("Open ");
				e5.appendChild(e6);
				
				const e7 = document.createElement("td");
				
				this.append(e7);
				
				const e8 = document.createElement("a");
				
				e7.appendChild(e8);
				
				this.setPrimitiveValue(e8, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e8, "styleDisplay",  ((this.data) ? this.data.urlPacked : undefined) ? '' : 'none' ) );
				
				this.runAfterInit( () => this.setLocalValue(e8, "href", ((this.data) ? this.data.urlPacked : undefined)) );
				
				this.setPrimitiveValue(e8, "target", "_tab" );
				
				const e9 = document.createTextNode("Open Packed");
				e8.appendChild(e9);
				
				const e10 = document.createElement("td");
				
				this.append(e10);
				
				const e11 = document.createElement("a");
				
				e10.appendChild(e11);
				
				this.setPrimitiveValue(e11, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e11, "href", (this.viewModel).inspect(((this.data) ? this.data.url : undefined))) );
				
				this.setPrimitiveValue(e11, "target", "_tab" );
				
				const e12 = document.createTextNode("Inspect ");
				e11.appendChild(e12);
				
				const e13 = document.createElement("td");
				
				this.append(e13);
				
				const e14 = document.createElement("a");
				
				e13.appendChild(e14);
				
				this.setPrimitiveValue(e14, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e14, "href", ((this.data) ? this.data.urlDesignMode : undefined)) );
				
				this.setPrimitiveValue(e14, "target", "_tab" );
				
				const e15 = document.createTextNode("Open (Design Mode)");
				e14.appendChild(e15);
				
				const e16 = document.createElement("td");
				
				this.append(e16);
				
				const e17 = document.createElement("a");
				
				e16.appendChild(e17);
				
				this.setPrimitiveValue(e17, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e17, "styleDisplay",  ((this.data) ? this.data.urlPacked : undefined) ? '' : 'none' ) );
				
				this.runAfterInit( () => this.setLocalValue(e17, "href", ((this.data) ? this.data.urlDesignModePacked : undefined)) );
				
				this.setPrimitiveValue(e17, "target", "_tab" );
				
				const e18 = document.createTextNode("Open Packed (Design Mode)");
				e17.appendChild(e18);
				
				const e19 = document.createElement("td");
				
				this.append(e19);
				
				const e20 = document.createElement("a");
				
				e19.appendChild(e20);
				
				this.setPrimitiveValue(e20, "class", "button" );
				
				this.runAfterInit( () => this.setLocalValue(e20, "href", (this.viewModel).inspect(((this.data) ? this.data.urlDesignMode : undefined))) );
				
				this.setPrimitiveValue(e20, "target", "_tab" );
				
				const e21 = document.createTextNode("Inspect (Design Mode) ");
				e20.appendChild(e21);
			}
		}
	}