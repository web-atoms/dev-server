// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomItemsControl} from "web-atoms-core/dist/web/controls/AtomItemsControl";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";
	
	    import DomTreeViewModel from "../../../view-models/inspector/DomTreeViewModel";
	    import DomTreeStyle from "../../styles/DomTreeStyle";
	    import RightArrowDataUrl from "../../images/RightArrowDataUrl";
	    import DownArrowDataUrl from "../../images/DownArrowDataUrl";
	
	
	declare var UMD: any;
	const __moduleName = this.filename;
	export default class DomTree extends AtomItemsControl {
		public static readonly _$_url = __moduleName ;
		
		public create(): void {
			
			super.create();
			
			const __creator = this;
			
			this.defaultControlStyle =  DomTreeStyle ;
			
			this.viewModel =  this.resolve(DomTreeViewModel) ;
			
			this.runAfterInit(() => this.setPrimitiveValue(this.element, "styleClass",  this.controlStyle.root ));
			
			this.bind(this.element, "items",  [["viewModel","body","children"]], false , null );
			
			this.itemTemplate = DomTree_itemTemplate_1_2Creator(this);
		}
	}
	
	function DomTree_itemTemplate_1_2Creator(__creator) {
		return class DomTree_itemTemplate_1_2 extends AtomControl {
			
			constructor(app: any, e?: any) {
				super(app, e || document.createElement("div"));
			}
			
			public create(): void {
				
				super.create();
				
				this.bind(this.element, "class",  [["data","className"]], false , null );
				
				const e1 = document.createElement("img");
				
				this.append(e1);
				
				this.bind(e1, "src",  [["data","expanded"]], false , (v1) =>  (v1) ? DownArrowDataUrl : RightArrowDataUrl  );
				
				this.runAfterInit( () => this.setLocalValue(e1, "eventClick",  () => (this.viewModel).toggleChildren((this.data)) ) );
				
				const e2 = document.createElement("span");
				
				this.append(e2);
				
				this.runAfterInit( () => this.setLocalValue(e2, "eventClick",  () => (this.viewModel).selectNode((this.data)) ) );
				
				this.bind(e2, "class",  [["viewModel","node"],["data"]], false , (v1,v2) =>  (v1) == (v2) ? 'selected' : 'unselected'  );
				
				this.runAfterInit( () => this.setLocalValue(e2, "text",  ((this.data) ? this.data.label : undefined) ) );
				
				const e3 = new AtomItemsControl(this.app);
				
				e3.bind(e3.element, "items",  [["data","expanded"],["data","children"]], false , (v1,v2) =>  (v1) ? (v2) : []  );
				
				this.runAfterInit(() => e3.setPrimitiveValue(e3.element, "styleClass",  __creator.controlStyle.root ));
				
				e3.bind(e3.element, "styleDisplay",  [["data","expanded"]], false , (v1) =>  (v1) ? '' : 'none'  );
				
				e3.setPrimitiveValue(e3.element, "itemTemplate",  __creator.itemTemplate );
				
				this.append(e3);
			}
		}
	}