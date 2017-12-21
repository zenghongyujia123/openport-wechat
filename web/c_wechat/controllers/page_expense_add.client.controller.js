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
  typeInput.click(function () {
    $.actions({
      actions: [{
        text: "Additional Stop",
        onClick: clickTypeItem
      },
      {
        text: "Border Fee",
        onClick: clickTypeItem
      },
      {
        text: "Congestion Fee",
        onClick: clickTypeItem
      },
      {
        text: "Detention Charge",
        onClick: clickTypeItem
      },
      {
        text: "Document Fee",
        onClick: clickTypeItem
      },
      {
        text: "Handling Fees",
        onClick: clickTypeItem
      },
      {
        text: "Non-Dock Delivery",
        onClick: clickTypeItem
      },
      {
        text: "Stop Charge Fee",
        onClick: clickTypeItem
      },
      {
        text: "Toll Fee",
        onClick: clickTypeItem
      },
      {
        text: "Truck Ordered Not Used",
        onClick: clickTypeItem
      },
      {
        text: "Wait Time Fee",
        onClick: clickTypeItem
      }
      ]
    });
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