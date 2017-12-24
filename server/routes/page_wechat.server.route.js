/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/page_wechat/page_home').get(userFilter.requireUser, index.page_home);
  app.route('/page_wechat/page_detail').get(index.page_detail);
  app.route('/page_wechat/page_expense_list').get(index.page_expense_list);
  app.route('/page_wechat/page_expense_detail').get(index.page_expense_detail);
  app.route('/page_wechat/page_signin').get(index.page_signin);

  app.route('/page_wechat/page_expense_add').get(index.page_expense_add);
  app.route('/page_wechat/page_profile').get(index.page_profile);
  app.route('/page_wechat/page_search').get(index.page_search);
  app.route('/page_wechat/page_setting').get(index.page_setting);
};