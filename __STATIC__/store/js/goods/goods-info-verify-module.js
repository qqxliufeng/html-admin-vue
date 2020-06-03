/*
 * @Author: your name
 * @Date: 2020-05-22 10:10:16
 * @LastEditTime: 2020-05-30 17:55:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-verify-module.js
 */ 
const deadlineTypeList = [
  {
    name: '当日有效',
    value: 0
  },
  {
    name: '当日及前后 X 天有效',
    value: 1
  },
  {
    name: '自定有效期',
    value: 2
  }
]
const verifyWorkdayList = [
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
const sendCodeList = [
  {
    name: '一码多发：一个订单对应一个优待客团券码',
    value: 0
  },
  {
    name: '一码一发：一张门票对应一个优待客团券码',
    value: 1
  }
]
const checkRulesList = [
  {
    name: '分批验证',
    value: 0
  },
  {
    name: '整批验证',
    value: 1
  }
]

const verfiyModulesName = '验证设置'
const goodsInfoVerifyFormData = {
  deadlineType: 0,
  deadlineFront: 0,
  deadlineLater: 0,
  validPeriodRange: [],
  valid_period_start: 0,
  valid_period_end: 0,
  valid_period_week_temp: verifyWorkdayList.map(it => it.value),
  valid_period_week: '',
  sendCode: 0,
  checkRules: 0,
  checkNumber: 0,
  initData (tempData) {
    this.deadlineType = tempData.deadlineType
    this.deadlineFront = tempData.deadlineFront
    this.deadlineLater = tempData.deadlineLater
    this.validPeriodRange = []
    this.validPeriodRange.push(new Date(tempData.valid_period_start * 1000))
    this.validPeriodRange.push(new Date(tempData.valid_period_end * 1000))
    this.valid_period_week_temp = tempData.valid_period_week
    this.sendCode = tempData.sendCode

    this.checkRules = tempData.checkRules
    this.checkNumber = tempData.checkNumber
  }
}

// 模块信息校验规则
const goodsInfoVerifyCheckRules = {
  check: function() {
    if (goodsInfoVerifyFormData.deadlineType === 1) {
      if (goodsInfoVerifyFormData.deadlineFront === 0) {
        return new Error('请输入  ' + verfiyModulesName + ' -> 当日及前 X 天有效')
      }
      if (goodsInfoVerifyFormData.deadlineLater === 0) {
        return new Error('请输入  ' + verfiyModulesName + ' -> 当日及后 X 天有效')
      }
    }
    if (goodsInfoVerifyFormData.deadlineType === 2) {
      if (goodsInfoVerifyFormData.validPeriodRange.length === 0) {
        return new Error('请选择  ' + verfiyModulesName + ' ->  生效时间')
      }
      if (goodsInfoVerifyFormData.valid_period_week_temp.length === 0) {
        return new Error('请选择  ' + verfiyModulesName + ' -> 可使用星期')
      }
    }
    if (goodsInfoVerifyFormData.validPeriodRange.length > 0) {
      goodsInfoVerifyFormData.valid_period_start =  goodsInfoVerifyFormData.validPeriodRange[0] / 1000
      goodsInfoVerifyFormData.valid_period_end =  goodsInfoVerifyFormData.validPeriodRange[1] / 1000
    }
    goodsInfoVerifyFormData.valid_period_week = goodsInfoVerifyFormData.valid_period_week_temp.join(',')
    // return goodsInfoVerifyFormData
    return JSON.parse(JSON.stringify(goodsInfoVerifyFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'validPeriodRange' || key === 'valid_period_week_temp') {
        return undefined
      }
      return value
    }))
  }
}

function verifyAllSelected () {
  goodsInfoVerifyFormData.valid_period_week_temp = verifyWorkdayList.map(it => it.value)
}

function verifyWeekDaySelected () {
  goodsInfoVerifyFormData.valid_period_week_temp = []
  goodsInfoVerifyFormData.valid_period_week_temp.push(verifyWorkdayList[0].value,verifyWorkdayList[6].value)
}

function verifyNormalDaySelected () {
  goodsInfoVerifyFormData.valid_period_week_temp = []
  goodsInfoVerifyFormData.valid_period_week_temp.push(verifyWorkdayList[1].value,verifyWorkdayList[2].value,verifyWorkdayList[3].value,verifyWorkdayList[4].value,verifyWorkdayList[5].value)
}