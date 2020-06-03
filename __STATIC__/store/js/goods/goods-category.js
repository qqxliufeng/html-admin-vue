/*
 * @Author: your name
 * @Date: 2020-05-25 14:43:01
 * @LastEditTime: 2020-05-28 11:31:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/Users/lf/Desktop/ydk-project/html-admin/js/goods-category.js
 */ 
const goodsCategoryData = {
  categoryId: '',
  categoryList: []
}
function loadCategoryData (url) {
  axios.get(url).then(res => {
    goodsCategoryData.categoryList = res.data
  }).catch(error => {
    console.log(error);
  })
}