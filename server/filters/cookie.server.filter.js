'use strict';

var productLogic = require('../logics/product');

exports.requireProduct = function (req, res, next) {
  var product_id = req.body.product_id || req.query.product_id || req.params.product_id || '';
  productLogic.productDetail(product_id, function (err, product) {
    if (err) {
      return next(err);
    }
    req.product = product;
    return next();
  })
};