/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
// 전역변수 선언
var _rootPath = jQuery.sap.getModulePath("project2016").split('/~')[0];
// debugger;

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project2016/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project2016.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);