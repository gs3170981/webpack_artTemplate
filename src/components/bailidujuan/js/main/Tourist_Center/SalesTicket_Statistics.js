var Tourist_Center_SalesTicket_Statistics = (function () {
    var content_table = {
        // 数据集
        data: {
        }, // 默认数据 --- 用于未加载ajax前的默认假数据,
        // 初始化
        init: function () {
            $("#contentTab").html(template('content/Tourist_Center/SalesTicket_Statistics_Content'));
            this.ajax();
        },
        // 数据获取
        ajax: function () {
            // 加载AJAX前先输出UI空壳(也可作为正在加载的loading界面)
            //  $('.content-table').html(template('xxx/xxx', this.data))
            var _this = this;
            var starDate = $("#starDate").val();
            var endDate = $("#endDate").val();
            if (starDate == '' || endDate == '') {
                layer.msg('统计时间不能为空')
                return false;
            };
            $.ajax({
                type: 'POST',
                url: BaseSet.url + '/touristCentreReport/listSaleCheckStatistics',
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({
                    "start_date": starDate,
                    "end_date": endDate
                }),
                success: function (res) {
                    // console.log(res);
                    var totalObj = {
                        chaoTianGateCheckCharge: 0,
                        chaoTianGateCheckFree: 0,
                        chaoTianGateSaleLoose: 0,
                        chaoTianGateSaleTeam: 0,
                        chengHuangMountainCheckCharge: 0,
                        chengHuangMountainCheckFree: 0,
                        chengHuangMountainSaleLoose: 0,
                        chengHuangMountainSaleTeam: 0,
                        eastLakeNorthGateCheckCharge: 0,
                        eastLakeNorthGateCheckFree: 0,
                        eastLakeNorthGateSaleLoose: 0,
                        eastLakeNorthGateSaleTeam: 0,
                        eastLakeSouthGateCheckCharge: 0,
                        eastLakeSouthGateCheckFree: 0,
                        eastLakeSouthGateSaleLoose: 0,
                        eastLakeSouthGateSaleTeam: 0,
                        jingYueGateCheckCharge: 0,
                        jingYueGateCheckFree: 0,
                        jingYueGateSaleLoose: 0,
                        jingYueGateSaleTeam: 0,
                        lanShengGateCheckCharge: 0,
                        lanShengGateCheckFree: 0,
                        lanShengGateSaleLoose: 0,
                        lanShengGateSaleTeam: 0,
                        xingShanGateCheckCharge: 0,
                        xingShanGateCheckFree: 0,
                        xingShanGateSaleLoose: 0,
                        xingShanGateSaleTeam: 0
                    };

                    if (res.success) {
                        var length = res.data.length;
                        for(var i=0;i<length;i++){
                            totalObj.chaoTianGateCheckCharge += res.data[i].chaoTianGateCheckCharge;
                            totalObj.chaoTianGateCheckFree += res.data[i].chaoTianGateCheckFree;
                            totalObj.chaoTianGateSaleLoose += res.data[i].chaoTianGateSaleLoose;
                            totalObj.chaoTianGateSaleTeam += res.data[i].chaoTianGateSaleTeam;
                            totalObj.chengHuangMountainCheckCharge += res.data[i].chengHuangMountainCheckCharge;
                            totalObj.chengHuangMountainCheckFree += res.data[i].chengHuangMountainCheckFree;
                            totalObj.chengHuangMountainSaleLoose += res.data[i].chengHuangMountainSaleLoose;
                            totalObj.chengHuangMountainSaleTeam += res.data[i].chengHuangMountainSaleTeam;
                            totalObj.eastLakeNorthGateCheckCharge += res.data[i].eastLakeNorthGateCheckCharge;
                            totalObj.eastLakeNorthGateCheckFree += res.data[i].eastLakeNorthGateCheckFree;
                            totalObj.eastLakeNorthGateSaleLoose += res.data[i].eastLakeNorthGateSaleLoose;
                            totalObj.eastLakeNorthGateSaleTeam += res.data[i].eastLakeNorthGateSaleTeam;
                            totalObj.eastLakeSouthGateCheckCharge += res.data[i].eastLakeSouthGateCheckCharge;
                            totalObj.eastLakeSouthGateCheckFree += res.data[i].eastLakeSouthGateCheckFree;
                            totalObj.eastLakeSouthGateSaleLoose += res.data[i].eastLakeSouthGateSaleLoose;
                            totalObj.eastLakeSouthGateSaleTeam += res.data[i].eastLakeSouthGateSaleTeam;
                            totalObj.jingYueGateCheckCharge += res.data[i].jingYueGateCheckCharge;
                            totalObj.jingYueGateCheckFree += res.data[i].jingYueGateCheckFree;
                            totalObj.jingYueGateSaleLoose += res.data[i].jingYueGateSaleLoose;
                            totalObj.jingYueGateSaleTeam += res.data[i].jingYueGateSaleTeam;
                            totalObj.lanShengGateCheckCharge += res.data[i].lanShengGateCheckCharge;
                            totalObj.lanShengGateCheckFree += res.data[i].lanShengGateCheckFree;
                            totalObj.lanShengGateSaleLoose += res.data[i].lanShengGateSaleLoose;
                            totalObj.lanShengGateSaleTeam += res.data[i].lanShengGateSaleTeam;
                            totalObj.xingShanGateCheckCharge += res.data[i].xingShanGateCheckCharge;
                            totalObj.xingShanGateCheckFree += res.data[i].xingShanGateCheckFree;
                            totalObj.xingShanGateSaleLoose += res.data[i].xingShanGateSaleLoose;
                            totalObj.xingShanGateSaleTeam += res.data[i].xingShanGateSaleTeam;

                        };
                        res.data.push(totalObj);
                        _this.data = res;
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
            $("#contentTab").html(template('content/Tourist_Center/SalesTicket_Statistics_Content',this.data));
            this.bind()
        },
        // 数据绑定
        bind: function () {
            // do something......
            $('.sales-tickets-tab').mCustomScrollbar();
        }
    };
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
        title: '123'        // AJAX获取后的数据
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
        template: 'Tourist_Center/SalesTicket_Statistics' // 调用模板名称
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
        layui.laydate.render({
            elem: '#starDate'
        });
        layui.laydate.render({
            elem: '#endDate'
        });
        content_table.init();
        // do something......
        $("#check-data").click(function () {
            content_table.ajax();
        })

        // 生成报表
      $('#creat-report').off().on('click', function() {
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
