// components/ssq/product-item-my/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product:{
      type: Object,
      value:{}
    },
    sellText:{
      type:String,
      value:""
    },
    hideFooter:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    onsellBtnType:"default",
    lastTime:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCardClick: function (e) {
      var evt = {
        product: this.data.product
      }
      this.triggerEvent('onCardClick', evt);
    },
    onSell: function (e) {
      //点击频率限制
      var cur = (new Date()).getTime();
      if(cur - this.data.lastTime < 15000)
      {
        wx.showToast({
          title: '请稍后再试',
          icon:"none"
        })
        return;
      }else{
        this.data.lastTime = cur;
      }
      //
      var _text = "";
      var _type = "";
      if(this.data.product.onsell == 0){
        this.data.product.onsell = 1;
        _text = "下架";
        _type = "danger";
      }else{
        this.data.product.onsell = 0;
        _text = "上架";
        _type = "primary";
      }
      this.setData({
        sellText:_text,
        //onsellBtnType:_type
      })
      var evt = {
        id: e.currentTarget.dataset.id,
        onsell: this.data.product.onsell,
        that:this,
        callback: this.onSellResult
      }

      this.triggerEvent('onSellClick',evt);
    },
    onSellResult: function (res) {
      if(!res){
        var _text = "";
        var _type = "";
        if (this.that.data.product.onsell == 0) {
          this.that.data.product.onsell = 1;
          _text = "下架";
          _type = "danger";
        } else {
          this.that.data.product.onsell = 0;
          _text = "上架";
          _type = "primary";
        }
        this.that.setData({
          sellText: _text,
          //onsellBtnType: _type
        })
      }else{
        this.that.data.product.update_time = Math.round( (new Date()).getTime() / 1000 );
      }
    },
    onOpenADChoose: function (e) {
      var evt = {
        product: this.data.product
      }
      this.triggerEvent('onADClick', evt);
    },
    proEdit: function (e) {
      var evt = {
        product: this.data.product
      }
      this.triggerEvent('onEditClick', evt);
    },
    proDelete: function (e) {
      var evt = {
        id: e.currentTarget.dataset.id,
        onsell: this.data.product.onsell,
        update_time: this.data.product.update_time
      }
      this.triggerEvent('onDeleteClick', evt);
    }


  }
})
