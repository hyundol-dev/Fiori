sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project2007.controller.Main", {
            onInit: function () {

                var oModel = new JSONModel(); // JSONModel 생성, 데이터를 관리하는 Model 생성
                oModel.loadData('../model/data.json'); // 위에서 생성한 JSON model을 load하겠다. & ../ = 하나 위에 있는 webapp으로
                
                // View가 사용할 수 있도록
                // oModel이라는 친구를 Model로 세팅 (=View에 JSON Model(이름 없음=기본 모델=Default Model) 세팅)
                this.getView().setModel(oModel); // 이름 없는 기본 Model

                var oModel2 = new JSONModel();
                oModel2.loadData('../model/test.json')
                this.getView().setModel(oModel2)
                
                var oModel2 = new JSONModel({
                        "name" : {
                                    "firstName" : "Hong",
                                    "lastName" : "Gildong"
                                },
                        "datas" : [
                                    { "name" : "Kim", "age" : 30, "tel" : "010-2222-1212" },
                                    { "name" : "Park", "age" : 10, "tel" : "010-3333-1312" },
                                    { "name" : "Moon", "age" : 20, "tel" : "010-5432-1234" }
                                ]
                    });
                this.getView().setModel(oModel2, "test")
                },
                
                onClick: function() {
                    var oModel = this.getView().getModel("test");

                    var data = oModel.getData();
                    var data2 = oModel.getProperty("/name/firstName");
                    // oModel.getData(); // 전체 데이터 가져오기
                    // oModel.getProperty('/'); // 경로 지정하여 가져오기
                    // oModel.setData(); // 전체 데이터 세팅
                    // oModel.setData( { name : 'okok' }) // 기존 데이터 다 날라가고 덮어쓰기


                    // oModel.setData( { name : 'Hong Gildong' }, true); // 덮어쓰기 x
                         
                    // oModel.setData( 세팅할데이터, 합치기 여부)
                    oModel.setProperty("/name/firstName", "Park"); //name 밑의 firstName을 "Park"으로 변경
                    
                    console.log(oModel.getData());
                    //디버깅 걸기
                    debugger; //여기서 멈춤  
                    // oModel.setProperty('/'); // 특정 경로 지정하여 세팅하기
                    // oModel.setProperty(대상경로, 바꿀 값); //
                }
            });
    });
