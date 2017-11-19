$(function () {
  $('.signup-btn').click(function () {
    var username = $('.username').val();
    var password = $('.password').val();
    var repassword = $('.repassword').val();
    var verify_code = $('.verify_code').val();
    var invite_code = $('.invite_code').val();
    if (!username) {
      return alert('请输入手机号');
    }

    if (!password) {
      return alert('请输入密码');
    }

    if (!repassword) {
      return alert('请输入重复密码');
    }

    if (password !== repassword) {
      return alert('密码必须相同');
    }

    $.ajax({
      url: '/user/signup',
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