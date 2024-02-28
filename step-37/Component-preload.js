//@ui5-bundle ui5/walkthrough/Component-preload.js
sap.ui.require.preload({
	"ui5/walkthrough/Component.js":function(){
"use strict";sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/ui/Device"],function(t,e,n){"use strict";const i=t.extend("ui5.walkthrough.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],manifest:"json"},init:function i(){t.prototype.init.call(this);const o={recipient:{name:"World"}};const s=new e(o);this.setModel(s);const a=new e(n);a.setDefaultBindingMode("OneWay");this.setModel(a,"device");this.getRouter().initialize()},getContentDensityClass:function t(){return n.support.touch?"sapUiSizeCozy":"sapUiSizeCompact"}});return i});
},
	"ui5/walkthrough/control/ProductRating.js":function(){
"use strict";sap.ui.define(["sap/ui/core/Control","sap/m/Label","sap/m/Button","sap/m/RatingIndicator"],function(t,e,i,n){"use strict";const a=t.extend("ui5.walkthrough.control.ProductRating",{renderer:{apiVersion:4,render:(t,e)=>{const i=e.getTooltip_AsString();t.openStart("div",e);t.class("myAppDemoWTProductRating");if(i){t.attr("title",i)}t.openEnd();t.renderControl(e.getAggregation("_rating"));t.renderControl(e.getAggregation("_label"));t.renderControl(e.getAggregation("_button"));t.close("div")}},metadata:{properties:{value:{type:"float",defaultValue:0}},aggregations:{_rating:{type:"sap.m.RatingIndicator",multiple:false,visibility:"hidden"},_label:{type:"sap.m.Label",multiple:false,visibility:"hidden"},_button:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{change:{parameters:{value:"float"}}}},constructor:function e(i,n){t.prototype.constructor.call(this,i,n)},init:function t(){this.setAggregation("_rating",new n({value:this.getValue(),iconSize:"2rem",liveChange:this._onRate.bind(this)}));this.setAggregation("_label",new e({text:"{i18n>productRatingLabelInitial}"}).addStyleClass("sapUiSmallMargin"));this.setAggregation("_button",new i({text:"{i18n>productRatingButton}",press:this._onSubmit.bind(this)}).addStyleClass("sapUiTinyMarginTopBottom"))},setValue:function t(e){this.setProperty("value",e,true);this.getAggregation("_rating").setValue(e);return this},reset:function t(){const e=this?.getModel("i18n")?.getResourceBundle();this.setValue(0);this.getAggregation("_label").setDesign("Standard");this.getAggregation("_rating").setEnabled(true);this.getAggregation("_label").setText(e.getText("productRatingLabelInitial"));this.getAggregation("_button").setEnabled(true)},_onRate:function t(e){const i=this?.getModel("i18n")?.getResourceBundle();const n=e.getParameter("value");this.setProperty("value",n,true);this.getAggregation("_label").setText(i.getText("productRatingLabelIndicator",[n,e.getSource().getMaxValue()]));this.getAggregation("_label").setDesign("Bold")},_onSubmit:function t(e){const i=this?.getModel("i18n")?.getResourceBundle();this.getAggregation("_rating").setEnabled(false);this.getAggregation("_label").setText(i.getText("productRatingLabelFinal"));this.getAggregation("_button").setEnabled(false);this.fireEvent("change",{value:this.getValue()})}});return a});
},
	"ui5/walkthrough/controller/App.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";const e=t.extend("ui5.walkthrough.controller.App",{onInit:function t(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}});return e});
},
	"ui5/walkthrough/controller/Detail.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/m/MessageToast","sap/ui/model/json/JSONModel"],function(e,t,n,o){"use strict";const i=e.extend("ui5.walkthrough.controller.Detail",{onInit:function e(){const t=new o({currency:"EUR"});this.getView().setModel(t,"view");const n=this.getOwnerComponent().getRouter();n.getRoute("detail").attachPatternMatched(this.onObjectMatched,this)},onObjectMatched:function e(t){this.byId("rating").reset();this.getView().bindElement({path:"/"+window.decodeURIComponent(t.getParameter("arguments").invoicePath),model:"invoice"})},onNavBack:function e(){const n=t.getInstance();const o=n.getPreviousHash();if(o!==undefined){window.history.go(-1)}else{const e=this.getOwnerComponent().getRouter();e.navTo("overview",{},true)}},onRatingChange:function e(t){const o=t.getParameter("value");const i=this?.getView().getModel("i18n")?.getResourceBundle();n.show(i.getText("ratingConfirmation",[o]))}});return i});
},
	"ui5/walkthrough/controller/HelloPanel.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],function(e,o){"use strict";const t=e.extend("ui5.walkthrough.controller.HelloPanel",{onShowHello:function e(){const t=this.getView()?.getModel()?.getProperty("/recipient/name");const n=this.getView()?.getModel("i18n")?.getResourceBundle();const i=n.getText("helloMsg",[t])||"no text defined";o.show(i)},onOpenDialog:async function e(){this.dialog??=await this.loadFragment({name:"ui5.walkthrough.view.HelloDialog"});this.dialog.open()},onCloseDialog:function e(){this.byId("helloDialog")?.close()}});return t});
},
	"ui5/walkthrough/controller/InvoiceList.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(t,e,n,o,i){"use strict";function r(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const s=r(n);const c=t.extend("ui5.walkthrough.controller.App",{constructor:function e(){t.prototype.constructor.apply(this,arguments);this.formatter=s},onInit:function t(){const n=new e({currency:"EUR"});this.getView()?.setModel(n,"view")},onFilterInvoices:function t(e){const n=[];const r=e.getParameter("query");if(r){n.push(new o("ProductName",i.Contains,r))}const s=this.byId("invoiceList");const c=s?.getBinding("items");c?.filter(n)},onPress:function t(e){const n=e.getSource();const o=this.getOwnerComponent().getRouter();o.navTo("detail",{invoicePath:window.encodeURIComponent(n.getBindingContext("invoice").getPath().substr(1))})}});return c});
},
	"ui5/walkthrough/i18n/i18n.properties":'# App Descriptor\nappTitle=Hello World\nappDescription=A simple walkthrough app that explains the most important concepts of UI5\n\n#Overview Page\nOverview_rootLabel=Overview Page\nOverview_headerLabel=Header\nOverview_contentLabel=Page Content\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=UI5 TypeScript Walkthrough\nhelloPanelTitle=Hello World\nopenDialogButtonText=Say Hello With Dialog\ndialogCloseButtonText=Ok\n\n# Invoice List\ninvoiceListTitle=Invoices\ninvoiceStatusA=New\ninvoiceStatusB=In Progress\ninvoiceStatusC=Done\ncolumnQuantity=Quantity\ncolumnName=Name\ncolumnSupplier=Supplier\ncolumnStatus=Status\ncolumnPrice=Price\n\n# Detail Page\ndetailPageTitle=UI5 TypeScript Walkthrough - Details\nratingConfirmation=You have rated this product with {0} stars\ndateTitle=Shipped date\nquantityTitle=Quantity\n\n# Product Rating\nproductRatingLabelInitial=Please rate this product\nproductRatingLabelIndicator=Your rating: {0} out of {1}\nproductRatingLabelFinal=Thank you for your rating!\nproductRatingButton=Rate',
	"ui5/walkthrough/localService/mockserver.js":function(){
"use strict";sap.ui.define(["sap/ui/core/util/MockServer","sap/base/util/UriParameters"],function(t,e){"use strict";var r={init:function(){const r=new t({rootUri:sap.ui.require.toUrl("ui5/walkthrough/V2/Northwind/Northwind.svc/")});const i=new e(window.location.href);t.config({autoRespond:true,autoRespondAfter:parseInt(i.get("serverDelay")||"500")});const o=sap.ui.require.toUrl("ui5/walkthrough/localService");r.simulate(o+"/metadata.xml",o+"/mockdata");r.start()}};return r});
},
	"ui5/walkthrough/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"ui5.walkthrough","type":"application","i18n":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"invoiceRemote":{"uri":"V2/Northwind/Northwind.svc/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"contentDensities":{"compact":true,"cozy":true},"dependencies":{"minUI5Version":"1.120","libs":{"sap.ui.core":{},"sap.m":{}}},"rootView":{"viewName":"ui5.walkthrough.view.App","type":"XML","id":"app"},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}},"invoice":{"dataSource":"invoiceRemote"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","type":"View","viewType":"XML","path":"ui5.walkthrough.view","controlId":"app","controlAggregation":"pages"},"routes":[{"pattern":"","name":"overview","target":"overview"},{"pattern":"detail/{invoicePath}","name":"detail","target":"detail"}],"targets":{"overview":{"id":"overview","name":"Overview"},"detail":{"id":"detail","name":"Detail"}}}}}',
	"ui5/walkthrough/model/formatter.js":function(){
"use strict";sap.ui.define([],function(){"use strict";var t={statusText:function(t){const e=this?.getOwnerComponent()?.getModel("i18n")?.getResourceBundle();switch(t){case"A":return e.getText("invoiceStatusA");case"B":return e.getText("invoiceStatusB");case"C":return e.getText("invoiceStatusC");default:return t}}};return t});
},
	"ui5/walkthrough/view/App.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"><Shell><App \n\t\t\tclass="myAppDemoWT" \n\t\t\tid="app"/></Shell></mvc:View>',
	"ui5/walkthrough/view/Detail.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.Detail"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:wt="ui5.walkthrough.control"><Page\t\t\n\t\ttitle="{i18n>detailPageTitle}"\n\t\tshowNavButton="true"\n\t\tnavButtonPress=".onNavBack"><ObjectHeader\n\t\t\tresponsive="true"\n\t\t\tfullScreenOptimized="true"\n            number="{\n                parts: [\n                    \'invoice>ExtendedPrice\',\n                    \'view>/currency\'\n                ],\n                type: \'sap.ui.model.type.Currency\',\n                formatOptions: {\n                    showMeasure: false\n                }\n            }"\n\t\t\tnumberUnit="{view>/currency}"\t\t\n\t\t\tintro="{invoice>ShipperName}"\n\t\t\ttitle="{invoice>ProductName}"><attributes><ObjectAttribute\n                    title="{i18n>quantityTitle}"\n                    text="{invoice>Quantity}"/><ObjectAttribute\n                    title="{i18n>dateTitle}"\n                    text="{\n                        path: \'invoice>ShippedDate\',\n                        type: \'sap.ui.model.type.Date\'\n                    }"/></attributes></ObjectHeader><wt:ProductRating \n\t\t\tid="rating"\n\t\t\ttooltip="{invoice>ProductName}"\n\t\t\tclass="sapUiSmallMarginBeginEnd" \n\t\t\tchange=".onRatingChange"/></Page></mvc:View>',
	"ui5/walkthrough/view/HelloDialog.fragment.xml":'<core:FragmentDefinition\n   xmlns="sap.m"\n   xmlns:core="sap.ui.core" ><Dialog\n      id="helloDialog"\n      title="Hello {/recipient/name}"><content><core:Icon\n            src="sap-icon://hello-world"\n            size="8rem"\n            class="sapUiMediumMargin"/></content><beginButton><Button\n            text="{i18n>dialogCloseButtonText}"\n            press=".onCloseDialog"/></beginButton></Dialog></core:FragmentDefinition>',
	"ui5/walkthrough/view/HelloPanel.view.xml":'<mvc:View\n   controllerName="ui5.walkthrough.controller.HelloPanel"\n   xmlns="sap.m"\n   xmlns:mvc="sap.ui.core.mvc"><Panel\n      headerText="{i18n>helloPanelTitle}"\n      class="sapUiResponsiveMargin"\n      width="auto" \n      expandable="{device>/system/phone}"\n\t\texpanded="{= !${device>/system/phone} }"\n      accessibleRole="Region"><content><Button\n            id="helloDialogButton"\n            icon="sap-icon://world"\n            text="{i18n>openDialogButtonText}"\n            press=".onOpenDialog"\n            class="sapUiSmallMarginEnd sapUiVisibleOnlyOnDesktop"/><Button\n            text="{i18n>showHelloButtonText}"\n            press=".onShowHello"\n            class="myCustomButton"/><Input\n            value="{/recipient/name}"\n            valueLiveUpdate="true"\n            width="60%"/><FormattedText\n            htmlText="Hello {/recipient/name}"\n            class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/></content></Panel></mvc:View>',
	"ui5/walkthrough/view/InvoiceList.view.xml":'<mvc:View\n   controllerName="ui5.walkthrough.controller.InvoiceList"\n   xmlns="sap.m"\n   xmlns:mvc="sap.ui.core.mvc"><Panel accessibleRole="Region"><headerToolbar><Toolbar><Title text="{i18n>invoiceListTitle}"/><ToolbarSpacer/><SearchField\n\t\t\t\t\twidth="50%"\n\t\t\t\t\tsearch=".onFilterInvoices"/></Toolbar></headerToolbar><Table\n\t\t\tid="invoiceList"\n\t\t\tclass="sapUiResponsiveMargin"\n\t\t\twidth="auto"\n\t\t\titems="{\n\t\t\t\tpath: \'invoice>/Invoices\',\n\t\t\t\tsorter: {\n\t\t\t\t\t\tpath: \'ShipperName\',\n\t\t\t\t\t\tgroup: true\n\t\t\t\t\t}\n\t\t\t\t}"><columns><Column\n\t\t\t\t\t\thAlign="End"\n\t\t\t\t\t\tminScreenWidth="Small"\n\t\t\t\t\t\tdemandPopin="true"\n\t\t\t\t\t\twidth="5em"><Text text="{i18n>columnQuantity}"/></Column><Column><Text text="{i18n>columnName}"/></Column><Column\n\t\t\t\t\t\tminScreenWidth="Small"\n\t\t\t\t\t\tdemandPopin="true"><Text text="{i18n>columnStatus}"/></Column><Column\n\t\t\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\t\t\tdemandPopin="false"><Text text="{i18n>columnSupplier}"/></Column><Column hAlign="End"><Text text="{i18n>columnPrice}"/></Column></columns><items><ColumnListItem\n\t\t\t\t\t\ttype="Navigation"\n\t\t\t\t\t\tpress=".onPress"><cells><ObjectNumber \n\t\t\t\t\t\t\t\tnumber="{invoice>Quantity}" \n\t\t\t\t\t\t\t\temphasized="false"/><ObjectIdentifier \n\t\t\t\t\t\t\t\ttitle="{invoice>ProductName}"/><Text \n\t\t\t\t\t\t\t\ttext="{\n\t\t\t\t\t\t\t\t\tpath: \'invoice>Status\',\n\t\t\t\t\t\t\t\t\tformatter: \'.formatter.statusText\'\n\t\t\t\t\t\t\t\t}"/><Text \n\t\t\t\t\t\t\t\ttext="{invoice>ShipperName}"/><ObjectNumber\n\t\t\t\t\t\t\t\tnumber="{\n\t\t\t\t\t\t\t\t\tparts: [\n\t\t\t\t\t\t\t\t\t\t\'invoice>ExtendedPrice\',\n\t\t\t\t\t\t\t\t\t\t\'view>/currency\'\n\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\t\ttype: \'sap.ui.model.type.Currency\',\n\t\t\t\t\t\t\t\t\tformatOptions: {\n\t\t\t\t\t\t\t\t\t\tshowMeasure: false\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\t\tunit="{view>/currency}"\n\t\t\t\t\t\t\t\tstate="{= ${invoice>ExtendedPrice} > 50 ? \'Error\' : \'Success\' }"/></cells></ColumnListItem></items></Table></Panel></mvc:View>',
	"ui5/walkthrough/view/Overview.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"><Page title="{i18n>homePageTitle}"><landmarkInfo><PageAccessibleLandmarkInfo\n\t\t\t\trootRole="Region"\n\t\t\t\trootLabel="{i18n>Overview_rootLabel}"\n\t\t\t\tcontentRole="Main"\n\t\t\t\tcontentLabel="{i18n>Overview_contentLabel}"\n\t\t\t\theaderRole="Banner"\n\t\t\t\theaderLabel="{i18n>Overview_headerLabel}"/></landmarkInfo><content><mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel"/><mvc:XMLView viewName="ui5.walkthrough.view.InvoiceList"/></content></Page></mvc:View>'
});
//# sourceMappingURL=Component-preload.js.map
