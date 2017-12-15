/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_wechat');

module.exports = function (app) {
  app.route('/api_wechat/signin').get(ctr.signin);
};