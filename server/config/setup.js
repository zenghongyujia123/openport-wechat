/**
 * Created by Wayne on 15/10/10.
 */

//配置环境

'use strict';

 var config = require('./config');

module.exports = function () {

  if (!process.env) {
    process.env = {};
  }

  process.env.appDb = config.appDb;
  process.env.newAppDb = config.newAppDb;
  process.env.mapDb = config.mapDb;
  process.env.logDb = config.logDb;
  process.env.authDb = config.authDb;

  var mongo = require('../../libraries/mongoose');
  require('../../models/all')(mongo.appDb);
};
