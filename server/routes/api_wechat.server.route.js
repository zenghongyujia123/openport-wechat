/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_wechat');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/api_wechat/signin').post(ctr.signin);
  // app.route('/api_wechat/shippments').post(ctr.shippments);
  app.route('/api_wechat/uploadEvent').post(ctr.uploadEvent);
  app.route('/api_wechat/createExpense').post(ctr.createExpense);
  app.route('/api_wechat/getDeliveriedShippments').post(userFilter.requireUser, ctr.getDeliveriedShippments);
  app.route('/api_wechat/getUserJsApiTicket').post(ctr.getUserJsApiTicket);
  app.route('/api_wechat/downloadPhoto').get(ctr.downloadPhoto);
  app.route('/api_wechat/updateUserSetting').post(ctr.updateUserSetting);
  app.route('/api_wechat/getUserSetting').post(ctr.getUserSetting);
};