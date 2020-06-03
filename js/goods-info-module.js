/*
 * @Author: your name
 * @Date: 2020-05-21 13:57:42
 * @LastEditTime: 2020-05-29 16:39:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goodsInfoModule.js
 */
function dateFormat (dataStr) {
  var dt = new Date(dataStr * 1000)
  var y = dt.getFullYear()
  var m = dt.getMonth() + 1
  var d = dt.getDate()
  var hh = dt.getHours()
  var mm = dt.getMinutes()
  var ss = dt.getSeconds()
  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + 'ss'
}
const yearCardList = [
  {
    name: '否',
    value: 0
  },
  {
    name: '是',
    value: 1
  }
]
const modulesName = '商品信息'
const goodsInfoFormData = {
  sellerId: 1,
  sellerName: '',
  goodsTitle: '',
  print_name: '',
  goodsTypeId: '',
  year_card: 0,
  goodsTypeList: [],
  initData (tempData) {
    this.sellerId = tempData.sellerId
    this.sellerName = tempData.sellerName
    this.goodsTitle = tempData.title
    this.print_name = tempData.printName
    this.goodsTypeId = tempData.goodsTypeId
    this.year_card = tempData.year_card
  }
}
// 模块信息校验规则
const goodsInfoModulecheckRules = {
  check: function() {
    if (!goodsInfoFormData.goodsTitle) {
      return new Error('请输入  ' + modulesName + ' -> 商品名称')
    }
    if (!goodsInfoFormData.print_name) {
      return new Error('请输入  ' + modulesName + ' -> 设备名称')
    }
    return JSON.parse(JSON.stringify(goodsInfoFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'sellerId') {
        return undefined
      }
      if (key === 'sellerName' || key === 'goodsTypeList') {
        return undefined
      }
      return value
    }))
  }
}

function loadGoodsTypes (url, data) {
  axios.post(url, data).then(res => {
    goodsInfoFormData.goodsTypeList = res.data
    if (goodsInfoFormData.goodsTypeList && goodsInfoFormData.goodsTypeList.length > 0) {
      goodsInfoFormData.goodsTypeId = goodsInfoFormData.goodsTypeList[0].goodsTypeId
    }   
  }).catch(error => {
    console.log(error)
  })
}