/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var sysErr = require('./../errors/system');

var that = exports;
var status = ['ETA', 'ETD', 'DELIVERED'];
var agent = require('superagent').agent();

exports.shippments = function (accessToken, status, callback) {
  agent.post('https://cn-api.openport.com/delivery/shipments')
    .set('x-latest-date', '2017-12-02T00:13:01')
    .send({
      "accessToken": accessToken,
      "eta": "2017-12-14",
      "pageSize": "9999",
      "pageIndex": "1",
      "pastDeliveredShipmentDay": "1",
      "viewBy": 'Status',
      "sortBy": 'ETD'
    })
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(null, result);
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
