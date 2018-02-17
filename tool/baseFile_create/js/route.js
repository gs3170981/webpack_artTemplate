Router.route({
  "path": "/chanyejiance",
  "title": "首页"
})
Router.route({
  "path": "/chanyejiance/IndustryMonitoring",
  "title": "产业监测",
  "child": [{
    "title": "消费类型统计",
    "path": "/Consumption_Type"
  }, {
    "title": "营销效果对比",
    "path": "/Marketing_Effect"
  }]
})
Router.route({
  "path": "/chanyejiance/Financial_Reporting",
  "title": "财务报表",
  "child": [{
    "title": "财务日统计报表",
    "path": "/Day_Statistics"
  }, {
    "title": "财务客流统计",
    "path": "/PassengerFlow_statistics"
  }, {
    "title": "财务上报",
    "path": "/Reporting"
  }, {
    "title": "财务库存统计",
    "path": "/Stock_Statistics"
  }, {
    "title": "财务国税核销",
    "path": "/NationalTax_Cancel"
  }]
})
Router.route({
  "path": "/chanyejiance/Tourist_Center",
  "title": "游客中心报表",
  "child": [{
    "title": "销售排名",
    "path": "/Sales_Rank"
  }, {
    "title": "销售检票统计",
    "path": "/SalesTicket_Statistics"
  }]
})
Router.route({
  "path": "/chanyejiance/Sales_Report",
  "title": "营销部报表",
  "child": [{
    "title": "国内团队统计",
    "path": "/DomesticTeam_Statistics"
  }, {
    "title": "国内团队总计",
    "path": "/DomesticTeam_Total"
  }, {
    "title": "省内团队统计",
    "path": "/ProvincialTeam_Statistics"
  }, {
    "title": "省内团队总计",
    "path": "/ProvincialTeam_Total"
  }, {
    "title": "旅行社销售统计",
    "path": "/TourOperatorSale_Statistics"
  }, {
    "title": "旅行社销售总计",
    "path": "/TourOperatorSale_Total"
  }]
})
Router.route({
  "path": "/chanyejiance/OnlineBusiness_Report",
  "title": "合作网商报表"
})