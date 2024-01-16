sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter", 
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                // 문제 6
                var oModel = { 
                    list : [
                    { key : "bar" },
                    { key : "column" },
                    { key : "line" },
                    { key : "donut" } 
                    ]
                } 
                
                this.getView().setModel(new JSONModel(oModel),'typeList');

                

            },
            // 문제 4 : onSearch 함수 구현
            onSearch: function() {
                // 선택한 OrderID 가져오기
                var oComboBox = this.byId("idComboBox").getValue();
                
                var oFilter = [];

                if(oComboBox) {oFilter.push(
                    new Filter ({
                        path : 'OrderID',
                        operator : FilterOperator.EQ,
                        value1 : oComboBox
                    })
                );
                this.byId("idDataset").getBinding("data").filter(oFilter); 
                } else {
                    // OrderID 값이 없으면 모든 데이터를 표시하기 위해 필터 초기화
                    this.byId("idDataset").getBinding("data").filter([]);
                }
                // 문제 7-2 : 차트 변경 함수 실행
                this._updateChart();
            },

            // 문제 7-1 : 유효성 검사
            onComboBoxChange: function(oEvent) {
                var oComboBox = oEvent.getSource();

                // 선택한 값이 없으면 에러 상태로 설정, 아니면 상태 초기화
                if (!oComboBox.getSelectedKey()) {
                    oComboBox.setValueState(sap.ui.core.ValueState.Error);
                } else {    
                    // 선택한 값이 있는 경우 상태를 초기화
                    oComboBox.setValueState(sap.ui.core.ValueState.None);
                }
                
            },
            // 문제 7-2 : ComboBox에 따른 차트 변경
            _updateChart: function() {
                // ComboBox에서 선택한 차트 유형(bar, line, ..) 가져오기
                var oChartCombo = this.byId("idChartCombo").getSelectedKey()
                // VizFrame 차트 객체 가져오기
                var oVizFrame = this.byId("idBarChart") 

                // VizFrame 차트의 유형을 ComboBox에서 선택한 값으로 설정
                oVizFrame.setVizType(oChartCombo);
            } 
                
        });
    });
