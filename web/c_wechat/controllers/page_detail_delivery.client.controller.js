$(function () {
  var id =
    $('.start-unloading').click(function () {
      getLocation(function (data) {
        uploadEvent({
          id: this.id,
          "operation": "unload",
          "latitude": data.latitude,
          "longitude": data.longitude,
          "eventDate": new Date().toISOString()
        }, function () {
          window.location = window.location;
        });
      })
    });

  $('.submit-delivery').click(function () {
    var deliveredQty = $('.deliveredQty').val();
    var recipientName = $('.recipientName').val();
    if (!deliveredQty) {
      return alert('请输入实际单位数量');
    }
    if (!recipientName) {
      return alert('请输入发件人');
    }

    getLocation(function (data) {
      uploadEvent({
        id: this.id,
        "operation": "pod",
        "deliveredQty": deliveredQty,
        "eventDate": new Date().toISOString(),
        "latitude": data.latitude,
        "longitude": data.longitude,
        "recipientName": recipientName,
        "reasonCode": '',
        "shipment": {
          "id": this.id,
          "shipmentNumber": $('.shipment-number').text().trim()
        }
      }, function () {
        window.location = '/page_wechat/page_home?status=DELIVERED';
      });
    });
  });

  function uploadEvent(data, callback) {
    $.ajax({
      url: '/api_wechat/uploadEvent',
      method: 'post',
      data: data,
      success: function (data) {
        if (data.status !== 202) {
          return alert(data.message);
        }
        return callback(data);
        console.log(data);
      }
    });
  }

  getUserJsApiTicket(window.location.href, function (data) {

  });
});


