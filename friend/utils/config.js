const config = {
  baseRequestUrl: "http://www.test.com/index.php/api/",
  // baseRequestUrl: "https://mini.haining.cn/index.php/api/",
  http:{
    defaultHead: {
      'Content-Type': 'application/json',
      method: 'GET'
    }
  },
  basicinfo: {
    heightarray: [
      140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
      150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
      160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
      170, 171, 172, 173, 174, 175, 176, 177, 178, 179,
      180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
      190, 191, 192, 193, 194, 195, 196, 197, 198, 199
    ],
    weightarray: [
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
      70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    ],
    bloodarray: [
      "未选择", "A型", "B型", "AB型", "O型", "其他",
    ],
    educationarray: [
      "未选择", "高中及以下", "中专", "大专", "大学本科", "硕士", "博士", "海归"
    ],
    placearray: [
      "未选择", "硖石街道", "海洲街道", "海昌街道", "马桥街道", "斜桥镇", "周王庙镇",
      "盐官镇", "马桥镇", "许村镇", "长安镇", "黄湾镇", "袁花镇", "海盐县",
      "嘉善县", "桐乡市", "嘉兴市", "其他地区",
    ],
    occupationarray: [
      "未选择", "公务员", "事业单位", "国企", "企业职员", "自由职业", "个体户", "其他"
    ],
    incomearray: [
      "未选择", "3000以下", "3000~4000", "4000~5000", "5000~7000", "7000~10000",
      "10000~15000", "15000~20000", "20000以上"
    ],
    cararray: [
      "未选择", "无车", "有车"
    ],
    housearray: [
      "未选择", "与父母同住", "租房", "已购房（有贷款）", "已购房（有贷款）"
    ],
    maritalarray: [
      "未选择", "单身", "恋爱中", "已订婚", "已婚", "分居", "离异", "丧偶"
    ],
    babyarray: [
      "未选择", "没有", "有且归我抚养", "有不归我抚养"
    ],
  },
  sysMsg: {
    report: [
      "恶意留言",
      "资料不匹配",
      "个人资料包含敏感信息",
      "广告营销虚假账号",
      "头像或照片含有色情信息",
    ],
  }
}

module.exports = config;