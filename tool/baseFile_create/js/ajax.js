function Ajax (obj) {
  $.ajax({
    type: obj.type,
    url: obj.url + '?token=' + localStorage.token,
    contentType: "application/json;charset=utf-8",
    data: obj.data,
    dataType: 'json',
    success: function(res) {
      if (res.errCode === 9527) {
        layer.msg('登录超时，请重新登录！')
        setTimeout(function () {
          var url = location.host + location.pathname;
          url = 'http://' + url.substring(0, url.lastIndexOf('index.html')) + 'login.html';
          localStorage.token = '';
          location.href = url;
        }, 700)
        return
      }
      typeof (obj.success) === 'function' && obj.success(res)
    },
    error: function (res) {
      layer.msg('系统异常，请联系管理员！')
    }
  })
}
function Ajax (obj) {
  $.ajax({
    type: obj.type,
    url: obj.url + '?token=' + localStorage.token,
    contentType: "application/json;charset=utf-8",
    data: obj.data,
    dataType: 'json',
    success: function(res) {
      if (res.errCode === 9527) {
        layer.msg('登录超时，请重新登录！')
        setTimeout(function () {
          var url = location.host + location.pathname;
          url = 'http://' + url.substring(0, url.lastIndexOf('index.html')) + 'login.html';
          localStorage.token = '';
          location.href = url;
        }, 700)
        return
      }
      typeof (obj.success) === 'function' && obj.success(res)
    },
    error: function (res) {
      layer.msg('系统异常，请联系管理员！')
    }
  })
}
function Ajax (obj) {
  $.ajax({
    type: obj.type,
    url: obj.url + '?token=' + localStorage.token,
    contentType: "application/json;charset=utf-8",
    data: obj.data,
    dataType: 'json',
    success: function(res) {
      if (res.errCode === 9527) {
        layer.msg('登录超时，请重新登录！')
        setTimeout(function () {
          var url = location.host + location.pathname;
          url = 'http://' + url.substring(0, url.lastIndexOf('index.html')) + 'login.html';
          localStorage.token = '';
          location.href = url;
        }, 700)
        return
      }
      typeof (obj.success) === 'function' && obj.success(res)
    },
    error: function (res) {
      layer.msg('系统异常，请联系管理员！')
    }
  })
}
function Ajax (obj) {
  $.ajax({
    type: obj.type,
    url: obj.url + '?token=' + localStorage.token,
    contentType: "application/json;charset=utf-8",
    data: obj.data,
    dataType: 'json',
    success: function(res) {
      if (res.errCode === 9527) {
        layer.msg('登录超时，请重新登录！')
        setTimeout(function () {
          var url = location.host + location.pathname;
          url = 'http://' + url.substring(0, url.lastIndexOf('index.html')) + 'login.html';
          localStorage.token = '';
          location.href = url;
        }, 700)
        return
      }
      typeof (obj.success) === 'function' && obj.success(res)
    },
    error: function (res) {
      layer.msg('系统异常，请联系管理员！')
    }
  })
}
