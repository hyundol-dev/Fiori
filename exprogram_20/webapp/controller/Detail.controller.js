sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("exam.exprogram20.controller.Detail", {
            // 초기화 함수 onInit은 해당 Controller가 로드될 때 한번만 실행
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._RoutePatternMatched, this);
      
            },
            // 문제 5: _RoutePatternMatched
            _RoutePatternMatched : function(oEvent) {
                // oArgu로 ProductName 받아오기
                var oArgu = oEvent.getParameters().arguments.ProductName;
                // Page의 title 에는 내가 선택한 상품 이름이 포함되어야 한다. 
                this.byId("idTitle").setText(`${oArgu} 상품의 주문 조회`);
                
                var oFilter = [];

                if (oArgu) {
                    oFilter.push (
                        new Filter({
                            path : 'ProductName',               
                            operator : FilterOperator.EQ, 
                            value1 : oArgu
                        })
                     );
                }
                var aFilter = new Filter({
                    filters: oFilter
                });
                //idTable에 Filter 적용
                this.byId("idTable").getBinding("rows").filter(aFilter);
            },

            // 문제 6: 화면 초기 세팅 적용
            onNavBack : function() {
                // this.getView().byId("idTable").removeSelections(true);
                // debugger;
                var oCatIDInput = this.byId("idCatID");
                var oCatNameInput = this.byId("idCatName");

                this.byId("idCatID").setValue("");
                this.byId("idCatName").setValue("");


                this.oRouter.navTo('RouteMain')
            }

              
            });
        });
