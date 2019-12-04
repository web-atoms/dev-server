// tslint:disable
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomItemsControl} from "@web-atoms/core/dist/web/controls/AtomItemsControl";
import {AtomControl} from "@web-atoms/core/dist/web/controls/AtomControl";
	
	    import PropertyBrowserViewModel from "../../../view-models/inspector/PropertyBrowserViewModel";
	    import PropertyBrowserStyle from "../../styles/PropertyBrowserStyle";
	
	
	declare var UMD: any;
	const __moduleName = this.filename;
	export default class PropertyBrowser extends AtomItemsControl {
		public static readonly _$_url = __moduleName ;
		
		public create(): void {
			
			super.create();
			
			const __creator = this;
			
			this.defaultControlStyle =  PropertyBrowserStyle ;
			
			this.runAfterInit(() => this.setPrimitiveValue(this.element, "styleClass",  this.controlStyle.root ));
			
			this.viewModel =  this.resolve(PropertyBrowserViewModel) ;
			
			this.bind(this.element, "items",  [["viewModel","properties"]], false , null );
			
			this.bind(this.element, "filter",  [["viewModel","filter"]], false , null );
			
			this.itemTemplate = PropertyBrowser_itemTemplate_1_3Creator(this);
			
			const e1 = document.createElement("input");
			
			this.append(e1);
			
			this.setPrimitiveValue(e1, "type", "search" );
			
			this.bind(e1, "value",  [["viewModel","search"]], ["change", "keyup", "keydown", "blur"]  );
			
			const e2 = document.createElement("div");
			
			this.itemsPresenter = e2;
			
			this.append(e2);
			
			this.setPrimitiveValue(e2, "class", "presenter" );
		}
	}
	
	function PropertyBrowser_itemTemplate_1_3Creator(__creator) {
		return class PropertyBrowser_itemTemplate_1_3 extends AtomControl {
			
			constructor(app: any, e?: any) {
				super(app, e || document.createElement("div"));
			}
			
			public create(): void {
				
				super.create();
				
				this.setPrimitiveValue(this.element, "class", "item" );
				
				const e1 = document.createElement("span");
				
				this.append(e1);
				
				this.setPrimitiveValue(e1, "class", "index" );
				
				this.runAfterInit( () => this.setLocalValue(e1, "text", ((this.data) ? this.data.index : undefined)) );
				
				const e2 = document.createElement("span");
				
				this.append(e2);
				
				this.setPrimitiveValue(e2, "class", "closed-value" );
				
				this.bind(e2, "title",  [["data","isObject"],["data","value"]], false , (v1,v2) =>  (v1) ? 'Click to see more...' : (v2)  );
				
				this.bind(e2, "styleDisplay",  [["data","expanded"]], false , (v1) =>  (v1) ? 'none' : 'inline-block'  );
				
				this.bind(e2, "styleColor",  [["data","isObject"]], false , (v1) =>  (v1) ? 'blue' : ''  );
				
				this.bind(e2, "styleCursor",  [["data","isObject"]], false , (v1) =>  (v1) ? 'pointer': ''  );
				
				this.runAfterInit( () => this.setLocalValue(e2, "eventClick",  () => (this.viewModel).toggle((this.data)) ) );
				
				this.bind(e2, "text",  [["data","isObject"],["data","value"]], false , (v1,v2) =>  (v1) ? '(...)' : (v2) );
				
				const e3 = document.createElement("span");
				
				this.append(e3);
				
				this.setPrimitiveValue(e3, "class", "close-button" );
				
				this.runAfterInit( () => this.setLocalValue(e3, "eventClick",  () => (this.viewModel).toggle((this.data)) ) );
				
				this.bind(e3, "styleDisplay",  [["data","expanded"]], false , (v1) =>  (v1) ? 'inline-block' : 'none'  );
				
				this.setPrimitiveValue(e3, "text", "( ^ )" );
				
				const e4 = new AtomItemsControl(this.app);
				
				e4.setPrimitiveValue(e4.element, "class", "items" );
				
				e4.bind(e4.element, "items",  [["data","expanded"],["data","isObject"],["data","value"]], false , (v1,v2,v3) =>  (v1) ? ( (v2) ? (v3) : []) : []  );
				
				e4.bind(e4.element, "styleDisplay",  [["data","expanded"]], false , (v1) =>  (v1) ? '' : 'none'  );
				
				e4.setPrimitiveValue(e4.element, "itemTemplate",  __creator.itemTemplate );
				
				this.append(e4);
			}
		}
	}