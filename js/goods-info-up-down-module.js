/*
 * @Author: your name
 * @Date: 2020-05-22 14:27:55
 * @LastEditTime: 2020-05-29 11:22:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-up-down-module.js
 */ 
const putawayList = [
  {
    name: '立即上架',
    value: 4
  },
  {
    name: '手动上架',
    value: 0
  },
  {
    name: '有效期始自动上架',
    value: 1
  },
  {
    name: '指定日期上架',
    value: 2
  },
  {
    name: '指定日期上架并倒计时',
    value: 3
  }
]
const unShelveList = [
  {
    name: '有效期已过自动下架',
    value: 0
  },
  {
    name: '指定时间下架并倒计时',
    value: 1
  }
]

const upDownModulesName = '上下架设置'
const goodsInfoUpDownFormData = {
  putaway: 4,
  putawayTimeTemp: '',
  putawayTime: '',
  putawayTimeRange: [],
  putawayStartTimeing: 0,
  putawayEndTimeing: 0,

  unShelve: 0,
  unShelveTimeRange: [],
  unShelveStartTime: 0,
  unShelveEndTime: 0,
  initData (tempData) {
    this.putaway = tempData.putaway
    this.putawayTime = tempData.putawayTime
    this.putawayTimeRange[0] = tempData.putawayStartTimeing
    this.putawayTimeRange[1] = tempData.putawayEndTimeing

    this.unShelve = tempData.unShelve
    this.unShelveTimeRange[0] = tempData.unShelveStartTime
    this.unShelveTimeRange[1] = tempData.unShelveEndTime
  }
}

// 模块信息校验规则
const goodsInfoUpDownCheckRules = {
  check: function() {
    if (goodsInfoUpDownFormData.putaway === 2 && goodsInfoUpDownFormData.putawayTimeTemp === '') {
      return new Error('请输入  ' + upDownModulesName + ' -> 指定日期上架时间')
    }
    if (goodsInfoUpDownFormData.putaway === 3 && goodsInfoUpDownFormData.putawayStartTimeing.length === 0) {
      return new Error('请选择  ' + upDownModulesName + ' -> 指定日期上架并倒计时 -> 时间范围')
    }
    if (goodsInfoUpDownFormData.unShelve === 1 && goodsInfoUpDownFormData.unShelveStartTime.length === 0) {
      return new Error('请选择  ' + upDownModulesName + ' -> 指定时间下架并倒计时 -> 时间范围')
    }
    goodsInfoUpDownFormData.putawayTime = goodsInfoUpDownFormData.putawayTimeTemp / 1000
    if (goodsInfoUpDownFormData.putawayTimeRange.length > 0) {
      goodsInfoUpDownFormData.putawayStartTimeing = goodsInfoUpDownFormData.putawayTimeRange[0] / 1000
      goodsInfoUpDownFormData.putawayEndTimeing = goodsInfoUpDownFormData.putawayTimeRange[1] / 1000
    }
    if (goodsInfoUpDownFormData.unShelveTimeRange.length > 0) {
      goodsInfoUpDownFormData.unShelveStartTime = goodsInfoUpDownFormData.unShelveTimeRange[0] / 1000
      goodsInfoUpDownFormData.unShelveEndTime = goodsInfoUpDownFormData.unShelveTimeRange[1] / 1000
    }
    // return goodsInfoUpDownFormData
    return JSON.parse(JSON.stringify(goodsInfoUpDownFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'putawayTimeTemp' || key === 'putawayTimeRange' || key === 'unShelveTimeRange') {
        return undefined
      }
      return value
    }))
  }
}
