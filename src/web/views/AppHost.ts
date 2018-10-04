// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomListBox} from "web-atoms-core/dist/web/controls/AtomListBox";
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
        

        this.setPrimitiveValue(this.element, "rows", "50, *" );
        
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("header");
        
        this.append(e2);
        
        this.setPrimitiveValue(e2, "row", "0:2" );
        

        this.setPrimitiveValue(e2, "style", "padding:5px" );
        
        
        const e3 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e3);

        const e4 = document.createElement("input");
        
        e2.appendChild(e4);
        
        this.setPrimitiveValue(e4, "type", "search" );
        

            this.bind(e4, "value",  [["viewModel","search"]], ["change", "keyup", "keydown", "blur"]  );

        this.setPrimitiveValue(e4, "placeholder", "Search..." );
        
        

        const e5 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e5);

        const e6 = document.createElement("button");
        
        e2.appendChild(e6);
        
            this.runAfterInit( () =>
            this.setLocalValue(e6, "eventClick", () => (this.viewModel).refreshUrl()) );
        
        const e7 = document.createTextNode("Refresh");
        
        e6.appendChild(e7);

        const e8 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e8);

        const e9 = document.createElement("a");
        
        e2.appendChild(e9);
        
            this.bind(e9, "href",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e9, "target", "_tab" );
        
        
        const e10 = document.createTextNode("Open in New Tab");
        
        e9.appendChild(e10);

        const e11 = document.createTextNode("\r\n    ");
        
        e2.appendChild(e11);

        const e12 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e12);

        const e13 = document.createElement("div");
        
        this.append(e13);
        
        this.setPrimitiveValue(e13, "style", "overflow: auto; width: 100%; height: 100%" );
        

        this.setPrimitiveValue(e13, "row", "1" );
        
        
        const e14 = document.createTextNode("\r\n        ");
        
        e13.appendChild(e14);

            const e15 = new AtomListBox(this.app);
            
            
        const e16 = document.createTextNode("\r\n            ");
        
        e15.element.appendChild(e16);

        const e17 = document.createTextNode("\r\n        ");
        
        e15.element.appendChild(e17);
            
            e15.bind(e15.element, "items",  [["viewModel","files"]], false , (v1) => (v1) );

        e15.setPrimitiveValue(e15.element, "valuePath", "url" );
        

            e15.bind(e15.element, "value",  [["viewModel","url"]], true  );

        e15.itemTemplate = AppHost_itemTemplate_1_7Creator(this);
            
            e13.appendChild(e15.element);


        const e18 = document.createTextNode("\r\n    ");
        
        e13.appendChild(e18);

        const e19 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e19);

        const e20 = document.createElement("iframe");
        
        this.append(e20);
        
        this.setPrimitiveValue(e20, "row", "1" );
        

        this.setPrimitiveValue(e20, "column", "1" );
        

            this.bind(e20, "src",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e20, "style", "border: none; padding:5px; width:100%; height:100%;" );
        
        

        const e21 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e21);
                }
            }

            function AppHost_itemTemplate_1_7Creator(__creator){
                return  class AppHost_itemTemplate_1_7 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
            this.bind(this.element, "styleDisplay",  [["data","visible"]], false , (v1) => (v1) ? '' : 'none' );
                    
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

            