import http from '@/public/http';
/**
 * 获取分类列表
 * @param {Object} args 
 */
export const getProdtypeLISTAPI = (args) =>{
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
 * 删除分类
 * @param {Object} args 
 */
 export const deleteProdtypeAPI = (args) =>{
    return http({
        url: '/productTypes/delete/'+args,
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
        },
        params:args
    });
 }
 /**
 * 添加分类
 * @param {Object} args 
 */
export const addProdTypeAPI = (args) => {
    return http({
        url: '/productTypes/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
};
 /**
 * 修改分类
 * @param {Object} args 
 */
export const PutProdTypeAPI = (args) => {
    return http({
        url: '/productTypes/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
};

 /**
 * 获取分类详情
 * @param {Object} args 
 */
export const getProdTypeDetailAPI = (args) =>{
    return http({
        url: '/productTypes/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        }
        // params: args,
    });
 }