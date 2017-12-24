$(function () {
  $("#old-shippment-count").picker({
    cols: [
      {
        textAlign: 'center',
        values: ['1', '2', '3', '3', '4', '5', '6', '7', '8']
      }
    ]
  });
  $("#old-deliveried-shippment-count").picker({
    cols: [
      {
        textAlign: 'center',
        values: ['1', '2', '3', '3', '4', '5', '6', '7', '8']
      }
    ]
  });

  $("#old-un-deliveried-shippment-count").picker({
    cols: [
      {
        textAlign: 'center',
        values: ['是', '否']
      }
    ]
  });
  $("#show-grouping-by-truckloads").picker({
    cols: [
      {
        textAlign: 'center',
        values: ['是', '否']
      }
    ]
  });

});


