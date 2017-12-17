/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var sysErr = require('./../errors/system');

var that = exports;
var status = ['ETA', 'ETD', 'DELIVERED'];
var async = require('async');
var agent = require('superagent').agent();
var that = exports;

exports.shippments = function (accessToken, status, callback) {
  agent.get('https://cn-api.openport.com/delivery/shipments')
    .set({
      'x-latest-date': '2017-12-16T00:13:01',
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

      var shipments = [];
      async.each(result, function (idItem, eachCallback) {
        that.shippment(accessToken, idItem.id, function (err, shippment) {
          shipments.push(shippment);
          return eachCallback();
        })
      }, function (err) {
        return callback(null, shipments);
      });
    });
}

exports.shippment = function (accessToken, id, callback) {
  agent.get('https://cn-api.openport.com/delivery/shipments/' + id)
    .set({
      "x-openport-token": accessToken,
    })
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(null, result);
    });
}

exports.uploadEvent = function (accessToken, data, callback) {
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


