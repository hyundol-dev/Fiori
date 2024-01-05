sap.ui.define([
    "sap/ui/core/mvc/Controller", //api 가져오기
    "sap/m/Button",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button, JSONModel) {
        "use strict";

        return Controller.extend("project1001.controller.View1", {
            onInit: function () {
                //new sap.m.Button
                new Button

                var oData = { 
                    items : [
                        { key : "plus", text : "+", additionalText : "Plus"},
                        { key : "minus", text : "-", additionalText : "Minus"},
                        { key : "multiple", text : "*", additionalText : "Multiple"},
                        { key : "divide", text : "/", additionalText : "Divide"}
                    ]
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel); 

                var oData2 = {
                    history : [
                        {num1: 1, oper: "+", num2: 1, result: 2},
 
                    ]
                };
                var oModel2 = new JSONModel(oData2);
                this.getView().setModel(oModel2, 'local');
                // this.getView().setModel(2222); 해버리면 위에꺼 무효화 됨
            },

            
            onClick: function () {
                //View에 있는 Input 객체를 가져온다
                var oInput1 = this.byId("idInput1").getValue();
                var oInput2 = this.byId("idInput2").getValue();

                //바인딩 코드
                // Model 가져오기
                var oHistoryModel = this.getView().getModel('local')

                // oModel.getData().history or
                oHistoryModel.getProperty('/history');
                // oModel.getData(); // 전체 데이터 가져오기
                // oModel.getProperty('/'); // 경로 지정하여 가져오기
                // oModel.setData(); // 전체 데이터 세팅
                // oModel.setData( { name : 'okok' }) // 기존 데이터 다 날라가고 덮어쓰기
                // ∴ oModel.setData( { name : 'okok' }, true) // 덮어쓰기 x
                // oModel.setData( 세팅할데이터, 합치기 여부)
                // oModel.setProperty('/'); // 특정 경로 지정하여 세팅하기
                // oModel.setProperty(대상경로, 바꿀 값); //

                
                
                //숫자 확인&변환 작업
                if(oInput1 == ""){ 
                    oInput1 = null; 
                }
                else{ 
                    oInput1 = Number(oInput1);
                }

                if(oInput2 == ""){
                    oInput2 = null;
                }
                else{
                    oInput2 = Number(oInput2);
                }
                
                var cal = this.byId("idSelect").getSelectedKey();
               // var sOperator = this.byId("idSelect").getSelectedItem().getText();
                var result = 0;

                switch(cal){
                    case "plus":
                        result = oInput1 + oInput2;
                        break;
                    case "minus":
                        result = oInput1 - oInput2;
                        break;
                    case "multiple":
                        result = oInput1 * oInput2;
                        break;
                    case "divide":
                        result = oInput1 / oInput2;
                        break;
                }

                // switch(sOperator){
                //     case "+":
                //         result = oInput1 + oInput2;
                //         break;
                //     case "-":
                //         result = oInput1 - oInput2;
                //         break;
                //     case "*":
                //         result = oInput1 * oInput2;
                //         break;
                //     case "/":
                //         result = oInput1 / oInput2;
                //         break;
                // }
                if(oInput1 == null || oInput2 == null){
                    sap.m.MessageToast.show("값을 입력해주세요");    
                }else{
                    sap.m.MessageToast.show("답 : " + result);
                }
                    
                
                
                //this : Controller
                //.getView() : Controller 에 있는 메서드
                //.byId() : View 에 있는 메서드
                //.getValue() : input에 있는 메서드

            }
        });
    });
    
