$(function () {
  var photoContainer = $('.photo-container-footer');

  function appendImage(localId) {
    photoContainer.append($(
      '< div class= "footer-item" >' +
      '<img class="item-photo" src="' + localId + '"></img>' +
      '<div class="item-delete"></div>' +
      '</div>'));
  }

  $('.album').click(function () {
    chooseImage(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localIds);
      });
    })
  });

  $('.camera').click(function () {
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localIds);
      });
    })
  });

  $('.start-loading').click(function () {
    var id = this.id;

    getLocation(function (data) {
      uploadEvent({
        id: id,
        "operation": "load",
        "latitude": data.latitude,
        "longitude": data.longitude,
        "eventDate": new Date().toISOString()
      }, function () {
        window.location = window.location;
      });
    })
  });

  $('.submit-pickup').click(function () {
    var pickedUpQty = $('.pickedUpQty').val();
    var pickupLoaderName = $('.pickupLoaderName').val();
    var id = this.id;
    if (!pickedUpQty) {
      return alert('请输入实际单位数量');
    }
    if (!pickupLoaderName) {
      return alert('请输入发件人');
    }
    getLocation(function (data) {
      uploadEvent({
        id: id,
        "operation": "pickup",
        "pickedUpQty": pickedUpQty,
        "eventDate": new Date().toISOString(),
        "latitude": data.latitude,
        "longitude": data.longitude,
        "pickupLoaderName": pickupLoaderName,
        "pickupCountReasonCode": '',
        "shipment": {
          "id": this.id,
          "shipmentNumber": $('.shipment-number').text()
        }
      }, function () {
        window.location = '/page_wechat/page_home?status=ETA';
      });

    })

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



