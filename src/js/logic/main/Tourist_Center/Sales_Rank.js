var Tourist_Center_Sales_Rank = (function () {
    var content_table = {
        // 数据集
        data: {
        }, // 默认数据 --- 用于未加载ajax前的默认假数据,
        // 初始化
        init: function () {
            $(".content-table-det").html(template('content/Tourist_Center/Sales_Rank_Content'));
            this.ajax();
        },
        // 数据获取
        ajax: function (timer) {
            // 加载AJAX前先输出UI空壳(也可作为正在加载的loading界面)
            //  $('.content-table').html(template('xxx/xxx', this.data))
            var _this = this;
            $.ajax({
                type: 'POST',
                url: BaseSet.url + '/touristCentreReport/listSaleRanking',
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({
                    "start_date": timer.s,
                    "end_date": timer.e
                }),
                success: function (res) {
                    if (res.success) {
                        var length = res.data.length;
                        var sumCount = 0;
                        var sumMoney = 0;
                        for(var i=0;i<length;i++){
                            sumCount += res.data[i].count;
                            sumMoney += res.data[i].total;
                        };
                        res.sumCount = sumCount;
                        res.sumMoney = sumMoney.toFixed(2);
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
            // console.log(this.data);
            $(".content-table-det").html(template('content/Tourist_Center/Sales_Rank_Content',this.data));
            this.bind()
        },
        // 数据绑定
        bind: function () {
            // do something......
        }
    };
    var one = {
        // 数据集
        data: {
            title: "销售排名",
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
                template: 'Tourist_Center/Sales_Rank' // 调用模板名称
            }
            // 对AJAX获取到后的数据进行处理(如果需要整理的话)
//    for (var i = 0; i < this.data.length; i++) {}
            this.render()
        },
        // 数据渲染
        render: function () {
            Content(this.data, this);
            this.bind()
        },
        // 数据绑定
        bind: function () {
            var _this = this;
            layui.laydate.render({
                elem: '#starDate'
            });
            layui.laydate.render({
                elem: '#endDate'
            });
            content_table.ajax(this.data.timer);
            // do something......
            $("#check-data").click(function () {
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
                content_table.ajax(_this.data.timer);
            })

            $('#creat-report').off('click').on('click', function() {
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
