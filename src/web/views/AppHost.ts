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

        const e6 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e6);

        const e7 = document.createElement("a");
        
        e2.appendChild(e7);
        
            this.bind(e7, "href",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e7, "target", "_tab" );
        
        
        const e8 = document.createTextNode("Open in New Tab");
        
        e7.appendChild(e8);

        const e9 = document.createTextNode("\r\n    ");
        
        e2.appendChild(e9);

        const e10 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e10);

        const e11 = document.createElement("div");
        
        this.append(e11);
        
        this.setPrimitiveValue(e11, "style", "overflow: auto" );
        

        this.setPrimitiveValue(e11, "row", "1" );
        
        
        const e12 = document.createTextNode("\r\n        ");
        
        e11.appendChild(e12);

            const e13 = new AtomListBox(this.app);
            
            
        const e14 = document.createTextNode("\r\n            ");
        
        e13.element.appendChild(e14);

        const e15 = document.createTextNode("\r\n        ");
        
        e13.element.appendChild(e15);
            
            e13.bind(e13.element, "items",  [["viewModel","files"]], false , (v1) => (v1) );

        e13.setPrimitiveValue(e13.element, "valuePath", "url" );
        

            e13.bind(e13.element, "value",  [["viewModel","url"]], true  );

        e13.itemTemplate = AppHost_itemTemplate_1_53Creator(this);
            
            e11.appendChild(e13.element);


        const e16 = document.createTextNode("\r\n    ");
        
        e11.appendChild(e16);

        const e17 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e17);

        const e18 = document.createElement("iframe");
        
        this.append(e18);
        
        this.setPrimitiveValue(e18, "row", "1" );
        

        this.setPrimitiveValue(e18, "column", "1" );
        

            this.bind(e18, "src",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e18, "style", "border: none; padding:5px; width:100%; height:100%;" );
        
        

        const e19 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e19);
                }
            }

            function AppHost_itemTemplate_1_53Creator(__creator){
                return  class AppHost_itemTemplate_1_53 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
                    
        const e1 = document.createTextNode("\r\n                ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("div");
        
        this.append(e2);
        
            this.runAfterInit( () =>
            this.setLocalValue(e2, "text", (this.data.name)) );

            this.runAfterInit( () =>
            this.setLocalValue(e2, "title", (this.data.dir)) );
        

        const e3 = document.createTextNode("\r\n                ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("div");
        
        this.append(e4);
        
        this.setPrimitiveValue(e4, "style", "font-size: small" );
        

            this.runAfterInit( () =>
            this.setLocalValue(e4, "text", (this.data.dir)) );
        

        const e5 = document.createTextNode("\r\n            ");
        
        this.element.appendChild(e5);
                }
            }

            

            
            }

            