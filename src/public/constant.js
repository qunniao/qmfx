// 本地服务
// export const BASE_URL = 'http://localhost:9091';
// 测试服务
export const BASE_URL = 'http://admin.zhanchengwlkj.com:8080/distribution_backstage';
// export const BASE_URL = 'http://2300i2t902.imwork.net/';
// export const BASE_URL = 'http://10.7.17.87:8769/';

// 定义 APP 内容组件名称
export const APP_COMPONENTS = {
    // 首页
    HomePage: () => import('../components/homePage/Index.vue'),
    // 常规产品管理
    ShopPage: () =>import('../components/prod/prodList.vue'),
    // 产品分类管理
    ShopTypePage: () =>import('../components/prodtype/prodtypeList.vue'),

    // 订单
    // 全部订单
    AllOrderPage: () =>import('../components/allOrderManage/allOrderList.vue'),
    // 待退款订单
    RefundOrderPage: () =>import('../components/refundOrderManage/refundOrderIndex.vue'),
    // 打款审核
    PaymentAuditPage: () =>import('../components/paymentAudit/paymentAuditIndex.vue'),

    //零售
    //访客记录
    VisitorsRecord: () =>import('../components/visitorsRecord/visitorsRecordIndex.vue'),
    //会员列表
    MemberShipPage: () =>import('../components/membershipPage/membershipIndex.vue'),
    // 404 页面
    NotFound: () => import('../components/NotFound.vue'),


    // 奖励
    // 奖励
    OrdinaryRewardPage: () =>import('../components/ordinaryReward/ordinaryRewardIndex.vue'),

    //佣金记录
    AwardListPage: () =>import('../components/award/awardList.vue'),

    //钱包进出明细
    WalletHistoryListPage: () =>import('../components/walletHistory/walletHistoryList.vue'),

    // 代理
   AgentInformationPage: () =>import('../components/agentInformation/agentInformationIndex.vue'),
   //代理等级设置
   AgentLevelSetUpPage: () =>import('../components/agentLevelSetUp/agentLevelSetUpIndex.vue'),

   //代理佣金设置
   AgentAwardSetUpPage: () =>import('../components/agentAwardSetUp/agentAwardSetUpIndex.vue'),

   //问题分类
   QuestionTypePage: () =>import('../components/question/questionTypeIndex.vue'),

   //问题列表
   QuestionPage: () =>import('../components/question/questionIndex.vue'),

   // 运费模板管理
   ShopFreightPage: () =>import('../components/freightTemplate/freightTemplateList.vue'),
   
};

// 菜单列表
// 注意：id 不可重复
export const MENU_LIST = [
        {
            id: 1,
            name: '产品',
            icon: 'el-icon-message',
            children: [
                {
                    id: 2,
                    name: '商品管理',
                    icon: 'el-icon-news',
                    componentName: 'ShopPage',
                },
                {
                    id: 5,
                    name: '分类管理',
                    icon: 'el-icon-date',
                    componentName: 'ShopTypePage',
                },
                {
                    id: 7,
                    name: '运费模板',
                    icon: 'el-icon-date',
                    componentName: 'ShopFreightPage',
                }

            ],
        },{
            id: 12,
            name: '订单',
            icon: 'el-icon-message',
            componentName:'AllOrderPage',
            children: [
                {
                    id: 122,
                    name: '所有订单',
                    icon: 'el-icon-date',
                    componentName: 'AllOrderPage',
                },
                {
                    id: 123,
                    name: '待退款订单',
                    icon: 'el-icon-date',
                    componentName: 'RefundOrderPage',
                },
            ],
        },
        {
            id: 20,
            name: '财务',
            icon: 'el-icon-date',
            children: [
                {
                    id: 22,
                    name: '钱包明细',
                    icon: 'el-icon-date',
                    componentName: 'WalletHistoryListPage',
                },

            ],
        },
        /*
        {
            id: 54,
            name: '访客记录',
            icon: 'el-icon-message',
            componentName:'VisitorsRecord'
        },*/
        {
            id: 55,
            name: '会员列表',
            icon: 'el-icon-message',
            componentName:'MemberShipPage'
        },
        {
            id:56,
            name: '奖励',
            icon: 'el-icon-news',
            children: [
                {
                    id: 21,
                    name: '佣金记录',
                    icon: 'el-icon-news',
                    componentName: 'AwardListPage',
                },
            ]
        },{
            id: 18,
            name: '代理',
            icon: 'el-icon-message',
            children: [
                {
                    id:19,
                    name: '代理人信息',
                    icon: 'el-icon-news',
                    componentName:'AgentInformationPage'
                },
                
                {
                    id:23,
                    name: '代理等级设置',
                    icon: 'el-icon-news',
                    componentName:'AgentLevelSetUpPage'
                },
                {
                    id:468,
                    name: '代理佣金设置',
                    icon: 'el-icon-news',
                    componentName:'AgentAwardSetUpPage'
                }
               
            ],
        },
        {
            id: 100,
            name: '问题管理',
            icon: 'el-icon-message',
            children: [
                {
                    id:101,
                    name: '问题分类',
                    icon: 'el-icon-news',
                    componentName:'QuestionTypePage'
                },
                
                {
                    id:102,
                    name: '问题列表',
                    icon: 'el-icon-news',
                    componentName:'QuestionPage'
                }
               
            ],
        },
];


// 社区管理--话题管理--标签
export const TAG_MAP = {
    1: '支持/反对',
    2: '正确/错误',
    3: '喜欢/不喜欢',
};

// 周几文字
export const WEEK_TEXT = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
};
