$(function () {
  $('.footer-btn').click(function () {
    getSelects();
  });
  function getSelects() {
    //   var a = $("input[name='请问您需要的资金金额大小']:checked").val();
    //   var b = $("input[name='请问您贷款的用途是什么']:checked").val();
    //   var c = $("input[name='请问以下您能接受的方式是什么']:checked").val();
    //   var d = $("input[name='请问您的性别及婚姻状况']:checked").val();
    var e = $("input[name='请问您的电商采购历史']:checked").val();
    var f = $("input[name='请问选择以下贴合您的信用卡状况']:checked").val();
    var g = $("input[name='请选择以下符合您申请贷款实情的']:checked").val();
    var h = $("input[name='请选择以下符合您实际情况的答案']:checked").val();
    // var i = $("input[name='关于工作情况以下符合您实际情况的']:checked").val();
    // var j = $("input[name='请选择以下符合您实际情况的']:checked").val();
    var codes = [e, f, g, h];
    console.log(codes);
    for (var i = 0; i < codes.length; i++) {
      if (!codes[i]) {
        alert('请完善所有回答！');
        return;
      }
    }

    var doc = {
      e: {
        'A': '4',
        'B': '4',
        'C': '4',
        'D': '3',
      },
      f: {
        'A': '3',
        'B': '1',
        'C': '4',
        'D': '2',
      },
      g: {
        'A': '4',
        'B': '1',
        'C': '3',
        'D': '2',
      },
      h: {
        'A': '3',
        'B': '3',
        'C': '4',
        'D': '3',
      }
    }

    var code = '' + doc.e[e] + doc.f[f] + doc.g[g] + doc.h[h];

    console.log(code);
    window.location = '/page_wechat/result?code=' + code;
    //
  }
});

