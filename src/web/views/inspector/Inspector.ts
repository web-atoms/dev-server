// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomGridSplitter} from "web-atoms-core/dist/web/controls/AtomGridSplitter";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
	
	    import InspectorViewModel from "../../../view-models/inspector/InspectorViewModel";
	    import PropertyBrowser from "./PropertyBrowser";
	    import DomTree from "./DomTree";
	
	
	declare var UMD: any;
	const __moduleName = this.filename;
	export default class Inspector extends AtomGridView {
		public static readonly _$_url = __moduleName ;
		
		@BindableProperty
		public  frame: any ;
		
		public create(): void {
			
			super.create();
			
			this. frame =  null ;
			
			const __creator = this;
			
			this.setPrimitiveValue(this.element, "style", "font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position: absolute; width:100%; height: 100%; padding:0; margin: 0;" );
			
			this.setPrimitiveValue(this.element, ",", "" );
			
			this.setPrimitiveValue(this.element, "columns", "250,5,*,5,350" );
			
			this.viewModel =  this.resolve(InspectorViewModel, 'owner') ;
			
			const e1 = new DomTree(this.app);
			
			e1.setPrimitiveValue(e1.element, "style", "overflow: auto; width: 100%; height: 100%" );
			
			this.append(e1);
			
			const e2 = new AtomGridSplitter(this.app);
			
			e2.setPrimitiveValue(e2.element, "column", "1" );
			
			this.append(e2);
			
			const e3 = document.createElement("iframe");
			
			this.frame = e3;
			
			this.append(e3);
			
			this.setPrimitiveValue(e3, "column", "2" );
			
			this.bind(e3, "src",  [["viewModel","url"]], false , null );
			
			this.setPrimitiveValue(e3, "style", "border: none; padding:5px; width:100%; height:100%;" );
			
			const e4 = new AtomGridSplitter(this.app);
			
			e4.setPrimitiveValue(e4.element, "column", "3" );
			
			this.append(e4);
			
			const e5 = new PropertyBrowser(this.app);
			
			e5.setPrimitiveValue(e5.element, "column", "4" );
			
			e5.setPrimitiveValue(e5.element, "style", "overflow: auto; width: 100%; height: 100%" );
			
			this.append(e5);
		}
	}