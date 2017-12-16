$(function () {

  $('.start-loading').click(function () {
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
    uploadEvent({
      id: this.id,
      "operation": "pickup",
      "pickedUpQty": $('.pickedUpQty').val(),
      "eventDate": new Date().toISOString(),
      "latitude": "6.1537999999999995",
      "longitude": "106.79708333333335",
      "pickupLoaderName": $('.pickupLoaderName').val(),
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

});


