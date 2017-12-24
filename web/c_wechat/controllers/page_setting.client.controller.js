$(function () {
  var choose_country = $('#choose-country');
  var choose_language = $('#choose-language');
  var old_shippment_count = $('#old-shippment-count');
  var old_deliveried_shippment_count = $('#old-deliveried-shippment-count');
  var show_old_un_deliveried_shippment = $('#show-old-un-deliveried-shippment');
  var show_grouping_by_truckloads = $('#show-grouping-by-truckloads');
  var choose_list_view = $('#choose-list-view');
  var choose_shippment_count = $('#choose-shippment-count');
  var choose_icon_tab = $('#choose-icon-tab');

  function getSetting() {
    $.ajax({
      url: '/api_wechat/getUserSetting',
      method: 'post',
      success: function (data) {
        choose_country.val(data.choose_country);
        choose_language.val(data.choose_language);
        old_shippment_count.val(data.old_shippment_count);
        old_deliveried_shippment_count.val(data.old_deliveried_shippment_count);
        show_old_un_deliveried_shippment.val(data.show_old_un_deliveried_shippment);
        show_grouping_by_truckloads.val(data.show_grouping_by_truckloads);
        choose_list_view.val(data.choose_list_view);
        choose_shippment_count.val(data.choose_shippment_count);
        choose_icon_tab.val(data.choose_icon_tab);
      }
    });
  }
  getSetting();

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
    $("#choose-language").val(this.text)
  }
  $(".choose-language").click(function () {
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
  });
  function clickChooseListView() {
    $("#choose-list-view").val(this.text)
  }
  $(".choose-list-view").click(function () {
    $.actions({
      actions: [
        { text: "简单", onClick: clickChooseListView },
        { text: "详细", onClick: clickChooseListView },
      ]
    });
  });
  function clickChooseListCount() {
    $("#choose-shippment-count").val(this.text)
  }
  $(".choose-shippment-count").click(function () {
    $.actions({
      actions: [
        { text: "10", onClick: clickChooseListCount },
        { text: "20", onClick: clickChooseListCount },
        { text: "30", onClick: clickChooseListCount },
        { text: "40", onClick: clickChooseListCount },
      ]
    });
  });
  function clickChooseIconTab() {
    $("#choose-icon-tab").val(this.text)
  }
  $(".choose-icon-tab").click(function () {
    $.actions({
      actions: [
        { text: "是", onClick: clickChooseIconTab },
        { text: "否", onClick: clickChooseIconTab },
      ]
    });
  });
  $('.o-page-footer').click(function () {
    window.location = '/page_wechat/page_signin'
  });
  $('.o-page-header-left').click(function () {
    window.location = '/page_wechat/page_home';
  });
});


