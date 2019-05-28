// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    hasHeadImg: {
      type: Boolean,
      value: false
    },
    hasHeadIcon: {
      type: Boolean,
      value: false
    },
    hasMore: {
      type: Boolean,
      value: false
    },
    hasPrice: {
      type: Boolean,
      value: false
    },
    hasNumber: {
      type:Boolean,
      value: true
    },
    hasNum: {
      type: Boolean,
      value: false
    },
    hasIncome: {
      type: Boolean,
      value: false
    },
    priceColor: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toListDetail (e) {
      const data = e.currentTarget.dataset
      this.triggerEvent('toDetail', data);
    }
  }
})
