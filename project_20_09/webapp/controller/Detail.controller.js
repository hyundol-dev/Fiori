sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odata.project2009.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter()
                // RouteDetail에 대해 pattern(=URL)이 일치할 때 마다 
                // _onPatternMatched라는 함수를 실행시키겠다.
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },
            // PatternMatched 이벤트는 URL 일치 "할때마다" 실행
            _onPatternMatched: function(oEvent) {
                var oArgu= oEvent.getParameters().arguments;
                // this.byId('idText').setText(oArgu.OrderID);

                // form 가져온 뒤 binding
                // "/EntitySetName(key='1',key2='2')"
                // = "/EntitySetName('1','2')"
                // "/Orders(10248)"
                this.byId("idForm").bindElement(`/Orders(${oArgu.OrderID})`);
            },
            onNavBack: function() {
                this.oRouter.navTo('RouteMain');
            }   
        });
    });
