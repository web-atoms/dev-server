	// tslint:disable
	import { AtomXFControl } from "@web-atoms/core/dist/xf/controls/AtomXFControl";
	import { AtomBridge } from "@web-atoms/core/dist/core/AtomBridge";
	import AppHostViewModel from "../../view-models/AppHostViewModel";
	declare var UMD: any;
	const __moduleName = this.filename;
	export default class Root extends AtomXFControl {
		public static readonly _$_url = __moduleName ;
		
		constructor(app: any, e?: any) {
			super(app, e || AtomBridge.instance.create("Xamarin.Forms.ContentPage"));
		}
		protected create(): void  {
			
			super.create();
			
			this.loadXaml(`	<ContentPage xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" xmlns="http://xamarin.com/schemas/2014/forms" Title="Search View" x:Name="e2">
				  
				  <ListView HasUnevenRows="True" RowHeight="70" x:Name="e1">
				    
				    
				  </ListView>
				  
				</ContentPage>`);
			
			const e1 = this.find("e1");
			this.setLocalValue(e1, "ItemTemplate", () => new (Root_e1_Creator(this))(this.app));
			this.bind(e1, "ItemsSource",  [["viewModel","files"]], false , null );
			
			const e2 = this.find("e2");
			this.setLocalValue(e2, "viewModel",  this.resolve(AppHostViewModel) );
		}
	}
	function Root_e1_Creator(__creator: any): any {
		return class Root_e1 extends AtomXFControl {
			
			constructor(app: any, e?: any) {
				super(app, e || AtomBridge.instance.create("Xamarin.Forms.StackLayout"));
			}
			protected create(): void  {
				
				super.create();
				
				this.loadXaml(`	<StackLayout Padding="10" xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" xmlns="http://xamarin.com/schemas/2014/forms" x:Name="e3">
					  
					  <Label FontSize="14" TextColor="#2e2e2e" x:Name="e1"/>
					  
					  <Label FontSize="14" TextColor="#0000EE" x:Name="e2"/>
					  
					</StackLayout>`);
				
				const e1 = this.find("e1");
				this.runAfterInit( () => this.setLocalValue(e1, "Text", ((this.data) ? this.data.name : undefined)) );
				
				const e2 = this.find("e2");
				this.runAfterInit( () => this.setLocalValue(e2, "Text", ((this.data) ? this.data.dir : undefined)) );
				
				const e3 = this.find("e3");
				this.runAfterInit( () => this.setLocalValue(e3, "eventTapGesture",  () => (this.viewModel).openUrl((this.data)) ) );
			}
		}
		;
	}