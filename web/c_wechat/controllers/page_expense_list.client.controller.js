$(function () {
  $('.item-header').click(function () {
    if ($(this).parent().hasClass('fold')) {
      $(this).parent().removeClass('fold');
    }
    else {
      $(this).parent().addClass('fold');
    }
  });

  $('.o-page-header-left').click(function () {
    window.location = '/page_wechat/page_home';
  });

  function fold(headerItem) {
    headerItem.siblings().hide();
  }
  function unFold(headerItem) {
    headerItem.siblings().show();
  }
});