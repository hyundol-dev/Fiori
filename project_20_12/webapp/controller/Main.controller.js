sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project2012.controller.Main", {
            onInit: function () {
                // 한 단계 위에 있는 Component에 접근해, 라우터를 가져온다
                // var oRouter는 onInit에서만 유효한 변수
                // ∴ 밑의 함수들에서도 쓸 수 있게 this.oRouter로 변수 선언
                this.oRouter = this.getOwnerComponent().getRouter()
                
                this.oRouter.getRoute('RouteMain').attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function(oEvent) {
                // var oArgu= oEvent.getParameters().arguments;
                var oArgu= oEvent.getParameter('arguments'); // 위와 동일

                oArgu["?query"].test // '10'
                console.log("Main : ", oArgu["?query"].test);
            },

            onGoDetail: function() {
                this.oRouter.navTo('RouteDetail', {
                    key1 : 'okok',
                    key2 : 123
                }, true);
                // .navTo('라우트객체이름', {파리미터정보}, 라우터히스토리초기화여부)
                // 라우트객체이름= manifest->routes->name
            },

            onGoNotFound: function() {
                this.oRouter.getTargets().display("NotFound", {
                    fromTarget: 'TargetMain'
                });
            },

            // Employee View 접속 버튼
            onGoEmployee: function() {
                this.oRouter.navTo('RouteEmployee', {
                    empid : 'empid'
                });
            }
        });
    });
