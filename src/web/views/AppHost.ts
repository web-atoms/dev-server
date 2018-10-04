// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomListBox} from "web-atoms-core/dist/web/controls/AtomListBox";
import {AtomFrame} from "web-atoms-core/dist/web/controls/AtomFrame";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";
import {AtomComboBox} from "web-atoms-core/dist/web/controls/AtomComboBox";
import {AtomGridSplitter} from "web-atoms-core/dist/web/controls/AtomGridSplitter";

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
        

        this.setPrimitiveValue(this.element, "rows", "50, *" );
        
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("header");
        
        this.append(e2);
        
        this.setPrimitiveValue(e2, "row", "0:2" );
        

        this.setPrimitiveValue(e2, "style", "padding:5px" );
        
        
        const e3 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e3);

        const e4 = document.createElement("button");
        
        e2.appendChild(e4);
        
            this.runAfterInit( () =>
            this.setLocalValue(e4, "eventClick", () => (this.viewModel).refreshUrl()) );
        
        const e5 = document.createTextNode("Refresh");
        
        e4.appendChild(e5);

        const e6 = document.createTextNode("\r\n    ");
        
        e2.appendChild(e6);

        const e7 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e7);

            const e8 = new AtomListBox(this.app);
            
            
        const e9 = document.createTextNode("\r\n        ");
        
        e8.element.appendChild(e9);

        const e10 = document.createTextNode("\r\n    ");
        
        e8.element.appendChild(e10);
            
        e8.setPrimitiveValue(e8.element, "row", "1" );
        

            e8.bind(e8.element, "items",  [["viewModel","files"]], false , (v1) => (v1) );

        e8.setPrimitiveValue(e8.element, "valuePath", "url" );
        

            e8.bind(e8.element, "value",  [["viewModel","url"]], true  );

        e8.itemTemplate = AppHost_itemTemplate_1_43Creator(this);
            
            this.append(e8);


        const e11 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e11);

        const e12 = document.createElement("iframe");
        
        this.append(e12);
        
        this.setPrimitiveValue(e12, "row", "1" );
        

        this.setPrimitiveValue(e12, "column", "1" );
        

            this.bind(e12, "src",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e12, "style", "border: none; padding:5px; width:100%; height:100%;" );
        
        

        const e13 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e13);
                }
            }

            function AppHost_itemTemplate_1_43Creator(__creator){
                return  class AppHost_itemTemplate_1_43 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
                    
        const e1 = document.createTextNode("\r\n            ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("div");
        
        this.append(e2);
        
            this.runAfterInit( () =>
            this.setLocalValue(e2, "text", (this.data.name)) );

            this.runAfterInit( () =>
            this.setLocalValue(e2, "title", (this.data.dir)) );
        

        const e3 = document.createTextNode("\r\n            ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("div");
        
        this.append(e4);
        
        this.setPrimitiveValue(e4, "style", "font-size: small" );
        

            this.runAfterInit( () =>
            this.setLocalValue(e4, "text", (this.data.dir)) );
        

        const e5 = document.createTextNode("\r\n        ");
        
        this.element.appendChild(e5);
                }
            }

            

            
            }

            