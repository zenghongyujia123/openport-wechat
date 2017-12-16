/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var shippmentLogic = require('../logics/shippment');

var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();


exports.signin = function (req, res, next) {
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

