/*
 * @Description: 产品管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getProductsDepListAPI = (args) =>{
    return http({
        url: '/products/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
//  添加产品
export const pushProdDataAPI = (args) =>{
    return http({
        url: '/products/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }
// 删除产品
export const deleteFirstDepAPI = (args) =>{
    return http({
        url: '/products/delete',
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
//  上下架产品
export const putProdShopAPI = (args) =>{
    return http({
        url: '/products/putAway',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': localStorage.getItem('token')
        },
        data: args,
    });
 }
  /**
 * 获取分类列表
 * @param {Object} args 
 */
export const getprodTypeListtAPI = (args) =>{
    return http({
        url: '/productTypes/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
}
 /**
 * 获取分类列表
 * @param {Object} args 
 */
export const getProdtypeCheckLISTAPI = () =>{
    return http({
        url: '/productTypes/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
}
 /**
 * 获取分类列表
 * @param {Object} args 
 */
export const getProdattributeCheckLISTAPI = () =>{
    return http({
        url: '/paramGroups/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
}
 /**
 * 获取产品详情
 * @param {Object} args 
 */
export const getProdDetailAPI = (args) =>{
    return http({
        url: '/products/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
}
 /**
 * 获取运费模板详情
 * @param {Object} args 
 */
export const getgetfreightlistAPI = (args) =>{
    return http({
        url: '/products/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
}
 /**
 * 修改产品
 * @param {Object} args 
 */
export const putProdDataAPI = (args) => {
    return http({
        url: '/products/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
};

/**
 * 获取运费模板列表
 * @param {Object} args 
 */
export const getTemplateListAPI = (args) =>{
    return http({
        url: '/freights/list',
        method: 'get',
        params: args,
    });
}