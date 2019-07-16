
// 本组件为搜索组件
// 需要传入addflag   值为true / false （搜索框右侧部分）
// 若显示搜索框右侧部分   需传入右侧图标url以及addhandle函数
Component({

  properties: {

    addflag: {    //显示搜索框右侧部分
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {

      }
    },
    addimg: {       //显示搜索框右侧部分icon
      type: String,
      value: ''
    },
    searchstr: {     //input  值
      type: String,
      value: '值'
    },
    searchflag: {
      type: Boolean,
      value: false,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // searchflag: false,   //搜索框 取消按钮显示与隐藏
    searchicon:"../../images/icon_search.png",
    clearicon: "../../images/icon_clear.png"
  },

  /**
   * 组件的方法列表

   */
  methods: {

    //获得焦点
    getfocus() {
      this.setData({
        searchflag: true,
      })
    },
    //失去焦点
    blursearch() {
      // console.log('失去焦点')

    },
    //清空搜索框
    activity_clear(e) {
      this.setData({
        searchstr : "",
        searchflag: false,
      })
      this.triggerEvent("activity_clear");
    },
    //搜索输入
    searchList(e) {
      this.properties.searchstr = e.detail.value;
    },
    confirm_search(e) {
      let _value = this.properties.searchstr;
      this.triggerEvent("dosearch", {_value},{});
      this.setData({
        searchstr: "",
        searchflag: false,
      })
    }

  }
})
