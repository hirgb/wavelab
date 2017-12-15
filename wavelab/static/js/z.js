(function (){
  var commen = {
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
    //true,return 20171020;false,return 2017/10/20.
    getCurrentDate: function (bool){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return bool ? ('' + year + month + day) : (year + '/' + month + '/' + day) ;
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
