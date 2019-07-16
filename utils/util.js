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

module.exports = {
  formatTime: formatTime,
  formatTimeYMD: formatTimeYMD,
  getWeekDay: getWeekDay
}
