var OnlineBusiness_Report = (function () {
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
        title: '合作网商报表' // AJAX获取后的数据
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
        template: 'OnlineBusiness_Report/OnlineBusiness_Report' // 调用模板名称
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
      var self = this
      // excel导出
      $('.content-table').off('click').click(function () {
        excel_export('content-table')
      })
      // 初始化Ajax加载
      $('.content-table-det').html(template('content/OnlineBusiness_Report/OnlineBusiness_Report-table'))
      $.ajax({
        type: "get",
        url: BaseSet.url + '/marketingDepartmentReport/eBusinessmensStatistics',
        async: true,
        //      data: '{}',
        contentType: 'application/json',
        success: function (res) {
          var oneData = self.data
          oneData = res
          var data = oneData.data
          console.log(oneData)
          /* 数据处理 */
          // 第一列处理为字段
          var Data = new Date
          var year_now = Data.getFullYear()
          var year_old = year_now - 1
          oneData.firstLine = ['名称/月份']
          var firstLine = oneData.firstLine
          for (var i = 1; i < 16; i++) {
            if (!(i % 3)) {
              firstLine[i - 2] = year_now
              firstLine[i - 1] = year_old
              firstLine[i] = '对比'
            }
          }
          console.log(oneData)
          // 行数处理
          oneData.content = []
          var content = oneData.content
          var monthStr = ['第一季度', '第二季度', '第三季度', '第四季度']
          function contrast (now, last) { // 对比增长率计算
            if (!last) {
              return '-'
            }
            return parseFloat((now - last) / last).toFixed(2)
          }
          function sliceSum (content, obj, z) { // 季度值的计算
            var sum = 0
            for (var i = 0, j = 0; i < 3; i++) {
              var val = content[z - (i + 1)][obj]
              if (val === '-') {
                j++
                continue
              }
              sum += val
            }
            if (j === 3) {
              return '-'
            }
            return sum
          }
          function allSum (content, obj) { // 总计
            var sum = 0
            for (var i = 0, j = 0; i < content.length; i++) {
              if (monthStr.indexOf(content[i].month) !== -1) {
                if (content[i][obj] === '-') {
                  j++
                  continue
                }
                sum += content[i][obj]
              }
            }
            if (j === 4) {
              return '-'
            }
            return sum
          }
          for (var i = 0, z = 0, k = 0; i < 17; i++) {
            var p = true
            if (i === 16) { // 总计
              content.push({
                lastYearAll: allSum(content, 'lastYearAll'),
                yearAllContrast: allSum(content, 'yearAllContrast'),
                lastYearLvmama: allSum(content, 'lastYearLvmama'),
                yearlvmamaContrast: allSum(content, 'yearlvmamaContrast'),
                lastYearMeiTuan: allSum(content, 'lastYearMeiTuan'),
                yearMeiTuanContrast: allSum(content, 'yearMeiTuanContrast'),
                yearTongChengContrast: allSum(content, 'yearTongChengContrast'),
                lastYearTongCheng: allSum(content, 'lastYearTongCheng'),
                yearXieChengContrast: allSum(content, 'yearXieChengContrast'),
                lastYearXieCheng: allSum(content, 'lastYearXieCheng'),
                month: '总计',
                sum: true,
                nowYearAll: allSum(content, 'nowYearAll'),
                nowYearLvmama: allSum(content, 'nowYearLvmama'),
                nowYearMeiTuan: allSum(content, 'nowYearMeiTuan'),
                nowYearTongCheng: allSum(content, 'nowYearTongCheng'),
                nowYearXieCheng: allSum(content, 'nowYearXieCheng'),
              })
              break
            }
            if (!((i + 1) % 4)) {
              content.push({
                lastYearAll: sliceSum(content, 'lastYearAll', i),
                yearAllContrast: sliceSum(content, 'yearAllContrast', i),
                lastYearLvmama: sliceSum(content, 'lastYearLvmama', i),
                yearlvmamaContrast: sliceSum(content, 'yearlvmamaContrast', i),
                lastYearMeiTuan: sliceSum(content, 'lastYearMeiTuan', i),
                yearMeiTuanContrast: sliceSum(content, 'yearMeiTuanContrast', i),
                yearTongChengContrast: sliceSum(content, 'yearTongChengContrast', i),
                lastYearTongCheng: sliceSum(content, 'lastYearTongCheng', i),
                yearXieChengContrast: sliceSum(content, 'yearXieChengContrast', i),
                lastYearXieCheng: sliceSum(content, 'lastYearXieCheng', i),
                month: monthStr[k],
                sum: true,
                nowYearAll: sliceSum(content, 'nowYearAll', i),
                nowYearLvmama: sliceSum(content, 'nowYearLvmama', i),
                nowYearMeiTuan: sliceSum(content, 'nowYearMeiTuan', i),
                nowYearTongCheng: sliceSum(content, 'nowYearTongCheng', i),
                nowYearXieCheng: sliceSum(content, 'nowYearXieCheng', i),
              })
              k++
              continue
            }
            for (var j = 0; j < data.length; j++) {
              data[j].month = parseInt(data[j].month)
              var month = data[j].month
              if (month === (z + 1)) {
                data[j].yearAllContrast = contrast(data[j].nowYearAll, data[j].lastYearAll)
                data[j].yearlvmamaContrast = contrast(data[j].nowYearLvmama, data[j].lastYearLvmama)
                data[j].yearMeiTuanContrast = contrast(data[j].nowYearMeiTuan, data[j].lastYearMeiTuan)
                data[j].yearTongChengContrast = contrast(data[j].nowYearTongCheng, data[j].lastYearTongCheng)
                data[j].yearXieChengContrast = contrast(data[j].nowYearXieCheng, data[j].lastYearXieCheng)
                content.push(data[j])
                p = false
                break
              }
            }
            if (p) {
              content.push({
                lastYearAll: 0,
                lastYearLvmama: 0,
                lastYearMeiTuan: 0,
                lastYearTongCheng: 0,
                lastYearXieCheng: 0,
                month: (z + 1),
                nowYearAll: 0,
                nowYearLvmama: 0,
                nowYearMeiTuan: 0,
                nowYearTongCheng: 0,
                nowYearXieCheng: 0,
                yearAllContrast: '-',
                yearlvmamaContrast: '-',
                yearMeiTuanContrast: '-',
                yearTongChengContrast: '-',
                yearXieChengContrast: '-'
              })
            }
            z++
          }
          console.log(oneData)
          // 模板渲染
          $('.content-table-det').html(template('content/OnlineBusiness_Report/OnlineBusiness_Report-table', oneData))
        }
      })
    }
  }
  return {
    init: function () {
      one.init() // 执行初始化
    }
  }
})()