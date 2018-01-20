(function() {
    var commen = {
        VERSION: '0.0.1',
        check: {
            ua: function() {
                var u = navigator.userAgent;
                var u2 = navigator.userAgent.toLowerCase();
                return { //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1,
                    //IE内核
                    presto: u.indexOf('Presto') > -1,
                    //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1,
                    //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                    //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                    //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    //ios终端
                    android: u.indexOf('Android') > -1,
                    //android终端或uc浏览器
                    linux: u.indexOf('Linux') > -1,
                    iPhone: u.indexOf('iPhone') > -1,
                    //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1,
                    //是否iPad
                    webApp: u.indexOf('Safari') == -1,
                    //是否web应该程序，没有头部与底部
                    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
                    weixin: u2.match(/MicroMessenger/i) == "micromessenger",
                    ali: u.indexOf('AliApp') > -1,
                };
            },
            localStorageSupport: function() {
                return !! window.localStorage;
            }
        },
        //get current url params.
        getUrlParam: function() {
            var paramArray = window.location.search.substr(1).split('&');
            var obj = {};
            for (var i = 0; i < paramArray.length; i++) {
                obj[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1];
            }
            return obj;
        },
        //get current date.
        today: function(flag) {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let join = flag ? flag: '';
            return '' + year + join + month + join + day;
        },
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler, false);
            } else {
                element["on" + type] = null;
            }
        },
        getEvent: function(event) {
            return event ? event: window.event;
        },
        getTarget: function(event) {
            return event.target || event.srcElement;
        },
        preventDefault: function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        cookie: {
            get: function(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },
            set: function(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },
            remove: function(name) {
                var d = new Date();
                d.setTime(d.getTime() - 1);
                var expires = "expires=" + d.toUTCString();
                document.cookie = name + "='';" + expires + "; path = /";
            }
        },
        getTime: function(flag) {
                     var t = new Date();
                     if (typeof(flag) == 'number') {
                        t.setTime(t.getTime() + (flag * 24 * 60 * 60 *1000));
                        return t;
                     }
                     else if (typeof(flag) == 'string') {
                        switch(flag)
                        {
                            case 'year': return t.getFullYear(); break;
                            case 'month': return (t.getMonth() + 1)<10?'0'+(t.getMonth() + 1):(t.getMonth() + 1); break;
                            case 'day': return (t.getDate())<10?'0'+(t.getDate()):(t.getDate()); break;
                            case 'inweek': return t.getDay(); break;
                            case 'hour': return t.getHours(); break;
                            case 'minute': return t.getMinutes(); break;
                            case 'second': return t.getSeconds(); break;
                            case 'millisecond': return t.getMilliseconds(); break;
                            default: return t; break;
                        }
                     }
                     else {
                        return t;
                     }
                 }, 
        //******************************
        //将 Date 转化为指定格式的String
        //月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用1-2个占位符， 
        //年(y)可以用1-4个占位符，毫秒(S)只能用1个占位符(是1-3位的数字) 
        //例子： 
        //timeFormat("yyyy-MM-dd hh:mm:ss.S") => 2006-07-02 08:09:04.423 
        //timeFormat("yyyy-M-d h:m:s.S") => 2006-7-2 8:9:4.18
        //******************************
        timeFormat: function (fmt, flag) {
                   var t = new Date();
                   if (typeof(flag) == 'number') {
                      t.setTime(t.getTime() + (flag * 24 * 60 * 60 *1000));
                   }
                   var o = {
                           "M+": t.getMonth() + 1, //月份 
                           "d+": t.getDate(), //日 
                           "h+": t.getHours(), //小时 
                           "m+": t.getMinutes(), //分 
                           "s+": t.getSeconds(), //秒 
                           "q+": Math.floor((t.getMonth() + 3) / 3), //季度 
                           "S": t.getMilliseconds() //毫秒 
                       };
                   if (/(y+)/.test(fmt)){
                       fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
                   }
                   for (var k in o){
                       if (new RegExp("(" + k + ")").test(fmt)){
                           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                       }
                   }
                   return fmt;
               }
    };
    window.Z = commen;
})();
