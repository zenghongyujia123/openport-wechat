$(function () {
  var shipPanel = $('.shippment-panel');
  var typePanel = $('.type-panel');
  var shippment = $('.shippment-input');
  var typeInput = $('.type-input');
  var dateInput = $('.date');
  var shippmentItems = [];
  var selectShippmentId = '';

  var today = new Date();
  today = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
  dateInput.val(today.join('-'));
  var photoId = '';

  $('.submit').click(function () {
    createExpense();
  });

  function clickTypeItem() {
    typeInput.val(this.text).trim();
  }

  $('.camera').click(function () {
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        photoId = localId;
        appendImage(localId);
      });
    })
  });

  function appendImage(localId) {
    $('.photo-img').attr('src', localId);
    $('.photo-tip').hide();
  }

  $("#type-select").select({
    title: "",
    items: [
      { title: "Additional Stop", value: 1 },
      { title: "Border Fee", value: 2 },
      { title: "Congestion Fee", value: 3 },
      { title: "Detention Charge", value: 4 },
      { title: "Document Fee", value: 5 },
      { title: "Handling Fees", value: 6 },
      { title: "Non-Dock Delivery", value: 7 },
      { title: "Stop Charge Fee", value: 8 },
      { title: "Toll Fee", value: 9 },
      { title: "Truck Ordered Not Used", value: 10 },
      { title: "Wait Time Fee", value: 11 },
    ]
  });

  function createExpense() {
    var type = typeInput.val();
    var shipmentId = $('#ship-select').attr('data-values').split(',')[0] || '';
    var amount = $('.amount').val();
    var date = dateInput.val();
    var timestamp = date;
    var currency = 'RMB';
    var description = $('.description').val();
    var data = {
      "type": type,
      "shipmentId": shipmentId,
      "amount": amount,
      "date": date,
      "timestamp": timestamp,
      "description": description,
      "driver": "",
      "currency": currency,
      photoId: photoId
    }
    console.log(data);
    $.ajax({
      url: '/api_wechat/createExpense',
      method: 'post',
      data: data,
      success: function (data) {
        console.log(data);
        if (data.status !== 202) {
          return alert(data.message);
        }
        window.location = '/page_wechat/page_expense_list'
      }
    });
  }

  getUserJsApiTicket(window.location.href, function (data) {

  });

  function getDeliveriedShippments() {
    $.ajax({
      url: '/api_wechat/getDeliveriedShippments',
      method: 'post',
      success: function (data) {
        shippmentItems = [];
        data.forEach(function (item) {
          item.value = item.id;
          item.title = item.shipmentNumber;
          shippmentItems.push(item);
        });

        $('#ship-select').select({
          title: "",
          multi: true,
          items: shippmentItems,

        })
      }
    })
  }

  $('.o-page-header-left').click(function () {
    window.location = '/page_wechat/page_home';
  });
  getDeliveriedShippments();
});