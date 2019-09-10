// components/ssq/shop-item/shop-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopinfo:{
      type:Object,
      value:null
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
    onItemClick: function (e){
      var evt = {
        shopinfo: this.data.shopinfo
      }
      this.triggerEvent('onShopItemClick', evt);    
    },

    clickZan: function (e){
      var evt = {
        shopinfo: this.data.shopinfo
      }
      this.triggerEvent('onShopZanClick', evt);    
    }
  }










})
