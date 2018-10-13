// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomItemsControl} from "web-atoms-core/dist/web/controls/AtomItemsControl";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";

    import PropertyBrowserViewModel from "../../../view-models/inspector/PropertyBrowserViewModel";

export default  class PropertyBrowser extends AtomItemsControl {

                

                public create(): void {
                    super.create();

                    const __creator = this;

                    

                    
                    
                    
                this.viewModel =  this.resolve(PropertyBrowserViewModel) ;

            this.bind(this.element, "items",  [["viewModel","properties"]], false , (v1) => (v1) );

        this.itemTemplate = PropertyBrowser_itemTemplate_1_31Creator(this);
            
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

        const e2 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e2);
                }
            }

            function PropertyBrowser_itemTemplate_1_31Creator(__creator){
                return  class PropertyBrowser_itemTemplate_1_31 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
                    
        const e1 = document.createTextNode("\r\n        ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("span");
        
        this.append(e2);
        
            this.runAfterInit( () =>
            this.setLocalValue(e2, "text", ((this.data) ? this.data.index : undefined)) );
        

        const e3 = document.createTextNode("\r\n\r\n        ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("span");
        
        this.append(e4);
        
            this.bind(e4, "text",  [["data","isObject"],["data","value"]], false , (v1,v2) => (v1) ? '' : (v2) );
        

        const e5 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e5);
                }
            }

            

            
            }

            