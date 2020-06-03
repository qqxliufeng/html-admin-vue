/*
 * @Author: your name
 * @Date: 2020-05-21 17:16:34
 * @LastEditTime: 2020-05-29 15:59:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-enter-module.js
 */
const userInfoList = [
  {
    name: '不需要',
    value: 0
  },
  {
    name: '只需要一人信息',
    value: 1
  },
  {
    name: '所有人信息',
    value: 2
  }
]
const touristsInfoList = [
  {
    name: '姓名',
    value: 'n'
  },
  {
    name: '手机号',
    value: 'm'
  },
  {
    name: '身份证号',
    value: 'id'
  },
  {
    name: '学校名称',
    value: 'u'
  },
  {
    name: '学生证号',
    value: 's'
  }
]
const idCardRuleList = [
  {
    name: '限制购买',
    value: 0
  },
  {
    name: '只允许购买',
    value: 1
  }
]
const parkWaysList = [
  {
    name: '无需换票，直接验证入园',
    value: 0
  },
  {
    name: '需先换票，持票入园',
    value: 1
  }
]
const parkProveList = [
  {
    name: '二维码',
    value: 'qr'
  },
  {
    name: '团券码',
    value: 'g'
  },
  {
    name: '身份证（需勾选提供用户身份证信息）',
    value: 'ids'
  },
  {
    name: '手机号',
    value: 'p'
  }
]
const enterModulesName = '入园方式'
const enterCurrentDay = new Date()
const goodsInfoEnterFormData = {
  tourists: 0,
  touristsInfoTemp: ['n', 'm'],
  touristsInfo: '',
  is_id_number: '0',
  id_card_rule: 0,
  parkWays: 0,
  parkProveTemp: ['qr', 'g', 'ids', 'p'],
  parkProve: '',
  other_way: '',
  checkTimeRange: [new Date(enterCurrentDay.getFullYear(), enterCurrentDay.getMonth(), enterCurrentDay.getDate(), 8, 00), new Date(enterCurrentDay.getFullYear(), enterCurrentDay.getMonth(), enterCurrentDay.getDate(), 15, 00)],
  parkCheckStartTime: 0,
  parkCheckEndTime: 0,
  check_time_notes: '',
  parkCheck: '',
  parkDetails: '',
  initData (tempData) {
    this.tourists = tempData.tourists
    this.touristsInfo = tempData.touristsInfo
    this.is_id_number = tempData.is_id_number
    this.id_card_rule = tempData.id_card_rule
    this.parkWays = tempData.parkWays
    this.parkProve = tempData.parkProve

    this.checkTimeRange[0] = tempData.parkCheckStartTime
    this.checkTimeRange[1] = tempData.parkCheckEndTime

    this.check_time_notes = tempData.check_time_notes
    this.parkCheck = tempData.parkCheck
    this.parkDetails = tempData.parkDetails
  }
}
// 模块信息校验规则
const goodsInfoEnterCheckRules = {
  check: function() {
    if (goodsInfoEnterFormData.tourists !== 0) {
      if (goodsInfoEnterFormData.touristsInfoTemp.length === 0) {
        return new Error('请至少选择一种  ' + enterModulesName + ' -> 所需用户信息')
      }
      if (goodsInfoEnterFormData.is_id_number === '') {
        return new Error('请输入  ' + enterModulesName + ' -> 限制身份证号')
      }
    }
    if (goodsInfoEnterFormData.parkWays === 0) {
      if (goodsInfoEnterFormData.checkTimeRange.length === 0) {
        return new Error('请选择  ' + enterModulesName + ' -> 入园时间')
      }
    } else {
      if (goodsInfoEnterFormData.checkTimeRange.length === 0) {
        return new Error('请选择  ' + enterModulesName + ' -> 换票时间')
      }
      if (!goodsInfoEnterFormData.parkCheck) {
        return new Error('请输入  ' + enterModulesName + ' -> 换票地址')
      }
    }
    if (goodsInfoEnterFormData.parkProveTemp.length === 0) {
      return new Error('请至少选择一种  ' + enterModulesName + ' -> 入园凭证')
    }
    if (!goodsInfoEnterFormData.parkDetails) {
      return new Error('请输入  ' + enterModulesName + ' -> 入园地址')
    }
    if (goodsInfoEnterFormData.checkTimeRange.length > 0) {
      goodsInfoEnterFormData.parkCheckStartTime = goodsInfoEnterFormData.checkTimeRange[0].getTime() / 1000
      goodsInfoEnterFormData.parkCheckEndTime = goodsInfoEnterFormData.checkTimeRange[1].getTime() / 1000
    }
    goodsInfoEnterFormData.touristsInfo = goodsInfoEnterFormData.touristsInfoTemp.join(',')
    goodsInfoEnterFormData.parkProve = goodsInfoEnterFormData.parkProveTemp.join(',')
    // return goodsInfoEnterFormData
    return JSON.parse(JSON.stringify(goodsInfoEnterFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'checkTimeRange' || key === 'touristsInfoTemp' || key === 'parkProveTemp') {
        return undefined
      }
      return value
    }))
  }
}