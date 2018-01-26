var Financial_Reporting_NationalTax_Cancel = (function () {
  var table = {
    // 数据集
    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 数据获取
    ajax: function (index, timer) {
      console.log(index, timer)
      /* 添加加载状态 */
      $('.content-table-det').html(template('content/Financial_Reporting/NationalTax_Cancel-table'))
      var self = this
      // 假数据
//    this.data = {"data":[{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":1,"conductorRest":-1,"startNo":"C10000","allCount":10000,"endNo":"C19999"},{"secondLevel":0,"allRest":10000,"sell":121,"conductorRest":-121,"startNo":"W0000001","allCount":10000,"endNo":"W0010000"},{"secondLevel":0,"allRest":10000,"sell":1810,"conductorRest":-1810,"startNo":"A10000","allCount":10000,"endNo":"A19999"},{"secondLevel":0,"allRest":10000,"sell":158,"conductorRest":-158,"startNo":"Z00001","allCount":10000,"endNo":"Z10000"}],"success":true,"message":"操作成功"}

      timer = timer ? timer : {
        s: data_addSub(timer_now(), -1),
        e: timer_now()
      }
      $.ajax({
        type: "post",
        url: BaseSet.url + (parseInt(index) ? "/financeTouristCentreReport/onlineUseStatistics" : '/financeTouristCentreReport/ticketUseStatistics'),
        async: true,
        contentType: 'application/json',
        data: '{"start_date": "'+ timer.s +'","end_date": "'+ timer.e +'"}',
        success: function (res) {
          self.data = res
          self.data.index = index
          console.log(this.data)
          self.handle()
        }
      });
    },
    // 数据处理 --- && build 配置项
    handle: function () {
      var data = this.data
      var res = this.data.data
      data.allCount_sum = 0
      // 增加合计
      for (var i = 0; i < res.length; i++) {
        data.allCount_sum += parseFloat(res[i].price)
      }
      this.render()
    },
    // 数据渲染
    render: function () {
//    Content(this.data, this)
      $('.content-table-det').html(template('content/Financial_Reporting/NationalTax_Cancel-table', this.data))
      this.bind()
    },
    // 数据绑定
    bind: function () {
      $('.content-table-det').mCustomScrollbar()
    }
  }
  var one = {
    // 数据集
    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 初始化
    init: function () {
      this.ajax()
    },
    // 数据获取
    ajax: function () {
      // 加载AJAX前先输出UI空壳(也可作为正在加载的loading界面)
      //  $('.content-table').html(template('xxx/xxx', this.data))
      this.data = {
        title: '财务国税核销流水账' // AJAX获取后的数据
      }
      this.handle()
    },
    // 数据处理 --- && build 配置项
    handle: function () {
      this.data.build = {
        id: 'a', // 随便写
        name: 'one', // 与调用模块名一致
        width: 12, // bs --- 12
        line: 1, // 第几行
        height: '100%', // 占全屏幕的多高
        template: 'Financial_Reporting/NationalTax_Cancel' // 调用模板名称
      }
      // 对AJAX获取到后的数据进行处理(如果需要整理的话)
      //    for (var i = 0; i < this.data.length; i++) {}
      this.render()
    },
    // 数据渲染
    render: function () {
      Content(this.data, this)
      this.bind()
    },
    // 数据绑定
    bind: function () {
      layui.use('element', function(){
        var element = layui.element;
        element.on('tab(demo)', function(data){
          // 点击加载事件
//        console.log(data.index)
          $('.content-table_seach').attr('data-id', data.index).click()
        })
      });
      // excel导出
      $('.content-table').off('click').click(function () {
        excel_export('content-table')
      })
      // 时间
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#timer_s',
          max: '0'
        })
        laydate.render({
          elem: '#timer_e',
          max: '0'
        })
      })
      // 初始化加载
//    table.ajax()
      // 搜索事件绑定
      $('.content-table_seach').off('click').click(function () {
        if ($('.mask')[0]) {
          layer.msg('正在加载中，请勿操作！')
          return
        }
        var timer = {
          s: $('#timer_s').val(),
          e: $('#timer_e').val()
        }
        if (!timer.s && !timer.e) {
          timer = false // 都为空的时候
        } else if (!timer.s || !timer.e) {
          layer.msg('时间不准为空！')
          return
        }
        var id = $(this).attr('data-id')
        
        // 先修改头
        $('.content-table-header').hide()
        $('.content-table-header[data-id="'+ id +'"]').show()
        table.ajax(id, timer)
      })
      // 初始化加载
      $('.content-mod-det .layui-tab-title li')[0].click()
    }
  }
  return {
    init: function () {
      one.init() // 执行初始化
    }
  }
})()
