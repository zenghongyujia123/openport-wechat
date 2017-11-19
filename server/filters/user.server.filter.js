'use strict';

var cookieLib = require('../../libraries/cookie');
var userLogic = require('../logics/user');
var async = require('async');
var agent = require('superagent').agent();

function getWechatUserInfo(openid, user_access_token, callback) {
  agent.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + user_access_token + '&openid=' + openid + '&lang=zh_CN')
    .end(function (err, result) {
      console.log('err-----');
      console.log(err);
      console.log('userinfo  result-----');
      console.log(result.text);
      if (callback) {
        return callback(null, JSON.parse(result.text));
      }
    });
}

exports.requireUser = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  console.log('cookie:', cookie);

  userLogic.requireByUserId(cookie.user_id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/page_wechat/signin')
    }

    async.auto({
      getUserWechatInfo: function (callback) {
        if (!cookie.openid) {
          return callback();
        }

        if (user.openid === cookie.openid && user.wechat_info && user.wechat_info.openid) {
          return callback();
        }

        getWechatUserInfo(cookie.openid, cookie.user_access_token, function (err, wechat_info) {
          return callback(err, wechat_info);
        });
      },
      saveUserWechatInfo: ['getUserWechatInfo', function (callback, result) {
        var wechat_info = result.getUserWechatInfo;
        if (!wechat_info || !wechat_info.openid) {
          return callback();
        }
        userLogic.updateUserWechatInfo(user, cookie.openid, wechat_info, function (err, user) {
          if (err) {
            return callback(err);
          }
          return callback(err, user);
        });
      }
      ]
    }, function (err, results) {
      if (err) {
        return next(err);
      }

      req.user = user;

      if (results.saveUserWechatInfo) {
        req.user = results.saveUserWechatInfo;
      }

      return next();
    });

    // if (cookie.openid) {
    //   user.openid = cookie.openid;
    //   user.save(function (err, savedUser) {
    //     if (err) {
    //       return next(err);
    //     }
    //     req.user = savedUser;
    //     return next();
    //   });
    // }
    // else {
    //   req.user = user;
    //   return next();
    // }
  })
};


exports.requireUserById = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  userLogic.requireByUserId(req.body.user_id || req.query.user_id || req.params.user_id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/page_wechat/signin')
    }

    // if (cookie.openid) {
    //   user.openid = cookie.openid;
    //   user.save(function (err, savedUser) {
    //     if (err) {
    //       return next(err);
    //     }
    //     req.requireUserById = savedUser;
    //     return next();
    //   });
    // }
    // else {
    req.requireUserById = user;
    // return next();
    return next();
    // }
  })
};