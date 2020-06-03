/*
 * @Author: your name
 * @Date: 2020-05-22 14:14:59
 * @LastEditTime: 2020-05-29 16:12:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-sms-module.js
 */
const notifyCustomerList = [
  {
    name: '预定成功，短信发送入园凭证',
    value: 'smsSucceed'
  },
  {
    name: '取消订单，短信通知客户',
    value: 'smsCancel'
  }
]

const notifyMerchantList = [
  {
    name: '预定成功，短信通知供应商',
    value: 'smsSucceed'
  },
  {
    name: '取消订单，短信通知供应商',
    value: 'smsCancel'
  }
]
const smsModulesName = '短信设置'
const goodsInfoSmsFormData = {
  notifyCustomerTemp: [],
  notifyCustomer: [],
  notifyMerchantTemp: [],
  notifyMerchant: [],
  message_content: '',
  initData (tempData) {
    this.notifyCustomer = tempData.notifyCustomer
    this.notifyMerchant = tempData.notifyMerchant
    this.message_content = tempData.message_content
  }
}

// 模块信息校验规则
const goodsInfoSmsCheckRules = {
  check: function() {
    if (!goodsInfoSmsFormData.message_content) {
      return new Error('请输入  ' + smsModulesName + ' ->  短信内容')
    }
    // return goodsInfoSmsFormData
    goodsInfoSmsFormData.notifyCustomer = goodsInfoSmsFormData.notifyCustomerTemp.join(',')
    goodsInfoSmsFormData.notifyMerchant = goodsInfoSmsFormData.notifyMerchantTemp.join(',')
    return JSON.parse(JSON.stringify(goodsInfoSmsFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'notifyCustomerTemp' || key === 'notifyMerchantTemp') {
        return undefined
      }
      return value
    }))
  }
}
