// import Bind from "@web-atoms/core/dist/core/Bind";
// import XNode from "@web-atoms/core/dist/core/XNode";
// import XF from "@web-atoms/xf-controls/dist/clr/XF";
// import AtomXFContentPage from "@web-atoms/xf-controls/dist/pages/AtomXFContentPage";
// import AtomXFToggleButtonBar from "@web-atoms/xf-controls/dist/toggle-button-bar/AtomXFToggleButtonBar";
// import AppHostViewModel from "../view-models/AppHostViewModel";

// export default class Index extends AtomXFContentPage {

//     public viewModel: AppHostViewModel;

//     public create() {

//         this.viewModel = this.resolve(AppHostViewModel);

//         this.render(<XF.ContentPage
//                 title="Search View">
//             <XF.Grid>
//                 <XF.Grid.rowDefinitions>
//                     <XF.RowDefinition height="auto"/>
//                     <XF.RowDefinition/>
//                 </XF.Grid.rowDefinitions>
//                 <XF.Grid.columnDefinitions>
//                     <XF.ColumnDefinition/>
//                     <XF.ColumnDefinition width="auto"/>
//                 </XF.Grid.columnDefinitions>
//                 <XF.SearchBar
//                     text={Bind.twoWays(() => this.viewModel.search)}
//                     />
//                 <AtomXFToggleButtonBar
//                     { ... XF.Grid.column(1) }
//                     items={() => this.viewModel.fileTypes}
//                     value={Bind.twoWays(() => this.viewModel.type)}
//                     />
//                 <XF.ListView
//                     { ... XF.Grid.row(1)}
//                     { ... XF.Grid.columnSpan(2)}
//                     cachingStrategy="RecycleElement"
//                     hasUnevenRows={true}
//                     rowHeight={70}
//                     itemsSource={Bind.oneWay(() => this.viewModel.files)}>
//                     <XF.ListView.itemTemplate>
//                         <XF.DataTemplate>
//                             <XF.ViewCell>
//                             <XF.StackLayout padding={10}>
//                                 <XF.StackLayout.gestureRecognizers>
//                                     <XF.TapGestureRecognizer
//                                         command={Bind.event((x) => this.viewModel.openUrl(x.data))}/>
//                                 </XF.StackLayout.gestureRecognizers>
//                             <XF.Label
//                                 text={Bind.oneWay((x) => x.data.name)}
//                                 fontSize={14}
//                                 textColor="#2e2e2e"
//                                 />
//                             <XF.Label Text={Bind.oneWay((x) => x.data.dir)}
//                                     fontSize={14}
//                                     textColor="#0000EE"/>
//                             </XF.StackLayout>
//                         </XF.ViewCell>
//                     </XF.DataTemplate>
//                 </XF.ListView.itemTemplate>
//             </XF.ListView>
//             </XF.Grid>
//         </XF.ContentPage>);
//     }
// }
