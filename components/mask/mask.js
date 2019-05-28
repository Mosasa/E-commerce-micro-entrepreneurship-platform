// components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl: {
      type: String
    },
    txt: {
      type: String
    },
    fontColor: {
      type: String,
      value: '#fff'
    },
    coverStyle: {
      type: String
    },
    coverDisplay: {
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
    close () {
      this.triggerEvent('closeMask');
    }
  }
})
