// components/ssq/v-shop-tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabsInfo:{
      type:Array,
      value:null
    },
    currentTab:{
      type:Number,
      value:0
    },
    target_members:{
      type:Array,
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
    onTabClick: function (e){
      let optype = e.currentTarget.dataset.optype;
      if(this.data.tabsInfo && this.data.tabsInfo.length>0){
        let len = this.data.tabsInfo.length;
        let _target_members=null;
        for(let i=0;i<len;i++){
          if(optype == this.data.tabsInfo[i].optype)
          {
            this.data.tabsInfo[i].color = "red";
            _target_members = this.data.tabsInfo[i].members;
          }else{
            this.data.tabsInfo[i].color = "black";
          }
        }
        let _tabsInfo = this.data.tabsInfo;
        this.setData({
          tabsInfo: _tabsInfo,
          target_members: _target_members
        });
      }
    },

    onItemClick: function (e) {
      var evt = {
        shopinfo: e.detail.shopinfo
      }
      this.triggerEvent('onShopItemClick', evt);
    },

    onZanClick: function (e) {
      var evt = {
        shopinfo: e.detail.shopinfo
      }
      this.triggerEvent('onShopZanClick', evt);
    }


  },

})
