$(function () {
  var photoContainer = $('.photo-container-footer');
  var wechatServerIds = [];
  var realPicCount = $('.real-pic-count');
  var maxPicCount = parseInt($('.max-pic-count').text());
  var reasonContainer = $('.reason-container ');
  var deliveredQtyObj = $('.deliveredQty');
  var cartonCount = parseInt($('.cartonCount').text());

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
      // imageItem.find('.item-delete').click(function () {
      imageItem.find('.item-delete').click(function () {
        var id = this.id;
        var index = wechatServerIds.indexOf(id);
        if (index >= 0) {
          wechatServerIds.splice(index, 1);
          $(this).parent().remove();
        }
        realPicCount.text(wechatServerIds.length);
      });
      // });
      photoContainer.append(imageItem);
    })
  }

  $('.fa-angle-left').click(function () {
    window.location = '/page_wechat/page_home?status=ETA';
  });

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

  function clickReason(str) {
    $('.reasonCode').val(this.text);
  }

  $('.reasonCode').click(function () {
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

  $('.submit-delivery').click(function () {
    var deliveredQty = $('.deliveredQty').val();
    var recipientName = $('.recipientName').val();
    var reasonCode = $('.reasonCode').val();
    if (!deliveredQty) {
      return alert('请输入实际单位数量');
    }
    if (!recipientName) {
      return alert('请输入发件人');
    }
    if (parseInt(deliveredQty) != cartonCount && !reasonCode) {
      reasonContainer.show();
      return alert('请选择不匹配的原因');
    }

    var id = this.id;
    getLocation(function (data) {

      uploadEvent({
        wechat_ids: wechatServerIds,
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



  deliveredQtyObj.blur(function () {
    if (parseInt(deliveredQtyObj.val()) != cartonCount) {
      reasonContainer.show();
    }
    else {
      reasonContainer.hide();
    }
  });

  getUserJsApiTicket(window.location.href, function (data) {

  });
});


