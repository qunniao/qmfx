/*
 * @Description: 代理人信息
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getAgentInfoListAPI = (args) =>{
    return http({
        url: '/users/queryListByAgentInfo',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

 /*
 * @Description: 代理等级列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getAgentLevelListAPI = (args) =>{
    return http({
        url: '/agentLevel/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

 /*
 * @Description: 代理等级详情
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getAgentLevelDetailAPI = (args) =>{
    return http({
        url: '/agentLevel/info/'+args,
        method: 'get',
    });
 }

 /*
 * @Description: 修改代理等级最低进货金额
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const updateAgentLevelAPI = (args) =>{
    return http({
        url: '/agentLevel/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }

 /*
 * @Description: 代理等级产品佣金列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getAgentLevelProductAwardListAPI = (args) =>{
    return http({
        url: '/agentLevelProductAward/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

 /*
 * @Description: 修改代理等级产品佣金
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const updateAgentLevelProductAwardAPI = (args) =>{
    return http({
        url: '/agentLevelProductAward/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }

 