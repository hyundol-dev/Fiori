sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2006.controller.HelloPanel", {
            onInit: function () {

            },

            onShowHello: function () {
                sap.m.MessageToast.show(".onShowHello")
            }
        });
    });
