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

            // 숫자 삭제 해보기 (pj08 실습)
            onDelete: function() {
                var oModel = this.getView().getModel("list");
                var aList = oModel.getProperty("/number");
                var aSelectedRow = this.byId("idTable").getSelectedIndices();
                for (var i = aSelectedRow.length-1; i>=0; i--) {
                    aList.splice(aSelectedRow[i], 1);
                }
                oModel.setProperty("/number", aList);
                
            },

            // onProductDialog Fragment 버튼
            onProductDialog: function() {
                this.getView().byId("idProductsDialog").open();
            },
            onCloseDialog: function(oEvent) {
                // oEvent.getSource().close(); : Button을 불러옴
                oEvent.getSource().getParent().close();
                // getParent()통해 Button 상위인 Dialog를 불러옴
                // => Dialog를 닫음!
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

            // 문제 9: onValueChange 함수 구현
            onValueChange: function(oEvent) {
                // View에 있는 idInput Controller의 oInput으로 가져오기
                var oInput = this.getView().byId("idInput");
                // oInput의 value(값) oInputValue로 할당
                var oInputValue = oInput.getValue();

                // 값이 비어있으면 Error, 아니면 None
                if(!oInputValue) {
                    oInput.setValueState(sap.ui.core.ValueState.Error);
                }else{
                    oInput.setValueState(sap.ui.core.ValueState.None);
                }
                
            }


        });
    });
