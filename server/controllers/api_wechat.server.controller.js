/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var shippmentLogic = require('../logics/shippment');
var wechatLogic = require('../logics/wechat');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();


exports.signin = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var openid = cookie.openid || '';
  var username = req.body.username;
  var password = req.body.password;

  agent.post('https://cn-api.openport.com/token/getMobiletoken')
    .send(
    {
      "device": {
        "identifyKey": "357990070920211",
        "deviceName": "LG-K350",
        "deviceType": "Android",
        "version": "6.0"
      },
      "app": {
        "appFrom": "",
        "appVersion": "5.4.0",
        "appId": "com.openport.delivery.uat"
      }, "networkType": "2",
      "language": "en",
      "regId": "de00d5cbc73d94ddff9c4c",
      "password": password,
      "userId": username
    }
    )
    .end(function (err, result) {
      result = JSON.parse(result.text)
      if (result.status === 200) {
        cookieLib.setCookie(res, 'accessToken', result.token.accessToken);
        cookieLib.setCookie(res, 'userName', result.user.userName);
        cookieLib.setCookie(res, 'phoneNumber', result.user.phoneNumber);
        cookieLib.setCookie(res, 'pic', result.user.pic);
        if (openid) {
          shippmentLogic.updateUserWechatInfo({ username: username, password: password, openid: openid }, function () { });
        }
      }
      console.log(result);
      return res.send(result);
    });
}

exports.uploadEvent = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  shippmentLogic.uploadEvent(cookie.accessToken, req.body, function (err, result) {
    return res.send(result);
  });
}

exports.createExpense = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  req.body.driver = cookie.userName;
  shippmentLogic.createExpense(cookie.accessToken, req.body, function (err, result) {
    return res.send(result);
  });
}

exports.getUserJsApiTicket = function (req, res, next) {
  wechatLogic.getUserJsApiTicket(req.body.url, function (err, data) {
    return res.send(data);
  });
}
var request = require("request");

exports.downloadPhoto = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var options = {
    method: 'GET',
    url: 'https://cn-api.openport.com/delivery/shipments/' + req.query.id + '/pic/' + req.query.fileId,
    headers:
      {
        'x-openport-token': cookie.accessToken
      }
  };
  req.pipe(request(options)).pipe(res);
}

exports.getDeliveriedShippments = function (req, res, next) {
  var username = cookie = cookieLib.getCookie(req).userName;
  shippmentLogic.getDeliveriedShippments(req.user, function (err, shippments) {
    return res.send(shippments);
  });
}

exports.updateUserSetting = function (req, res, next) {
  var username = cookie = cookieLib.getCookie(req).userName;
  var userInfo = req.body.user_info;
  userInfo.username = username;
  shippmentLogic.updateUserSetting(userInfo, function (err, user) {
    return res.send(err || user);
  });
}


exports.getUserSetting = function (req, res, next) {
  var username = cookie = cookieLib.getCookie(req).userName;
  shippmentLogic.getUserSetting(username, function (err, user) {
    return res.send(err || user);
  });
}






