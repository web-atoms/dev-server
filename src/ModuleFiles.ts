// tslint:disable
			declare var UMD: any;
			UMD = UMD || { resolvePath: (v) => v };
			export const ModuleFiles =
				{
  "src": {
    "web": {
      "images": {
        "downArrow_png": UMD.resolvePath("web-atoms-dev-server/src/web/images/down-arrow.png"),
        "rightArrow_png": UMD.resolvePath("web-atoms-dev-server/src/web/images/right-arrow.png")
      }
    }
  },
  "views": {
    "inspector": {
      "DomTree": "web-atoms-dev-server/dist/{platform}/views/inspector/DomTree",
      "Inspector": "web-atoms-dev-server/dist/{platform}/views/inspector/Inspector",
      "PropertyBrowser": "web-atoms-dev-server/dist/{platform}/views/inspector/PropertyBrowser"
    },
    "Start": "web-atoms-dev-server/dist/{platform}/views/Start",
    "AppHost": "web-atoms-dev-server/dist/{platform}/views/AppHost"
  }
}
