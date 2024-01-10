sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {
                var oModel = {
                    number : [],
                    inpValue: ""
                };
                this.getView().setModel(new JSONModel(oModel),'list');
            },

            // onRandomPress 버튼 기능 구현
            onRandomPress: function () {
                // 모델 가져오기
                var oModel = this.getView().getModel("list");

                // 1~100 사이 난수 생성
                var oRand = Math.floor(Math.random() * 100) + 1 ;
                // Input에 표시
                // this.byId("idInput").setValue(oRand) ;
                oModel.setProperty("/inpValue", oRand); // /inpValue 목적


                var aNumbers = oModel.getProperty('/number');
                aNumbers.push({num : oRand}); // {key : value} 형식으로 push할 것
                oModel.setProperty('/number', aNumbers);
            },

            // onProductDialog Fragment 버튼
            onProductDialog: function() {
                this.getView().byId("idProductsDialog").open();
            },
            onCloseDialog: function(oEvent) {
                oEvent.getSource().getParent().close();
            },

            // transformDiscontinued 함수 구현
            transformDiscontinued: function(sValue) {
                if (sValue) {
                    return "Yes";
                } else {
                    return "No";
                }
            // return sValue ? "Yes" : "No"; // 삼항연산자 사용
            
            // Discontinued는 True-False로 이뤄져 있음
            // ∴ if(sValue)로 T,F가 이미 분류됨
            // ∴ True라면 Yes, False라면 No
            },


        });
    });
