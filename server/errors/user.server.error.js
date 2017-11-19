'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
    username_empty: { err: { type: 'username_empty', message: 'username is empty', zh_message: '用户名不能为空' } },
    password_empty: { err: { type: 'password_is_empty', message: 'password is empty', zh_message: '密码不能为空' } }
});