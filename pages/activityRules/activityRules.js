//pages/activityRules/activityRules.js
const app = getApp()
Page({
  data: {
    dataList: [
      {
        title:"活动时间",
        content:[
           "本活动为长期活动。"
        ]
      },
      {
        title: "推荐及奖励规则",
        content: [
          '1、通过"赚赏金"可查看到您的赏金二维码；',
          '2、参与赚赏金活动的用户可以通过二维码图片、链接、分享等途径邀请其他用户。',
          '3、其他车主被您邀请进行购买后,您会获得2元现金红包奖励红包。',
        ]
      },
      {
        title: "提现规则",
        content: [
          "您邀请的车主在成功购买后,3天内可在您获得赏金页面查询,满10元可进行提现到微信。"
        ]
      },
      {
        title: "其他说明",
        content: [
          "1、本活动红包均由扫码挪车H提供,用户无需承担任何费用。",
          "2、每个微信用户视为一个用户,对应一个邀请码。",
          '3、为保证活动长期、健康的发展,请您在邀请他人时,避免采取乱发短信、邮件等骚扰欣慰,不可再推广时使用“微信”“扫码挪车H”等作为推广信息签名;如您张贴活动宣传海报,请遵守设计广告、物料宣传等法律法规,环境法律法规以及相关地方政策规定;如您未遵守上述规定导致被投诉、处罚或造成不良影响的,我们将来取相关措施直至撤销活动参与资格。'
        ]
      },
    ]
  },
  onLoad: function () {
    new app.globalData.MyUtils()
  },
})