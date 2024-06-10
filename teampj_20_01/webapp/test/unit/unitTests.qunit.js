/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sales_analysis_cust_pm/teampj_20_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
