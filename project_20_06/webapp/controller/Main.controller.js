sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment" //팝업을 con에서 호출하기 위해 사용
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) { //팝업을 con에서 호출 위해 Frag 사용
        "use strict";

        return Controller.extend("project2006.controller.Main", {
            onInit: function () {
            },

            // HelloFrag.fragment.xml 안에 있는 .HelloButtonpress 이벤트
            HelloButtonpress: function() {
                sap.m.MessageToast.show("HelloFrag.fragment")
            },
            //Dialog(팝업) 열기 버튼 구동 function/이벤트
            onOpenDialog: function () {
                this.byId("idDialog").open();
            },
            //Dialog(팝업) 닫기 버튼 구동 function/이벤트
            //Button의 press 이벤트
            //이벤트 함수는 이벤트 객체를(oEvent) 받아옴            
            onCloseDialog: function(oEvent) {
                //View 안에서 호출한 팝업 닫기
                // this.byId("idDialog").close();
                
                //Controller 안에서 파일 로드한 팝업 닫기
                //sap.ui.getCore().byId("idDialog").close(); 
                
                //∴ 두 버전의 '팝업 닫기'를 통합하려면? oEvent 객체 사용
                //∵ oEvent 안에는 getSource(), getParameters() .. Method 있음
                //이 경우 상위(부모) 개체는 대문자 Dialog
                //소문자는 구성 요소 (찌끄레기)
                //∴ .getParent 통해 부모인 Dialog 가져오고
                // .getSoutce를 통해 이벤트를 일으킨 객체 (=Button)를 가져옴
                //Dialog에서 .close() 실행 시 팝업이 닫힘
                oEvent.getSource().getParent().close();

            },


            //팝업을 con에서 호출하기 위한 function/이벤트
            //Controller 내에서 Dialog Fragment 호출
            onOpenDialog_con: function () { 

                //sap.ui.getCore().byId("idDialog").close(); 를 통해 닫기 하면
                //한 번 밖에 못함 (∵ id중복) ∴ 해결 위해 아래 코드 작성
                var dialog = sap.ui.getCore().byId("idDialog");

                // 만약에, dialog 변수에 값이 있으면 dialog.open()
                // dialog 변수에 값이 없으면 load method 실행
                //∴ if문을 활용해 파일을 1번만 load할 수 있도록 함! => '2번 이상 부터는 기존에 load하던것 활용하겠다.'

                // dialog를 1번만 load할 수 있도록 if문 사용
                if(!dialog) { // dialog에 값이 없으면 !dialog = !false = true => 값이 없으면 load method
                    Fragment.load({
                        name : "project2006.view.fragment.Dialog", // 불러올 (load할) 파일 경로
                        type : "XML",      // 무슨 type인가
                        controller : this  // 지금 이 controller에서 (대소문자 주의)
                    }).then(function(oDialog) {
                        oDialog.open();
                    }); 
                } else { // dialog에 값이 있음
                    dialog.open();  // ∴ 있는 dialog를 Open
                }
            }
        });
    });
