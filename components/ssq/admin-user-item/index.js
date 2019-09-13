// components/ssq/admin-user-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user : {
      type:Object,
      value:null
    },

    radio: {
      type:String,
      value:"0"
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
    onChangeData(event) {
      this.setData({
        radio : event.detail
      });
      var evt = {
        openid:event.currentTarget.dataset.openid,
        act_value:event.detail
      }
      this.triggerEvent('onActSelected', evt);
    },

  }
})
