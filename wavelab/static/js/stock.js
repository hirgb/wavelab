//this stock.js is dependent on cookie.js. please import cookie.js before use this js file.
(function (){
  var stock = {
    calculateMA: function (dayCount,data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(2));
      }
      return result;
    },
    calculateEMA: function (dayCount,data){
      var result = [0];
      for (var i = 1; i < data.length; i++) {
        result.push(result[i - 1] * (dayCount - 1) / (dayCount + 1) + data[i][1] * 2 / (dayCount + 1));
      }
      return result;
    },
    calculateDIF: function (n1,n2,data){
      var _this = this,
      result1 = _this.calculateEMA(n1,data),
      result2 = _this.calculateEMA(n2,data),
      difArray = [];
      for (var i = 0; i < result1.length; i++) {
        difArray.push(+(result1[i] - result2[i]).toFixed(5));
      }
      return difArray;
    },
    cutDIF: function (n2){
      for (var i = 0; i < n2; i++) {
        this[i] = '-';
      }
    },
    calculateDEA: function (dayCount,data) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j];
        }
        result.push(+(sum / dayCount).toFixed(5));
      }
      return result;
    },
    calculateMACD: function (arrDIF,arrDEA){
      var macdArray = [];
      for (var i = 0; i < arrDIF.length; i++) {
        macdArray.push(+((arrDIF[i] - arrDEA[i]) * 2).toFixed(5));
      }
      return macdArray;
    },
    catchStock: function (code,name){
      if (typeof(Storge) !== "undefined") {
        //use the storage
        if (localStorage.stockJSON) {
          let stockJSON = localStorage.stockJSON;
          console.log(stockJSON);
          stockJSON[name] = code;
          localStorage.stockJSON = stockJSON;
        }else {
          let stockJSON = {name: code};
          localStorage.stockJSON = stockJSON;
          // console.log(stockJSON + 'write success');
        }
      }else {
        //use the cookies
        console.log('you browser is not support localStorage');
        let stockJSON = cookie.getCookie('stockJSON')?JSON.parse(cookie.getCookie('stockJSON')):null;
        if (stockJSON) {
          stockJSON[name] = code;
          cookie.setCookie('stockJSON',JSON.stringify(stockJSON),365);
        }else {
          let stockJSON = {};
          stockJSON[name] = code;
          cookie.setCookie('stockJSON',JSON.stringify(stockJSON),365);
        }
      }
    },
    getRecentStock: function (recentObj){
      let stockJSON = cookie.getCookie('stockJSON')?JSON.parse(cookie.getCookie('stockJSON')):null;
      let str = '';
      for (item in stockJSON){
        str += '<a href="' + hostName + 'detail.html?stockcode=' + stockJSON[item].substr(2) + '&yearcount=1" target="_self"><li class="mdui-list-item mdui-ripple">' + item + '</li></a>';
      }
      recentObj.innerHTML = str;
    },
    updateFavoriteStock: function (favoriteStockJSON,user = 'zhkf',callback){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open('get',hostName + 'updatefavoritestock?user=' + user + '&favoritestockjson=' + favoriteStockJSON,true);
      xmlHttp.send();
      // xmlHttp.onreadystatechange = function(){
      //   if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
      //     callback(xmlHttp.responseText);
      //   }
      // };
    },
    getFavoriteStock: function (user = 'zhkf',callback){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open('get',hostName + 'getfavoritestock?user=' + user,true);
      xmlHttp.send();
      xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
          callback(xmlHttp.responseText);
        }
      };
    },
    getStockData: function(code){
      var xhr = new XMLHttpRequest();
      xhr.open('get',hostName + 'hasStock?code=' + code,true);
      xhr.send();
      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText == '1') {
            location.href = hostName + 'detail.html?yearcount=1&stockcode=' + code;
          }else {
            location.href = hostName + 'init?stockcode=' + code;
          }
        }
      };
    },
    getTradeData: function(user,callback){
      var xhr = new XMLHttpRequest();
      xhr.open('get',hostName + 'getTradeData?user='+user);
      xhr.send();
      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText != '0') {
            callback(xhr.responseText);
          }
        }
      }
    },
    verifyStockCode: function (code) {
      return code.toString().match(/^(((002|000|300|600)[\d]{3})|60[\d]{4})$/) ? true : false;
    }
  };
  window.stock = stock;
})();
