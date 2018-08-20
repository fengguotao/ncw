//pages/nuoList/nuoList.js
const app = getApp()
Page({
  data: {
    dataList:[
      { 
        "pic":'/images/nuo_img.png',
        "carCode":"京111111",
        "tel":"22222222222"
      },
      {
        "pic": '/images/iconUserInfo_sel.png',
        "carCode": "京222222",
        "tel": "33333333333"
      },
      {
        "pic": '/images/lq_tx.png',
        "carCode": "京3333333",
        "tel": "66666666666"
      },
      {
        "pic": '/images/iconHome_sel.png',
        "carCode": "京4444444",
        "tel": "55555555555"
      },
      {
        "pic": '/images/phb_one.png',
        "carCode": "京555555",
        "tel": "44444444444"
      },
      {
        "pic": '/images/phb_stree.png',
        "carCode": "京888888",
        "tel": "88888888888"
      },
    ]
  },
  onLoad: function () {
    new app.globalData.MyUtils()
  },
})