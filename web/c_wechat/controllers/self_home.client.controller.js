$(function () {
  $('.filter-select').change(function () {
    var type = $(this).val();
    var sort_key = '';
    var sort_value = '';
    var query_key = '';
    var query_value = '';

    switch (type) {
      case 'str13':
        sort_key = type;
        sort_value = -1
        break;
      case 'str14':
      case 'str15':
        sort_key = type;
        sort_value = 1
        break;
      case 'str16':
      case 'str17':
      case 'str18':
        query_key = type;
        query_value = 1
        break;
    }

    var arr = [
      'sort_key=' + sort_key,
      'sort_value=' + sort_value,
      'query_key=' + query_key,
      'query_value=' + query_value,
    ]

    window.location = '/page_wechat/self_home?' + arr.join('&');
  });
});