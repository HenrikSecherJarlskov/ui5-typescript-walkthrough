"use strict";sap.ui.define(["sap/ui/test/opaQunit","./pages/HelloPanelPage"],function(e,o){"use strict";function t(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=t(o);const i=new n;QUnit.module("Navigation");e("Should open the Hello dialog",function(){i.iStartMyUIComponent({componentConfig:{name:"ui5.walkthrough"}});i.iPressTheSayHelloWithDialogButton();i.iShouldSeeTheHelloDialog();i.iTeardownMyApp()})});
//# sourceMappingURL=NavigationJourney.js.map