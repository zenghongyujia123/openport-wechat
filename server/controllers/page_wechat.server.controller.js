/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var cardLogic = require('../logics/card');

var userLogic = require('../logics/user');
var creditPeopleLogic = require('../logics/credit_people');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();

// function getWechatUserInfo(openid, user_access_token, callback) {
//   agent.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + user_access_token + '&openid=' + openid + '&lang=zh_CN')
//     .end(function (err, result) {
//       console.log('err-----');
//       console.log(err);
//       console.log('userinfo  result-----');
//       console.log(result.text);
//       if (callback) {
//         return callback();
//       }
//     });
// }
function getUserAccessToken(code, callback) {
  agent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf567e44e19240ae3&secret=fe0fad0d4eb9cedec995dbea06bd2f3b&code=' + code + '&grant_type=authorization_code ')
    .end(function (err, result) {
      console.log(' code err-----');
      console.log(err);
      console.log('code  result-----');
      console.log(result.text);
      result = JSON.parse(result.text);
      access_token = result.access_token;
      console.log('user_access_token : ', access_token);
      callback(err, result);
    });
}


exports.home = function (req, res, next) {
  getUserAccessToken(req.query.code, function (err, result) {
    if (result.openid) {
      cookieLib.setCookie(res, 'openid', result.openid);
      cookieLib.setCookie(res, 'user_access_token', result.access_token);
      // getWechatUserInfo(result.openid, result.access_token);
    }
    var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
    req.cookies.city = req.params.city || req.cookies.city || '';
    cookieLib.setCookie(res, 'city', req.cookies.city);
    return res.render(filepath, { city: req.cookies.city });
  })
};

exports.result = function (req, res, next) {
  var xinyongs = [
    {
      text: '差',
      value: '2500元',
      codes: [
        '3113', '3114', '3123', '3124', '3133', '3134', '3143', '3144',
        '3213', '3214', '3313', '3314', '3413', '3414', '4114', '4123',
        '4124', '4133', '4134', '4143', '4144', '4213', '4214', '4313',
        '4314', '4413', '4414', '4113'
      ],
      risk_codes: [
        'G2', 'M1'
      ]
    },
    {
      text: '一般',
      value: '5000元',
      codes: [
        '3233', '3234', '3243', '3244', '3323', '3324', '3343', '3344', '3423',
        '3424', '4233', '4234', '4243', '4244', '4323', '4324', '4333', '4334',
        '4343', '4423', '4424'
      ],
      risk_codes: [
        'Z2', 'Z3', 'G1', 'G2'
      ]
    },

    {
      text: '差',
      value: '3500元',
      codes: [
        '3223', '3224', '4223', '4224'
      ],
      risk_codes: [
        'G2', 'M1'
      ]
    },

    {
      text: '差',
      value: '1000元',
      codes: [
        '3333', '3334'
      ],
      risk_codes: [
        'M2', 'M3'
      ]
    },

    {
      text: '较好',
      value: '7000元',
      codes: [
        '3433', '3443', '4344', '4433'
      ],
      risk_codes: [
        'Z2', 'Z3', 'G1', 'G2', 'M1', 'M2', 'M3', 'GQ'
      ]
    },

    {
      text: '很好',
      value: '10000元',
      codes: [
        '3434', '4434'
      ],
      risk_codes: [
        'Z1', 'Z2', 'Z3', 'G1', 'G2', 'M1', 'M2', 'M3', 'GQ'
      ]
    },
    {
      text: '非常好',
      value: '20000元',
      codes: [
        '3444', '4443', '4444'
      ],
      risk_codes: [
        'Y1', 'Y2', 'Y3', 'Z1', 'Z2', 'Z3', 'G1', 'G2', 'M1', 'M2', 'M3', 'GQ'
      ]
    }
  ];


  var result = null;
  xinyongs.forEach(function (item) {
    if (item.codes.indexOf(req.query.code) >= 0) {
      result = item;
    }
  });


  productLogic.productsByRiskCode(result.risk_codes, function (err, products) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/result.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      text: result.text || '',
      price: result.value || '',
      products: products || []
    });
  });
};

exports.product_detail = function (req, res, next) {
  var product = req.product || {};
  var filepath = path.join(__dirname, '../../web/c_wechat/views/product_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city, product: product });
};

exports.question = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/question.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.me = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: user });
};

exports.signin = function (req, res, next) {
  var openid = req.cookies.openid;
  console.log('openid ,', openid);
  var filepath = path.join(__dirname, '../../web/c_wechat/views/signin.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.signup = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/signup.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.me_info = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_info.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_business = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_business.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_vip = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_vip.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};


exports.me_account = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_account.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_bill = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_bill.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_agent = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_agent.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_achievement = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_achievement.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};


exports.apply_third = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/apply_third.client.view.html');
  // return res.render(filepath, { city: req.cookies.city });
  return res.redirect('https://www.baidu.com');
};


exports.card_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_list.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.card_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.card_home = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_home.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.card_progress = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_progress.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.self_home = function (req, res, next) {
  var info = {
    query_key: req.query.query_key,
    query_value: req.query.query_value,
    sort_key: req.query.sort_key,
    sort_value: req.query.sort_value,
  };
  productLogic.productList(info, function (err, products) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_home.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      products: products || [],
      cur_filter: info.query_key || info.sort_key || ''
    });
  });
};

exports.self_local = function (req, res, next) {
  creditPeopleLogic.creditPeopleList(function (err, credit_people_list) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_local.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      credit_people_list: credit_people_list || []
    });
  });
};

exports.credit_people_detail = function (req, res, next) {
  var credit_people = req.credit_people;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/credit_people_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city, credit_people: credit_people });
};

exports.vip_base_info = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_base_info.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_auth_info = function (req, res, next) {
  var user = req.user;
  if (!user.has_read_vip_notice) {
    userLogic.updateVipNotice(user, function (err, result) {
    });
  }
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_1.client.view.html');

  if (user.vip_payed) {
    filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_2.client.view.html');
  }

  if (user.vip_status === 'submit') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_3.client.view.html');
  }

  if (user.vip_status === 'passed') {
    productLogic.productListByIds(user.vip_product_ids, function (err, products) {
      cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
        filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result.client.view.html');
        return res.render(filepath, { city: req.cookies.city, user: user, products: products, cards: cards });
      });
    });
  }
  else {
    return res.render(filepath, { city: req.cookies.city, user: user });
  }
};

exports.vip_result = function (req, res, next) {
  var user = req.user;
  productLogic.productListByIds(user.vip_product_ids, function (err, products) {
    cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
      filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result.client.view.html');
      return res.render(filepath, { city: req.cookies.city, user: user, products: products, cards: cards });
    });
  });
};


exports.vip_auth_1 = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_1.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_auth_2 = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_2.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: user });
};

exports.vip_auth_3 = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_3.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_notice = function (req, res, next) {
  var user = req.user;
  if (user.has_read_vip_notice) {
    return res.redirect('/page_wechat/vip_auth_info');
  }
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_notice.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_auth_report = function (req, res, next) {
  var user = req.user;
  var vip_report = user.vip_report || {};
  vip_report.str29s = vip_report.str29s || [];
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_report.client.view.html');
  return res.render(filepath, { city: req.cookies.city, vip_report: vip_report });
};


exports.invite_notice = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/invite_notice.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};