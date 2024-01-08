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
                    var oModel = this.getView().getModel("test"); //Model 가져오기 by getModel()
                    var data = oModel.getData();                  //가져온 Model의 data를 가져오기 by getData()
                    var data2 = oModel.getProperty("/name/firstName"); //특정 경로의 Model 데이터를 가져오기

                    // oModel.getData(); // 전체 데이터 가져오기
                    // oModel.getProperty('/'); // 경로 지정하여 데이터 가져오기
                    // oModel.setProperty('/'); // 경로 지정하여 데이터 세팅하기
                    // oModel.setData(); // 전체 데이터 세팅
                    // oModel.setData( { name : 'okok' }) // 기존 데이터 다 날라가고 덮어쓰기

                    //데이터 가져온 후, 데이터 핸들링
                    // oModel.setData( { name : 'Hong Gildong' }, true); // 덮어쓰기 x
                    // oModel.setData( 세팅할데이터 , 합치기(=덮어쓰기) 여부)
                    oModel.setProperty("/name/firstName", "Park"); //name 밑의 firstName을 "Park"으로 변경
                    
                    console.log(oModel.getData());

 
                    // oModel.setProperty('/'); // 특정 경로 지정하여 세팅하기
                    // oModel.setProperty(대상경로, 바꿀 값); //
                },
                //onSetData 구현
                onSetData: function (oEvent) { //oEvent.getSource : 이벤트를 일으킨 객체 가져오기 (Button)
                                               //oEvent.getParameters() : 이벤트와 관련된 정보
                    var oModel = this.getView().getModel(); //기본모델 호출
                    var oTestModel = this.getView().getModel('test'); //test모델 호출
                    // var sInputData = oModel.getProperty("/inpValue"); //inpValue 통해 World 가져오기
                    var sInputData = oModel.getData().inpValue; //getData통해 inpValue 가져오기

                    /*
                        oTestModel에 있는 textValue 데이터 변경
                          변경된 데이터: "Hello + <Input입력값>"

                        *setProperty 또는 setData 사용해 적용 가능!
                    */
                    //setProperty
                    oTestModel.setProperty("/textValue", sInputData);

                    //setData
                    //oTestModel.setData( {textValue : sInputData }, true);

                    console.log(sInputData); //잘 구동하고 있는지 확인차 console창에 찍기
                }
            });
    });
