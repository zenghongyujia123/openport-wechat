$(function () {
  $('.signup-btn').click(function () {
    var username = $('.username').val();
    var password = $('.password').val();
    if (!username) {
      return alert('请输入手机号');
    }

    if (!password) {
      return alert('请输入密码');
    }

    $.ajax({
      url: '/user/signin',
      method: 'post',
      data: {
        user_info: {
          username: username,
          password: password
        }
      },
      success: function (data) {
        if (data.err) {
          return alert(data.err.zh_message);
        }
        console.log(data);
        if (data.success) {
          window.location = '/page_wechat/home';
        }
      }
    });

  });
});