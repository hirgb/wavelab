(function (){
  var commen = {
    VERSION: '0.0.1',
    ua: function () {
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端或uc浏览器
            linux: u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
            weixin: u2.match(/MicroMessenger/i) == "micromessenger",
            ali: u.indexOf('AliApp') > -1,
        };
    },
    //get current url params.
    getUrlParam: function (){
      var paramArray = window.location.search.substr(1).split('&');
      var obj = {};
      for(var i=0; i<paramArray.length; i++){
        obj[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1];
      }
      return obj;
    },
    //get current date.
    today: function (flag){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let join = flag ? flag : '';
      return '' + year + join + month + join + day;
    },
    addHandler: function(element,type,handler){
      if (element.addEventListener) {
        element.addEventListener(type,handler,false);
      }else if (element.attachEvent) {
        element.attachEvent("on"+type,handler);
      }else {
        element["on"+type] = handler;
      }
    },
    removeHandler: function(element,type,handler){
      if (element.removeEventListener) {
        element.removeEventListener(type,handler,false);
      }else if (element.detachEvent) {
        element.detachEvent("on"+type,handler,false);
      }else {
        element["on"+type] = null;
      }
    },
    getEvent: function(event){
      return event ? event : window.event;
    },
    getTarget: function(event){
      return event.target || event.srcElement;
    },
    preventDefault: function(event){
      if (event.preventDefault) {
        event.preventDefault();
      }else {
        event.returnValue = false;
      }
    },
    stopPropagation: function(event){
      if (event.stopPropagation) {
        event.stopPropagation();
      }else {
        event.cancelBubble = true;
      }
    },
    cookie : {
        get : function (cname) {
                  var name = cname + "=";
                  var ca = document.cookie.split(';');
                  for(var i=0; i<ca.length; i++) {
                      var c = ca[i];
                      while (c.charAt(0)==' ') c = c.substring(1);
                      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                  }
                  return "";
              }, 
        set : function (cname, cvalue, exdays) {
                  var d = new Date();
                  d.setTime(d.getTime() + (exdays*24*60*60*1000));
                  var expires = "expires="+d.toUTCString();
                  document.cookie = cname + "=" + cvalue + "; " + expires;
              }, 
        clear : function (name) {
                  this.setCookie(name, "", -1);
              }
     },  
  };
  window.Z = commen;
})();
