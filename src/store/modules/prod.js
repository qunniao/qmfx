export default {
  namespaced: true,
  state: {
    id: 0,
    skuTags: [],
    defalutSku: {
      price: 0, // 价格
      productNumber: 0, // 规格货号
      weight: 0, // 重量
      pic:'',
      properties: '', // 销售属性组合字符串
      skuName: '', // sku名称
      prodName: '', // 商品名称
      status: 1
    }
  },
  mutations: {
    updateSkuTags (state, skuTags) {
      state.skuTags = skuTags
    },
    addSkuTag (state, skuTag) {
      state.skuTags.push(skuTag)
    },
    removeSkuTag (state, tagIndex) {
      state.skuTags.splice(tagIndex, 1)
    },
    removeSkuTagItem (state, {tagIndex, tagItemIndex}) {
      state.skuTags[tagIndex].tagItems.splice(tagItemIndex, 1)
    },
    addSkuTagItem (state, {tagIndex, tagItem}) {
      state.skuTags[tagIndex].tagItems.push(tagItem)
    }
  }
}
