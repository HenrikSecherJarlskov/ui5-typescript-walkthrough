//@ui5-bundle ui5/walkthrough/Component-preload.js
sap.ui.require.preload({
	"ui5/walkthrough/Component.js":function(){
"use strict";sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel"],function(t,e){"use strict";const n=t.extend("ui5.walkthrough.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],manifest:"json"},init:function n(){t.prototype.init.call(this);const i={recipient:{name:"World"}};const o=new e(i);this.setModel(o);this.getRouter().initialize()}});return n});
},
	"ui5/walkthrough/controller/App.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";const e=t.extend("ui5.walkthrough.controller.App",{});return e});
},
	"ui5/walkthrough/controller/Detail.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";const e=t.extend("ui5.walkthrough.controller.Detail",{onInit:function t(){const e=this.getOwnerComponent().getRouter();e.getRoute("detail").attachPatternMatched(this.onObjectMatched,this)},onObjectMatched:function t(e){this.getView().bindElement({path:"/"+window.decodeURIComponent(e.getParameter("arguments").invoicePath),model:"invoice"})}});return e});
},
	"ui5/walkthrough/controller/HelloPanel.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],function(e,o){"use strict";const t=e.extend("ui5.walkthrough.controller.HelloPanel",{onShowHello:function e(){const t=this.getView()?.getModel()?.getProperty("/recipient/name");const n=this.getView()?.getModel("i18n")?.getResourceBundle();const i=n.getText("helloMsg",[t])||"no text defined";o.show(i)},onOpenDialog:async function e(){this.dialog??=await this.loadFragment({name:"ui5.walkthrough.view.HelloDialog"});this.dialog.open()},onCloseDialog:function e(){this.byId("helloDialog")?.close()}});return t});
},
	"ui5/walkthrough/controller/InvoiceList.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(t,e,n,o,i){"use strict";function r(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const s=r(n);const c=t.extend("ui5.walkthrough.controller.App",{constructor:function e(){t.prototype.constructor.apply(this,arguments);this.formatter=s},onInit:function t(){const n=new e({currency:"EUR"});this.getView()?.setModel(n,"view")},onFilterInvoices:function t(e){const n=[];const r=e.getParameter("query");if(r){n.push(new o("ProductName",i.Contains,r))}const s=this.byId("invoiceList");const c=s?.getBinding("items");c?.filter(n)},onPress:function t(e){const n=e.getSource();const o=this.getOwnerComponent().getRouter();o.navTo("detail",{invoicePath:window.encodeURIComponent(n.getBindingContext("invoice").getPath().substr(1))})}});return c});
},
	"ui5/walkthrough/i18n/i18n.properties":'# App Descriptor\nappTitle=Hello World\nappDescription=A simple walkthrough app that explains the most important concepts of UI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=UI5 TypeScript Walkthrough\nhelloPanelTitle=Hello World\nopenDialogButtonText=Say Hello With Dialog\ndialogCloseButtonText=Ok\n\n# Invoice List\ninvoiceListTitle=Invoices\ninvoiceStatusA=New\ninvoiceStatusB=In Progress\ninvoiceStatusC=Done\n\n# Detail Page\ndetailPageTitle=UI5 TypeScript Walkthrough - Details',
	"ui5/walkthrough/localService/mockserver.js":function(){
"use strict";sap.ui.define(["sap/ui/core/util/MockServer","sap/base/util/UriParameters"],function(t,e){"use strict";var r={init:function(){const r=new t({rootUri:sap.ui.require.toUrl("ui5/walkthrough/V2/Northwind/Northwind.svc/")});const i=new e(window.location.href);t.config({autoRespond:true,autoRespondAfter:parseInt(i.get("serverDelay")||"500")});const o=sap.ui.require.toUrl("ui5/walkthrough/localService");r.simulate(o+"/metadata.xml",o+"/mockdata");r.start()}};return r});
},
	"ui5/walkthrough/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"ui5.walkthrough","type":"application","i18n":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"invoiceRemote":{"uri":"V2/Northwind/Northwind.svc/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.120","libs":{"sap.ui.core":{},"sap.m":{}}},"rootView":{"viewName":"ui5.walkthrough.view.App","type":"XML","id":"app"},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}},"invoice":{"dataSource":"invoiceRemote"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","type":"View","viewType":"XML","path":"ui5.walkthrough.view","controlId":"app","controlAggregation":"pages"},"routes":[{"pattern":"","name":"overview","target":"overview"},{"pattern":"detail/{invoicePath}","name":"detail","target":"detail"}],"targets":{"overview":{"id":"overview","name":"Overview"},"detail":{"id":"detail","name":"Detail"}}}}}',
	"ui5/walkthrough/model/formatter.js":function(){
"use strict";sap.ui.define([],function(){"use strict";var t={statusText:function(t){const e=this?.getOwnerComponent()?.getModel("i18n")?.getResourceBundle();switch(t){case"A":return e.getText("invoiceStatusA");case"B":return e.getText("invoiceStatusB");case"C":return e.getText("invoiceStatusC");default:return t}}};return t});
},
	"ui5/walkthrough/view/App.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"><Shell><App \n\t\t\tclass="myAppDemoWT" \n\t\t\tid="app"/></Shell></mvc:View>',
	"ui5/walkthrough/view/Detail.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.Detail"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Page\n\t\ttitle="{i18n>detailPageTitle}"><ObjectHeader\n\t\t\tintro="{invoice>ShipperName}"\n\t\t\ttitle="{invoice>ProductName}"/></Page></mvc:View>',
	"ui5/walkthrough/view/HelloDialog.fragment.xml":'<core:FragmentDefinition\n   xmlns="sap.m"\n   xmlns:core="sap.ui.core" ><Dialog\n      id="helloDialog"\n      title="Hello {/recipient/name}"><content><core:Icon\n            src="sap-icon://hello-world"\n            size="8rem"\n            class="sapUiMediumMargin"/></content><beginButton><Button\n            text="{i18n>dialogCloseButtonText}"\n            press=".onCloseDialog"/></beginButton></Dialog></core:FragmentDefinition>',
	"ui5/walkthrough/view/HelloPanel.view.xml":'<mvc:View\n   controllerName="ui5.walkthrough.controller.HelloPanel"\n   xmlns="sap.m"\n   xmlns:mvc="sap.ui.core.mvc"><Panel\n      headerText="{i18n>helloPanelTitle}"\n      class="sapUiResponsiveMargin"\n      width="auto" ><content><Button\n            id="helloDialogButton"\n            icon="sap-icon://world"\n            text="{i18n>openDialogButtonText}"\n            press=".onOpenDialog"\n            class="sapUiSmallMarginEnd"/><Button\n            text="{i18n>showHelloButtonText}"\n            press=".onShowHello"\n            class="myCustomButton"/><Input\n            value="{/recipient/name}"\n            valueLiveUpdate="true"\n            width="60%"/><FormattedText\n            htmlText="Hello {/recipient/name}"\n            class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/></content></Panel></mvc:View>',
	"ui5/walkthrough/view/InvoiceList.view.xml":'<mvc:View\n   controllerName="ui5.walkthrough.controller.InvoiceList"\n   xmlns="sap.m"\n   xmlns:mvc="sap.ui.core.mvc"><List\n      id="invoiceList"\n      class="sapUiResponsiveMargin"\n      width="auto"\n      items="{\n         path: \'invoice>/Invoices\',\n         sorter: {\n\t\t\t\tpath: \'ShipperName\',\n\t\t\t\tgroup: true\n\t\t\t}\n      }" ><headerToolbar><Toolbar><Title text="{i18n>invoiceListTitle}"/><ToolbarSpacer/><SearchField width="50%" search=".onFilterInvoices"/></Toolbar></headerToolbar><items><ObjectListItem\n            title="{invoice>Quantity} x {invoice>ProductName}"\n            number="{\n               parts: [\n                  \'invoice>ExtendedPrice\',\n                  \'view>/currency\'\n               ],\n               type: \'sap.ui.model.type.Currency\',\n               formatOptions: {\n                  showMeasure: false\n               }\n            }"\n            numberUnit="{view>/currency}"\n            numberState="{= ${invoice>ExtendedPrice} > 50 ? \'Error\' : \'Success\' }"\n            type="Navigation"\n\t\t\t\tpress=".onPress"><firstStatus><ObjectStatus text="{\n\t\t\t\t\t\tpath: \'invoice>Status\',\n\t\t\t\t\t\tformatter: \'.formatter.statusText\'\n\t\t\t\t\t}"/></firstStatus></ObjectListItem></items></List></mvc:View>',
	"ui5/walkthrough/view/Overview.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"><Page title="{i18n>homePageTitle}"><content><mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel"/><mvc:XMLView viewName="ui5.walkthrough.view.InvoiceList"/></content></Page></mvc:View>'
});
//# sourceMappingURL=Component-preload.js.map
