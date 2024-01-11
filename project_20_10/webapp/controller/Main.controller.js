sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel', 
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FlattenedDataset, FeedItem) {
        "use strict";

        return Controller.extend("project2010.controller.Main", {
            onInit: function () {
                // "view"라는 JSONModel 생성 by oData 변수에 배열 할당
                var oData = {
                    list : [
                        { name : 'aaa', rate : '35', cost : '10'},
                        { name : 'bbb', rate : '15', cost : '12'},
                        { name : 'ccc', rate : '10', cost : '11'},
                        { name : 'ddd', rate : '15', cost : '15'},
                        { name : 'eee', rate : '20', cost : '10'},
                        { name : 'fff', rate : '5', cost : '16'}
                    ] // { list : value } 형식로 되어있음
                }
                
                this.getView().setModel(new JSONModel(oData), "view");

                var oPopover = this.byId("idPopover");
                oPopover.connect(this.byId("idLineChart").getVizUid());

                // onInit 함수 내에서 _setChartInController 함수 실행 가능
                this._setChartInController(); 
            },

            _setChartInController: function() {
                var oData = {
                    sales : [
                        { product : "Jackets", amount: "65" },
                        { product : "Shirts", amount: "70" },
                        { product : "Pants", amount: "83" },
                        { product : "Coats", amount: "92" },
                        { product : "Purse", amount: "77" },
                    ]
                }
                this.getView().setModel(new JSONModel(oData), "cont");

                /* chart 시작 */
                var oColFrame = this.byId("idColChart");

                // dataset 구현 (dimensions & measures)
                var oColDataset = new FlattenedDataset({
                    dimensions : [ // X축
                        {
                            name : 'Product', // 카테고리명
                            value : '{cont>product}' // 데이터 정보
                        }
                    ],
                    measures : [ // Y축
                        {
                            name : 'Amount',
                            value : '{cont>amount}'
                        }
                    ],
                    data : {
                        path : 'cont>/sales'
                    }
                });
                // 차트랑 데이터셋 연결
                oColFrame.setDataset(oColDataset); 

                // Feed 구현 (FeedItem_measures)
                var feedColValueAxis = new FeedItem({
                    uid : 'valueAxis',
                    type : 'Measure',
                    values : [ 'Amount' ]
                });
                // Feed 구현 (FeedItem_dimensions)
                var feedColCategoryAxis = new FeedItem({
                    uid : 'categoryAxis',
                    type : 'Dimension',
                    values : [ 'Product' ]
                });

                // 변수에 들어간 Feed를 차트변수 oColFrame에 넣기!
                oColFrame.addFeed(feedColValueAxis);
                oColFrame.addFeed(feedColCategoryAxis);

                oColFrame.setVizProperties({
                    title : { text : '두번째 차트' }
                });
            }
        });
    });
