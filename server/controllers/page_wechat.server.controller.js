/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var shippmentLogic = require('../logics/shippment');
var wechatLogic = require('../logics/wechat');
var moment = require('moment');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();




exports.page_home = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var username = cookie.userName;
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_home.client.view.html');

  if (req.query.status === 'DELIVERED') {
    shippmentLogic.getDeliveriedShippments(user, function (err, shippemnts) {
      return res.render(filepath, { status: req.query.status, user: user, shippments: shippemnts });
    });
  }
  else {
    shippmentLogic.shippments(cookie.accessToken, req.query.status, user, function (err, shippments) {
      console.log(shippments.length)
      return res.render(filepath, { status: req.query.status || 'ETD', user: user, shippments: shippments });
    });
  }
};

exports.page_detail = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  shippmentLogic.shippment(cookie.accessToken, req.query.id, function (err, shippment) {
    var filepath = '';
    if (shippment.statusId === 3 || shippment.statusId === 13 || shippment.statusId === 17) {
      filepath = path.join(__dirname, '../../web/c_wechat/views/page_detail_pickup.client.view.html');
    }
    else if (shippment.statusId === 5 || shippment.statusId === 15) {
      filepath = path.join(__dirname, '../../web/c_wechat/views/page_detail_complete.client.view.html');
    }
    else {
      filepath = path.join(__dirname, '../../web/c_wechat/views/page_detail_delivery.client.view.html');
    }
    console.log(shippment)
    return res.render(filepath, { shippment: shippment });
  });
};

exports.page_expense_list = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  shippmentLogic.expenseList(cookie.accessToken, function (err, result) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/page_expense_list.client.view.html');
    return res.render(filepath, { expenseList: result.expenses });
  });
};

exports.page_expense_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_expense_detail.client.view.html');
  return res.render(filepath, {});
};

exports.page_signin = function (req, res, next) {
  wechatLogic.getUserAccessToken(req.query.code, function (err, result) {
    if (result.openid) {
      cookieLib.setCookie(res, 'openid', result.openid);
      cookieLib.setCookie(res, 'user_access_token', result.access_token);

      shippmentLogic.getUserWechatInfo(result.openid, function (err, userWechat) {
        if (userWechat) {
          var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
          return res.render(filepath, { username: userWechat.username, password: userWechat.password });
        }
        else {
          var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
          return res.render(filepath, { username: '', password: '' });
        }
      });
    }
    else {
      var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
      return res.render(filepath, { username: '', password: '' });
    }
  });
};


exports.page_expense_add = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);


  shippmentLogic.getDeliveriedShippments(cookie.userName, function (err, shippments) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/page_expense_add.client.view.html');
    return res.render(filepath, { shippments: shippments });
  });
};

exports.page_profile = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_profile.client.view.html');
  shippmentLogic.rewards(cookie.accessToken, function (err, result) {
    shippmentLogic.rewardsTop10(cookie.accessToken, function (err, top) {
      return res.render(filepath, {
        userName: decodeURI(cookie.userName),
        pic: cookie.pic,
        phoneNumber: cookie.phoneNumber,
        rewards: result,
        topList: top.top10
      });
    });
  });
};

exports.page_search = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_search.client.view.html');
  return res.render(filepath, {});
};

exports.page_setting = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_setting.client.view.html');
  return res.render(filepath, { userName: decodeURI(cookie.userName), phoneNumber: cookie.phoneNumber, });
};

// exports.page_signin = function (req, res, next) {
//   var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
//   return res.render(filepath, {});
// };


