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
                // var oData = { 
                //     name : 'Hong Gil Dong',
                //     age : 20,
                //     title : 'Gildong`s page' 
                // };

                var oModel = new JSONModel(); // JSONModel 생성, 데이터를 관리하는 Model 생성
                oModel.loadData('../model/data.json', {}, false); // 위에서 생성한 JSON model을 load하겠다. & ../ = 하나 위에 있는 webapp으로
                
                // View가 사용할 수 있도록
                // oModel이라는 친구를 Model로 세팅 (=View에 JSON Model(이름 없음=기본 모델=Default Model) 세팅)
                this.getView().setModel(oModel); // 이름 없는 기본 Model

                console.log(oModel.getData());
                // 만약 여러개라면
                // this.getView().setModel(모델 객체(oModel2, ...), "모델 이름(car, address, ...)");
            }
        });
    });
