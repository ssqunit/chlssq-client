var ssqInfo = {
  ID:"",         //商圈ID
  name: "",         //商圈名
  area: "",         //商圈所在区域
  position: { latitude: 0.0, longitude: 0.0 },         //商圈纬经度
  photo: "",         //商圈展示图
  creator: minUser,         //商圈创建者
  busCount: 0,         //商圈商家数
  perCount: 0,         //商圈个人商家数
  memCount: 0,         //商圈成员数
  busArray: [],         //商圈商家数组,busUnit
  perArray: [],         //商圈个人商圈数组,perUnit
  memArray: [],         //商圈成员数组,minUser
  textADInfo: [],         //商圈文字广告数组,textADunit
  imgADInfo: [],         //商圈大图广告数组,imgADunit
  busPosInfo: [],         //商圈商家位置数组,bopMin
  perPosInfo: [],         //商圈个人商圈位置数组,bopMin
  block: 0         //商圈是否给屏蔽了，0无屏蔽，1屏蔽
}

var minUser = {
  ID:"",//user openid
  nickName:"",
  actLimit: 0 //0, 1  用户行为限制：0 无限制，1 浏览权限
}

var busUnit = {
  ID: "",    //
  owner: minUser,    //
  name: "",    //商家名称
  position: { latitude: 0.0, longitude: 0.0 },         //商家纬经度
  photo: "",    //商家展示图
  optype: 0,    //商家分类
  opdes: "",    //商家经营描述
  addr: "",    //商家地址
  tel: "",    //商家电话
  ssqId: "",    //商家所属商圈ID
  products: [],    //商家产品列表
  flags: []    //商圈标签数组
}