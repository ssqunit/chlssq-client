// components/ssq/msgitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cid:{
      type:Number,
      value:0
    },
    ctitle:{
      type:String,
      value:""
    },
    cdate:{
      type:String,
      value:""
    },
    cstatus:{
      type:Number,
      value:0
    },
    ccontent:{
      type:String,
      value:""
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isClip:true,
    actText:"展开"

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClip:function(e){
     let clip = !this.data.isClip;
     let txt = clip?"展开":"收起"
      wx.setStorageSync(String(e.currentTarget.dataset.id), 1);
     this.setData({
       isClip:clip,
       actText:txt,
       cstatus:1
     }) 
    }

  }
})
