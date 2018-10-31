// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomListBox} from "web-atoms-core/dist/web/controls/AtomListBox";
import {AtomGridView} from "web-atoms-core/dist/web/controls/AtomGridView";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";

    import AppHostViewModel from "../../view-models/AppHostViewModel";
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
        
        this.setPrimitiveValue(e2, "row", "0" );
        

        this.setPrimitiveValue(e2, "column", "0:2" );
        

        this.setPrimitiveValue(e2, "class", "header" );
        
        
        const e3 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e3);

        const e4 = document.createElement("input");
        
        e2.appendChild(e4);
        
        this.setPrimitiveValue(e4, "type", "search" );
        

            this.bind(e4, "value",  [["viewModel","search"]], ["change", "keyup", "keydown", "blur"]  );

        this.setPrimitiveValue(e4, "placeholder", "Search..." );
        
        

        const e5 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e5);

        const e6 = document.createElement("div");
        
        e2.appendChild(e6);
        
        this.setPrimitiveValue(e6, "class", "topnav-right" );
        
        
        const e7 = document.createTextNode("\r\n            ");
        
        e6.appendChild(e7);

        const e8 = document.createElement("a");
        
        e6.appendChild(e8);
        
            this.bind(e8, "href",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e8, "target", "_tab" );
        
        
        const e9 = document.createTextNode("Open New Tab");
        
        e8.appendChild(e9);

        const e10 = document.createTextNode("\r\n            ");
        
        e6.appendChild(e10);

        const e11 = document.createElement("a");
        
        e6.appendChild(e11);
        
            this.bind(e11, "href",  [["viewModel"],["viewModel","url"]], false , (v1,v2) => (v1).inspect((v2)) );
        
        const e12 = document.createTextNode("Inspect");
        
        e11.appendChild(e12);

        const e13 = document.createTextNode("\r\n            ");
        
        e6.appendChild(e13);

        const e14 = document.createElement("a");
        
        e6.appendChild(e14);
        
            this.runAfterInit( () =>
            this.setLocalValue(e14, "eventClick", () => (this.viewModel).refreshUrl()) );
        
        const e15 = document.createTextNode("Refresh");
        
        e14.appendChild(e15);

        const e16 = document.createTextNode("\r\n        ");
        
        e6.appendChild(e16);

        const e17 = document.createTextNode("\r\n        ");
        
        e2.appendChild(e17);

        const e18 = document.createElement("undefined");
        
        e2.appendChild(e18);
        
        

        const e19 = document.createTextNode("\r\n    ");
        
        e2.appendChild(e19);

        const e20 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e20);

        const e21 = document.createElement("div");
        
        this.append(e21);
        
        this.setPrimitiveValue(e21, "style", "overflow: auto; width: 100%; height: 100%" );
        

        this.setPrimitiveValue(e21, "row", "1" );
        
        
        const e22 = document.createTextNode("\r\n        ");
        
        e21.appendChild(e22);

            const e23 = new AtomListBox(this.app);
            
            
        const e24 = document.createTextNode("\r\n            ");
        
        e23.element.appendChild(e24);

        const e25 = document.createTextNode("\r\n        ");
        
        e23.element.appendChild(e25);
            
            e23.bind(e23.element, "items",  [["viewModel","files"]], false , (v1) => (v1) );

        e23.setPrimitiveValue(e23.element, "valuePath", "url" );
        

            e23.bind(e23.element, "value",  [["viewModel","url"]], true  );

        e23.itemTemplate = AppHost_itemTemplate_1_7Creator(this);
            
            e21.appendChild(e23.element);


        const e26 = document.createTextNode("\r\n    ");
        
        e21.appendChild(e26);

        const e27 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e27);

        const e28 = document.createElement("iframe");
        
        this.append(e28);
        
        this.setPrimitiveValue(e28, "row", "1" );
        

        this.setPrimitiveValue(e28, "column", "1" );
        

            this.bind(e28, "src",  [["viewModel","url"]], false , (v1) => (v1) );

        this.setPrimitiveValue(e28, "style", "border: none; padding:5px; width:100%; height:100%;" );
        
        

        const e29 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e29);
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
            this.setLocalValue(e2, "text", ((this.data) ? this.data.name : undefined)) );

            this.runAfterInit( () =>
            this.setLocalValue(e2, "title", ((this.data) ? this.data.dir : undefined)) );

        this.setPrimitiveValue(e2, "style", "font-weight: 500;" );
        
        

        const e3 = document.createTextNode("\r\n                ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("div");
        
        this.append(e4);
        
        this.setPrimitiveValue(e4, "style", "font-size: small;" );
        

            this.runAfterInit( () =>
            this.setLocalValue(e4, "text", ((this.data) ? this.data.dir : undefined)) );
        
        const e5 = document.createTextNode("\r\n                ");
        
        e4.appendChild(e5);

        const e6 = document.createTextNode("\r\n            ");
        
        this.element.appendChild(e6);
                }
            }

            

            
            }

            