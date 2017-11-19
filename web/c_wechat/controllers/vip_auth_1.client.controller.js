$(function () {
  $('.submit-btn').click(function () {
    var real_name = $('.real_name').val();
    var real_phone = $('.real_phone').val();
    var id_card = $('.id_card').val();

    if (!real_name) {
      return alert('请输入真实姓名');
    }

    if (!real_phone) {
      return alert('请输入真实手机号');
    }

    if (!id_card) {
      return alert('请输入真实身份证号');
    }

    $.ajax({
      method: 'post',
      url: '/user/updateUserAuth1',
      data: {
        real_name: real_name,
        real_phone: real_phone,
        id_card: id_card
      },
      success: function (data) {
        console.log(data);
        getPrePayId();
      }
    });
  });

  function getPrePayId() {
    $.ajax({
      method: 'post',
      url: '/page_wechat/getPrePayId',
      success: function (data) {
        alert(JSON.stringify(data));
        if (data.prepay_id) {
          window.location = '/page_wechat/getPayPage?prepay_id=' + data.prepay_id;
        }
        console.log(data);
      }
    });
  }


});