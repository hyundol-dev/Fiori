sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project2012.controller.NotFound", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                var oTarget = this.oRouter.getTarget("NotFound");
                oTarget.attachDisplay(this._onAttachDisplay, this)
            },

            // 해당 타겟 화면이 표시될 때 마다 이벤트 실행
            _onAttachDisplay: function(oEvent) {
                // 해당 타겟으로 넘겨질 때 받았던 파라미터값이 "data"에 들어있음
                // "data"에 들어있는 값을 Controller 내부에서 사용할 수 있도록
                // this._oData 에 담아놓는다.
                this._oData = oEvent.getParameter("data");
            },

            // NotFound 뒤로가기 버튼
            onNavBack: function() {
                if(this._oData && this._oData.fromTarget) {
                    this.oRouter.getTargets().display(this._oData.fromTarget);
                    delete this._oData.fromTarget;
                    return; // 함수 종료
                }
                // 브라우저에 쌓인 history에서 한번 뒤로
                window.history.go(-1); 
            }
        });
    });
