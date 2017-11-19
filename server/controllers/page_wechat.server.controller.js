/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
// var productLogic = require('../logics/product');

var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();

function getUserAccessToken(code, callback) {
  agent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf567e44e19240ae3&secret=fe0fad0d4eb9cedec995dbea06bd2f3b&code=' + code + '&grant_type=authorization_code ')
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


exports.home = function (req, res, next) {
  getUserAccessToken(req.query.code, function (err, result) {
    if (result.openid) {
      cookieLib.setCookie(res, 'openid', result.openid);
      cookieLib.setCookie(res, 'user_access_token', result.access_token);
      // getWechatUserInfo(result.openid, result.access_token);
    }
    var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
    req.cookies.city = req.params.city || req.cookies.city || '';
    cookieLib.setCookie(res, 'city', req.cookies.city);
    return res.render(filepath, { city: req.cookies.city });
  })
};
