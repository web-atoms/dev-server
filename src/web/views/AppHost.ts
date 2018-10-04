// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomListBox} from "web-atoms-core/dist/web/controls/AtomListBox";
import {AtomFrame} from "web-atoms-core/dist/web/controls/AtomFrame";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";

    import { AppHostViewModel } from "../../view-models/AppHostViewModel";
    import AppHostStyle from "../styles/AppHostStyle";

export default  class AppHost extends AtomGridView {

                

                public create(): void {
                    super.create();

                    const __creator = this;

                    

                    
                    
                    
            this.defaultControlStyle =  AppHostStyle ;
            

                this.setPrimitiveValue(this.element, "styleClass",  this.controlStyle.root );

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

        e2.setPrimitiveValue(e2.element, "valuePath", "url" );
        

            e2.bind(e2.element, "value",  [["viewModel","url"]], true  );

        e2.itemTemplate = AppHost_itemTemplate_1_12Creator(this);
            
            this.append(e2);


        const e5 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e5);

        const e6 = document.createElement("iframe");
        
        this.append(e6);
        
        this.setPrimitiveValue(e6, "column", "1" );
        

            this.bind(e6, "src",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e6, "style", "border: none; padding:5px; width:100%; height:100%;" );
        
        

        const e7 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e7);
                }
            }

            function AppHost_itemTemplate_1_12Creator(__creator){
                return  class AppHost_itemTemplate_1_12 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
            this.runAfterInit( () =>
            this.setLocalValue(this.element, "text", `${(this.data.dir)}/${(this.data.name)}`) );
                    
                }
            }

            

            
            }

            