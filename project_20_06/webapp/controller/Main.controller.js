sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2006.controller.Main", {
            onInit: function () {

            },
            // HelloFrag.fragment.xml 안에 있는 .HelloButtonpress 이벤트
            HelloButtonpress: function() {
                sap.m.MessageToast.show("Fragment")
            }
        });
    });
