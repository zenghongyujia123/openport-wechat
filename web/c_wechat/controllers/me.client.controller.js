$(function () {
  var vipTime = $('.vip-time').text();
  if (vipTime) {
    var start = new Date(vipTime);
    var end = new Date(new Date(vipTime).setMonth(new Date(vipTime).getMonth() + 2));
    var date = getDurationDays(start, end);
    $('.vip-time').text('您的会员将在' + date + '后失效');
  }
});