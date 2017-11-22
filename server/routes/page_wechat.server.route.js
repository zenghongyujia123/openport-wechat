/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');

module.exports = function (app) {
  app.route('/page_wechat/page_home').get(index.page_home);
  app.route('/page_wechat/page_detail').get(index.page_detail);
  app.route('/page_wechat/page_signin').get(index.page_signin);
};