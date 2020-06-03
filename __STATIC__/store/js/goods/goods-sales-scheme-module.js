/*
 * @Author: your name
 * @Date: 2020-05-21 14:04:58
 * @LastEditTime: 2020-05-30 17:54:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-sales-scheme-module.js
 */ 
const workdayList = [
  {
    name: '日',
    value: 0
  },
  {
    name: '一',
    value: 1
  },
  {
    name: '二',
    value: 2
  },
  {
    name: '三',
    value: 3
  },
  {
    name: '四',
    value: 4
  },
  {
    name: '五',
    value: 5
  },
  {
    name: '六',
    value: 6
  }
]
const salesSchemeModulesName = '销售方案'

const goodsSalesSchemeFormData = {
  timeRange: [],
  startTime: 0,
  endTime: 0,
  costPrice: 0,
  salePrice: 0,
  retailPrice: 0,
  DayStock: -1,
  stock: '',
  confirm_stock: '',
  scenic_id: '',
  store_id: '',
  is_confirm: 0,
  is_interval: 0,
  workdayDataTemp: workdayList.map(it => it.value),
  workdayData: '',
  initData (tempData) {
    this.timeRange = []
    this.timeRange.push(new Date(tempData.startTime * 1000))
    this.timeRange.push(new Date(tempData.endTime * 1000))
    this.costPrice = tempData.costPrice
    this.salePrice = tempData.salePrice
    this.retailPrice = tempData.retailPrice
    this.DayStock = tempData.DayStock
    this.stock = tempData.stock
    this.confirm_stock = tempData.confirm_stock
    this.scenic_id = tempData.scenic_id
    this.store_id = tempData.store_id
    this.is_confirm = tempData.is_confirm
    this.workdayData = tempData.workdayData
    this.is_interval = tempData.is_interval
    this.workdayDataTemp = tempData.workdayDataTemp
  }
}

const goodsSalesSchemeCheckRules = {
  check: function () {
    if (goodsSalesSchemeFormData.timeRange.length === 0) {
      return new Error('请选择  ' + salesSchemeModulesName + ' -> 开始日期')
    }
    if (goodsSalesSchemeFormData.costPrice === 0) {
      return new Error('请输入  ' + salesSchemeModulesName + ' -> 成本价格')
    }
    if (goodsSalesSchemeFormData.salePrice === 0) {
      return new Error('请输入  ' + salesSchemeModulesName + ' -> 销售价格')
    }
    if (goodsSalesSchemeFormData.retailPrice === 0) {
      return new Error('请输入  ' + salesSchemeModulesName + ' -> 门市价格')
    }
    if (goodsSalesSchemeFormData.workdayDataTemp.length === 0) {
      return new Error('请选择  ' + salesSchemeModulesName + ' -> 可使用星期')
    }
    goodsSalesSchemeFormData.startTime = goodsSalesSchemeFormData.timeRange[0] / 1000
    goodsSalesSchemeFormData.endTime = goodsSalesSchemeFormData.timeRange[1] / 1000
    goodsSalesSchemeFormData.workdayData = goodsSalesSchemeFormData.workdayDataTemp.join(',')
    // return goodsSalesSchemeFormData
    return JSON.parse(JSON.stringify(goodsSalesSchemeFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'timeRange' || key === 'workdayDataTemp') {
        return undefined
      }
      return value
    }))
  }
}

function allSelected () {
  goodsSalesSchemeFormData.workdayDataTemp = workdayList.map(it => it.value)
}

function weekDaySelected () {
  goodsSalesSchemeFormData.workdayDataTemp = []
  goodsSalesSchemeFormData.workdayDataTemp.push(workdayList[0].value,workdayList[6].value)
}

function normalDaySelected () {
  goodsSalesSchemeFormData.workdayDataTemp = []
  goodsSalesSchemeFormData.workdayDataTemp.push(workdayList[1].value,workdayList[2].value,workdayList[3].value,workdayList[4].value,workdayList[5].value)
}