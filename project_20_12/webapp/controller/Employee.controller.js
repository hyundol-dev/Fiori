sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project2012.controller.Employee", {
            
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter()
                
                this.oRouter.getRoute("RouteEmployee").attachPatternMatched(this._onPatternMatched, this);
            },
            // PatternMatched 이벤트는 URL 일치 "할때마다" 실행
            _onPatternMatched: function(oEvent) {
                
            },
            onNavBack: function() {
                this.oRouter.navTo('RouteMain');
            }
        
        });
    });
