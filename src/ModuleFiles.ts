// tslint:disable
			declare var UMD: any;
			UMD = UMD || { resolvePath: (v) => v };
			export const ModuleFiles =
				{
  "src": {
    "web": {
      "images": {
        "downArrow_svg": UMD.resolvePath("web-atoms-dev-server/src/web/images/down-arrow.svg"),
        "rightArrow_svg": UMD.resolvePath("web-atoms-dev-server/src/web/images/right-arrow.svg"),
        "downArrow_png": UMD.resolvePath("web-atoms-dev-server/src/web/images/down-arrow.png"),
        "rightArrow_png": UMD.resolvePath("web-atoms-dev-server/src/web/images/right-arrow.png")
      }
    }
  },
  "views": {
    "AppHost": "web-atoms-dev-server/dist/{platform}/views/AppHost",
    "Start": "web-atoms-dev-server/dist/{platform}/views/Start",
    "Inspector": "web-atoms-dev-server/dist/{platform}/views/Inspector",
    "inspector": {
      "Inspector": "web-atoms-dev-server/dist/{platform}/views/inspector/Inspector",
      "PropertyBrowser": "web-atoms-dev-server/dist/{platform}/views/inspector/PropertyBrowser",
      "DomTree": "web-atoms-dev-server/dist/{platform}/views/inspector/DomTree"
    }
  }
}
