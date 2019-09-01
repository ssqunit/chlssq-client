const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeYMD = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('.')
}

const getWeekDay = date => {
  const newdate = new Date(date);
  const day = newdate.getDay();
  const show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  return show_day[day];
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//依据经纬度计算两个位置的距离
const countDistance = (la1, lo1, la2, lo2) => {
  la1 = la1 || 0;
  la2 = la2 || 0;
  lo1 = lo1 || 0;
  lo2 = lo2 || 0;
  var La1 = la1 * Math.PI / 180.0;
  var La2 = la2 * Math.PI / 180.0;
  var La3 = La1 - La2;
  var Lo3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  //地球半径 
  var r = 6378.137;
  var s = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lo3 / 2), 2)));
  //单位KM，保留一位小数
  s = Math.round(s * 10) / 10;
  return s;
}

const arrayToString = (arr) => {
  var str="";
  var space="|";
  if(arr != null && arr.length > 0){
    for(var i=0;i<arr.length;i++){
      if(i>0)str += space;
      str += arr[i];
    }
  }
  return str;
}
const stringToArray = (str) => {
  var arr=[];
  if(str != null && str.length > 0)
  {
    arr = str.split("|");
  }
  return arr;
}

const getHM = (millonSecond) => {
  var h = 0;
  if(millonSecond > 3600000){
    h = Math.floor(millonSecond / 3600000);
  }
  var m = Math.ceil( (millonSecond - h*3600000)/60000 );
  return {'h':h,'m':m};
}

const moneyValue = (value) => {
  var _m;
  if (/^(\d?)+(\.\d{0,2})?$/.test(value)) {
    _m = e.detail.value;
  } else {
    _m = value.substring(0, value.length - 1);
  }
  return _m;
}

module.exports = {
  formatTime: formatTime,
  formatTimeYMD: formatTimeYMD,
  getWeekDay: getWeekDay,
  countDistance: countDistance,
  arrayToString: arrayToString,
  stringToArray: stringToArray,
  getHM: getHM,
  moneyValue: moneyValue
}
