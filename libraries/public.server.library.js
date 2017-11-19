/**
 * Created by elinaguo on 15/10/19.
 */
'use strict';
var self = exports;
exports.isNullOrEmpty = function (value) {
  return (value === undefined || value === null || value === '');
};
exports.isTrue = function (value) {
  if (self.isNullOrEmpty(value))
    return false;

  return (value.toString().toLowerCase() === 'true');
};

exports.isString = function (value) {
  return Object.prototype.toString.call(value) === "[object String]";
};

Array.prototype.objectIndexOf = function (objectKey, value) {
  value = value || '';

  for (var i = 0; i < this.length; i++) {
    if (this[i] && this[i][objectKey] && value && this[i][objectKey].toString() === value.toString()) {
      return i;
    }
  }
  return -1;
};
Array.prototype.distinct = function () {
  if (this.length === 0) {
    return [];
  }
  return this.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
};

Date.prototype.Format = function (fmt) {
  /// <summary>
  /// 对Date的扩展，将 Date 转化为指定格式的String
  /// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  /// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  /// 例子：
  /// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  /// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  /// </summary>
  /// <param name="fmt"></param>
  /// <returns type=""></returns>
  var o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
};


String.prototype.Trim = function () {
  /// <summary>
  /// 字符串去除前后空格
  /// </summary>
  /// <returns type=""></returns>
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
//数字解析，解析不出来返回null
function parseIntNumber(numberString){
  if (!(/((^[1-9]|^\-[1-9])[0-9]*$)|^0$/).test(numberString)) {
    return null;
  }

  var number = parseInt(numberString);
  //isFinite() 用于检查其参数值是否是有限.  true表示有限，false表示无限大
  number = !isNaN(number) && isFinite(number) ? number : null;
  return number;
}
exports.parseIntNumber = parseIntNumber;

exports.isTimeStampMoreThan2000 = function (timeStamp) {
  return timeSpan - new Date('2000/01/01').getTime() > 0;
};

//正整数解析
exports.parsePositiveIntNumber = function (numberString) {
  var number = self.parseIntNumber(numberString);
  if (number === null) {
    return null;
  }

  if (number <= 0) {
    return null;
  }

  return number;
};

//非负整数解析（正整数和0）
exports.parseNonNegativeIntNumber = function (numberString) {
  var number = self.parseIntNumber(numberString);
  if (number === null) {
    return null;
  }

  if (number < 0) {
    return null;
  }

  return number;
};

function parseFloatNumber(numberText) {
  if (!(/^-?(\d+)(\.\d+)?$/).test(numberText)) {
    return null;
  }

  var number = parseFloat(numberText);
  //isFinite() 用于检查其参数值是否是有限.  true表示有限，false表示无限大
  number = !isNaN(number) && isFinite(number) ? number : null;
  return number;
}

exports.parseFloatNumber = parseFloatNumber;

exports.parseLocation = function (centerLocationParams) {
  if (!Array.isArray(centerLocationParams) || centerLocationParams.length !== 2) {
    return [];
  }

  var longitude = parseFloatNumber(centerLocationParams[0]);
  var latitude = parseFloatNumber(centerLocationParams[1]);

  if (longitude < 0 && latitude < 0) {
    return [];
  }

  return [longitude, latitude];
};

//是否为布尔值
exports.isBoolean = function (value) {
  if (self.isNullOrEmpty(value))
    return false;

  var valueString = value.toString().toLowerCase();
  return (valueString === 'true' || valueString === 'false');
};
//布尔值解析
exports.booleanParse = function (value) {
  if (self.isNullOrEmpty(value))
    return null;

  var valueString = value.toString().toLowerCase();
  return valueString === 'true' ? true : (valueString === 'false' ? false : null);
};
//布尔值(含0或1)解析
exports.allBooleanParse = function (value) {
  if (self.isNullOrEmpty(value))
    return null;

  var valueString = value.toString().toLowerCase();
  return valueString === 'true' ||  valueString === '1' ? true : (valueString === 'false' || valueString === '0' ? false : null);
};


function validPhone(phone) {
  var phoneReg = /^((\+?[0-9]{2,2}))?1\d{10}$/;
  if (!phoneReg.test(phone)) {
    return false;
  }

  return true;
}

function validInternationalPhone(phone) {
  var phoneReg = /^\+[0-9]+$/;
  if (!phoneReg.test(phone) || phone.length >= 20) {
    return false;
  }

  return true;
}

exports.validPhone = validPhone;

exports.validAllKindOfPhone = validInternationalPhone;

exports.validMail = function (str) {
  //邮箱正则
  var mailReg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,}){1,2})$/;
  if (!mailReg.test(str)) {
    return false;
  }

  return true;
};

exports.parseToDate = function (time) {
  if (time && time.Format) {
    return new Date(time.Format('yyyy/MM/dd'));
  }

  return null;
};


function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomString(mixString) {
  var dateBytes = new Date().Format('yyMMdd').split('').reverse();
  var mixBytes = mixString.split('').reverse();

  var mixLength = mixBytes.length;
  //获取mixBytes中某一个, 并计算大小写
  for (var i = 0; i < mixLength; i++) {
    var randomIndex = getRandomIndex(mixLength - i);
    var code = mixBytes.splice(randomIndex, 1);
    if (i % 2 === 0) {
      code = code[0].toUpperCase();
    }
    else {
      code = code[0].toLowerCase();
    }

    var randomIndex1 = getRandomIndex(dateBytes.length);
    dateBytes.splice(randomIndex1, 0, code);
  }

  return dateBytes.join('');
}

exports.generateRandomString = generateRandomString;

//去掉括号（圆括号或者中括号）
String.prototype.removeBrackets = function () {
  var result = '';
  if (this) {
    var regex = /(\(|\)|\[|\])/g;
    result = this.replace(regex, '');
  }
  return result;
};

exports.getStackError = function (err) {
  console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'));
  if (err && err.stack) {
    console.log(err.stack);
  }
  console.trace();

  return err;
};

exports.validPhoneByCountry = function (phone, country) {
  if (country === 'china') {
    return validPhone(phone);
  } else {
    return validInternationalPhone(phone);
  }
};


exports.getReplaceDirSpecialCharReg = function () {
  return /[:：\/]/g;
};

function getDateTypeData(timeString){
  var newDate;
  var dateTimeStamp = parseIntNumber(timeString);
  if(dateTimeStamp){
    newDate = new Date(dateTimeStamp);
  }else{
    newDate = new Date(timeString);
  }

  if(newDate && newDate.getTime()){
    return newDate;
  }else{
    return null;
  }
}

exports.parseStringToDate = getDateTypeData;
