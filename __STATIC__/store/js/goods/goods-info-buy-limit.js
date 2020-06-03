/*
 * @Author: your name
 * @Date: 2020-05-21 15:27:18
 * @LastEditTime: 2020-05-30 17:25:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-buy-limit.js
 */
const buyTimesLimitList = [
  {
    name: '不限制',
    value: 0
  },
  {
    name: '限制',
    value: 1
  }
]
const virtualSalesList = [
  {
    name: '不开启',
    value: 0
  },
  {
    name: '开启',
    value: 1
  }
]
const beforeList = [
  {
    name: '用户随订随用',
    value: 0
  },
  {
    name: '用户需提前 X 小时购买',
    value: 1
  },
  {
    name: '用户需在游玩 X 天 X 时 X 分前购买',
    value: 2
  }
]
const customList = [
  {
    name: '不定义',
    value: 0
  },
  {
    name: '定义',
    value: 1
  }
]
const showNoteList = [
  {
    name: '不显示',
    value: 0
  },
  {
    name: '显示',
    value: 1
  },
]
const buyLimitmodulesName = '购买限制'
const buyLimitCurrentDay = new Date()
const goodsInfoBuyLimitFormData = {
  buyTimes: 0,
  buy_times_num: 0,
  minNumber: 0,
  highestNumber: 0,
  is_virtual_sales: 0,
  virtual_sales: -1,
  before: 0,
  beforeHour: 0,
  beforeMinute: 0,
  beforeDay: 0,
  beforeTimeTemp: new Date(buyLimitCurrentDay.getFullYear(), buyLimitCurrentDay.getMonth() + 1, buyLimitCurrentDay.getDate(), 23, 59),
  beforeTime: 0,
  is_custom: 0,
  tagsTemp: [],
  tags: '',
  regulations: '',
  is_notes: 1,
  initData (tempData) {
    this.buyTimes = tempData.buyTimes
    this.buy_times_num = tempData.buy_times_num
    this.minNumber = tempData.minNumber
    this.highestNumber = tempData.highestNumber
    this.is_virtual_sales = tempData.is_virtual_sales
    this.virtual_sales = tempData.virtual_sales
    this.before = tempData.before
    this.beforeHour = tempData.beforeHour
    this.beforeMinute = tempData.beforeMinute
    this.beforeDay = tempData.beforeDay
    const beforeTimeDate = new Date(tempData.beforeTime * 1000)
    this.beforeTimeTemp = new Date(beforeTimeDate.getFullYear(), beforeTimeDate.getMonth() + 1, beforeTimeDate.getDate(), beforeTimeDate.getHours(), beforeTimeDate.getMinutes())
    this.is_custom = tempData.is_custom
    this.tagsTemp = tempData.tagsTemp
    this.regulations = tempData.regulations
    this.is_notes = tempData.is_notes
  }
}
// 模块信息校验规则
const goodsInfoBuyLimitCheckRules = {
  check: function() {
    if (goodsInfoBuyLimitFormData.is_virtual_sales !== 0 && goodsInfoBuyLimitFormData.virtual_sales === -1) {
      return new Error('请输入  ' + buyLimitmodulesName + ' -> 虚拟销量')
    }
    if (goodsInfoBuyLimitFormData.before === 1) {
      if (goodsInfoBuyLimitFormData.beforeHour === 0) {
        return new Error('请输入  ' + buyLimitmodulesName + ' -> 小时数')
      }
      if (goodsInfoBuyLimitFormData.beforeMinute === 0) {
        return new Error('请输入  ' + buyLimitmodulesName + ' -> 分钟数')
      }
    } else if (goodsInfoBuyLimitFormData.before === 2) {
      if (goodsInfoBuyLimitFormData.beforeDay === 0) {
        return new Error('请输入  ' + buyLimitmodulesName + ' -> 天数')
      }
      if (!goodsInfoBuyLimitFormData.beforeTimeTemp) {
        return new Error('请选择  ' + buyLimitmodulesName + ' -> 时间')
      }
    }
    if (goodsInfoBuyLimitFormData.is_custom !== 0) {
      if (goodsInfoBuyLimitFormData.tagsTemp.length === 0 && !goodsInfoBuyLimitFormData.regulations) {
        return new Error('请添加  ' + buyLimitmodulesName + ' -> 标签  或者  请输入  '  + buyLimitmodulesName + ' -> 自定义规则')
      }
      goodsInfoBuyLimitFormData.tags = goodsInfoBuyLimitFormData.tagsTemp.join(',')
    }
    if (goodsInfoBuyLimitFormData.beforeTimeTemp instanceof Date) {
      goodsInfoBuyLimitFormData.beforeTime = goodsInfoBuyLimitFormData.beforeTimeTemp.getTime() / 1000
    } else {
      goodsInfoBuyLimitFormData.beforeTime = goodsInfoBuyLimitFormData.beforeTimeTemp / 1000
    }
    return JSON.parse(JSON.stringify(goodsInfoBuyLimitFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'beforeTimeTemp' || key === 'tagsTemp') {
        return undefined
      }
      return value
    }))
  }
}