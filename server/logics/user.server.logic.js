/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var User = appDb.model('User');
var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.signup = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.password) {
    return callback({ err: { type: 'password_empty', zh_message: '用户密码不能为空' } });
  }

  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (user) {
      return callback({ err: { type: 'username_exist', zh_message: '该用户已存在' } });
    }

    user = new User({
      username: userInfo.username,
      openid: userInfo.openid
    });
    user.password = user.hashPassword(userInfo.password);
    user.save(function (err, saveUser) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, { success: true, user_id: saveUser._id });
    });
  });
}

exports.signin = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.username) {
    return callback({ err: { type: 'password_empty', zh_message: '用户名不能为空' } });
  }
  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!user) {
      return callback({ err: { type: 'user_not_exist', zh_message: '用户不存在' } });
    }

    if (user.password !== user.hashPassword(userInfo.password)) {
      return callback({ err: { type: 'user_not_valid', zh_message: '用户名或密码错误' } });
    }

    return callback(null, { success: true, user_id: user._id });
  });
};

exports.updateUserWechatInfo = function (user, openid, wechat_info, callback) {
  if (user.openid === openid && user.wechat_info && user.wechat_info.openid) {
    console.log('updateUserWechatInfo  1');
    return callback(null, user);
  }

  User.findOne({ openid: openid }, function (err, oldUser) {
    if (err) {
      console.log('updateUserWechatInfo  2');

      return callback({ err: sysErr.database_query_error });
    }


    if (oldUser) {
      oldUser.openid = null;
      oldUser.wechat_info = {};
      oldUser.save(function () {
        user.openid = openid;
        user.wechat_info = wechat_info;
        user.save(function (err, savedUser) {
          console.log('updateUserWechatInfo  3');

          return callback(err, savedUser)
        })
      });
    }
    else {
      user.openid = openid;
      user.wechat_info = wechat_info;
      user.save(function (err, savedUser) {
        console.log('updateUserWechatInfo  4');

        return callback(err, savedUser)
      })
    }


  })
}

exports.requireByUserId = function (userid, callback) {
  User.findOne({ _id: userid }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, user);
  });
}

exports.saveCarrierToken = function (user, token, callback) {
  user.carrier_token = token;
  user.carrier_token_time = new Date();
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.saveCarrierDetail = function (user, detail, callback) {
  User.findOne({ _id: user._id }, function (err, u) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    u.carrier_detail = detail;
    u.save(function (err, saveUser) {
      if (err) {
        console.log('err2');
        console.log(err);
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, saveUser);
    });
  })

}

exports.savePbcToken = function (user, token, callback) {
  user.pbc_token = token;
  user.pbc_token_time = new Date();
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.savePbcDetail = function (user, detail, callback) {
  User.findOne({ _id: user._id }, function (err, u) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    u.pbc_detail = detail;
    u.save(function (err, saveUser) {
      if (err) {
        console.log('err1');
        console.log(err);
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, saveUser);
    });
  });
}

exports.updateVipNotice = function (user, callback) {
  user.has_read_vip_notice = true;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.updateInviceNotice = function (user, callback) {
  user.has_read_invite_notice = true;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}


exports.updateUserAuth1 = function (user, real_name, real_phone, id_card, callback) {
  user.real_name = real_name;
  user.real_phone = real_phone;
  user.id_card = id_card;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.updateVipPayedByOpenid = function (openid, info, callback) {
  User.findOne({ openid: openid }, function (err, user) {
    if (!user) {
      return callback();
    }

    UserPay.findOne({ 'content.transaction_id': info.transaction_id }, function (err, userPay) {
      if (userPay) {
        return callback();
      }
      userPay = new UserPay({
        type: 'vip_pay',
        user_id: user._id,
        content: info
      });
      userPay.save(function () {
        user.vip_payed = true;
        user.vip_payed_time = new Date();
        user.save(function (err) {
          return callback();
        });
      })
    });


  });
}

exports.updateUserAuth2 = function (user, callback) {
  user.vip_status = 'submit';
  user.vip_status_submit_time = new Date();
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.userList = function (callback) {
  User.find({}, function (err, users) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, users);
  })
}

exports.verifyVip = function (user, callback) {
  user.vip_status = 'passed';
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}
exports.updateVipInfo = function (user, vip_info, callback) {
  user.vip_credit_assessment = vip_info.vip_credit_assessment;
  user.vip_credit_starter = vip_info.vip_credit_starter;
  user.vip_report_url_text = vip_info.vip_report_url_text;
  user.vip_product_ids = vip_info.vip_product_ids;
  user.vip_card_ids = vip_info.vip_card_ids;

  user.markModified('vip_product_ids');
  user.markModified('vip_card_ids');
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}


exports.updateVipReportInfo = function (user, vip_report, callback) {
  vip_report.str29s = (vip_report.str29 || '').split('|');
  user.vip_report = vip_report;
  user.markModified('vip_report');
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

