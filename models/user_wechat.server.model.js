/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var UserWechatSchema = new Schema({
    object: {
      type: String,
      default: 'UserWechat'
    },
    username: {
      type: String
    },
    password: {
      type: String
    },
    openid: {
      type: String,
      trim: true
    }
  });

  UserWechatSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('UserWechat', UserWechatSchema);
};
