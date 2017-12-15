/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
// var productLogic = require('../logics/product');

var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();


exports.signin = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  agent.post('https://cn-api.openport.com/token/getMobiletoken')
    .send(
    { "status": 200, "message": "OK", "ping": { "distance": 0.5, "movingTimeInterval": 300, "stuckTimeInterval": 1800 }, "refreshSeconds": 300, "token": { "accessToken": "ca64f428d342ef859d2a08d6514bdb57af014a45", "expires": "2017-12-15 11:12:06.0" }, "user": { "companyLogo": "theCompanyLogo.png", "emailAddress": "hardy@zhuzhu56.com", "isBackground": false, "phoneNumber": "13472423583", "pic": "", "role": "Driver", "userName": "Hardy Zeng" } }
    )
    .end(function (err, result) {
      console.log(result.body);
      return res.send(result);
    });
}
