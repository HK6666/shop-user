/**
 * hk的文件
 *
 * 不许抄袭
 *
 * long description for the file
 *
 * @summary short description for the file
 * @author hk
 *
 * Created at     : 2019-04-21 00:03:32
 * Last modified  : 2019-04-21 00:03:32
 */



'use strict';

var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;