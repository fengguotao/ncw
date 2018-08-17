/**
 * 小程序网络请求配置文件
 */
const hostCRM = 'https://grampus-crm.missfresh.cn'               // CRM
// 测试环境 
const app_request_url = {
      AppID: 'wxddde6f6e9b273be2',
      AppSecret: '7b890599d941f0b7c3182117f7ef3aba',
      /*ESS接口------------------------------------------------ */
      //字典
      getComCompetitor: `${hostCRM}/api/crm/common/competitor`,
}
//admin manager
module.exports = app_request_url