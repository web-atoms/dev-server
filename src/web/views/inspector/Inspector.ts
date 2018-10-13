// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
import {AtomGridSplitter} from "web-atoms-core/dist/web/controls/AtomGridSplitter";

    import InspectorViewModel from "../../../view-models/inspector/InspectorViewModel";
    import PropertyBrowser from "./PropertyBrowser";
    import DomTree from "./DomTree";

export default  class Inspector extends AtomGridView {

                
            @BindableProperty
            public  frame: any;
            

                public create(): void {
                    super.create();

                    const __creator = this;

                    
                this. frame =  null ;
            

                    
                    
                    
        this.setPrimitiveValue(this.element, "style", "font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position: absolute; width:100%; height: 100%; padding:0; margin: 0;" );
        

        this.setPrimitiveValue(this.element, ",", "" );
        

        this.setPrimitiveValue(this.element, "columns", "250,5,*,5,250" );
        

                this.viewModel =  this.resolve(InspectorViewModel, 'owner') ;
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

            const e2 = new DomTree(this.app);
            
            
            
            this.append(e2);


        const e3 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e3);

            const e4 = new AtomGridSplitter(this.app);
            
            
            
        e4.setPrimitiveValue(e4.element, "column", "1" );
        
            this.append(e4);


        const e5 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e5);

        const e6 = document.createElement("iframe");
        
        this.frame = e6;
        this.append(e6);
        
        this.setPrimitiveValue(e6, "column", "2" );
        

            this.bind(e6, "src",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e6, "style", "border: none; padding:5px; width:100%; height:100%;" );
        
        

        const e7 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e7);

            const e8 = new AtomGridSplitter(this.app);
            
            
            
        e8.setPrimitiveValue(e8.element, "column", "3" );
        
            this.append(e8);


        const e9 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e9);

            const e10 = new PropertyBrowser(this.app);
            
            
            
        e10.setPrimitiveValue(e10.element, "column", "4" );
        
            this.append(e10);


        const e11 = document.createTextNode("\r\n    \r\n");
        
        this.element.appendChild(e11);
                }
            }

            

            