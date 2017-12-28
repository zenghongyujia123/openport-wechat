/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
Shippmeng = appDb.model('Shippmeng');
User = appDb.model('User');
UserWechat = appDb.model('UserWechat');
var sysErr = require('./../errors/system');
var wechatLogic = require('./wechat.server.logic');
var moment = require('moment');
var that = exports;
var status = ['ETA', 'ETD', 'DELIVERED'];
var async = require('async');
var agent = require('superagent').agent();
var that = exports;

exports.shippments = function (accessToken, status, user, callback) {
  var now = new Date();
  agent.get('https://cn-api.openport.com/delivery/shipments')
    .set({
      'x-latest-date': new Date(now.setDate(now.getDate() - parseInt(user.old_shippment_count))).toISOString(),
      "x-openport-token": accessToken,
      "Content-Type": 'application/vnd.openport.delivery.v3+json'
    })
    .query({
      "accessToken": accessToken,
      "pageSize": "9999",
      "pageIndex": "1",
      "pastDeliveredShipmentDay": "1",
      "viewBy": 'ETD',
      "sortBy": 'Status'
    })
    .end(function (err, result) {
      result = JSON.parse(result.text);
      console.log(result.length);
      var shipments = [];
      var count = 0;
      async.eachSeries(result, function (idItem, eachCallback) {

        that.getDeliveriedShippment(idItem.id, user.username, function (err, shippment) {
          if (shippment) {
            shipments.push(getShippmentStatusString(shippment));
            return eachCallback();
          }
          that.shippment(accessToken, idItem.id, function (err, shippment) {
            if (!shippment) {
              return eachCallback();
            }

            shipments.push(getShippmentStatusString(shippment));
            console.log('count', count++);
            if (shippment.shipmentStatus === 'DELIVERED') {
              that.saveDeliveriedShippemnt(shippment, user.username, function () {
                return eachCallback();
              })
            }
            else {
              return eachCallback();
            }
          });
        });
      }, function (err) {
        return callback(null, shipments);
      });
    });
}

function getShippmentStatusString(shippment) {
  var str;
  switch (shippment.shipmentStatus) {
    case 'ETD':
      str = 'ready_for_pickup';
      if (new Date() > new Date(shippment.etdDate)) {
        str = 'delayed';
      }
      break;
    case 'ETA':
      str = 'to_be_delivered';
      if (new Date() > new Date(shippment.etaDate)) {
        str = 'delayed';
      }
      break;
    case 'DELIVERED':
      str = 'delivered';
      break;
  }
  shippment.statusStr = str;
  return shippment;
}


exports.shippment = function (accessToken, id, callback) {
  agent.get('https://cn-api.openport.com/delivery/shipments/' + id)
    .set({
      "Content-Type": "application/vnd.openport.delivery.v3+json",
      "x-openport-token": accessToken,
    })
    .end(function (err, result) {
      if (result.status !== 200) {
        return callback(null, null);
      }
      else {
        result = JSON.parse(result.text);
        return callback(null, result);
      }
    });
}

exports.uploadEvent = function (accessToken, data, callback) {
  data.wechat_ids = data.wechat_ids || [];
  data.eventDate = moment().format('YYYY-MM-DDTHH:mm:ss');
  async.each(data.wechat_ids, function (wechat_id, eachCallback) {
    wechatLogic.downloadImageFromWechat(wechat_id, accessToken, data.operation, data.shipment.id, function () {
      return eachCallback();
    })
  }, function () {
    agent.put('https://cn-api.openport.com/delivery/shipments/' + data.id)
      .set({
        'x-openport-token': accessToken,
        'Content-Type': 'application/vnd.openport.delivery.v2+json'
      })
      .send(data)
      .end(function (err, result) {
        result = JSON.parse(result.text);
        return callback(null, result);
      });

  })
}

exports.createExpense = function (accessToken, data, callback) {
  agent.put('https://cn-api.openport.com/delivery/expense/create')
    .set({
      'x-openport-token': accessToken,
      'Content-Type': 'application/vnd.openport.delivery.v3+json'
    })
    .send(data)
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(null, result);
    });
}

exports.expenseList = function (accessToken, callback) {
  agent.get('https://cn-api.openport.com/delivery/expense/list')
    .set({
      'x-openport-token': accessToken,
      'Content-Type': 'application/vnd.openport.delivery.v3+json'
    })
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(null, result);
    });
}


