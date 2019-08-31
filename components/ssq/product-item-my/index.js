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
    onCardClick: function (e) {
      var evt = {
      }
      this.triggerEvent('onCardClick', evt);
    },
    onSell: function (e) {
      var _text = "";
      if(this.data.product.onsell == 0){
        this.data.product.onsell = 1;
        _text = "下架";
      }else{
        this.data.product.onsell = 0;
        _text = "上架";
      }
      this.setData({
        sellText:_text
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
      console.log("--------onSellResult:"+JSON.stringify(this))
      if(!res){
        var _text = "";
        if (this.that.data.product.onsell == 0) {
          this.that.data.product.onsell = 1;
          _text = "下架";
        } else {
          this.that.data.product.onsell = 0;
          _text = "上架";
        }
        this.that.setData({
          sellText: _text
        })
      }
    },
    onOpenADChoose: function (e) {
      var evt = {
        id: e.currentTarget.dataset.id
      }
      this.triggerEvent('onADClick', evt);
    },
    proEdit: function (e) {
      var evt = {
        id: e.currentTarget.dataset.id
      }
      this.triggerEvent('onEditClick', evt);
    }
  }
})
