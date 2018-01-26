const CONFIG = [{
  "title": "百里杜鹃系统后台",
  "url": "http://172.17.10.55:17011",
  "menu": [
    {
      "title": "产业监测",
      "fa": "fa-cube",
      "href": "!/IndustryMonitoring",
      "module": ["table", "content"],
      "child": [
        {
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
  ]
}
,{
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
  ]
}
]
const FILE_NAME = ["bailidujuan","chanyejiance"]
module.exports = { CONFIG: CONFIG,FILE_NAME: FILE_NAME }