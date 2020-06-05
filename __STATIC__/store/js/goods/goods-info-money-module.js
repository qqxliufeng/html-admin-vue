/*
 * @Author: your name
 * @Date: 2020-05-21 14:55:01
 * @LastEditTime: 2020-06-05 16:20:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-money-module.js
 */
const forPeopleText = '成人票可以不用填写，特殊票中需要说明，如：学生票是指：中国全日制在校大专、本科生。取票或入园时请出示本人有效证件（学生证，校园卡或电子学籍其中之一，证件上的照片清楚，个人信息完整)不含：函授，自考，成教，继续教育，网络教育。'
const moneyModulesName = '费用说明'
const goodsInfoMoneyFormData = {
  for_people: '',
  feesInclude: '',
  feesNotInclude: '',
  invoiceExplain: '',
  other: '',
  assembling_place: [],
  assemblingPlaceTemp: [
    {
      id: new Date().getTime(),
      time: '',
      site: '',
      showAddButton: true,
      showCloseButton: false
    }
  ],
  initData (tempData) {
    this.for_people = tempData.for_people
    this.feesInclude = tempData.feesInclude
    this.feesNotInclude = tempData.feesNotInclude
    this.invoiceExplain = tempData.invoiceExplain
    this.other = tempData.other
    this.assemblingPlaceTemp = []
    const sites = JSON.parse(tempData.sites)
    sites.forEach((it, index) => {
      goodsInfoMoneyFormData.assemblingPlaceTemp.push(
        {
          id: new Date().getTime(),
          time: it.time,
          site: it.site,
          showAddButton: true,
          showCloseButton: index !== 0
        }
      )
    })
  }
}

function addRouteSite () {
  goodsInfoMoneyFormData.assemblingPlaceTemp.push({
    id: new Date().getTime(),
    time: '',
    site: '',
    showAddButton: true,
    showCloseButton: true
  })
}

function removeRouteSite (item) {
  if (goodsInfoMoneyFormData.assemblingPlaceTemp.length === 1) return
  goodsInfoMoneyFormData.assemblingPlaceTemp.splice(goodsInfoMoneyFormData.assemblingPlaceTemp.indexOf(item), 1)
}

const goodsInfoMoneyCheckRules = {
  check: function (categoryId = 13) {
    if (!goodsInfoMoneyFormData.feesInclude) {
      return new Error('请输入 ' + moneyModulesName + ' -> 费用包含内容')
    }
    if (categoryId === 14) {
      if (goodsInfoMoneyFormData.assemblingPlaceTemp.length === 0) {
        return new Error('请输入 ' + moneyModulesName + ' -> 集合地点')
      }
      if (goodsInfoMoneyFormData.assemblingPlaceTemp.some(it => it.time === '' || it.site === '')) {
        return new Error('请输入 ' + moneyModulesName + ' -> 集合地点中的时间和地点')
      }
    }
    goodsInfoMoneyFormData.assembling_place = []
    goodsInfoMoneyFormData.assemblingPlaceTemp.forEach(it => {
      goodsInfoMoneyFormData.assembling_place.push({
        time: it.time,
        site: it.site
      })
    })
    goodsInfoMoneyFormData.assembling_place = JSON.stringify(goodsInfoMoneyFormData.assembling_place)
    return JSON.parse(JSON.stringify(goodsInfoMoneyFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      return value
    }))
  }
}