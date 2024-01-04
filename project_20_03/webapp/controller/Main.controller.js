sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2003.controller.Main", {
            onInit: function () {
                    // 초기화 함수
            },

            onClick: function () {  //출력 버튼 클릭 Function
                var oInput = this.getView().byId("idInput");    // "idInput"이라는 ID를 가진 Input 컨트롤을 가져옴
                var oOutput = this.getView().byId("idOutput");  // "idOutput"이라는 ID를 가진 Text 컨트롤을 가져옴
    
                var vInput = oInput.getValue(); // Input 컨트롤의 값을 가져옴
                oOutput.setText(vInput);        // Text 컨트롤에 가져온 값을 설정하여 화면에 표시

            },

            onInitClick: function() { //초기화 버튼 클릭 Function
                var oInput = this.getView().byId("idInput");    //getView 생략 가능
                var oOutput = this.getView().byId("idOutput");
                
                oInput.setValue("");
                oOutput.setText("");
            }
        });
    });
