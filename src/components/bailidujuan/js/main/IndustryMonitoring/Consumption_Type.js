var IndustryMonitoring_Consumption_Type = (function () {
  var table = {
    // 数据集
    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 数据获取
    ajax: function (page,timer) {
      /* 添加加载状态 */
      $('.content-table-det').html(template('content/IndustryMonitoring/Consumption_Type_Table'))
      var _this = this;
      var parms = {
        "current_page": page,
        "start_date":timer.s,
        "page_size": 10,
        "end_date": timer.e
      }
      $.ajax({
        type: 'POST',
        url: BaseSet.url + '/industrialMonitor/countConsumptionType',
        contentType:"application/json;charset=utf-8",
        data: JSON.stringify(parms),
        dataType: 'json',
        success: function(res) {
          // console.log(res)
          if (res.success) {
            _this.data.count = res.data.count;
            _this.data = res.data;
            _this.data.page = page
            _this.handle();
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
      $('.content-table-det').html(template('content/IndustryMonitoring/Consumption_Type_Table', this.data))
      this.bind()
    },
    // 数据绑定
    bind: function () {
      layui.use(['laypage', 'laydate'], function(){
        var laypage = layui.laypage;
        var laydate = layui.laydate;
        laydate.render({
          elem: '#starDate' 
        });
        laydate.render({
          elem: '#endDate' 
        });
        laypage.render({ // 分页渲染
          elem: 'page'
          ,count: table.data.count,
          curr: table.data.page
          ,layout: [ 'prev', 'page', 'next', 'count','skip']
          ,jump: function(obj, first){
            if (!first) {
              table.ajax(obj.curr,one.data.timer)
            }
          }
        });
      });

       // 编辑数据
       $('.edit-btn').on('click', function() {
        var date = $(this).attr("data-timer")
        // console.log()
        layer.open({
          title: '消费收入录入',
          content: template('content/IndustryMonitoring/Consumption_Type-add')({
          date:date,
          list:one.data.typeList
          }),
          shade: 0,
          btn: ['添加', '返回'],
          success: function () {
            layui.use('form', function(){
              var form = layui.form;
              form.render('select');
              //自定义验证规则
              form.verify({
                money: function(value){
                  if(!value){
                   return '金额不能为空';
                  }
                }
              });
            })
          },
          yes: function (index, layero) {
            var income = $('#income').val();
            var type = $('#type-val').val();
            var parms = {
              "income": income,
              "record_date": date,
              "type": type
            }
            if ($('#income').val() == '') {
              alert('金额不能为空');
              return false;
            } else if (income !== '' && type !== ''){
              $.ajax({
                type: 'POST',
                url: BaseSet.url + '/industrialMonitor/saveConsumptionType',
                contentType:"application/json;charset=utf-8",
                data: JSON.stringify(parms),
                dataType: 'json',
                success: function(res) {
                  if (res.success) {
                    one.init()
                    layer.msg('修改成功')
                  }
                }
              })
            }
          },
          cancel: function () {}
        }); 
      })
    }
  }
  var one = {
    // 数据集
    data: {
      typeList: [
        {
          "name": "餐饮",
          "value": "restaurant"
        },
        {
          "name": "自营店",
          "value": "self_support"
        },
        {
          "name": "vr体验",
          "value": "vr"
        },
        {
          "name": "其他",
          "value": "other"
        }
      ],
      timer: {
        s: data_addSub(timer_now(), -30),
        e: data_addSub(timer_now(), 0)
      }
    }, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 初始化
    init: function () {
      this.ajax()
    },
    // 数据获取
    ajax: function () {
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
        template: 'IndustryMonitoring/Consumption_Type' // 调用模板名称
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

      table.ajax(1,_this.data.timer)
     
      // 查询数据
      $('#check-data').click(function(){
        if ($('.mask')[0]) {
          layer.msg('正在加载中，请勿操作！')
          return
        }
        _this.data.timer = {
          s: $('#starDate').val(),
          e: $('#endDate').val()
        }
        if (_this.data.timer.s === '' || _this.data.timer.e === '') {
          layer.msg('统计时间不能为空')
          return false;
        }
        table.ajax(1,_this.data.timer)
      })

    }
  }
  return {
    init: function () {
      one.init() // 执行初始化
    }
  }
})()
