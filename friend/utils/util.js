function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/,
    userName: /^[a-zA-Z0-9\u4E00-\u9FA5]{3,30}$/,
    captcha: /^[0-9]{6}$/,
    regIdNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    regName: /^[\u4e00-\u9fa5]{2,4}$/     
  }
  return reg;
}

let emojiChar = "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲";
//0x1f---
let emoji = [
  "60a", "60b", "60c", "60d", "60f",
  "61b", "61d", "61e", "61f",
  "62a", "62c", "62e",
  "602", "603", "605", "606", "608",
  "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
  "63a", "63b", "63c", "63d", "63e", "63f",
  "64a", "64b", "64f", "681",
  "68a", "68b", "68c",
  "344", "345", "346", "347", "348", "349", "351", "352", "353",
  "414", "415", "416",
  "466", "467", "468", "469", "470", "471", "472", "473",
  "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
];
function changeEmoji(chatLists) {
  let emojiChars = emojiChar.split('-');
  chatLists.map(v => {
    let content = v["message"];
    if (content.includes('[0x1f')) {
      let contents = content.split('[0x1f');
      for (let i = 0; i < contents.length; i++) {
        if (contents[i]) {
          let code = contents[i];
          code = code.split(']')[0];
          
          let index = emoji.findIndex(v => { return v === code });
          if (index !== -1) {
            content = content.replace(/\[0x1f[a-zA-Z0-9]{3}\]/, emojiChars[index])
          }
        }
      }
    }
    v["message"] = content;
    return v
  })
  return chatLists
}

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}


module.exports = {
  formatTime: formatTime,
  regexConfig: regexConfig,
  changeEmoji: changeEmoji,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs
}

