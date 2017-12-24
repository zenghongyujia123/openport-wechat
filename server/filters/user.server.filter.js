'use strict';

var cookieLib = require('../../libraries/cookie');
var mongoose = require('./../../libraries/mongoose');
var shippmentLogic = require('../logics/shippment');
exports.requireUser = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  shippmentLogic.getUserSetting(cookie.userName, function (err, user) {
    if (!user) {
      return res.redirect('/page_wechat/page_signin');
    }

    req.user = user;
    return next();
  })
};