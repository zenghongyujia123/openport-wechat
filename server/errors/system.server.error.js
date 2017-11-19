'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
    internal_system_error: {type: 'internal_system_error', message: 'internal system error', zh_message: '系统内部出错'},
    database_connect_error: {type: 'database_connect_error', message: 'database connect failed', zh_message: '数据库连接失败'},
    database_query_error: {type: 'database_query_error', message: 'Database query failed', zh_message: '数据库查询出错'},
    database_update_error: {type: 'database_update_error', message: 'Database update failed', zh_message: '数据库更新出错'},
    database_save_error: {type: 'database_save_error', message: 'Database save failed', zh_message: '数据库更新出错'},
    database_remove_error: {type: 'database_remove_error', message: 'Database record remove failed', zh_message: '数据库记录移除失败'}
});