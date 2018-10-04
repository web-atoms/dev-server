// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomListBox} from "web-atoms-core/dist/web/controls/AtomListBox";
import {AtomFrame} from "web-atoms-core/dist/web/controls/AtomFrame";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";

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

        const e4 = document.createTextNode("\r\n    ");
        
        e2.element.appendChild(e4);
            
            e2.bind(e2.element, "items",  [["viewModel","files"]], false , (v1) => (v1) );

            e2.bind(e2.element, "selectedItem",  [["viewModel","file"]], true  );

        e2.itemTemplate = AppHost_itemTemplate_1_2Creator(this);
            
            this.append(e2);


        const e5 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e5);

            const e6 = new AtomFrame(this.app);
            
            
            
        e6.setPrimitiveValue(e6.element, "column", "1" );
        

            e6.bind(e6.element, "url",  [["viewModel","url"]], false , (v1) => (v1) );
            this.append(e6);


        const e7 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e7);
                }
            }

            function AppHost_itemTemplate_1_2Creator(__creator){
                return  class AppHost_itemTemplate_1_2 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
            this.runAfterInit( () =>
            this.setLocalValue(this.element, "text", `${(this.data.dir)}/${(this.data.name)}`) );
                    
                }
            }

            

            
            }

            