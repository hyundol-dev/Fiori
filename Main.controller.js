sap.ui.define([
    "sap/ui/core/mvc/Controller", // Controller 모듈을 불러옴
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2001.controller.Main", {
            onInit: function () {
                //초기화 함수
            },

            onClick: function () {

                //View에 있는 Input객체를 불러온다. (숫자 2개 & 연산자)
                var oInput1 = this.getView().byId("idInput1"); 
                var oInput2 = this.getView().byId("idInput2");
                var oOperator = this.getView().byId("idOperator");
                //입력된 것을 주소로 가져옴

                var vInput1 = Number(oInput1.getValue());
                var vInput2 = Number(oInput2.getValue()); 
								//주소를 값(Value)로 가져오고 Number로 변환


                //Select에 선택된 1개의 연산자 가져오기
                var selectedOperator= oOperator.getSelectedKey(); 
            

                //계산 구현 by switch-case 구문
                var result //우선 result 변수 선언 (∵ 이후 Switch-case에서 사용하기 때문)
                switch (selectedOperator) {
                    //더하기
                    case "plus":
                        result = vInput1 + vInput2;
                        break;

                    //빼기
                    case "minus":
                        result = vInput1 - vInput2;
                        break;

                    //곱하기
                    case "multiple":
                        result = vInput1 * vInput2;
                        break;

                    //나누기
                    case "divide":
                        result = vInput1 / vInput2;
                        break;
                }
                alert(result);
            },

            //숫자 초기화
            onInitClick: function () { 
                var oInput1 = this.getView().byId("idInput1"); 
                var oInput2 = this.getView().byId("idInput2");

                oInput1.setValue("");
                oInput2.setValue("");
            }
        });
    });