/*
 * @Author: your name
 * @Date: 2020-05-25 14:42:46
 * @LastEditTime: 2020-06-01 18:15:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-seller-inf.js
 */ 
const goodsSellerInfoData = {
  sellerList: [],
  sellerId: '',
  scenicName: '--',
  province: '--',
  city: '--',
  district: '--',
  address: '--',
  tel: '--',
  open: '--',
  route: '--',
  image: ''
}

function clearSellerInfo () {
  goodsSellerInfoData.sellerId = ''
  goodsSellerInfoData.scenicName = '--'
  goodsSellerInfoData.city = '--'
  goodsSellerInfoData.address = '--'
  goodsSellerInfoData.tel = '--'
  goodsSellerInfoData.open = '--'
  goodsSellerInfoData.route = '--'
  goodsSellerInfoData.image = ''
}

function loadSellerInfo (tempSellerId) {
  const tempSeller = goodsSellerInfoData.sellerList.filter(it => it.s_id === tempSellerId)[0]
  goodsSellerInfoData.sellerId = tempSeller.s_id
  goodsSellerInfoData.scenicName = tempSeller.s_title
  goodsSellerInfoData.city = tempSeller.city
  goodsSellerInfoData.address = tempSeller.address
  goodsSellerInfoData.tel = tempSeller.tel
  goodsSellerInfoData.open = tempSeller.open
  goodsSellerInfoData.route = tempSeller.route
  goodsSellerInfoData.image = tempSeller.scenicimages.split(',')[0]
}

function initSellerInfoList (url, data) {
  axios.post(url, data).then(res => {
    goodsSellerInfoData.sellerList = res.data
  }).catch(error => {
    console.log(error);
  })
}