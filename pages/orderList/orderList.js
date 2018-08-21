//pages/orderList/orderList.js
const app = getApp()
Page({
  data: {
    orderList: [
      {
        "orderTime": '2018-08-21 17:34',
        "orderStatus": "0",
        "orderImg": "/images/phb_one.png",
        "orderNum":'12',
        "tel":"22222222222",
        "orderMoney":"123"
      },
      {
        "orderTime": '2018-08-21 17:35',
        "orderStatus": "0",
        "orderImg": "/images/phb_two.png",
        "orderNum": '12',
        "tel": "22222222222",
        "orderMoney": "123"
      },
      {
        "orderTime": '2018-08-21 17:36',
        "orderStatus": "0",
        "orderImg": "/images/phb_stree.png",
        "orderNum": '12',
        "tel": "22222222222",
        "orderMoney": "123"
      },
      {
        "orderTime": '2018-08-21 17:37',
        "orderStatus": "-1",
        "orderImg": "/images/nuo_img.png",
        "orderNum": '12',
        "tel": "22222222222",
        "orderMoney": "123"
      },
      {
        "orderTime": '2018-08-21 17:38',
        "orderStatus": "-1",
        "orderImg": "/images/lq_tx.png",
        "orderNum": '12',
        "tel": "22222222222",
        "orderMoney": "123"
      },
      {
        "orderTime": '2018-08-21 17:39',
        "orderStatus": "0",
        "orderImg": "/images/phb_one.png",
        "orderNum": '12',
        "tel": "33333333333",
        "orderMoney": "123"
      },
    ]
  },
  onLoad: function () {
    new app.globalData.MyUtils()
  },
})