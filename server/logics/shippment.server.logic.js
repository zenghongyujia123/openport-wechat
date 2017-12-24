/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
Shippmeng = appDb.model('Shippmeng');
var sysErr = require('./../errors/system');
var wechatLogic = require('./wechat.server.logic');
var moment = require('moment');
var that = exports;
var status = ['ETA', 'ETD', 'DELIVERED'];
var async = require('async');
var agent = require('superagent').agent();
var that = exports;

exports.shippments = function (accessToken, status, username, callback) {
  var now = new Date();
  agent.get('https://cn-api.openport.com/delivery/shipments')
    .set({
      'x-latest-date': new Date(now.setDate(now.getDate() - 7)).toISOString(),
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

        that.getDeliveriedShippment(idItem.id, username, function (err, shippment) {
          if (shippment) {
            shipments.push(shippment);
            return eachCallback();
          }
          that.shippment(accessToken, idItem.id, function (err, shippment) {
            if (!shippment) {
              return eachCallback();
            }

            shipments.push(shippment);
            console.log('count', count++);
            if (shippment.shipmentStatus === 'DELIVERED') {
              that.saveDeliveriedShippemnt(shippment, username, function () {
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

exports.getDeliveriedShippments = function (username, callback) {
  Shippmeng.find({ username: username }, function (err, shippments) {
    if (err) {
      console.error(err);
      return callback(null, []);
    }
    return callback(null, shippments);
  })
}


// exports.downloadPhoto()

