/*
 * @Author: your name
 * @Date: 2020-05-22 11:02:45
 * @LastEditTime: 2020-06-02 18:27:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-info-refund-module.js
 */ 
const refundList = [
  {
    name: '不可退',
    value: 0
  },
  {
    name: '随时退',
    value: 1
  },
  {
    name: '有条件退款',
    value: 2
  }
]
const refundChargePlanList = [
  {
    name: '无手续费',
    value: 0
  },
  {
    name: '每次退款收取手续费 X 元',
    value: 1
  },
  {
    name: '每张门票手续费 X 元',
    value: 2
  }
]
const refundPartList = [
  {
    name: '订单可分多次退款',
    value: 0
  },
  {
    name: '订单不可分多次退款',
    value: 1
  },
]
const refundCheckList = [
  {
    name: '需要人工审核',
    value: 0
  },
  {
    name: '不需要人工审核',
    value: 1
  }
]
const refundTimeBarList = [
  {
    name: '有效期内',
    value: 1
  },
  {
    name: '有效期前',
    value: 2
  }
]
const overList = [
  {
    name: '不处理',
    value: 0
  },
  {
    name: '自动完结',
    value: 1
  },
  {
    name: '自动验证',
    value: 2
  },
  {
    name: '自动退款',
    value: 3
  }
]
const expireChargeWayList = [
  {
    name: '无手续费',
    value: 0
  },
  {
    name: '每张门票收取手续费',
    value: 1
  },
  {
    name: '收取固定手续费',
    value: 2
  }
]
const ticketChangingList = [
  {
    name: '不可改签',
    value: 0
  },
  {
    name: '允许改签',
    value: 1
  }
]
const refundModulesName = '退改设置'
const refundCurrentDay = new Date()
const goodsInfoRefundFormData = {
  refundRules: 0,
  refundChargePlan: 0,
  refundChargeMoney: 0,
  refundPart: 0,
  refundCheck: 0,
  refundTimeBar: 1,
  
  over: 0,
  overDay: 0,
  overTimeTemp: new Date(refundCurrentDay.getFullYear(), refundCurrentDay.getMonth() + 1, refundCurrentDay.getDate(), 23, 59),
  overTime: 0,
  expire_charge_way: 0,
  overRefundChargeMoney: 0,

  ticket_changing: 0,
  ticket_changing_range: 0,
  ticket_changing_audit: 0,
  ticket_changing_weekend: 0,
  ticket_changing_rule: '',
  initData (tempData) {
    this.refundRules = tempData.refundRules
    this.refundChargePlan = tempData.refundChargePlan
    this.refundChargeMoney = tempData.refundChargeMoney
    this.refundPart = tempData.refundPart
    this.refundCheck = tempData.refundCheck
    this.refundTimeBar = tempData.refundTimeBar

    this.over = tempData.over
    this.overDay = tempData.overDay
    const overTimeDate = new Date(tempData.overTimeTemp * 1000)
    this.overTimeTemp = Number(tempData.overTimeTemp) === 0 ? new Date(overTimeDate.getFullYear(), overTimeDate.getMonth() + 1, overTimeDate.getDate(), 23, 59) : new Date(overTimeDate.getFullYear(), overTimeDate.getMonth() + 1, overTimeDate.getDate(), overTimeDate.getHours(), overTimeDate.getMinutes())
    this.expire_charge_way = tempData.expire_charge_way
    this.overRefundChargeMoney = tempData.overRefundChargeMoney

    this.ticket_changing = tempData.ticket_changing
    this.ticket_changing_range = tempData.ticket_changing_range
    this.ticket_changing_audit = tempData.ticket_changing_audit
    this.ticket_changing_weekend = tempData.ticket_changing_weekend
    this.ticket_changing_rule = tempData.ticket_changing_rule
  }
}


// 模块信息校验规则
const goodsInfoRefundCheckRules = {
  check: function() {
    if (goodsInfoRefundFormData.refund === 1 || goodsInfoRefundFormData.refund === 2) {
      if (goodsInfoRefundFormData.refundChargePlan === 1 || goodsInfoRefundFormData.refundChargePlan === 2){
        if (goodsInfoRefundFormData.refundChargeMoney === 0) {
          return new Error('请输入  ' + refundModulesName + ' -> 退款规则 -> 手续费金额')
        }
      }
    }

    if (goodsInfoRefundFormData.over !== 0) {
      if (goodsInfoRefundFormData.overTime === '') {
        return new Error('请输入  ' + refundModulesName + ' -> 过期操作 -> 过期时间')
      }
      if (goodsInfoRefundFormData.over === 3) {
        if (goodsInfoRefundFormData.expire_charge_way !== 0) {
          if (goodsInfoRefundFormData.overRefundChargeMoney === 0) {
            return new Error('请输入  ' + refundModulesName + ' -> 过期操作 -> 自动退款 -> 手续费金额')
          }
        }
      }
    }
    goodsInfoRefundFormData.overTime = goodsInfoRefundFormData.overTimeTemp / 1000
    // return goodsInfoRefundFormData
    return JSON.parse(JSON.stringify(goodsInfoRefundFormData, function (key, value) {
      if (typeof value === 'function') {
        return undefined
      }
      if (key === 'overTimeTemp') {
        return undefined
      }
      return value
    }))
  }
}