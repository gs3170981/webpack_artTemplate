const CONFIG = [{
  "title": "产业监测系统后台",
  "url": "http://172.10.51.123:10186",
  "menu": [
    {
      "title": "产业监测",
      "fa": "fa-cube",
      "href": "!/IndustryMonitoring",
      "child": [
        {
          "title": "消费类型统计",
          "href": "@/Consumption_Type1"
        }, {
          "title": "消费类型统计",
          "href": "/Consumption_Type",
          "module": ["table", "content"]
        }, {
          "title": "营销效果对比",
          "href": "/Marketing_Effect",
          "child": [
            {
              "title": "消费类型统计",
              "href": "/Consumption_Type",
              "module": ["table", "content"]
            }
          ]
        }
      ]
    }
  ],
  "AloneRouter": [{
      "title": "独立路由A",
      "href": "/A",
      "module": ["open", "det"]
    }, {
      "title": "独立路由B",
      "href": "/B",
      "module": ["only", "more"]
    }
  ]
}
]
const FILE_NAME = ["chanyejiance"]
module.exports = { CONFIG: CONFIG,FILE_NAME: FILE_NAME }