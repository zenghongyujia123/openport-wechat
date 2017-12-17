$(function () {

  $('.start-unloading').click(function () {
    getLocation()
    return;
    uploadEvent({
      id: this.id,
      "operation": "unload",
      "latitude": "6.1539704",
      "longitude": "106.7973283",
      "eventDate": new Date().toISOString()
    }, function () {
      window.location = window.location;
    });
  });

  $('.submit-delivery').click(function () {
    getLocation();
    return;
    var deliveredQty = $('.deliveredQty').val();
    var recipientName = $('.recipientName').val();
    if (!deliveredQty) {
      return alert('请输入实际单位数量');
    }
    if (!recipientName) {
      return alert('请输入发件人');
    }

    uploadEvent({
      id: this.id,
      "operation": "pod",
      "deliveredQty": deliveredQty,
      "eventDate": new Date().toISOString(),
      "latitude": "6.1537999999999995",
      "longitude": "106.79708333333335",
      "recipientName": recipientName,
      "reasonCode": '',
      "shipment": {
        "id": this.id,
        "shipmentNumber": $('.shipment-number').text()
      }
    }, function () {
      window.location = '/page_wechat/page_home?status=DELIVERED';
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

  getUserJsApiTicket('http://jltao.com/page_wechat/page_detail_delivery', function (data) {

  });
});


