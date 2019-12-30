// tslint:disable
import Bind from "@web-atoms/core/dist/core/Bind"
import XNode from "@web-atoms/core/dist/core/XNode"
import {BindableProperty} from "@web-atoms/core/dist/core/BindableProperty";
import {AtomGridSplitter} from "@web-atoms/core/dist/web/controls/AtomGridSplitter";
import {AtomGridView} from "@web-atoms/core/dist/web/controls/AtomGridView";
	
	    import InspectorViewModel from "../../../view-models/inspector/InspectorViewModel";
	    import PropertyBrowser from "./PropertyBrowser";
	    import DomTree from "./DomTree";
	
	
	export default class Inspector extends AtomGridView {
		
		@BindableProperty
		public  frame: any ;
		
		public create(): void {
			this.viewModel =  this.resolve(InspectorViewModel, 'owner') ;
			
			this. frame =  null ;
			this.render(<div 
				style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position: absolute; width:100%; height: 100%; padding:0; margin: 0;" 
				,="" 
				columns="250,5,*,5,350" 
				><DomTree 
					style="overflow: auto; width: 100%; height: 100%" 
					>
				</DomTree><AtomGridSplitter 
					column="1" 
					>
				</AtomGridSplitter><iframe 
					column="2" 
					src={Bind.oneWay((x) => x.viewModel.url)} 
					style="border: none; padding:5px; width:100%; height:100%;" 
					>
				</iframe><AtomGridSplitter 
					column="3" 
					>
				</AtomGridSplitter><PropertyBrowser 
					column="4" 
					style="overflow: auto; width: 100%; height: 100%" 
					>
				</PropertyBrowser>
			</div>
			);
		}
	}