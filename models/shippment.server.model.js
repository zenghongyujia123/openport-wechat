/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var ShippmengSchema = new Schema({
    object: {
      type: String,
      default: 'Shippent'
    },
    shippment_id: {
      type: String,
      required: true
    },
    content: {
      type: Schema.Types.Mixed
    }
  });

  ShippmengSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Shippmeng', ShippmengSchema);
};
