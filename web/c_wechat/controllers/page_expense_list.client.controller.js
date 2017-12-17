$(function () {
  $('.item-header').click(function () {
    if ($(this).parent().hasClass('fold')) {
      $(this).parent().removeClass('fold');
    }
    else {
      $(this).parent().addClass('fold');
    }
  });

  function fold(headerItem) {
    headerItem.siblings().hide();
  }
  function unFold(headerItem) {
    headerItem.siblings().show();
  }
});