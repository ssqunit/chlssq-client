var userInfo = {
  ID:"",//用户微信平台的OPENID
  nickName:"",//昵称
  gender:0,//性别
  language:"",//语言
  city:"",//城市
  province:"",//省份
  country:"",//国家
  avatarUrl:"",//头像URL
  mySsqInfo:[], //我加入的商圈数组
  ssqLimit:3, //个人允许加入的商圈数
  actLimit:0 //0, 1  用户行为限制：0 无限制，1 浏览权限  
}
var mySsqInfo_unit = {
  ssqId:"", //商圈ID
  userType:0, //0 / 1 / 2 用户类型：商圈成员，个人商家，商家
  bopId:"" //如果是商家或个人商家，这个值对应商家或个人商家的ID
}

module.exports.UserInfo = userInfo;
module.exports.MySsqInfo_Unit = mySsqInfo_unit;