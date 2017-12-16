$(function () {
  $('.o-body-add-btn').click(function () {
    showMask();
  });

  $('.o-mask ').click(function () {
    hideMask();
  });
  function showMask() {
    $('.o-mask').show();
  }
  function hideMask() {
    $('.o-mask').hide();
  }
});