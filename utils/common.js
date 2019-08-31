var WX_APP_ID = "WX_APP_ID"
var WX_API_KEY = "WX_API_KEY"
var DEFAULT_PAGE_SIZE = 10;  //默认分页大小
var DEBUG = true
var loading = 0
// var BASE_URL = "http://127.0.0.1:8000/chlssq/api/v1"
// var BASE_URL = "https://106.52.156.60:443/index.php"
var BASE_URL = "https://ssqunit.com/index.php"

function log(msg, level = 'DEBUG') {
  if (!DEBUG) {
    return;
  }
  if (level == 'DEBUG') {
    console.debug(msg)
  } else if (level == 'WARN') {
    console.warn(msg)
  } else if (level == 'ERROR') {
    console.error(msg)
  } else if (level == 'INFO') {
    console.info(msg)
  } else {
    console.log(msg)
  }
}

//记录全局cookie
function setCookie(res) {
  if (res.header != undefined && res.header.hasOwnProperty('Set-Cookie')) {
    var cookie = res.header['Set-Cookie']
    if (cookie) {
      wx.setStorageSync("cookie", cookie)
    }
  }
}

function hideLoadingIfNeed() {
  if (loading != 0) {
    loading--
    wx.hideLoading()
  }
}

//包装wx.request接口，添加cookie信息
function request(obj) {
  var cookie = wx.getStorageSync('cookie')
  if (cookie) {
    if (obj.header) {
      obj.header['Cookie'] = cookie
    } else {
      obj.header = { 'Cookie': cookie, 'Content-Type': 'application/json' }
    }
  }

  if (obj.method == "POST") {
    if(!obj.header){
      obj.header={};
    }
    obj.header['content-type'] = "application/x-www-form-urlencoded";
  }

  var url = obj.url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    obj.url = BASE_URL + url
  }

  var before = obj.before
  if (before) {
    before()
  }

  var success = obj.success
  obj.success = function (res) {
    log(">> href: " + obj.url)
    log(res)

    setCookie(res)
    if (success) {
      success(res)
    }
  }

  var fail = obj.fail
  obj.fail = function (res) {
    log(">> href: " + obj.url)
    log(res)

    if (fail) {
      fail(res)
    }
  }

  var complete = obj.complete
  obj.complete = function() {
    hideLoadingIfNeed()

    if (complete) {
      complete()
    }
  }
  
  return wx.request(obj)
}

//包装wx.uploadFile接口，添加cookie信息
function uploadFile(obj) {
  var cookie = wx.getStorageSync('cookie')
  if (cookie) {
    if (obj.header) {
      obj.header['Cookie'] = cookie
    } else {
      obj.header = { 'Cookie': cookie, 'Content-Type': 'multipart/form-data' }
    }
  }

  var url = obj.url
  if (!url.startsWith('http://') || !url.startsWith('https://')) {
    obj.url = BASE_URL + url
  }

  var success = obj.success
  obj.success = function (res) {
    log(">> upload File href: " + obj.url)
    log(res)

    setCookie(res)
    if (success) {
      success(res)
    }
  }

  var fail = obj.fail
  obj.fail = function (res) {
    log(">>  upload File href: " + obj.url)
    log(res)

    if (fail) {
      fail(res)
    }
  }
  return wx.uploadFile(obj)
}

/**
 * 采用递归的方式多文件上传
 * imgPaths:需要上传的文件列表
 * index：imgPaths开始上传的序号
 * successFiles:已上传成功的文件
 * callBack：文件上传后的回调函数
 */
function uploadFiles(imgPaths, index, successFiles, callBack,session_id) {
  var that = this;
  that.uploadFile({
    method: "POST",
    url: BASE_URL + "?function=upload&session_id=" + session_id,
    filePath: imgPaths[index],
    name: 'file',
    header: {
      "Content-Type": "multipart/form-data"
    },
    success: function (res) {
      // console.log('-------success:' + JSON.stringify(res));
      var newRes = JSON.stringify(res.data);
      newRes = newRes.replace(/\\/g, '');
      newRes = newRes.substr(1, newRes.length - 2);
      res = JSON.parse(newRes);
      //成功,文件返回值存入成功列表
      if (res && res.iRet==0) {
        successFiles.push(res.data.file_id);
      }
    },
    complete: function (e) {
      // console.log('-------complete:'+JSON.stringify(e));
      var newRes = JSON.stringify(e.data);
      newRes = newRes.replace(/\\/g, '');
      newRes = newRes.substr(1, newRes.length - 2);
      e = JSON.parse(newRes);
      if (e && e.iRet == 0) {
        index++; //下一张
        if (index == imgPaths.length) {
          if (callBack) {
            callBack(successFiles);
          }
        } else {
          //递归调用，上传下一张
          that.uploadFiles(imgPaths, index, successFiles, callBack, session_id);
        }
      }else{
        callBack([]);
      }
    }
  })
}

function navigateBackDelay(obj) {
  setTimeout(()=> {
    wx.navigateBack(obj)
  }, 1500)
}

function navigateToDelay(obj) {
  setTimeout(() => {
    wx.navigateTo(obj)
  }, 1500)
}

function redirectToDelay(obj) {
  setTimeout(() => {
    wx.redirectTo(obj)
  }, 1500)
}

function showLoading(the_title = '加载中') {
  loading++
  wx.showLoading({
    title: the_title,
    mask: true
  })
}

function showToastSuccess(the_title, is_mask = true) {
  loading = 0
  wx.showToast({
    title: the_title,
    mask: is_mask
  })
}

function showToastFail(the_title, is_mask = true) {
  loading = 0
  wx.showToast({
    title: the_title,
    icon: 'none',
    mask: is_mask
  })
}

function refreshPrePage() {
  var prePage = getCurrentPages()[getCurrentPages().length - 2]
  if (prePage && prePage.refresh) {
    prePage.refresh()
  }
}

function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function getImgUrl(session_id,img_id){
  return "https://ssqunit.com/index.php?function=download&session_id=" + session_id + "&filename=" + img_id;
}

function getProductFlagName(id){
  var name="";
  switch(id){
    case 1:
    case '1':
      name = "推荐";
      break;
    case 2:
    case '2':
      name = "优惠";
      break;
    default:
      break;
  }
  return name;
}


module.exports.APP_ID = WX_APP_ID;
module.exports.API_KEY = WX_API_KEY;
module.exports.DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;
module.exports.BASE_URL = BASE_URL;
module.exports.request = request;
module.exports.uploadFile = uploadFile;
module.exports.uploadFiles = uploadFiles;
module.exports.navigateBackDelay = navigateBackDelay;
module.exports.navigateToDelay = navigateToDelay;
module.exports.redirectToDelay = redirectToDelay;
module.exports.showLoading = showLoading;
module.exports.showToastSuccess = showToastSuccess;
module.exports.showToastFail = showToastFail;
module.exports.refreshPrePage = refreshPrePage;
module.exports.randomString = randomString;
module.exports.log = log;
module.exports.getImgUrl = getImgUrl;
module.exports.getProductFlagName = getProductFlagName;