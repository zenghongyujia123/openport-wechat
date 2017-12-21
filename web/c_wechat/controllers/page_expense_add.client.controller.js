$(function () {
  var shipPanel = $('.shippment-panel');
  var typePanel = $('.type-panel');
  var shippment = $('.shippment-input');
  var typeInput = $('.type-input');
  var dateInput = $('.date')
  var today = new Date();
  today = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
  dateInput.val(today.join('-'));
  var selectShippemnts = []

  $('.submit').click(function () {
    createExpense();
  });

  shipPanel.click(function () {
    hideShipPanel();
  });
  typePanel.click(function () {
    hideTypePanel();
  })

  function clickTypeItem() {
    typeInput.val(this.text).trim();
  }
  // $('#ship-select').select({
  //   items: [
  //     { title: "Additional Stop", value: 1 },
  //     { title: "Border Fee", value: 2 },
  //     { title: "Congestion Fee", value: 3 },
  //     { title: "Detention Charge", value: 4 },
  //     { title: "Document Fee", value: 5 },
  //     { title: "Handling Fees", value: 6 },
  //     { title: "Non-Dock Delivery", value: 7 },
  //     { title: "Stop Charge Fee", value: 8 },
  //     { title: "Toll Fee", value: 9 },
  //     { title: "Truck Ordered Not Used", value: 10 },
  //     { title: "Wait Time Fee", value: 11 },
  //   ]
  // })
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
  typeInput.click(function () {


    // showTypePanel();
  });
  shippment.click(function () {
    showShipPanel();
  });

  shipPanel.find('.select-item').click(function (e) {
    if ($(this).hasClass('select')) {
      $(this).removeClass('select');
    }
    else {
      $(this).addClass('select');
    }
    e.stopPropagation();
  });
  typePanel.find('.select-item').click(function (e) {
    e.stopPropagation();
    typeInput.val($(this).find('div').text().trim());
    hideTypePanel();
  });
  var selectShippemnts = []
  shipPanel.find('.select-btn').click(function () {
    selectShippemnts = shipPanel.find('.select-item.select div');
    if (selectShippemnts.length === 0) {
      return alert('请选择至少一个运单');
    }
    var texts = []
    for (var i = 0; i < selectShippemnts.length; i++) {
      texts.push($(selectShippemnts[i]).text().trim());
    }
    shippment.val(texts.join(','));
    hideShipPanel();
  });

  function showShipPanel() {
    shipPanel.show();
  }
  function hideShipPanel() {
    shipPanel.hide();
  }

  function showTypePanel() {
    typePanel.show();
  }
  function hideTypePanel() {
    typePanel.hide();
  }

  function createExpense() {
    var type = typeInput.val();
    var shipmentId = selectShippemnts[0].id;
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
      "currency": currency
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




});