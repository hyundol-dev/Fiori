sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("exam.exprogram20.controller.Main", {
            onInit: function () { 
                // JSONModel 생성_search
                var oSearchData = {
                    CategoryID : '',
                    CategoryName: ''
                }
                this.getView().setModel(new JSONModel(oSearchData),'search');

                // JSONModel 생성_data
                var oSelectData = {
                    CategoryID : '',
                    ProductName: '',
                    UnitsInStock : '',
                    UnitsOnOrder : ''
                }
                this.getView().setModel(new JSONModel(oSelectData),'data');


                // 문제 5: Router
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            // 문제 2: 검색 기능 구현 onSearch
            onSearch: function () {
                //사용자가 입력한 값 가져오기
                var sCatID = this.byId("idCatID").getValue(); 
                var sCatName = this.byId("idCatName").getValue();
                
                var oFilter = [];

                // Filter 구현_CategoryID
                if(sCatID) {
                    oFilter.push (
                        new Filter({
                            path : 'CategoryID',              
                            operator : FilterOperator.GE,  
                            value1 : sCatID
                        })
                    );
                };
                // Filter 구현_CategoryName
                if(sCatName) {
                    oFilter.push (
                        new Filter({
                            path : 'CategoryName',               
                            operator : FilterOperator.Contains, 
                            value1 : sCatName
                        })
                     );
                };
                
                var aFilter = new Filter({
                    filters: oFilter,
                    and: true
                });
                // debugger;

                this.byId("idTable").getBinding("items").filter(aFilter);
            },

            // 문제 3: 카테고리 선택 시 상품 정보 조회
            onRowSelectionChange: function(oEvent) {
                // 내가 선택한 Row의 모델 경로를 얻음
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 해당 경로의 전체 데이터를 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);
                // 선택한 Row의 CategoryID를 sCatID에 부여
                var sCatID = oSelectData.CategoryID;

                var oFilter = [];

                if (sCatID) {
                    oFilter.push (
                        new Filter({
                            path : 'CategoryID',               
                            operator : FilterOperator.EQ, 
                            value1 : sCatID
                        })
                     );
                }
                var aFilter = new Filter({
                    filters: oFilter
                });
                //idProductTable에 aFilter 적용
                this.byId("idProductTable").getBinding("rows").filter(aFilter);
            
                // 문제 4: 카테고리 선택 시 상품 매출 비교 조회 (VizFrame)
                var sProductName = oSelectData.ProductName;

                var oFilterProd = [];
                if (sProductName) {
                    oFilterProd.push (
                        new Filter({
                            path : 'ProductName',               
                            operator : FilterOperator.EQ, 
                            value1 : sProductName
                        })
                     );
                }
                var aFilterProd = new Filter({
                    filters: oFilter
                });

                this.byId("idDataset").getBinding("data").filter(aFilterProd);
                
            },

            // 문제 5: 차트 클릭 시 화면 이동하여 해당 상품의 주문 내역 조회
            onChartClick: function (oEvent) {
                var sProductName = oEvent.getParameters().data[0].data.ProductName

                this.oRouter.navTo('RouteDetail', {
                    ProductName : sProductName
                }, true)
            }
        });
    });
