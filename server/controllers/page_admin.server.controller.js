/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
// var productLogic = require('../logics/product');

exports.index = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_backend/site_admin/index.html');
  console.log(filepath);
  return res.sendFile(filepath);
};