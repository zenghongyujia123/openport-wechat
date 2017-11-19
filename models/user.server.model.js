/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var UserSchema = new Schema({
    object: {
      type: String,
      default: 'User'
    },
    username: {
      type: String,
      trim: true
    },
    real_name: {
      type: String,
      trim: true
    },
    real_phone: {
      type: String,
      trim: true
    },
    id_card: {
      type: String,
      trim: true
    },
    openid: {
      type: String,
      trim: true
    },
    wechat_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    password: {
      type: String,
      default: ''
    },
    nickname: {
      type: String
    },
    sex: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    country: {
      type: String
    },
    description: {//描述
      type: String
    },
    head_photo: {
      type: String
    },
    payment_id: {//支付需要的唯一标识 也是关注该公众号的用户的openid，并非是用户登录的openid，他们的unionid是相同的
      type: String
    },
    device_registration_id: {//jpush听众的唯一注册号id，用于push定向通知  可变
      type: String
    },
    salt: {
      type: String,
      default: 'secret'
    },
    deleted_status: {
      type: Boolean,
      default: false
    },
    carrier_detail: {
      type: Schema.Types.Mixed
    },
    carrier_token: {
      type: String,
      default: ''
    },
    carrier_token_time: {
      type: Date,
    },
    pbc_detail: {
      type: Schema.Types.Mixed
    },
    pbc_token: {
      type: String,
      default: ''
    },
    pbc_token_time: {
      type: Date,
    },
    has_read_vip_notice: {
      type: Boolean,
      default: false
    },
    has_read_invite_notice: {
      type: Boolean,
      default: false
    },
    vip_payed: {
      type: Boolean,
      default: false
    },
    vip_payed_time: {
      type: Date
    },
    vip_status: {
      type: String,
      enum: ['un_submit', 'submit', 'passed'],
      default: 'un_submit'
    },
    vip_status_submit_time: {
      type: Date
    },
    vip_product_ids: {
      type: []
    },
    vip_card_ids: {
      type: []
    },
    //vip_推荐信用初值
    vip_credit_starter: {
      type: String,
      default: ''
    },
    //vip_推荐信用估值
    vip_credit_assessment: {
      type: String,
      default: ''
    },
    //vip跳转连接文本
    vip_report_url_text: {
      type: String,
      default: ''
    },
    //vip产品推荐文本
    vip_product_assessment_text: {
      type: String,
      default: ''
    },
    vip_report: {
      type: Schema.Types.Mixed
    }
  });

  UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
      return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
      return password;
    }
  };

  UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
  };

  var UserPaySchema = new Schema({
    object: {
      type: String,
      default: 'UserPay'
    },
    type: {
      type: String,
      enum: ['vip_pay']
    },
    user_id: {
      type: String,
    },
    content: {
      type: Schema.Types.Mixed
    }
  });

  var UserVipReportSchema = new Schema({
    object: {
      type: String,
      default: 'UserVipReport'
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
  var UserPay = appDb.model('UserPay', UserPaySchema);
};
