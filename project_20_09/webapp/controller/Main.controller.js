sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter', 
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel' //', " 상관없음
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("odata.project2009.controller.Main", {
            onInit: function () {
                var oData = {
                    OrderID : '',
                    CustomerID: '',
                    OrderDate_start: null,
                    OrderDate_end: null
                }
                this.getView().setModel(new JSONModel(oData),'search');

                
            },
            fnDateToString: function (sValue) {
                if(sValue) {
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern : 'yyyy/MM/dd' // 2024/01/09
                    });

                    return oFormat.format(sValue); // Date형식을 pattern에 따라 변경함
                }
            },

            // Customer Dialog 띄우기
            onValueHelpRequest: function() {
                this.getView().byId("idCustomerDialog").open();
            },
            onClose: function(oEvent) {
                oEvent.getSource().getParent().close();
            },


            onSearch: function() {
                
                /*
                // id 불러오기 (JSON Model 사용하기 전)
                var sOrderID = this.byId("idOrderID").getValue(); //사용자가 입력한 값 가져오기
                
                // CustID 필터 구현_1 : idCustomerID 불러오기
                var sCustID = this.byId("idCustomerID").getValue();


                // OrderDate 필터 구현_1 : idOrderDate 불러오기 getDateValue(),getSecondDateValue() 
                var oStartDate = this.byId("idOrderDate").getDateValue();
                var oEndDate = this.byId("idOrderDate").getSecondDateValue();
                */
               
                // 'search' 모델 불러오기
                var oSearchData = this.getView().getModel('search').getData();
                // oSearchData { OrderID : '', CustomerID : '', OrderDate_start : '',
                //               OrderDate_end : '' }
                var oFilter = [];
                // debugger;

                if(oSearchData.OrderID) {
                    oFilter.push (
                        new Filter({
                            path : 'OrderID',               // 대상 필드명
                            operator : FilterOperator.EQ,   // 연산자(조건)
                            value1 : oSearchData.OrderID,   // 값 (BT의 경우 From)
                            value2 : '',                    // (BT의 경우 To)
                        })
                    );
                }

                if(oSearchData.CustomerID) {
                    oFilter.push (
                        new Filter({
                            path : 'CustomerID',                // 대상 필드명
                            operator : FilterOperator.Contains, // 연산자(조건)
                            value1 : oSearchData.CustomerID,    // 값 (BT의 경우 From)
                            value2 : '',                        // (BT의 경우 To)
                        })
                     );
                };
                

                if(oSearchData.OrderDate_start && oSearchData.OrderDate_end) {
                    oFilter.push (new Filter(
                        'OrderDate', 'BT', oSearchData.OrderDate_start, oSearchData.OrderDate_end
                        ))
                        }
                var aFilter = new Filter({
                    filters: oFilter,
                    and: false 
                });

                this.byId("idTable").getBinding("items").filter(aFilter);  

                /* JSON Model (search) 사용 전
                // 검색했을 때만 필터 작동하도록
                if(sOrderID) {
                    oFilter.push (
                        new Filter({
                            path : 'OrderID',    // 대상 필드명
                            operator : FilterOperator.EQ,      // 연산자(조건)
                            value1 : sOrderID,    // 값 (BT의 경우 From)
                            value2 : '',          // (BT의 경우 To)
                        })
                    );
                }
                

                // CustID 필터 구현_2 : if & 필터
                if(sCustID) {
                    oFilter.push (
                        new Filter({
                            path : 'CustomerID',    // 대상 필드명
                            operator : FilterOperator.Contains,      // 연산자(조건)
                            value1 : sCustID,    // 값 (BT의 경우 From)
                            value2 : '',          // (BT의 경우 To)
                        })
                     );
                }

                // OrderDate 필터 구현_2 : if & 필터
                if(oStartDate && oEndDate) {
                    oFilter.push (new Filter('OrderDate', 'BT', oStartDate, oEndDate))
                    }
                    
                var aFilter = new Filter({
                    filters: oFilter,
                    and: false // OR 연산을 수행하도록 설정
                });
                // Table의 items를 가져오고, filter를 적용함
                this.byId("idTable").getBinding("items").filter(aFilter);  
                */

                /* if(sCustID) {
                    var aFilter = new Filter({
                            path : 'CustomerID',    // 대상 필드명
                            operator : FilterOperator.Contains,      // 연산자(조건)
                            value1 : sCustID,    // 값 (BT의 경우 From)
                            value2 : '',          // (BT의 경우 To)
                        })
                        
                    oFilter.push(aFilter)
                    };
                this.byId("idTable").getBinding("items").filter(oFilter);    
                } */
                // 이 방식으로도 구현은 가능하나 if구문 통일해야함
                // 각각 다른 방식으론 x


                /*
                // ****************filters 사용 시 ******************
                // 이 내용은 위에 코드 익숙해지고 나서!
                var sOrderID = this.byId("idOrderID").getValue(); 
                var sCustID = this.byId("idCustomerID").getValue();
    
                var aFilter = [];

                if(sOrderID) aFilter.push(new Filter('OrderID', 'EQ', sOrderID));
                if(sCustID) aFilter.push(new Filter('CustomerID', 'Contains', sCustID));

                this.byId("idTable").getBinding("items").filter(new Filter({
                    filters : aFilter,
                    and : true // AND/OR 조건 중 선택
                }));
                // 만약 이 코드처럼 filters 쓸 때 주의
                // aFilter 배열에 필터 객체가(=값이) 1개 이상인 경우만 적용하고,
                // 필터 객체가 없는 빈 배열이면 적용하지 않기!
                */
            },
            // sap.m.Table 에서, selectionChange 이벤트 실행
            onSelectionChange: function(oEvent) {
                // 상대 경로로 지정되어 있는 데이터 셋에서, 내가 선택한 Row의 모델 경로를 얻음
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 얻은 모델 경로를 통해, 해당 경로의 전체 데이터를 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);

                // alert(oSelectData.OrderID);
                // alert(oSelectData.ShipCity);
                // 이런 식으로 화면에 없는 정보도 불러올 수 있음
                // https://services.odata.org/northwind/northwind.svc/Orders?$format=json
                // 여기 참고해서!

                // Router
                // router
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo('RouteDetail', {
                    OrderID : (oSelectData.OrderID)
                });
            }
        });
    });
    
