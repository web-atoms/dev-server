// tslint:disable
import {BindableProperty} from "web-atoms-core/dist/core/BindableProperty";
import {AtomItemsControl} from "web-atoms-core/dist/web/controls/AtomItemsControl";
import {AtomControl} from "web-atoms-core/dist/web/controls/AtomControl";

    import DomTreeViewModel from "../../../view-models/inspector/DomTreeViewModel";
    import DomTreeStyle from "../../styles/DomTreeStyle";
    import RightArrowDataUrl from "../../images/RightArrowDataUrl";
    import DownArrowDataUrl from "../../images/DownArrowDataUrl";

export default  class DomTree extends AtomItemsControl {

                

                public create(): void {
                    super.create();

                    const __creator = this;

                    

                    
                    
                    
            this.defaultControlStyle =  DomTreeStyle ;
            

                this.viewModel =  this.resolve(DomTreeViewModel) ;

                this.setPrimitiveValue(this.element, "styleClass",  this.controlStyle.root );

            this.bind(this.element, "items",  [["viewModel","body","children"]], false , (v1) => (v1) );

        this.itemTemplate = DomTree_itemTemplate_1_2Creator(this);
            
                    
        const e1 = document.createTextNode("\r\n\r\n    ");
        
        this.element.appendChild(e1);

        const e2 = document.createTextNode("\r\n\r\n");
        
        this.element.appendChild(e2);
                }
            }

            function DomTree_itemTemplate_1_2Creator(__creator){
                return  class DomTree_itemTemplate_1_2 extends AtomControl {

                

                public create(): void {
                    super.create();

                     ;

                    

                    this.element = document.createElement("div");
                    
                    
            this.bind(this.element, "class",  [["data","className"]], false , (v1) => (v1) );
                    
        const e1 = document.createTextNode("\r\n        ");
        
        this.element.appendChild(e1);

        const e2 = document.createElement("img");
        
        this.append(e2);
        
            this.bind(e2, "src",  [["data","expanded"]], false , (v1) => (v1) ? DownArrowDataUrl : RightArrowDataUrl );

            this.runAfterInit( () =>
            this.setLocalValue(e2, "eventClick", () => (this.viewModel).toggleChildren((this.data))) );
        

        const e3 = document.createTextNode("\r\n        ");
        
        this.element.appendChild(e3);

        const e4 = document.createElement("span");
        
        this.append(e4);
        
            this.runAfterInit( () =>
            this.setLocalValue(e4, "eventClick", () => (this.viewModel).selectNode((this.data))) );

            this.bind(e4, "class",  [["viewModel","node"],["data"]], false , (v1,v2) => (v1) == (v2) ? 'selected' : 'unselected' );

            this.runAfterInit( () =>
            this.setLocalValue(e4, "text", ((this.data) ? this.data.label : undefined)) );
        

        const e5 = document.createTextNode("\r\n        ");
        
        this.element.appendChild(e5);

            const e6 = new AtomItemsControl(this.app);
            
            
            
            e6.bind(e6.element, "items",  [["data","expanded"],["data","children"]], false , (v1,v2) => (v1) ? (v2) : [] );

                e6.setPrimitiveValue(e6.element, "styleClass",  __creator.controlStyle.root );

            e6.bind(e6.element, "styleDisplay",  [["data","expanded"]], false , (v1) => (v1) ? '' : 'none' );

                e6.setPrimitiveValue(e6.element, "itemTemplate",  __creator.itemTemplate );
            this.append(e6);


        const e7 = document.createTextNode("\r\n    ");
        
        this.element.appendChild(e7);
                }
            }

            

            
            }

            