var Financial_Reporting_Reporting = (function () {
  var table = {
    // 数据集
    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 数据获取
    ajax: function (timer) {
      /* 添加加载状态 */
      $('.content-table-det').html(template('content/Financial_Reporting/Reporting_table'))
      var _this = this;
      var parms = {
        "start_date": timer.s,
        "end_date": timer.e
      }
      $.ajax({
        type: 'POST',
        url: BaseSet.url + '/financeTouristCentreReport/listFinanceReport',
        contentType:"application/json;charset=utf-8",
        data: JSON.stringify(parms),
        dataType: 'json',
        success: function(res) {
          if (res.success) {
            _this.data = res;
            _this.handle();
          } else {
            layer.msg(res.message)
          }
        }
      })
    },
    // 数据处理 --- && build 配置项
    handle: function () {
      this.render()
    },
    // 数据渲染
    render: function () {
//    Content(this.data, this)
      $('.content-table-det').html(template('content/Financial_Reporting/Reporting_table', this.data))
      this.bind()
    },
    // 数据绑定
    bind: function () {
      $('.content-table-det').mCustomScrollbar()
      
      // 修改数据
      var editDate = [];
      var arr = []; // 用于存放特征值,判断是否修改过值
      $('.edit').off().on("change",function(){
        var index = arr.indexOf($(this).attr('data-id'));
        var value = {
          "area_type": $(this).attr('data-scenic'),
          "date": $(this).attr('data-date'),
          "peoples": $(this).val() || 0,
          "scenic_type": $(this).attr('data-area')
        }
        if (index > -1) {
          editDate.splice(index,1,value); 
        } else {
          editDate.push(value);  
          arr.push($(this).attr('data-id'));
        }
      })

      // 保存数据
      $('#save').on('click', function() {
        $.ajax({
          type: 'POST',
          url: BaseSet.url + '/financeTouristCentreReport/saveOrUpdateFinanceReportBatch',
          contentType:"application/json;charset=utf-8",
          data: JSON.stringify(editDate),
          dataType: 'json',
          success: function(res) {
            if (res.success) {
              layer.msg('修改成功！');
              editDate.length = 0;
              one.init();
            } else {
              layer.msg(res.message)
            }
          }
        })
      })

    }
  }
  var one = {
    // 数据集
    data: {
      timer: {
        s: data_addSub(timer_now(), -30),
        e: data_addSub(timer_now(), 0)
      }
    }, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 初始化
    init: function () {
      this.ajax(this.data.timer)
    },
    // 数据获取
    ajax: function (timer) {
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
        template: 'Financial_Reporting/Reporting' // 调用模板名称
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
      // do something......
      var _this = this;

      // 初始化加载
      table.ajax(_this.data.timer)

      layui.use(['laydate'], function(){
        var laypage = layui.laypage;
        var laydate = layui.laydate;
        laydate.render({
          elem: '#starDate' 
        });
        laydate.render({
          elem: '#endDate' 
        });
      });

      // 生成报表
      $('#creat-report').off().on('click', function() {
        excel_export('content-table')
      })

      // 查询数据
      $('#check-data').off().click(function(){
        if ($('.mask')[0]) {
          layer.msg('正在加载中，请勿操作！')
          return
        }
        _this.data.timer = {
          s: $('#starDate').val(),
          e: $('#endDate').val()
        }
        if (!_this.data.timer.s || !_this.data.timer.e) {
          layer.msg('时间不准为空！')
          return
        }
        table.ajax(_this.data.timer)
      })
    }
  }
  return {
    init: function () {
      one.init() // 执行初始化
    }
  }
})()
