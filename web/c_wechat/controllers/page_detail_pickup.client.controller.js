$(function () {
  var photoContainer = $('.photo-container-footer');
  var wechatServerIds = [];
  var realPicCount = $('.real-pic-count');
  var maxPicCount = parseInt($('.max-pic-count').text());
  realPicCount.text(0);

  function appendImage(localId) {
    uploadImage(localId, function (res) {
      wechatServerIds.push(res.serverId)
      realPicCount.text(wechatServerIds.length);

      var imageItem = $(
        '<div class="footer-item">' +
        '<img class="item-photo" src="' + localId + '"></img>' +
        '<div class="item-delete" id="' + res.serverId + '"><i class="fa fa-times" aria-hidden="true"></i></div>' +
        '</div>');
      imageItem.find('.item-delete').click(function () {
        var id = this.id;
        var index = wechatServerIds.indexOf(id);
        if (index >= 0) {
          wechatServerIds.splice(index, 1);
          $(this).parent().remove();
          realPicCount.text(wechatServerIds.length);
        }
      });

      realPicCount.text(wechatServerIds.length);
      photoContainer.append(imageItem);
    })
  }

  $('.album').click(function () {
    if (wechatServerIds.length >= maxPicCount) {
      return;
    }
    chooseImage(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId);
      });
    })
  });
  $('.fa-angle-left').click(function () {
    window.location = '/page_wechat/page_home?status=ETD';
  });
  $('.camera').click(function () {
    if (wechatServerIds.length >= maxPicCount) {
      return;
    }
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId);
      });
    })
  });

  function clickReason(str) {
    $('.pickupCountReasonCode').val(this.text);
  }

  $('.pickupCountReasonCode').click(function () {
    $.actions({
      actions: [{
        text: "送货单证问题",
        onClick: clickReason
      },
      {
        text: "送货数量问题",
        onClick: clickReason
      },
      {
        text: "外包装破损",
        onClick: clickReason
      },
      {
        text: "订单错误",
        onClick: clickReason
      },
      {
        text: "客户拒收",
        onClick: clickReason
      },
      {
        text: "其它",
        onClick: clickReason
      },
      ]
    });

  });

  $('.start-loading').click(function () {
    var id = this.id;
    getLocation(function (data) {
      uploadEvent({
        id: id,
        operation: 'load',
        latitude: data.latitude,
        longitude: data.longitude,
        eventDate: new Date().toISOString()
      }, function () {
        window.location = window.location;
      });
    })
  });

  $('.submit-pickup').click(function () {
    var pickedUpQty = $('.pickedUpQty').val();
    var pickupLoaderName = $('.pickupLoaderName').val();
    var pickupCountReasonCode = $('.pickupCountReasonCode').val();
    var cartonCount = $('.cartonCount').text();
    var id = this.id;
    if (!pickedUpQty) {
      return alert('请输入实际单位数量');
    }
    if (!pickupLoaderName) {
      return alert('请输入发件人');
    }
    if (parseInt(pickedUpQty) != parseInt(cartonCount) && !pickupCountReasonCode) {
      return alert('请选择不匹配的原因');
    }

    getLocation(function (data) {
      uploadEvent({
        wechat_ids: wechatServerIds,
        id: id,
        operation: 'pickup',
        pickedUpQty: pickedUpQty,
        eventDate: new Date().toISOString(),
        latitude: data.latitude,
        longitude: data.longitude,
        pickupLoaderName: pickupLoaderName,
        pickupCountReasonCode: pickupCountReasonCode,
        shipment: {
          id: id,
          shipmentNumber: $('.shipment-number').text().trim()
        }
      }, function () {
        window.location = '/page_wechat/page_home?status=ETA';
      });

    })

  });

  function uploadEvent(data, callback) {
    $.showLoading("正在加载...");
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



