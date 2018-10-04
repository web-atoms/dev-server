// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomListBox} from "web-atoms-core/dist/web/controls/AtomListBox";
import {AtomFrame} from "web-atoms-core/dist/web/controls/AtomFrame";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";

    import { AppHostViewModel } from "../../view-models/AppHostViewModel";

export default  class AppHost extends AtomGridView {

                

                public create(): void {
                    super.create();

                    const __creator = this;

                    

                    
                    
                    
                this.viewModel =  this.resolve(AppHostViewModel) ;

        this.setPrimitiveValue(this.element, "columns", "200, *" );
        

        this.setPrimitiveValue(this.element, "rows", "*" );
        
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

            const e2 = new AtomListBox(this.app);
            
            
        const e3 = document.createTextNode("\r\n        ");
        
        e2.element.appendChild(e3);

        const e4 = document.createElement("div");
        
        e2.append(e4);
        
            e2.runAfterInit( () =>
            e2.setLocalValue(e4, "text", `${(this.data.dir)}/${(this.data.name)}`) );
        

        const e5 = document.createTextNode("\r\n    ");
        
        e2.element.appendChild(e5);
            
            e2.bind(e2.element, "items",  [["viewModel","files"]], false , (v1) => (v1) );

            e2.bind(e2.element, "selectedItem",  [["viewModel","file"]], true  );
            this.append(e2);


        const e6 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e6);

            const e7 = new AtomFrame(this.app);
            
            
            
        e7.setPrimitiveValue(e7.element, "column", "1" );
        

            e7.bind(e7.element, "url",  [["viewModel","url"]], false , (v1) => (v1) );
            this.append(e7);


        const e8 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e8);
                }
            }

            

            