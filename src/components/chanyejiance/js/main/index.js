//var index = (function () {
//  var _method = {
//    // 数据集
//    data: '',
//    // 初始化
//    init: function () {
//      this.ajax()
//    },
//    // 数据获取
//    ajax: function () {
//      this.data = {
//        title: '产业监测系统后台',
//        menu: [
//        {
//          title: '产业监测',
//          fa: 'fa-cube',
//          href: '',
//          child: [
//            {
//              title: '消费类型统计',
//              href: '#/IndustryMonitoring/Consumption_Type'
//            },{
//              title: '营销效果对比',
//              href: '#/IndustryMonitoring/Marketing_Effect'
//            }
//          ]
//        }, {
//          title: '财务报表',
//          fa: 'fa-sitemap',
//          href: '',
//          child: [
//            {
//              title: '财务日统计报表',
//              href: '#/Financial_Reporting/Day_Statistics'
//            }, {
//              title: '财务客流统计',
//              href: '#/Financial_Reporting/PassengerFlow_statistics'
//            }, {
//              title: '财务上报',
//              href: '#/Financial_Reporting/Reporting'
//            }, {
//              title: '财务库存统计',
//              href: '#/Financial_Reporting/Stock_Statistics'
//            }, {
//              title: '财务国税核销',
//              href: '#/Financial_Reporting/NationalTax_Cancel'
//            }
//          ]
//        }, {
//          title: '游客中心报表',
//          fa: 'fa-line-chart',
//          href: '',
//          child: [{
//            title: '销售排名',
//            href: '#/Tourist_Center/Sales_Rank'
//          },{
//            title: '销售检票统计',
//            href: '#/Tourist_Center/SalesTicket_Statistics'
//          }]
//        }, {
//          title: '营销部报表',
//          fa: 'fa-image',
//          href: '',
//          child: [
//            {
//              title: '国内团队统计',
//              href: '#/Sales_Report/DomesticTeam_Statistics'
//            }, {
//              title: '国内团队总计',
//              href: '#/Sales_Report/DomesticTeam_Total'
//            }, {
//              title: '省内团队统计',
//              href: '#/Sales_Report/ProvincialTeam_Statistics'
//            }, {
//              title: '省内团队总计',
//              href: '#/Sales_Report/ProvincialTeam_Total'
//            }, {
//              title: '旅行社销售统计',
//              href: '#/Sales_Report/TourOperatorSale_Statistics'
//            }, {
//              title: '旅行社销售总计',
//              href: '#/Sales_Report/TourOperatorSale_Total'
//            }
//          ]
//        }, {
//          title: '合作网商报表',
//          fa: 'fa-line-chart',
//          href: '#/OnlineBusiness_Report'
//        }]
//      }
//      this.handle()
//    },
//    // 数据处理
//    handle: function () {
//      this.render()
//    },
//    // 数据渲染
//    render: function () {
//      $('body').html(template('index/index', this.data))
//      this.bind()
//    },
//    // 事件绑定
//    bind: function () {
//      $('.layui-rightNav-news').off('click').click(function () {
//        var is = $('.layui-rightNav-li_news').css('right')
//        if (is === '0px') {
//          $('.layui-rightNav-li_news').css('right', '-100%')
//        } else {
//          $('.layui-rightNav-li_news').css('right', 0)
//        }
//        $('.layui-rightNav-li_news .news-list').off('click').click(function () {
////        $('.leftMenu-child-title').removeClass('succ')
////        $('.leftMenu-li-title').removeClass('active')
////        $('.layui-nav-child').css('max-height', 0)
//          $('.layui-rightNav-li_news').css('right', '-100%')
////        location.href = $(this).attr('data-href')
//          var child = $('a[href="'+ $(this).attr('data-href') +'"]')
//          if (!$(child).parent().hasClass('leftMenu-li')) {
//            $(child).closest('.leftMenu-li').find('.leftMenu-li-title')[0].click()
//          }
//          $(child)[0].click()
//        })
//      })
//      $('.leftMenu-li-title').off('click').click(function () {
//        if ($(this).hasClass('active')) {
//          $('.layui-nav-item .layui-nav-child').css('max-height', 0)
//          $('.leftMenu-li-title').removeClass('active')
//          $('.leftMenu-angle-icon').removeClass('fa-angle-down').addClass('fa-angle-left')
//          return
//        }
//        $('.layui-nav-item .layui-nav-child').css('max-height', 0)
//        var child = $(this).parent().find('.layui-nav-child')[0]
//        if (child) {
//          $(child).css('max-height', '2.3rem')
//          if (!$(child).hasClass('mCustomScrollbar')) {
//            setTimeout(function () {
//              $(child).mCustomScrollbar()
//            }, 500)
//          }
//        }
//        $('.leftMenu-child-title').removeClass('succ')
//        $('.leftMenu-li-title').removeClass('active')
//        $(this).addClass('active')
//        $('.leftMenu-angle-icon').removeClass('fa-angle-down').addClass('fa-angle-left')
//        $(this).find('.leftMenu-angle-icon').removeClass('fa-angle-left').addClass('fa-angle-down')
//      })
//      $('.leftMenu-child-title').off('click').click(function () {
//        $('.leftMenu-child-title').removeClass('succ')
//        $(this).addClass('succ')
//      })
//      function timerShow() {
//        var now = new Date()
//        var year = now.getFullYear();
//        var mn = now.getMonth() + 1;
//        var dt = now.getDate();
//        var hh = now.getHours();
//        var mm = now.getMinutes();
//        var ss = now.getSeconds();
//        mn < 10 ? mn = '0' + mn : mn;
//        dt < 10 ? dt = '0' + dt : dt;
//        hh < 10 ? hh = '0' + hh : hh;
//        mm < 10 ? mm = '0' + mm : mm;
//        ss < 10 ? ss = '0' + ss : ss;
//        return year + '年' + mn + '月' + dt + '日  ' + '' + hh + ':' + mm + ':' + ss;
//      }
//      $('.layui-nav-timer').html(timerShow())
//      clearInterval(timer_now)
//      var timer_now = setInterval(function() {
//        $('.layui-nav-timer').html(timerShow())
//      }, 1000)
//
//
//    }
//  }
//  return {
//    init: function () {
//      _method.init()
//    }
//  }
//})()
//setTimeout(function () {
//index.init()
//}, 0)
import { Arr, _this } from "../inheritCore_extend.js"
new Arr([{
  data: {},
  name: 'a',
  init () {
    console.log(1)
  },
  ajax () {
    console.log(2)
  },
  handle () {
    console.log(3)
  },
  render () {
    _this.b.init()
  },
  bind () {
    console.log(5)
  }
}, {
  data: {},
  name: 'b',
  init (a) {
    console.log(1)
    this.ajax()
  },
  ajax () {
    console.log(2)
    this.handle()
  },
  handle () {
    console.log(3)
    this.render()
  },
  render () {
    console.log(4)
    this.bind()
  },
  bind () {
    console.log(5)
  }
}], {
  destroyed () {

  }
}, {
  test () {
    console.log('继承添加测试成功！')
  }
})
