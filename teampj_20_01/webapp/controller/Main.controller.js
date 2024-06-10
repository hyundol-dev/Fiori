sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (Controller, ODataModel, JSONModel, Filter, FilterOperator) {
    "use strict";

        return Controller.extend("salesanalysiscustpm.teampj2001.controller.Main", {
            onInit: function () {
            },
    
            onSearch: function(){
                // var oDataStorno = this.byId("IDDate").getValue();
                var oDataMatno  = this.byId("IDMatno").getValue();

                var aFilter = [];
            

                if (oDataMatno) {
                    aFilter.push(
                        new Filter({
                        path: 'Matno',
                        operator: FilterOperator.Contains,
                        value1: oDataMatno 
                        })
                    )}

                // this.byId("idageChart").getBinding("rows").filter(new Filter({
                //     filters : aFilter,
                //     and : true
                // }))
                var oVizFrame = this.byId("idageChart");
                var oBinding = oVizFrame.getDataset().getBinding("data"); // rows 대신 data 사용
                oBinding.filter(aFilter);

                
            },
            
            onRefresh: function(){
                // this.byId("IDDate").setValue();
                this.byId("IDMatno").setValue();
                // this.loadData();
            }
        }); 
    });