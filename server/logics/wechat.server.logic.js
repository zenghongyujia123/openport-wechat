import { timeout } from '../../../../Library/Caches/typescript/2.6/node_modules/@types/async';

/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var cryptoLib = require('../../libraries/crypto');
var agent = require('superagent').agent();
var moment = require('moment');
var access_token = '';
var appid = 'wx5b9d79d49848e982';
var sk = '1500a633040b1c3e719dc5cd2d39b9b0';

var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var that = exports;

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

exports.getAccessToken = function (callback) {
  agent.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + sk)
    .end(function (err, result) {
      console.log('err-----');
      console.log(err);
      console.log('result-----');
      console.log(result.text);

      access_token = JSON.parse(result.text).access_token;
      console.log('access_token : ', access_token);
      callback(err, access_token);
    });
}

exports.getUserAccessToken = function (code, callback) {
  agent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + sk + '&code=' + code + '&grant_type=authorization_code ')
    .end(function (err, result) {
      console.log(' code err-----');
      console.log(err);
      console.log('code  result-----');
      console.log(result.text);
      result = JSON.parse(result.text);
      access_token = result.access_token;
      console.log('user_access_token : ', access_token);
      callback(err, result);
    });
}

exports.getUserJsApiTicket = function (callback, url) {
  agent.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi')
    .end(function (err, result) {
      var ticket = JSON.parse(result.text).ticket;
      console.log('getUserJsApiTicket', ticket);

      var noncestr = new Date().getTime().toString();
      var timestamp = new Date().getTime();

      var str = [
        'jsapi_ticket=' + ticket,
        'noncestr=' + noncestr,
        'timestamp=' + timestamp,
        'url=' + url
      ];
      str = str.sort().join('&');
      console.log(str);
      var signature = cryptoLib.toSHA1(str);

      if (callback)
        callback(err, {
          ticket: ticket,
          noncestr: noncestr,
          timestamp: timestamp,
          signature: signature,
          appid: appid
        });
    });
}

timeout(function () {
  that.getAccessToken(function () {
    console.log(new Date(), 'get access token ,', access_token);
  });
}, 100000)

that.getAccessToken(function () {
  console.log(new Date(), 'get access token ,', access_token);
});

