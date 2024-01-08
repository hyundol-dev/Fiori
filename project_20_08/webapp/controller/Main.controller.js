sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2008.controller.Main", {
            onInit: function () {
                var oData = {
                    list : []
                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel);
            },
            onAdd: function () {
                var oModel = this.getView().getModel();

                // var aList = oModel.getData().list; or
                var aList = oModel.getProperty("/list"); // 결과값: []

                aList.push({
                    name : 'Andy',
                    age : 20 
                    // (초기값(Default) 설정)
                });

                //aList -> oModel.aList -> oModel.setProperty(aList) ->
                oModel.setProperty("/list", aList)
                //or oModel.setData({ list : aList}, true);
            },

            // RowActionItem 관련 item 클릭 시 이벤트 발생
            // 목표: X 버튼 클릭시 해당 row 삭제
            onRowDelete: function(oEvent) {
                var index = oEvent.getParameters().row.getIndex() //누른 버튼의 row index no. 얻기
                var aList = this.getView().getModel().getProperty("/list");

                // 해당 index의 모델 데이터 삭제
                aList.splice(index, 1); //index로부터 1개까지 삭제

                this.getView().getModel().setProperty("/list", aList); //삭제 된 새로운 배열을 aList로 재할당(재설정)
            },
            onDelete: function() {
                var oModel = this.getView().getModel();
                var aList = oModel.getProperty("/list");
                var table = document.getElementById('idTable');
                var aSelectedRow = table.getSelectedIndices();
 
                // for (var i = 0; i) {}
            }
        });
    });
