sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("odata.project2013.controller.Main", {
            onInit: function () {
                var oData = {
                    "Productno" : "",
                    "Productname" : "",
                    "Fname" : "",
                    "Lname" : "",
                    "Memo" : ""
                }

                // Input value 에다가 Binding 하기=> {data>/Productno}
                this.getView().setModel(new JSONModel(oData), "data")

            },
            // 실습 1: 선택한 Row 정보 Input에 나타내기
            onRowSelectionChange: function(oEvent) {

                if(!oEvent.getParameter('rowContext'))
                return; // 함수 종료
                
                // Productno 가져오기
                var sPath = oEvent.getParameter('rowContext').getPath()

                // sPath에 있는 Productno(key값) 통해 전체 데이터 가져오기
                // 한 건의 model data-모델경로로 해당 경로의 전체 데이터 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);
                // "data" 모델 불러오기
                var oModel = this.getView().getModel("data");

                // 불러온 oSelectData를 oModel에 넣어줌!
                oModel.setData(oSelectData);
            },

            // 실습 2: 초기화 버튼 구현하기 (onReset)
            onReset: function() {
                this.getView().getModel("data").setData({
                    "Productno" : "",
                    "Productname" : "",
                    "Fname" : "",
                    "Lname" : "",
                    "Memo" : ""
                });
                
                // this.getView().getModel("data").setData(); 도 가능함
                // 단, 예를 들어 "Memo" : " { memo1 : ' ' }" 식으로 구성되어 있으면
                // 위 처럼 풀어쓰는 것이 바람직!

                // Table 선택 값도 Clear
                this.byId("idTable").clearSelection();
                this.getView().getModel().refresh(true);
                // Model refresh!
            },

            // onEntitySet 함수 구현 (Read)
            onEntitySet: function () {
                // Model 불러오기
                var oDataModel = this.getView().getModel();

                // 전체 조회
                // GET 요청: "/Products"
                oDataModel.read("/Products", {
                    filters: [ /* 필터 객체 배열 */ ],
                    success: function(oReturn) {
                        console.log("전체조회: ", oReturn)
                    },
                    error: function(oError) {
                        console.log("전체조회 중 오류 발생 ", oError)
                    }
                }); //read(sPath,mParameters?{success?, error?})
            },

            // onEntity 함수 구현 (단 건 조회)
            onEntity: function() {
                // 데이터 한 건 조회
                // GET 요청 : "/Products(ProductNo='1000')"
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products",{
                    Productno: oBody.Productno
                }); // sPath 값 => "/Products('1000')"
                    // Productno가 '1000'번에 해당하는 데이터 한 건을 조회함
                oDataModel.read(sPath, {
                    success: function(oReturn) {
                        console.log("한 건 조회: ", oReturn)
                    }
                });
            },

            // onCreate 함수 구현 (POST)
            onCreate: function() {
                // 데이터 생성 구현
                // POST 요청 : "/Products" + Body

                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                var oBody = {
                    "Productno" : oJSONData.Productno,
                    "Productname" : oJSONData.Productname || "",
                    "Fname" : oJSONData.Fname || "",
                    "Lname" : oJSONData.Lname || "",
                    "Memo" : oJSONData.Memo || ""
                }; // oJSONData.xxxx 값이 있으면 그냥 넣고, 없으면 빈 문자열 넣기

                oDataModel.create("/Products", oBody, {
                    success: function() {
                        sap.m.MessageToast.show("데이터 생성 완료");
                    },
                    error: function() {
                        sap.m.MessageToast.show("에러 발생");
                    }
                });
            },

            
            // MessageBox 모듈/함수화
            _showMessage: function() {
                
            },

            // onUpdate 함수 구현 (PUT)
            onUpdate: function() {
                // 데이터 변경 요청
                // PUT 요청: "/Products('1000')" + Body
                
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products",{
                    Productno: oBody.Productno
                }); // "/Products('키값')"과 동일

                // debugger;

                oDataModel.update(sPath, oBody, {
                    success: function() {
                        sap.m.MessageToast.show("데이터 변경 완료");
                    }
                });
            },

            // onDelete 함수 구현 (DELETE)
            onDelete: function() {
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products",{
                    Productno: oBody.Productno
                }); // "/Products('키값')"과 동일

                oDataModel.remove(sPath, {
                    success: function() {
                        sap.m.MessageToast.show("삭제되었습니다.");
                    }
                });
            }

        });
    });
