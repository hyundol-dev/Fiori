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
                    title : {
                        subTitle : 'Calculator Program'
                    },
                    items : [
                        { key : "plus", text : "+", additionalText : "Plus"},
                        { key : "minus", text : "-", additionalText : "Minus"},
                        { key : "multiple", text : "*", additionalText : "Multiple"},
                        { key : "divide", text : "/", additionalText : "Divide"}
                    ]
                };
                this.getView().setModel(new JSONModel(oData));
                
                //Context Binding 240106 16:07
                this.byId("idTitle").bindElement('/title');
                // 이름이 있는 모델의 경우, 경로 및 이름을 객체 형태로 전달한다.
                // this.byId("idTitle").bindElement({
                //     path : '/title',
                //     model : 'main1'
                // }); 

                var oData2 = {
                    history : [
                        {num1 : 1, oper : "+", num2 : 2, result : 3}
                    ]
                };
                var oModel2 = new JSONModel(oData2);
                this.getView().setModel(oModel2, 'local');
                // this.getView().setModel(2222); 해버리면 위에꺼 무효화 됨
            },

            //Exp. Binding의 fnColorFormat 함수 작성
            //local 모델의 result 값에 따라서 포맷터 함수를 적용할 수 있다.
            //result >100 이면 초록색, 아니면 빨간색 반환
            fnColorFormat: function (sValue) {
                if(sValue) {
                    if(sValue > 100) {
                        return '#bffcc6';
                    }else {
                        return '#ffabab';
                    }
                }
            },
            
            onCalc: function () {
                //View에 있는 Input 객체를 가져온다
                var oInput1 = this.byId("idInput1").getValue();
                var oInput2 = this.byId("idInput2").getValue();
                
                
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
                

               var sOperator = this.byId("idSelect").getSelectedItem().getText();
               var result = 0;

                // switch(sOperator){
                //     case "plus":
                //         result = oInput1 + oInput2;
                //         break;
                //     case "minus":
                //         result = oInput1 - oInput2;
                //         break;
                //     case "multiple":
                //         result = oInput1 * oInput2;
                //         break;
                //     case "divide":
                //         result = oInput1 / oInput2;
                //         break;
                // }

                switch(sOperator){
                    case "+":
                        result = oInput1 + oInput2;
                        break;
                    case "-":
                        result = oInput1 - oInput2;
                        break;
                    case "*":
                        result = oInput1 * oInput2;
                        break;
                    case "/":
                        result = oInput1 / oInput2;
                        break;
                }
                if(oInput1 == null || oInput2 == null){
                    sap.m.MessageToast.show("값을 입력해주세요");    
                }else{
                    sap.m.MessageToast.show("답 : " + result);
                }
                //this : Controller
                //.getView() : Controller 에 있는 메서드
                //.byId() : View 에 있는 메서드
                //.getValue() : input에 있는 메서드

                ////////////////////////////////////////////////

                //계산 버튼 클릭 시 history table에 값 추가하기

                // 1. 계산 결과를 담을 객체 생성
                var oNewHistoryItem = {
                    num1: oInput1,
                    oper: sOperator,
                    num2: oInput2,
                    result: result
                }

                //바인딩 코드
                // 2. Model 가져오기 (모델 이름이 local인)
                var oHistoryModel = this.getView().getModel('local')

                // 3. hitstory 경로의 배열 가져오기 (aHistoryModel에 할당)
                // oModel.getData().history or
                var aHistoryModel = oHistoryModel.getProperty('/history');
                
                // 4. 계산 결과를 배열에 추가
                aHistoryModel.push(oNewHistoryItem);

                // 5. 수정된 배열을 'local' 모델의 'history' 경로에 설정
                oHistoryModel.setProperty('/history', aHistoryModel);
                

                /*
                aHistoryModel.push ({
                    oper: sOperator,
                    num2: oInput2,
                    result: result
                })

                oModel.setProperty("/history",aHistory)

                */
            }
        });
    });
    
