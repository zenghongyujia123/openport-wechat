$(function () {
  $('.start-loading').click(function () {
    getLocation(function (data) {
    })
    return;
    uploadEvent({
      id: this.id,
      "operation": "load",
      "latitude": "6.1539704",
      "longitude": "106.7973283",
      "eventDate": new Date().toISOString()
    }, function () {
      window.location = window.location;
    });
  });

  $('.submit-pickup').click(function () {
    var pickedUpQty = $('.pickedUpQty').val();
    var pickupLoaderName = $('.pickupLoaderName').val();
    if (!pickedUpQty) {
      return alert('请输入实际单位数量');
    }
    if (!pickupLoaderName) {
      return alert('请输入发件人');
    }
    uploadEvent({
      id: this.id,
      "operation": "pickup",
      "pickedUpQty": pickedUpQty,
      "eventDate": new Date().toISOString(),
      "latitude": "6.1537999999999995",
      "longitude": "106.79708333333335",
      "pickupLoaderName": pickupLoaderName,
      "pickupCountReasonCode": '',
      "shipment": {
        "id": this.id,
        "shipmentNumber": $('.shipment-number').text()
      }
    }, function () {
      window.location = '/page_wechat/page_home?status=ETA';
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

  getUserJsApiTicket('http://jltao.com/page_wechat/page_detail_pickup', function (data) {

  });
});



