/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_wechat');

module.exports = function (app) {
  app.route('/api_wechat/signin').post(ctr.signin);
  // app.route('/api_wechat/shippments').post(ctr.shippments);
  app.route('/api_wechat/uploadEvent').post(ctr.uploadEvent);
  app.route('/api_wechat/createExpense').post(ctr.createExpense);


};