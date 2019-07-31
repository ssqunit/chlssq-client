var ssqInfo = {  //商圈详情
  ID:0,         //商圈ID
  name: "",         //商圈名
  area: "",         //商圈所在区域
  position: { latitude: 0.0, longitude: 0.0 },         //商圈纬经度
  photo: "",         //商圈展示图
  creator: minUser,         //商圈创建者
  busCount: 0,         //商圈商家数
  perCount: 0,         //商圈个人商家数
  memCount: 0,         //商圈成员数
  busArray: [],         //商圈商家数组,bopUnit
  perArray: [],         //商圈个人商圈数组,bopUnit
  memArray: [],         //商圈成员数组,minUser
  textADInfo: [],         //商圈文字广告数组,adInfo
  imgADInfo: [],         //商圈大图广告数组,adInfo
  busPosInfo: [],         //商圈商家位置数组,posInfo
  perPosInfo: [],         //商圈个人商圈位置数组,posInfo
  block: 0         //商圈是否给屏蔽了，0无屏蔽，1屏蔽
}

var minUser = {  //简单个人信息
  ID:"",//user openid
  nickName:"",
  actLimit: 0 //0, 1  用户行为限制：0 无限制，1 浏览权限
}

var bopUnit = { //商家或个人商家信息
  ID: 0,    //
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
  flags: [],    //商圈标签数组
  bopType: 0,   //商家类型，0商家，1个人商家
}

var adInfo = {  //首页马灯文字 或 大图 广告
  ssqId: 0,   //所属商圈ID
  bopId: 0,   //所属商家ID
  productId: 0,   //所属产品ID
  adType: 0,   //广告类型，0马灯广告，1大图广告
  textInfo: "",   //马灯文字内容
  imgInfo: ""   //大图URL
}

var posInfo = {   //首页位置广告信息
  ssqId: 0,   //所属商圈ID
  bopId: 0,   //所属商家ID
  bopType: 0,   //商家类型，0商家，1个人商家
  name: string,   //商家名称
  photo: string,   //商家图
  flags: []   //商家标签
}

var product = {   //产品信息
  ID: 0,   //产品ID
  name: "",   //产品名称
  photos: [],   //产品图片
  des: "",   //产品描述
  price: 0.0,   //产品价格
  unit: "",   //产品单位
  count: 0,   //产品数量
  type: 0,   //产品上架时间类型，0长期，1限期
  startTime: 0,   //产品开始时间
  endTime: 0,   //产品结束时间
  applyList: [],   //产品预约列表，applyUser
  flags: [],   //产品标签
  bopId: 0,   //产品所属商家ID
  ssqId: 0   //产品所属商圈ID
}

var applyUser = {  //产品预约者信息
  userId: "",  //用户openid
  nickName: "",  //用户昵称
  tel: "",  //电话信息
  count: 0,  //预约数量
  date: string  //预约日期
}

module.exports.ApplyUser = applyUser;
module.exports.Product = product;
module.exports.PosInfo = posInfo;
module.exports.AdInfo = adInfo;
module.exports.BopUnit = bopUnit;
module.exports.MinUser = minUser;
module.exports.SsqInfo = ssqInfo;