exports.rewards = function (accessToken, callback) {
  agent.get('https://cn-api.openport.com/delivery/rewards')
    .set({
      'x-openport-token': accessToken,
      'Content-Type': 'application/vnd.openport.delivery.v2+json'
    })
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(null, result);
    });
}


exports.rewardsTop10 = function (accessToken, callback) {
  agent.get('https://cn-api.openport.com/delivery/rewards/top10')
    .set({
      'x-openport-token': accessToken,
      'Content-Type': 'application/vnd.openport.delivery.v2+json'
    })
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(null, result);
    });
}

exports.downloadPhoto = function (accessToken, info, callback) {
  agent.get('https://cn-api.openport.com/delivery/shipments/' + info.id + '/pic/' + info.fileId)
    .set({
      'x-openport-token': accessToken,
      'Content-Type': 'application/vnd.openport.delivery.v2+json'
    })
    .end(function (err, result) {
      return callback(null, result);
    });
}

exports.saveDeliveriedShippemnt = function (shipmentInfo, username, callback) {
  Shippmeng.findOne({ shippment_id: shipmentInfo.id, username: username }, function (err, shippment) {
    if (err) {
      return callback('query shippment err');
    }

    if (shippment) {
      return callback();
    }

    shippment = new Shippmeng({
      shippment_id: shipmentInfo.id,
      content: shipmentInfo,
      username: username
    });
    shippment.save(function (err, saved) {
      return callback();
    });
  });
}

exports.getDeliveriedShippment = function (shippment_id, username, callback) {
  Shippmeng.findOne({ shippment_id: shippment_id, username: username }, function (err, shipment) {
    if (shipment) {
      shipment = shipment.content;
    }
    return callback(err, shipment)
  });
}
exports.getDeliveriedShippments = function (user, callback) {
  var date = new Date();
  date = new Date(date.setDate(date.getDate() - parseInt(user.old_deliveried_shippment_count)));
  Shippmeng.find({
    username: user.username,
    create_time: { $gte: date }
  })
    .exec(function (err, shipments) {
      if (err) {
        console.error(err);
      }

      var results = [];
      shipments.forEach(function (shippment) {
        results.push(getShippmentStatusString(shippment.content));
      });
      return callback(err, results)
    });
}

exports.updateUserSetting = function (userInfo, callback) {
  User.findOne({ username: userInfo.username }, function (err, user) {
    if (!user) {
      user = new User();
    }

    user.choose_country = userInfo.choose_country;
    user.choose_language = userInfo.choose_language;
    user.old_shippment_count = userInfo.old_shippment_count;
    user.old_deliveried_shippment_count = userInfo.old_deliveried_shippment_count;
    user.show_old_un_deliveried_shippment = userInfo.show_old_un_deliveried_shippment;
    user.show_grouping_by_truckloads = userInfo.show_grouping_by_truckloads;
    user.choose_list_view = userInfo.choose_list_view;
    user.choose_shippment_count = userInfo.choose_shippment_count;
    user.choose_icon_tab = userInfo.choose_icon_tab;
    user.save(function (err, saved) {
      return callback(err, saved);
    });
  });
}

exports.getUserSetting = function (username, callback) {
  User.findOne({ username: username }, function (err, user) {
    if (!user) {
      user = new User({
        username: username,
        choose_country: '中国',
        choose_language: '简体中文',
        old_shippment_count: '6',
        old_deliveried_shippment_count: '6',
        show_old_un_deliveried_shippment: '是',
        show_grouping_by_truckloads: '是',
        choose_list_view: '简单',
        choose_shippment_count: '10',
        choose_icon_tab: '是'
      });
      user.save(function (err, saved) {
        return callback(err, saved);
      });
    }
    else {
      return callback(null, user);
    }
  });
}

exports.updateUserWechatInfo = function (userInfo, callback) {
  UserWechat.findOne({ openid: userInfo.openid }, function (err, userWechat) {
    if (!userWechat) {
      userWechat = new UserWechat({
        openid: userInfo.openid
      });
    }
    userWechat.password = userInfo.password;
    userWechat.username = userInfo.username;
    userWechat.save(function () {
      return callback();
    });
  });
}

exports.getUserWechatInfo = function (openid, callback) {
  UserWechat.findOne({ openid: openid }, function (err, userWechat) {
    return callback(err, userWechat);
  });
}


// exports.downloadPhoto()

