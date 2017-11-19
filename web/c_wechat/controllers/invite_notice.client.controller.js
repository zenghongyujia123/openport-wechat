$(function () {
  $('.notice-btn').click(function () {
    alert('您不是邀请用户，无法获得服务');
    window.location = '/page_wechat/vip_notice';
  });
});