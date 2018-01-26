var droreMap, DroreUI, baseMap
var BaseSet = {
  url: 'http://172.10.51.123:10186'
}

function timer_now() {
  var mydate = new Date()
  var str = "" + mydate.getFullYear() + "-"
  str += (mydate.getMonth() + 1) + "-"
  str += mydate.getDate() + " "
  str += mydate.getHours() + ":"
  str += mydate.getMinutes() + ":"
  str += mydate.getSeconds()
  return str
}

function data_addSub(dd, dadd) {
  var a = new Date(dd);
  a = a.valueOf();
  a = a + dadd * 24 * 60 * 60 * 1000;
  a = new Date(a);
  var m = a.getMonth() + 1;
  if (m.toString().length == 1) m = '0' + m;
  var d = a.getDate();
  if (d.toString().length == 1) d = '0' + d;
  return a.getFullYear() + "-" + m + "-" + d;
}

function Content(data, _method, callback) {
  // * --- 必要START
  if (!_method) {
    toastr.warning('Content函数须传入_method对象，请参考配置文档')
    return
  }
  window._method = _method // 挂载全局
  var build = data.build
  var option = data.option
  if (!build.id || !build.name || !build.width || !build.line || !build.height || !build.template) {
    toastr.error('请填写必要的build配置项')
    console.warn('请填写必要的build配置项')
    return
  }
  // * --- END
  /*缺省判断 --- 按属性流,避免加载多余字段*/
  var switchE_def = []
  if (option) {
    // 这里用兼容性写法，外部如写了字体限制，则该处不生效
    if (option.tooltip) {
      if (option.tooltip.textStyle) {
        if (!option.tooltip.textStyle.fontSize) {
          option.tooltip.textStyle.fontSize = 12
        }
      } else {
        option.tooltip.textStyle = {
          fontSize: 12
        }
      }
    }
    // 给lengend消失颜色加深
    if (option.legend) {
      option.legend.textStyle = {
        fontSize: 11
      }
      option.legend.inactiveColor = '#878787'
      if (option.legend.data) {
        var legendArr = [],
          isLegend = false
        for (var i = 0; i < option.legend.data.length; i++) {
          if (option.legend.data[i].textStyle) {
            if (!option.legend.data[i].textStyle.color) {
              option.legend.data[i].textStyle.color = 'c4c4c4'
            }
          } else {
            isLegend = true
            legendArr.push({
              name: option.legend.data[i],
              textStyle: {
                color: '#c4c4c4'
              }
            })
          }
        }
        if (isLegend) {
          option.legend.data = legendArr
        }
      }
    }
    // x轴、y轴懒得写兼容了，一般不会修改该刻度大小
    if (option.yAxis) {
      if (option.yAxis.length > 0) {
        for (var i = 0; i < option.yAxis.length; i++) {
          option.yAxis[i].axisLabel = {
            fontSize: 11
          }
          option.yAxis[i].nameTextStyle = {
            fontSize: 11
          }
        }
      } else {
        option.yAxis.axisLabel = {
          fontSize: 11
        }
        option.yAxis.nameTextStyle = {
          fontSize: 11
        }
      }
    }
    if (option.xAxis) {
      if (option.xAxis.length > 0) {
        for (var i = 0; i < option.xAxis.length; i++) {
          option.xAxis[i].axisLabel = {
            fontSize: 11
          }
        }
      } else {
        option.xAxis.axisLabel = {
          fontSize: 11
        }
      }
    }
    // 这里用兼容性写法，外部如写了字体限制，则该处不生效(针对饼图)
    if (option.series) {
      if (option.series.length) {
        for (var i = 0; i < option.series.length; i++) {
          if (option.itemStyle) {
            if (option.series[i].itemStyle.normal) {
              if (option.series[i].itemStyle.normal.label) {
                if (option.series[i].itemStyle.normal.label.textStyle) {
                  if (option.series[i].itemStyle.normal.label.textStyle.fontSize) {
                    break
                  }
                } else {
                  option.series[i].itemStyle.normal.label.textStyle.fontSize = 11
                }
              } else {
                option.series[i].itemStyle.normal.label.textStyle = {
                  fontSize: 11
                }
              }
            } else {
              option.series[i].itemStyle.normal = {
                label: {
                  textStyle: {
                    fontSize: 11
                  }
                }
              }
            }
          } else {
            option.series[i].itemStyle = {
              normal: {
                label: {
                  textStyle: {
                    fontSize: 11
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // 判断是否有该switchE属性
  if (build.hasOwnProperty('switchE') && option) {
    // 默认转换图表时
    if (!option) return
    if (!build.echarts) {
      build.switchE = false
      console.warn('配置项echarts未填写，则不匹配switchE的值')
    }
    if (build.switchE === true) {
      // 执行echarts选择图标类型生成另外echarts
      echartsE(build.echarts)
    } else {
      // 高级配置项
      // need存在的话
      if (build.switchE.hasOwnProperty('need')) {
        var need = build.switchE.need
        if (need.length > 0) {
          echartsE(build.echarts)
          for (var i = 0; i < switchE_def.length; i++) {
            if (need.indexOf(switchE_def[i].name) === -1 && switchE_def[i].name !== build.echarts) {
              switchE_def.splice(i, 1)
              i--
            }
          }
        }
      }
      if (build.switchE.hasOwnProperty('change')) {
        var change = build.switchE.change
        for (var i = 0; i < change.length; i++) {
          switchE_def.push({
            name: change[i].fa,
            option: change[i].option
          })
        }
      }
    }

    function echartsE(echartsC) {
      // 公用样式 --- 增加堆叠、平铺btn
      option.toolbox = {
        show: true,
        feature: {
          //		            magicType: {type: ['tiled', 'stack']},
        }
      }
      switch (echartsC) {
        case 'line':
          switchE_def = [{
            name: echartsC,
            option: option
          }]
          lineTransfAll(switchE_def)
          break
        case 'bar':
          switchE_def = [{
            name: echartsC,
            option: option
          }]
          barTransfAll(switchE_def)
          break
        case 'pie':
          switchE_def = [{
            name: echartsC,
            option: option
          }]
          picTransfAll(switchE_def)
          break
        default:
          toastr.warning('该 ' + echartsC + ' 图表类型未知,无法自动生成其余图表,需填写switchE高级配置项')
          break
      }

      function lineTransfAll(obj, is) { // line转换为其他两图表
        // 转换bar
        var copy = $.extend(true, [], obj)
        for (var j = 0; j < copy[0].option.series.length; j++) {
          copy[0].option.series[j].type = 'bar'
          copy[0].option.series[j].barWidth = '50%'
        }
        if (copy[0].option.xAxis.length) {
          for (var i = 0; i < copy[0].option.xAxis.length; i++) {
            copy[0].option.xAxis[i].boundaryGap = true
          }
        } else {
          copy[0].option.xAxis.boundaryGap = true
        }
        copy[0].option.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 11
          },
          formatter: false
        }
        switchE_def.push({
          name: 'bar',
          option: copy[0].option
        })
        if (is === false) return // 如果 false则不转换pie
        // 转换pic
        picGenerate(obj)
      }

      function barTransfAll(obj) { // bar转换为其他两图表
        // 转换之前先将bar添加手势图
        obj[0].option.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 11
          },
          formatter: false
        }
        // 转换line
        var copy = $.extend(true, [], obj)
        for (var j = 0; j < copy[0].option.series.length; j++) {
          copy[0].option.series[j].type = 'line'
        }
        if (copy[0].option.xAxis.length) {
          for (var i = 0; i < copy[0].option.xAxis.length; i++) {
            copy[0].option.xAxis[i].boundaryGap = true
          }
        } else {
          copy[0].option.xAxis.boundaryGap = true
        }
        // 判断是否要转换xy轴
        var xy_is = false
        if (copy[0].option.yAxis.length > 0) {
          if (copy[0].option.yAxis[0].data) {
            xy_is = true
          }
        } else {
          if (copy[0].option.yAxis.data) {
            xy_is = true
          }
        }
        if (xy_is) {
          var xy_Tran = copy[0].option.xAxis
          copy[0].option.xAxis = copy[0].option.yAxis
          copy[0].option.yAxis = xy_Tran
        }
        copy[0].option.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle: {
            fontSize: 11
          },
          formatter: false
        }
        switchE_def.push({
          name: 'line',
          option: copy[0].option
        })
        // 转换pic
        picGenerate(obj)
      }

      function picTransfAll(obj) { // pic转换为其他两图表
        // 转换line
        var copy = $.extend(true, [], obj)
        var xAxis = obj[0].option.series[0]
        copy[0].option.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle: {
            fontSize: 11
          },
          formatter: false
        }
        if (copy[0].option.legend) {
          copy[0].option.legend.data = [xAxis.name]
        } else {
          copy[0].option.legend = {
            data: [xAxis.name]
          }
        }
        copy[0].option.yAxis = [{
          type: 'value',
          axisLabel: {
            fontSize: 11
          }
        }]
        copy[0].option.grid = {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
        copy[0].option.series = [{
          name: xAxis.name,
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: []
        }]
        copy[0].option.xAxis = [{
          type: 'category',
          boundaryGap: true,
          data: []
        }]
        for (var i = 0; i < xAxis.data.length; i++) {
          copy[0].option.xAxis[0].data.push(xAxis.data[i].name)
          copy[0].option.series[0].data.push(xAxis.data[i].value)
        }
        switchE_def.push({
          name: 'line',
          option: copy[0].option
        })
        // 转换bar
        lineTransfAll([switchE_def[1]], false)
      }

      function picGenerate(obj) { // 生成pic图表
        var copy = $.extend(true, [], obj)
        var series = copy[0].option.series
        var legend = {}
        if (copy[0].option.legend) {
          legend = copy[0].option.legend.data
        } else {
          copy[0].option.legend = {
            data: []
          }
        }
        var xAxis = ''
        if (copy[0].option.xAxis) {
          if (copy[0].option.xAxis[0]) {
            if (copy[0].option.xAxis[0].data) {
              xAxis = copy[0].option.xAxis[0].data
            }
          } else if (copy[0].option.xAxis.data) {
            xAxis = copy[0].option.xAxis.data
          }
        }
        if (copy[0].option.yAxis) {
          if (copy[0].option.yAxis[0]) {
            if (copy[0].option.yAxis[0].data) {
              xAxis = copy[0].option.yAxis[0].data
            }
          } else if (copy[0].option.yAxis.data) {
            xAxis = copy[0].option.yAxis.data
          }
        }
        delete copy[0].option.xAxis
        delete copy[0].option.yAxis
        //      if (series.length > 1) {
        //        toastr.error('饼图并不支持多Series渲染,如要支持请配置高级选项switchE')
        //        switchE_def.push({
        //          name: 'pie',
        //          option: false
        //        })
        //        return
        //      }
        var series_long = false
        var pieSeries = []
        if (series.length <= 1) {
          var series = series[0].data
          for (var j = 0; j < series.length; j++) {
            pieSeries.push({
              value: series[j],
              name: xAxis ? xAxis[j] : ''
            })
          }
        } else {
          series_long = true
          copy[0].option.series = []
          var radiusVal = [-60, -10]
          var radiusSub = 50
          for (var j = 0; j < series.length; j++) {
            radiusVal[0] += 60
            radiusVal[1] += radiusSub
            radiusSub -= 12
            copy[0].option.series.push({
              name: obj[0].option.series[j].name,
              type: 'pie',
              radius: [radiusVal[0] + '%', radiusVal[1] + '%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            })
            if (j !== series.length - 1) {
              copy[0].option.series[j].label = {
                normal: {
                  position: 'inner'
                }
              }
            }
            for (var z = 0; z < series[j].data.length; z++) {
              copy[0].option.series[j].data.push({
                value: series[j].data[z],
                name: xAxis ? xAxis[z] : ''
              })
            }
            //          pieSeries.push({
            //            value: series[j],
            //            name: xAxis ? xAxis[j] : ''
            //          })
          }
        }
        //      for (var j = 0; j < series[0].data.length; j++) {
        //        pieSeries.push({
        //          value: series[0].data[j],
        //          name: xAxis ? xAxis[j] : ''
        //        })
        //      }
        //      for (var j = 0; j < series.length; j++) {
        //        pieSeries.push({
        //          value: series[j],
        //          name: xAxis ? xAxis[j] : ''
        //        })
        //      }
        copy[0].option.tooltip = {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          textStyle: {
            fontSize: 11
          },
        }
        copy[0].option.title ? copy[0].option.title.x = 'center' : copy[0].option.title = {
          x: 'center'
        }
        copy[0].option.legend.orient = 'vertical'
        copy[0].option.legend.left = 'left'
        if (!series_long) {
          copy[0].option.series = []
          copy[0].option.series.push({
            name: legend[0],
            type: 'pie',
            radius: '55%',
            //          center: ['50%', '60%'],
            data: pieSeries,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          })
        }
        switchE_def.push({
          name: 'pie',
          option: copy[0].option
        })
      }
    }
  }
  // 挂载在data下
  data.switchE_def = JSON.stringify(switchE_def)
  data.switchE_deF = switchE_def
  if (option) {
    data.option = JSON.stringify(option)
  }
  // * --- 必要START
  var obj = $('.content .layui-row')
  if (build.width >= 6) {
    build.klass = 'layui-col-xs12 content-layui-col layui-col-sm12 h100 layui-col-md' + build.width
  } else if (build.width >= 4) {
    build.klass = 'layui-col-xs12 content-layui-col layui-col-sm6 h100 layui-col-md' + build.width
  } else {
    build.klass = 'layui-col-xs12 content-layui-col layui-col-sm12 h100 layui-col-md' + build.width
  }
  if ($(obj)[0]) {
    // 如果有相同的则重新渲染
    if ($('#' + build.id)[0]) {
      var objParent = $('#' + build.id).parent()
      $('#' + build.id).html(template('content/' + build.template, data))
      return
    }
    for (var i = 0; i < obj.length; i++) {
      var h = parseInt($(obj[i]).attr('data-line'))
      if (build.line === h) {
        $(obj[i]).append('<div id="' + build.id + '" class="' + build.klass + '">' + template('content/' + build.template, data) + '</div>')
        return
      }
    }
  }
  $('.content').append("<section data-line=" + build.line + " class='layui-row layui-col-space18' style='height:" + build.height + ";margin: 0;'><div id='" + build.id + "' class='" + build.klass + "'>" + template('content/' + build.template, data) + "</div></section>")
  setTimeout(function () {
    iframe = $('iframe')[0]
    if (iframe) {
      droreMap = iframe.contentWindow.droreMap
      DroreUI = iframe.contentWindow.DroreUI
      baseMap = iframe.contentWindow.baseMap
      typeof (callback) === 'function' && callback(droreMap, DroreUI, baseMap)
    }
  }, 500)
  // * --- END
}
/*
template模版辅助函数
*/
//数字千分位格式化
template.helper('toQfw', function (n) {
  if (isNaN(n)) {
    return n
  }
  var str_n = n.toString();
  var result = "";
  while (str_n.length > 3) {
    result = "," + str_n.slice(-3) + result;
    str_n = str_n.slice(0, str_n.length - 3)
  }
  if (str_n) {
    return (str_n + result)
  }
})