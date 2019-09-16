// components/ssq/adrecord-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dateTime:{
      type:String,
      value:""
    },
    name:{
      type:String,
      value:""
    },
    type:{
      type:String,
      value:""
    },
    dateSet:{
      type:String,
      value:""
    },
    timeSet:{
      type:Array,
      value:[]
    },
    price:{
      type:Number,
      value:0
    },
    statusStr:{
      type:String,
      value:""
    },
    // shopName:{
    //   type:String,
    //   value:""
    // },
    // ssqName:{
    //   type:String,
    //   value:""
    // }




  },

  /**
   * 组件的初始数据
   */
  data: {
    openText:"详细",
    hideDetail:true,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOpen: function(e) {
      let hide = !this.data.hideDetail;
      let text = hide ? "详细":"收起"
      this.setData({
        hideDetail:hide,
        openText:text
      })
    }
  }
})
