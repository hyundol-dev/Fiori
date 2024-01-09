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
                    // oModel 접시에 현재 컨트롤러 속한 뷰 에서 모델 담아
                    var oModel = this.getView().getModel();
                    // 접시에 담은 list를 aList에 할당해
                    var aList = oModel.getProperty("/list");
                    // idTable이라는 테이블 객체에서 현재 선택된 행들의 인덱스 가져와
                    var aSelectedRow = this.byId("idTable").getSelectedIndices();
                    //높은 숫자/행 부터 하나씩 지워(by splice) / 위에서부터 지우면 row no.가 바뀌기 때문
                    for (var i = aSelectedRow.length-1; i>=0; i--) {
                        aList.splice(aSelectedRow[i], 1);
                    }
                    //삭제된 데이터가 반영된 배열을 모델의 list에 할당해
                    oModel.setProperty("/list", aList);


                    /*
                    var oTable = this.byId("idTable"),
                        aList = this.getView().getModel().getProperty("/list"),
                        aIndices = oTable.getSelectedIndices();

                        // [1,3,5] => len = 2->0까지
                    var len = aIndices.length - 1;'
                    for (var i = len; i >= 0, i--) {
                        aList.splice(aIndices[i], 1);
                    }

                    this.getView().getModel().setProperty("/list", aList);
                
                    */
                }
        });
    });
