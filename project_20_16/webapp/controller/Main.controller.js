sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2016.controller.Main", {
            onInit: function () {
                this.byId("idImage").setSrc(_rootPath + "/image/Coding.jpg");
            },
            setImageUrl: function (sValue) {
                return `${_rootPath}/image/${sValue}.jpg`;
            }
        });
    });
