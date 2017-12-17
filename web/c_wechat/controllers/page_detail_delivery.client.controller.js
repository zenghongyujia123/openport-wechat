$(function () {
  var photoContainer = $('.photo-container-footer');
  var wecahtServerIds = [];

  function appendImage(localId) {
    uploadImage(localId, function (res) {
      wecahtServerIds.push(res)

      var imageItem = $(
        '<div class="footer-item" id="' + res.localId + '">' +
        '<img class="item-photo" src="' + localId + '"></img>' +
        '<div class="item-delete"><i class="fa fa-times" aria-hidden="true"></i></div>' +
        '</div>');
      // imageItem.find('.item-delete').click(function () {


      // });
      photoContainer.append(imageItem);
    })
  }

  $('.album').click(function () {
    chooseImage(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId);
      });
    })
  });

  $('.camera').click(function () {
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId);
      });
    })
  });

  $('.start-unloading').click(function () {
    var id = this.id;
    getLocation(function (data) {
      uploadEvent({
        id: id,
        operation: 'unload',
        latitude: data.latitude,
        longitude: data.longitude,
        eventDate: new Date().toISOString()
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
    var id = this.id;
    getLocation(function (data) {

      uploadEvent({
        wechat_ids: wecahtServerIds,
        id: id,
        operation: 'pod',
        deliveredQty: deliveredQty,
        eventDate: new Date().toISOString(),
        latitude: data.latitude,
        longitude: data.longitude,
        recipientName: recipientName,
        reasonCode: '',
        shipment: {
          id: id,
          shipmentNumber: $('.shipment-number').text().trim()
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


