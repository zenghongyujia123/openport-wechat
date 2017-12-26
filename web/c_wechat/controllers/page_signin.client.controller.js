$(function () {
  $('.o-submit').click(function () {
    var username = $('.username').val();
    var password = $('.password').val();
    if (!username) {
      return alert('请输入手机号');
    }

    if (!password) {
      return alert('请输入密码');
    }

    $.showLoading("正在加载...");

    $.ajax({
      url: '/api_wechat/signin',
      method: 'post',
      data: {
        username: username,
        password: password
      },
      success: function (data) {
        if (data.status !== 200) {
          $.hideLoading();
          return alert(data.message);
        }
        console.log(data);
        window.location = '/page_wechat/page_home';
      }
    });
  });

  if ($('.username').val()) {
    $('.o-submit').click();
  }
});