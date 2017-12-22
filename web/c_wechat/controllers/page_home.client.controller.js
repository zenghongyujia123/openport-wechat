$(function () {
  function clickReason() {
    var path = this.path;
    setTimeout(function () {
      window.location = path;
    }, 500);
  }
  $('.o-body-add-btn').click(function () {
    $.actions({
      actions: [{
        text: "日志列表",
        path: '/page_wechat/page_expense_list',
        onClick: clickReason
      },
      {
        text: "新建日志",
        path: '/page_wechat/page_expense_add',
        onClick: clickReason
      },
      {
        text: "个人主页",
        path: '/page_wechat/page_profile',
        onClick: clickReason
      },
      {
        text: "设置",
        path: '/page_wechat/page_setting',
        onClick: clickReason
      }
      ]
    });
  });


});