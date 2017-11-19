/**
 * Created by zenghong on 2017/8/8.
 */


var pageAdmin = require('../controllers/page_admin');

module.exports = function (app) {
  app.route('/page_admin').get(pageAdmin.index);
};