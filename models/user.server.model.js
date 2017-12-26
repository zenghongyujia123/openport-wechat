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
      type: String
    },
    password: {
      type: String
    },
    openid: {
      type: String,
      trim: true
    },
    choose_country: { type: String },
    choose_language: { type: String },
    old_shippment_count: { type: String },
    old_deliveried_shippment_count: { type: String },
    show_old_un_deliveried_shippment: { type: String },
    show_grouping_by_truckloads: { type: String },
    choose_list_view: { type: String },
    choose_shippment_count: { type: String },
    choose_icon_tab: { type: String },
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
};
