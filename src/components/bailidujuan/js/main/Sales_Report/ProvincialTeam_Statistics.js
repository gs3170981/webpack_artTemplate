var Sales_Report_ProvincialTeam_Statistics = (function () {
  var table = {
    // 数据集
    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 数据获取
    ajax: function (timer) {
      /* 添加加载状态 */
      $('.content-table-det').html(template('content/Sales_Report/ProvincialTeam_Statistics_Table'))
      var _this = this
      var parms = {
        "condition": $('#province').val() || '',
        "end_month": timer.e.replace(/\D/g, ''),
        "start_month": timer.s.replace(/\D/g, '')
      }
      $.ajax({
        type: 'POST',
        url: BaseSet.url + '/marketingDepartmentReport/provinceTeamStatistics',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(parms),
        dataType: 'json',
        success: function (res) {
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
      $('.content-table-det').html(template('content/Sales_Report/ProvincialTeam_Statistics_Table', this.data))
      this.bind()
    },
    // 数据绑定
    bind: function () {
      $('.content-table-det').mCustomScrollbar();

       // 查看详情
      $('.look-detail').click(function(){
        var name = $(this).attr('data-name');
        $.ajax({
          type: 'GET',
          url: BaseSet.url + '/marketingDepartmentReport/teamTotal/' + name,
          contentType: "application/json;charset=utf-8",
          dataType: 'json',
          success: function (res) {
            if (res.success) {
              /*
               * 将接口得到的数据遍历得到 '1-4季度' 和 '总计' 数据
               * 最后插入数组，遍历数组渲染到表格中
               */
              var dataArr = res.data;
              var total = {
                item: '总计',
                increase: '-',
                lastYearPersonCount: 0,
                lastYearPrice: 0,
                lastYearTeamCount: 0,
                nowYearPersonCount: 0,
                nowYearPrice: 0,
                nowYearTeamCount: 0,
                personCountProportion: '-',
                teamCountProportion: '-',
              };
              var item1 = {
                item: '第一季度',
                increase: '-',
                lastYearPersonCount: 0,
                lastYearPrice: 0,
                lastYearTeamCount: 0,
                nowYearPersonCount: 0,
                nowYearPrice: 0,
                nowYearTeamCount: 0,
                personCountProportion: '-',
                teamCountProportion: '-',
              };
              var item2 = {
                item: '第二季度',
                increase: '-',
                lastYearPersonCount: 0,
                lastYearPrice: 0,
                lastYearTeamCount: 0,
                nowYearPersonCount: 0,
                nowYearPrice: 0,
                nowYearTeamCount: 0,
                personCountProportion: '-',
                teamCountProportion: '-',
              };
              var item3 = {
                item: '第三季度',
                increase: '-',
                lastYearPersonCount: 0,
                lastYearPrice: 0,
                lastYearTeamCount: 0,
                nowYearPersonCount: 0,
                nowYearPrice: 0,
                nowYearTeamCount: 0,
                personCountProportion: '-',
                teamCountProportion: '-',
              };
              var item4 = {
                item: '第四季度',
                increase: '-',
                lastYearPersonCount: 0,
                lastYearPrice: 0,
                lastYearTeamCount: 0,
                nowYearPersonCount: 0,
                nowYearPrice: 0,
                nowYearTeamCount: 0,
                personCountProportion: '-',
                teamCountProportion: '-',
              };
              for(var i = 0, len = dataArr.length; i < len; i ++) {
                if(i <3) {
                  item1.lastYearPersonCount += dataArr[i].lastYearPersonCount;
                  item1.lastYearPrice += dataArr[i].lastYearPrice;
                  item1.lastYearTeamCount += dataArr[i].lastYearTeamCount;
                  item1.nowYearPersonCount += dataArr[i].nowYearPersonCount;
                  item1.nowYearPrice += dataArr[i].nowYearPrice;
                  item1.nowYearTeamCount += dataArr[i].nowYearTeamCount;
                } else if(i < 6) {
                  item2.lastYearPersonCount += dataArr[i].lastYearPersonCount;
                  item2.lastYearPrice += dataArr[i].lastYearPrice;
                  item2.lastYearTeamCount += dataArr[i].lastYearTeamCount;
                  item2.nowYearPersonCount += dataArr[i].nowYearPersonCount;
                  item2.nowYearPrice += dataArr[i].nowYearPrice;
                  item2.nowYearTeamCount += dataArr[i].nowYearTeamCount;
                } else if(i < 9) {
                  item3.lastYearPersonCount += dataArr[i].lastYearPersonCount;
                  item3.lastYearPrice += dataArr[i].lastYearPrice;
                  item3.lastYearTeamCount += dataArr[i].lastYearTeamCount;
                  item3.nowYearPersonCount += dataArr[i].nowYearPersonCount;
                  item3.nowYearPrice += dataArr[i].nowYearPrice;
                  item3.nowYearTeamCount += dataArr[i].nowYearTeamCount;
                } else if(i < 12) {
                  item4.lastYearPersonCount += dataArr[i].lastYearPersonCount;
                  item4.lastYearPrice += dataArr[i].lastYearPrice;
                  item4.lastYearTeamCount += dataArr[i].lastYearTeamCount;
                  item4.nowYearPersonCount += dataArr[i].nowYearPersonCount;
                  item4.nowYearPrice += dataArr[i].nowYearPrice;
                  item4.nowYearTeamCount += dataArr[i].nowYearTeamCount;
                }
                total.lastYearPersonCount += dataArr[i].lastYearPersonCount;
                total.lastYearPrice += dataArr[i].lastYearPrice;
                total.lastYearTeamCount += dataArr[i].lastYearTeamCount;
                total.nowYearPersonCount += dataArr[i].nowYearPersonCount;
                total.nowYearPrice += dataArr[i].nowYearPrice;
                total.nowYearTeamCount += dataArr[i].nowYearTeamCount;
              }
              dataArr.splice(3,0,item1)
              dataArr.splice(7,0,item2)
              dataArr.splice(11,0,item3)
              dataArr.splice(15,0,item4)
              dataArr.splice(16,0,total)
              layer.open({
                title: name+'市团队统计详情',
                content: template('content/Sales_Report/DomesticTeam_Statistics_detail')({
                list: dataArr
                }),
                shade: 0,
                btn: ['导出'],
                yes: function (index, layero) {
                  excel_export('content-table-detail');
                  layer.closeAll();
                }
              }); 
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
        s: '1',
        e: '1'
      },
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      citys: ['杭州','宁波','温州','绍兴','湖州','嘉兴','金华','衢州','台州','丽水','舟山']
    }, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 初始化
    init: function () {
      this.ajax()
    },
    // 数据获取
    ajax: function () {
      this.handle();
    },
    // 数据处理 --- && build 配置项
    handle: function () {
      this.data.build = {
        id: 'a', // 随便写
        name: 'one', // 与调用模块名一致
        width: 12, // bs --- 12
        line: 1, // 第几行
        height: '100%', // 占全屏幕的多高
        template: 'Sales_Report/ProvincialTeam_Statistics' // 调用模板名称
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
      var _this = this;

      // 初始化数据
      table.ajax(_this.data.timer)

      // 导出报表
      $('#export').off().on('click', function() {
        excel_export('content-table')
      })

      layui.use(['laypage', 'laydate', 'form'], function () {
        var laypage = layui.laypage;
        var laydate = layui.laydate;
        var form = layui.form;
        form.render('select');
        laydate.render({
          elem: '#starDate',
          type: 'month'
        });
        laydate.render({
          elem: '#endDate',
          type: 'month'
        });
      });
      
      // 查询数据
      $('#check-data').click(function () {
        _this.data.timer = {
          s: $('#starMonth').val(),
          e: $('#endMonth').val()
        }
        console.log( _this.data.timer)
        if (_this.data.timer.s === '' || _this.data.timer.e === '') {
          layer.msg('统计时间不能为空')
          return false;
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
