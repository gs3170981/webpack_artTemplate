var Sales_Report_DomesticTeam_Total = (function () {
  var table = {
    // 数据集
    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,
    // 数据获取
    ajax: function () {
      /* 添加加载状态 */
      $('.content-table-det').html(template('content/Sales_Report/DomesticTeam_Total_table'))
      var _this = this;
      $.ajax({
        type: 'GET',
        url: BaseSet.url + '/marketingDepartmentReport/teamTotal',
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (res) {
          if (res.success) {
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
            _this.data.list = dataArr;
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
      $('.content-table-det').html(template('content/Sales_Report/DomesticTeam_Total_table', this.data))
      this.bind()
    },
    // 数据绑定
    bind: function () {
     
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
        template: 'Sales_Report/DomesticTeam_Total' // 调用模板名称
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
      //初始化数据
      table.ajax()
      
      // 导出报表
      $('#export-report').off().on('click', function() {
        excel_export('content-table')
      })
    }
  }
  return {
    init: function () {
      one.init() // 执行初始化
    }
  }
})()
