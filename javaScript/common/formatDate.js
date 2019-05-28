function formatCdate (item) {
  const curDate = new Date().getTime();
  const itemDate = new Date(item).getTime();
  if (curDate - itemDate <= 1000 * 60 * 60) {
    return '刚刚'
  } else if (curDate - itemDate > 1000 * 60 * 60 && curDate - itemDate < 1000 * 60 * 60 * 2) {
    return '1小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 2 && curDate - itemDate < 1000 * 60 * 60 * 3) {
    return '2小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 3 && curDate - itemDate < 1000 * 60 * 60 * 4) {
    return '3小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 4 && curDate - itemDate < 1000 * 60 * 60 * 5) {
    return '4小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 5 && curDate - itemDate < 1000 * 60 * 60 * 6) {
    return '5小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 6 && curDate - itemDate < 1000 * 60 * 60 * 7) {
    return '6小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 7 && curDate - itemDate < 1000 * 60 * 60 * 8) {
    return '7小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 8 && curDate - itemDate < 1000 * 60 * 60 * 9) {
    return '8小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 9 && curDate - itemDate < 1000 * 60 * 60 * 10) {
    return '9小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 10 && curDate - itemDate < 1000 * 60 * 60 * 11) {
    return '10小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 11 && curDate - itemDate < 1000 * 60 * 60 * 12) {
    return '11小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 12 && curDate - itemDate < 1000 * 60 * 60 * 13) {
    return '12小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 13 && curDate - itemDate < 1000 * 60 * 60 * 14) {
    return '13小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 14 && curDate - itemDate < 1000 * 60 * 60 * 15) {
    return '14小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 15 && curDate - itemDate < 1000 * 60 * 60 * 16) {
    return '15小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 16 && curDate - itemDate < 1000 * 60 * 60 * 17) {
    return '16小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 17 && curDate - itemDate < 1000 * 60 * 60 * 18) {
    return '17小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 18 && curDate - itemDate < 1000 * 60 * 60 * 19) {
    return '18小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 19 && curDate - itemDate < 1000 * 60 * 60 * 20) {
    return '19小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 20 && curDate - itemDate < 1000 * 60 * 60 * 21) {
    return '20小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 21 && curDate - itemDate < 1000 * 60 * 60 * 22) {
    return '21小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 22 && curDate - itemDate < 1000 * 60 * 60 * 23) {
    return '22小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 23 && curDate - itemDate < 1000 * 60 * 60 * 24) {
    return '23小时前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 24 && curDate - itemDate < 1000 * 60 * 60 * 48) {
    return '1天前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 48 && curDate - itemDate < 1000 * 60 * 60 * 72) {
    return '2天前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 72 && curDate - itemDate < 1000 * 60 * 60 * 96) {
    return '3天前'
  } else if (curDate - itemDate > 1000 * 60 * 60 * 96 && curDate - itemDate < 1000 * 60 * 60 * 120) {
    return '5天前'
  } else {
    return item.substr(0, 10)
  }
}

module.exports = {
  formatCdate: formatCdate
}