$(function () {
  $("#old-shippment-count").picker({
    cols: [
      {
        textAlign: 'center',
        values: ['1', '2', '3', '3', '4', '5', '6', '7', '8']
      }
    ]
  });



  function clickChooseCountry() {
    $("#choose-country").val(this.text)
  }
  $(".choose-country").click(function () {
    $.actions({
      actions: [
        { text: "中国", onClick: clickChooseCountry },
      ]
    });
  });


  function clickChangeLanguage() {
    $("#change-language").val(this.text)
  }
  $(".change-language").click(function () {
    $.actions({
      actions: [
        { text: "简体中文", onClick: clickChangeLanguage },
      ]
    });
  });

  function clickOldShippmentCount() {
    $("#old-shippment-count").val(this.text)
  }
  $(".old-shippment-count").click(function () {
    $.actions({
      actions: [
        { text: "1", onClick: clickOldShippmentCount },
        { text: "2", onClick: clickOldShippmentCount },
        { text: "3", onClick: clickOldShippmentCount },
        { text: "4", onClick: clickOldShippmentCount },
        { text: "5", onClick: clickOldShippmentCount },
        { text: "6", onClick: clickOldShippmentCount },
        { text: "7", onClick: clickOldShippmentCount },
        { text: "30", onClick: clickOldShippmentCount },
        { text: "60", onClick: clickOldShippmentCount },
      ]
    });
  });

  function clickDeliveriedOldShippmentCount() {
    $("#old-deliveried-shippment-count").val(this.text)
  }
  $(".old-deliveried-shippment-count").click(function () {
    $.actions({
      actions: [
        { text: "1", onClick: clickDeliveriedOldShippmentCount },
        { text: "2", onClick: clickDeliveriedOldShippmentCount },
        { text: "3", onClick: clickDeliveriedOldShippmentCount },
        { text: "4", onClick: clickDeliveriedOldShippmentCount },
        { text: "5", onClick: clickDeliveriedOldShippmentCount },
        { text: "6", onClick: clickDeliveriedOldShippmentCount },
        { text: "7", onClick: clickDeliveriedOldShippmentCount },
        { text: "30", onClick: clickDeliveriedOldShippmentCount },
        { text: "60", onClick: clickDeliveriedOldShippmentCount },
      ]
    });
  });

  function clickShowOldUnDeliveriedShippment() {
    $("#show-old-un-deliveried-shippment").val(this.text)
  }
  $(".show-old-un-deliveried-shippment").click(function () {
    $.actions({
      actions: [
        { text: "是", onClick: clickShowOldUnDeliveriedShippment },
        { text: "否", onClick: clickShowOldUnDeliveriedShippment },
      ]
    });
  });

  function clickGroupingByTruckloads() {
    $("#show-grouping-by-truckloads").val(this.text)
  }
  $(".show-grouping-by-truckloads").click(function () {
    $.actions({
      actions: [
        { text: "是", onClick: clickGroupingByTruckloads },
        { text: "否", onClick: clickGroupingByTruckloads },
      ]
    });
  })
});


