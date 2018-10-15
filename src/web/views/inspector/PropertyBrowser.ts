// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomItemsControl} from "web-atoms-core/dist/web/controls/AtomItemsControl";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";

    import PropertyBrowserViewModel from "../../../view-models/inspector/PropertyBrowserViewModel";
    import PropertyBrowserStyle from "../../styles/PropertyBrowserStyle";

export default  class PropertyBrowser extends AtomItemsControl {

                

                public create(): void {
                    super.create();

                    const __creator = this;

                    

                    
                    
                    
            this.defaultControlStyle =  PropertyBrowserStyle ;
            

                this.setPrimitiveValue(this.element, "styleClass",  this.controlStyle.root );

                this.viewModel =  this.resolve(PropertyBrowserViewModel) ;

            this.bind(this.element, "items",  [["viewModel","properties"]], false , (v1) => (v1) );

            this.bind(this.element, "filter",  [["viewModel","filter"]], false , (v1) => (v1) );

        this.itemTemplate = PropertyBrowser_itemTemplate_1_13Creator(this);
            
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("input");
        
        this.append(e2);
        
        this.setPrimitiveValue(e2, "type", "search" );
        

            this.bind(e2, "value",  [["viewModel","search"]], ["change", "keyup", "keydown", "blur"]  );
        

        const e3 = document.createTextNode("\r\n    ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("div");
        
        this.itemsPresenter = e4;
        this.append(e4);
        
        this.setPrimitiveValue(e4, "class", "presenter" );
        
        

        const e5 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e5);

        const e6 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e6);
                }
            }

            function PropertyBrowser_itemTemplate_1_13Creator(__creator){
                return  class PropertyBrowser_itemTemplate_1_13 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
        this.setPrimitiveValue(this.element, "class", "item" );
        
                    
        const e1 = document.createTextNode("\r\n        ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("span");
        
        this.append(e2);
        
        this.setPrimitiveValue(e2, "class", "index" );
        

            this.runAfterInit( () =>
            this.setLocalValue(e2, "text", ((this.data) ? this.data.index : undefined)) );
        

        const e3 = document.createTextNode("\r\n\r\n        ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("span");
        
        this.append(e4);
        
        this.setPrimitiveValue(e4, "class", "closed-value" );
        

            this.bind(e4, "title",  [["data","isObject"],["data","value"]], false , (v1,v2) => (v1) ? 'Click to see more...' : (v2) );

            this.bind(e4, "styleDisplay",  [["data","expanded"]], false , (v1) => (v1) ? 'none' : 'inline-block' );

            this.bind(e4, "styleColor",  [["data","isObject"]], false , (v1) => (v1) ? 'blue' : '' );

            this.bind(e4, "styleCursor",  [["data","isObject"]], false , (v1) => (v1) ? 'pointer': '' );

            this.runAfterInit( () =>
            this.setLocalValue(e4, "eventClick", () => (this.viewModel).toggle((this.data))) );

            this.bind(e4, "text",  [["data","isObject"],["data","value"]], false , (v1,v2) => (v1) ? '(...)' : (v2) );
        

        const e5 = document.createTextNode("\r\n\r\n        ");
        
        this.element.appendChild(e5);

        const e6 = document.createElement("span");
        
        this.append(e6);
        
        this.setPrimitiveValue(e6, "class", "close-button" );
        

            this.runAfterInit( () =>
            this.setLocalValue(e6, "eventClick", () => (this.viewModel).toggle((this.data))) );

            this.bind(e6, "styleDisplay",  [["data","expanded"]], false , (v1) => (v1) ? 'inline-block' : 'none' );

        this.setPrimitiveValue(e6, "text", "( ^ )" );
        
        

        const e7 = document.createTextNode("\r\n\r\n        ");
        
        this.element.appendChild(e7);

            const e8 = new AtomItemsControl(this.app);
            
            
        const e9 = document.createTextNode("\r\n        ");
        
        e8.element.appendChild(e9);
            
        e8.setPrimitiveValue(e8.element, "class", "items" );
        

            e8.bind(e8.element, "items",  [["data","expanded"],["data","isObject"],["data","value"]], false , (v1,v2,v3) => (v1) ? ( (v2) ? (v3) : []) : [] );

            e8.bind(e8.element, "styleDisplay",  [["data","expanded"]], false , (v1) => (v1) ? '' : 'none' );

                e8.setPrimitiveValue(e8.element, "itemTemplate",  __creator.itemTemplate );
            this.append(e8);


        const e10 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e10);
                }
            }

            

            
            }

            