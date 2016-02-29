
    if (!window.LL_Deployment)
        var LL_Deployment = { };
    LL_Deployment.scriptServerPath  = "//www.livelook.com";
    LL_Deployment.dataServerURL     = "https://216a497680152ed22e52-01d6a426a21216ea0f0f91a356c3fa59.ssl.cf2.rackcdn.com/llscripts//webinterfaces/storage/";
    if (navigator.userAgent && (/trident\/7.0/i.test(navigator.userAgent) || /MSIE/i.test(navigator.userAgent))) {
        LL_Deployment.dataServerURL = "https:" + LL_Deployment.scriptServerPath + "/webinterfaces/storage/";
    }
    LL_Deployment.version           = "20150311";
    LL_Deployment.v4CustomButtonID  = "ShareScreen";
     

    ll_siteCodeLite                 = "NIKE:SC53779276:US:2";
    
        LL_Deployment.language      = "1033";
    var LL_Storage_Manager={dataServerID:"LL_DataServer",dataServerURL:window.LL_Deployment?LL_Deployment.dataServerURL:null,localStorageSupported:!1,safariPrivateMode:!1,asyncSupported:!1,asyncTimeout:5e3,defaultHandler:function(){},commandQueue:[],timers:{},handlers:{},iPadChrome:function(){for(var e=navigator.userAgent,a=["Mozilla","CriOS","Safari","Mobile"],r=!0,t=0;a.length>t;t++)if(0>e.indexOf(a[t])){r=!1;break}return r},detectStorageType:function(){var e="other",a=navigator.userAgent;return a&&(/trident\/7.0/i.test(a)?e="ie11":/MSIE/i.test(a)?e="ie":/Chrome/i.test(a)||LL_Storage_Manager.iPadChrome()?e="chrome":/Firefox/i.test(a)?e="firefox":/Safari/i.test(a)&&/Windows/i.test(a)?e="wsafari":/Safari/i.test(a)&&(e="safari")),"_"+e},isStorageSupported:function(){try{return window.localStorage?(localStorage.setItem("LL_testItem",1),localStorage.removeItem("LL_testItem"),!0):!1}catch(e){return LL_Storage_Manager.safariPrivateMode=!0,!1}},messageListener:function(e){var a=e.source,r=e.data,t=e.origin;t&&0!=LL_Storage_Manager.dataServerURL.toLowerCase().indexOf(t.toLowerCase())||"string"==typeof r&&setTimeout(function(){LL_Storage_Manager.handleCommand(a,r)},0)},checkIfExists:function(e,a){try{var r="exists("+e+","+escape(window.location.href)+")";a.postMessage(r,"*")}catch(t){}},init:function(e){LL_Storage_Manager.localStorageSupported=LL_Storage_Manager.isStorageSupported();var a=/trident\/7.0/i.test(navigator.userAgent.toLowerCase())&&!window.indexedDB;LL_Storage_Manager.asyncSupported=!LL_Storage_Manager.dataServerURL||LL_Storage_Manager.safariPrivateMode||a?!1:!!window.postMessage,LL_Storage_Manager.handlers.ready=LL_Storage_Manager.onAsyncReady,LL_Storage_Manager.handlers.checkIfExists=LL_Storage_Manager.checkIfExists,window.addEventListener?window.addEventListener("message",LL_Storage_Manager.messageListener,!1):window.attachEvent&&window.attachEvent("onmessage",LL_Storage_Manager.messageListener),e&&LL_Storage_Manager.asyncSupported&&LL_Storage_Manager.embedFrame()},embedFrame:function(){if(null==document.getElementById(LL_Storage_Manager.dataServerID)){var e=document.createElement("iframe");e=document.createElement("iframe"),e.setAttribute("id",LL_Storage_Manager.dataServerID),e.setAttribute("name",LL_Storage_Manager.dataServerID),e.setAttribute("src",LL_Storage_Manager.dataServerURL+"ll_storage"+LL_Storage_Manager.detectStorageType()+".html?version="+LL_Deployment.version),e.width="1px",e.height="1px",e.frameBorder=0,e.setAttribute("title","hidden co-browse frame"),e.setAttribute("scrolling","no"),e.setAttribute("aria-hidden","true"),e.setAttribute("style","display: block; border: 0 none; width: 1px; height: 1px;"),window.attachEvent?e.attachEvent("onload",LL_Storage_Manager.onAsyncReady):window.addEventListener?e.addEventListener("load",LL_Storage_Manager.onAsyncReady,!1):e.onload=LL_Storage_Manager.onAsyncReady,LL_Storage_Manager.asyncLoadTime=LL_Storage_Manager.getCurrentTime(),LL_Storage_Manager.asyncReady=!1,0==LL_Storage_Manager.asyncReadyTimer&&(LL_Storage_Manager.asyncReadyTimer=setInterval(function(){LL_Storage_Manager.checkAsyncReady()&&0!=LL_Storage_Manager.asyncReadyTimer&&(clearInterval(LL_Storage_Manager.asyncReadyTimer),LL_Storage_Manager.asyncReadyTimer=0)},1e3)),null!=document.body&&document.body.appendChild(e)}},getCurrentTime:function(){var e=new Date;return e.getTime()},onAsyncReady:function(){if(LL_Storage_Manager.asyncReady=!0,LL_Storage_Manager.commandQueue.length>0){for(var e=0;LL_Storage_Manager.commandQueue.length>e;e++){var a=LL_Storage_Manager.commandQueue[e];frames[LL_Storage_Manager.dataServerID].postMessage(a,"*")}LL_Storage_Manager.commandQueue=[]}},formatASCII:function(e){for(var a=""+e;3>a.length;)a="0"+a;return a},prepareCommandArg:function(e){if("object"==typeof e)return LL_Storage_Manager.prepareCommandArg(LL_Storage_Manager.stringify(e));if(e&&"string"==typeof e){for(var a=":,();|{}",r=0;a.length>r;r++)e.indexOf(a.charAt(r))>-1&&(e=e.replace(RegExp("\\"+a.charAt(r),"g"),"LL_LITERAL_"+LL_Storage_Manager.formatASCII(a.charCodeAt(r))));return e}return e},prepareCommandArgs:function(){for(var e="",a=0;arguments.length>a;a++)a>0&&(e+=","),e+=LL_Storage_Manager.prepareCommandArg(arguments[a]);return e},asyncSendCommand:function(e,a,r,t){LL_Storage_Manager.assertFrameLoaded(),a&&r&&(t?(LL_Storage_Manager.timers[a]=setTimeout(function(){try{LL_Storage_Manager.handlers[a]=null,delete LL_Storage_Manager.handlers[a],delete LL_Storage_Manager.timers[a]}catch(e){}t.call()},LL_Storage_Manager.asyncTimeout),LL_Storage_Manager.handlers[a]=function(e){try{clearTimeout(LL_Storage_Manager.timers[a]),delete LL_Storage_Manager.timers[a]}catch(t){}r.call(this,e)}):LL_Storage_Manager.handlers[a]=r),LL_Storage_Manager.checkAsyncReady()?frames[LL_Storage_Manager.dataServerID].postMessage(e,"*"):LL_Storage_Manager.commandQueue[LL_Storage_Manager.commandQueue.length]=e},restoreArg:function(e){if(!e||"string"!=typeof e)return e;for(;e.indexOf("LL_LITERAL_")>-1;){var a=e.indexOf("LL_LITERAL_"),r=e.substring(a+11,a+14);e=e.replace(RegExp("LL_LITERAL_"+r,"g"),String.fromCharCode(new Number(r)))}return e},handleCommand:function(e,a){for(var r=a.split(";"),t=0;r.length>t;t++){var n,o=r[t],g=[],L=o.indexOf("(");if(-1!=L?(n=o.substring(0,L),g[0]=LL_Storage_Manager.restoreArg(o.substring(L+1,o.length-1))):n=o,n)if(g.splice(g.length,0,e),null!=LL_Storage_Manager.handlers[n])try{var i=LL_Storage_Manager.handlers[n];if("ready"!=n&&"checkIfExists"!=n&&-1==n.toLowerCase().indexOf("listener"))try{LL_Storage_Manager.handlers[n]=null,delete LL_Storage_Manager.handlers[n]}catch(s){}i.apply(this,g)}catch(_){}else if(LL_Storage_Manager.defaultHandler)try{g.splice(0,0,n),LL_Storage_Manager.defaultHandler.apply(this,g)}catch(_){}}},checkAsyncReady:function(){if(LL_Storage_Manager.asyncReady)return!0;if(LL_Storage_Manager.embedFrame(),LL_Storage_Manager.getCurrentTime()-LL_Storage_Manager.asyncLoadTime>4e3){var e=document.getElementById(LL_Storage_Manager.dataServerID);null!=e&&document.body.removeChild(e),LL_Storage_Manager.embedFrame()}return LL_Storage_Manager.asyncReady},asyncReadyTimer:0,asyncReady:!1,asyncLoadTime:0,setItem:function(e,a,r){if(!e||!a)return!1;var t=""+e+"_"+a;if(LL_Storage_Manager.localStorageSupported)return localStorage.setItem(t,r),!0;var n=new Date;n.setDate(n.getDate()+1);var o=escape(r)+"; expires = "+n.toUTCString();return document.cookie=t+" = "+o,!0},setItemAsync:function(e,a,r,t,n){if(LL_Storage_Manager.asyncSupported){var o=t?"setItem"+e+a+LL_Storage_Manager.getCurrentTime():"",g="setItem("+LL_Storage_Manager.prepareCommandArgs(e,a,r,o)+")";LL_Storage_Manager.asyncSendCommand(g,o,t,n)}else LL_Storage_Manager.setItem(e,a,r),t&&t.call()},stringify:function(e){if(window.JSON&&JSON.stringify)return JSON.stringify(e);if(!e)return"{}";var a="{",r=0;for(var t in e){var n="";e.hasOwnProperty(t)&&(n=e[t],n=n&&"object"==typeof n?stringify(n):'"'+n+'"'),a+=(r++>0?",":"")+'"'+t+'":'+n}return a+="}"},parse:function(e){try{if(window.JSON&&JSON.parse)return JSON.parse(e);for(var a={},r=e.split(","),t=0;r.length>t;t++){var n=r[t].split(":"),o=n[0].replace(/"/g,""),g=n[1];if(n.length>2)for(j=2;n.length>j;j++)g+=":"+n[j];0==t&&0==o.indexOf("{")&&(o=o.substring(1)),t==r.length-1&&"}"==g.charAt(g.length-1)&&(g=g.substring(0,g.length-1)),0==g.indexOf('"')&&'"'==g.charAt(g.length-1)&&(g=g.substring(1,g.length-1)),a[o]=g}return a}catch(L){}return{}},setItemsAsync:function(e,a,r,t){if(LL_Storage_Manager.asyncSupported){var n=r?"setItems"+e+LL_Storage_Manager.getCurrentTime():"",o="setItems("+LL_Storage_Manager.prepareCommandArgs(e,n,a)+")";LL_Storage_Manager.asyncSendCommand(o,n,r,t)}else{for(var g in a){var L="";a.hasOwnProperty(g)&&(L=a[g]),LL_Storage_Manager.setItem(e,g,L)}r&&r.call()}},getItem:function(e,a){if(!e||!a)return null;var r=""+e+"_"+a;if(LL_Storage_Manager.localStorageSupported)return localStorage.getItem(r);var t,n,o,g=document.cookie.split(";");for(t=0;g.length>t;t++)if(n=g[t].substr(0,g[t].indexOf("=")),o=g[t].substr(g[t].indexOf("=")+1),n=n.replace(/^\s+|\s+$/g,""),n==r)return unescape(o);return null},getItemAsync:function(e,a,r,t){if(LL_Storage_Manager.asyncSupported){var n="getItem"+e+a+LL_Storage_Manager.getCurrentTime(),o="getItem("+LL_Storage_Manager.prepareCommandArgs(e,a,n)+")";LL_Storage_Manager.asyncSendCommand(o,n,r,t)}else{var g=[];g[0]=LL_Storage_Manager.getItem(e,a),setTimeout(function(){r.apply(this,g)},0)}},getItemsAsync:function(e,a,r,t){if(LL_Storage_Manager.asyncSupported){var n="getItems"+e+LL_Storage_Manager.getCurrentTime(),o="getItems("+LL_Storage_Manager.prepareCommandArgs(e,n,a)+")";r&&(t?(LL_Storage_Manager.timers[n]=setTimeout(function(){try{LL_Storage_Manager.handlers[n]=null,delete LL_Storage_Manager.handlers[n],delete LL_Storage_Manager.timers[n],t.call()}catch(e){}},LL_Storage_Manager.asyncTimeout),LL_Storage_Manager.handlers[n]=function(e){try{clearTimeout(LL_Storage_Manager.timers[n]),delete LL_Storage_Manager.timers[n]}catch(a){}try{var t=LL_Storage_Manager.parse(e);r.call(this,t)}catch(a){}}):LL_Storage_Manager.handlers[n]=function(e){try{var a=LL_Storage_Manager.parse(e);r.call(this,a)}catch(t){}}),LL_Storage_Manager.asyncSendCommand(o)}else{for(var g={},L=a.split(","),i=0;L.length>i;i++)g[L[i]]=LL_Storage_Manager.getItem(e,L[i]);setTimeout(function(){r.call(this,g)},0)}},removeItem:function(e,a){if(!e||!a)return null;var r=""+e+"_"+a;if(LL_Storage_Manager.localStorageSupported)localStorage.removeItem(r);else{var t,n,o,g=document.cookie.split(";");for(t=0;g.length>t;t++)if(n=g[t].substr(0,g[t].indexOf("=")),o=g[t].substr(g[t].indexOf("=")+1),n=n.replace(/^\s+|\s+$/g,""),n==r){document.cookie=r+" = ;expires=Thu, 01 Jan 1970 00:00:01 GMT";break}}},removeItemAsync:function(e,a,r,t){if(LL_Storage_Manager.asyncSupported){var n=r?"removeItem"+e+a+LL_Storage_Manager.getCurrentTime():"",o="removeItem("+LL_Storage_Manager.prepareCommandArgs(e,a,n)+")";LL_Storage_Manager.asyncSendCommand(o,n,r,t)}else LL_Storage_Manager.removeItem(e,a),r&&r.call()},clear:function(e){if(!e)return!1;if(LL_Storage_Manager.localStorageSupported)for(var a=localStorage.length-1;a>-1;a--){var r=localStorage.key(a);r&&0==r.indexOf(e)&&localStorage.removeItem(r)}else{var a,t,n,o=document.cookie.split(";");for(a=0;o.length>a;a++)t=o[a].substr(0,o[a].indexOf("=")),n=o[a].substr(o[a].indexOf("=")+1),t=t.replace(/^\s+|\s+$/g,""),0==t.indexOf(e+"_")&&(document.cookie=t+" = ;expires=Thu, 01 Jan 1970 00:00:01 GMT")}},clearAsync:function(e,a,r){if(LL_Storage_Manager.asyncSupported){var t=a?"clear"+e+LL_Storage_Manager.getCurrentTime():"",n="clear("+LL_Storage_Manager.prepareCommandArgs(e,t)+")";LL_Storage_Manager.asyncSendCommand(n,t,a,r)}else LL_Storage_Manager.clear(e),a&&a.call()},addSIDListener:function(e,a){return window.LL_Cobrowse_Manager?LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated,e,a):!1},removeSIDListener:function(e){return window.LL_Cobrowse_Manager?LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated,e):!1},assertFrameLoaded:function(){!document.getElementById(LL_Storage_Manager.dataServerID)&&LL_Storage_Manager.asyncReady&&(LL_Storage_Manager.asyncReady=!1,LL_Storage_Manager.init(!0))},Provider:function(e){if(LL_Storage_Manager.asyncSupported){var a="getProvider"+LL_Storage_Manager.getCurrentTime(),r="getProvider("+a+")";LL_Storage_Manager.asyncSendCommand(r,a,e)}else setTimeout(function(){e.apply(this,["LL_Storage_Manager.asyncSupported is not"])},111)}};LL_Storage_Manager.init(!0);var LL_Cobrowse_Manager={Events:{ChatCobrowseInitiated:{name:"ChatCobrowseInitiated",addEventCommand:"addChatSessionListener",removeEventCommand:"removeChatSessionListener",invalidateCommand:"invalidateChatSession",dispatchEventCommand:"newSession",dispatch:function(e,n){return LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated,e,n)},listen:function(e,n){return LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated,e,n)},invalidate:function(e,n){return LL_Cobrowse_Manager.invalidateEvent(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated,e,n)}},NumberGenerated:{name:"NumberGenerated",addEventCommand:"addSessionStartListener",removeEventCommand:"removeSessionStartListener",invalidateCommand:"invalidateSession",dispatchEventCommand:"newStandaloneSession",dispatch:function(e,n){return LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated,e,n)},listen:function(e,n){return LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.NumberGenerated,e,n)},invalidate:function(e){var n=window.ll_siteCodeLite?ll_siteCodeLite:"";return LL_Cobrowse_Manager.invalidateEvent(LL_Cobrowse_Manager.Events.NumberGenerated,n,e)}},SessionDisconnected:{name:"SessionDisconnected",addEventCommand:"addSessionDisconnectedListener",removeEventCommand:"removeSessionDisconnectedListener",invalidateCommand:"invalidateDisconnectedEvent",dispatchEventCommand:"disconnectSession",eventsToInvalidate:[],dispatch:function(e){return LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.SessionDisconnected,e,e)},listen:function(e,n){return LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected,e,n)},invalidate:function(e){return LL_Cobrowse_Manager.invalidateEvent(LL_Cobrowse_Manager.Events.SessionDisconnected,e,e)}},EscalationAccepted:{name:"EscalationAccepted",addEventCommand:"addEscalationAcceptedListener",removeEventCommand:"removeEscalationAcceptedListener",invalidateCommand:"invalidateEscalationEvent",dispatchEventCommand:"acceptEscalation",eventsToInvalidate:[],dispatch:function(e){return LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.EscalationAccepted,e,e)},listen:function(e,n){return LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.EscalationAccepted,e,n)},invalidate:function(e){return LL_Cobrowse_Manager.invalidateEvent(LL_Cobrowse_Manager.Events.EscalationAccepted,e,e)}},ContextReady:{name:"ContextReady",addEventCommand:"addContextReadyListener",removeEventCommand:"removeContextReadyListener",invalidateCommand:null,dispatchEventCommand:"contextReady",dispatch:function(e){var n=Math.floor(100001*Math.random());return LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.ContextReady,e,n)},listen:function(e,n){return LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.ContextReady,e,n)},invalidate:function(){return LL_Cobrowse_Manager.invalidateEvent(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated)}}},Actions:{SessionStart:function(){return window.LL_ICB_Core&&LL_ICB_Core.StartSession?window.communicationHandler&&communicationHandler.presentationToken?!1:LL_ICB_Core.presentationToken?!1:window.LL_BR_Core&&!LL_BR_Core.ICBSupported&&"none"==LL_BR_Core.ACBSupported?!1:window.LL_CustomUI&&LL_CustomUI.V4Panel?(LL_CustomUI.V4Panel.expand(),!0):!1:!1},SessionDisconnect:function(){try{if(window.LL_ICB_Core)return window.communicationHandler&&communicationHandler.presentationToken?(LL_ICB_Core.doDisconnect(!0),!0):LL_ICB_Core.presentationToken?(LL_ICB_Core.doDisconnect(!0,!0),!0):!1}catch(e){return!1}}},getState:function(){var e={Active:!1,LastKnownMode:null};if(window.LL_ICB_Core)if(LL_ICB_Core.startRequestUrl){var n=LL_ICB_Core.presentationToken,a=!!n&&(0!=LL_ICB_Core.EventGettingInterval||LL_ICB_Core.engineStarted);e.Active=a,a&&(e.LastKnownMode="ICB"===LL_ICB_Core.CobrowseMode?LL_ICB_Core.LastKnownMode!==void 0?LL_ICB_Core.LastKnownMode:"ICB":"ACB")}else if(window.communicationHandler&&window.pageManipulation){var n=communicationHandler.presentationToken,a=!!n&&!pageManipulation.isSessionStoped&&0!=pageManipulation.EventGettingInterval;e.Active=a,a&&(e.LastKnownMode=LL_ICB_Core.LastKnownMode!==void 0?LL_ICB_Core.LastKnownMode:"ICB")}return e},addEventListener:function(e,n,a){if(!window.LL_Storage_Manager||!LL_Storage_Manager.asyncSupported)return!1;var t=e.addEventCommand;if(!t)return!1;var o=!0,r=t+"_"+LL_Storage_Manager.getCurrentTime();for(var i in LL_Storage_Manager.handlers)LL_Storage_Manager.handlers.hasOwnProperty(i)&&LL_Storage_Manager.handlers["_"+i]===a&&(r=i,o=!1);var s=t+"("+n+","+r+")";return LL_Storage_Manager.handlers[r]=function(e){(function(n,a){try{var t=!1,o={presentationToken:null,presentationCode:null,SID:null};try{window.LL_ICB_Core&&(o.presentationToken=LL_ICB_Core.presentationToken,o.presentationCode=LL_ICB_Core.presentationCode,o.SID=LL_ICB_Core.SID),window.LL_Session&&(o.presentationToken||(o.presentationToken=LL_Session.presentationToken),o.presentationCode||(o.presentationCode=LL_Session.presentationCode),o.SID||(o.SID=LL_Session.SID)),!o.presentationCode&&window.LL_Storage_Manager&&window.ll_siteCodeLite&&(t=!0,LL_Storage_Manager.getItemsAsync(ll_siteCodeLite,"pc,SID,pc_token",function(t){var o={};o.presentationToken=t.pc_token,o.presentationCode=t.pc,o.SID=t.SID,n&&(n.apply(this,[e,o]),LL_Storage_Manager.handlers[a]=null,delete LL_Storage_Manager.handlers[a],LL_Storage_Manager.handlers["_"+a]=null,delete LL_Storage_Manager.handlers["_"+a])}))}catch(r){}n&&!t&&(n.apply(this,[e,o]),LL_Storage_Manager.handlers[a]=null,delete LL_Storage_Manager.handlers[a],LL_Storage_Manager.handlers["_"+a]=null,delete LL_Storage_Manager.handlers["_"+a])}catch(i){}})(a,r)},LL_Storage_Manager.handlers["_"+r]=a,LL_Storage_Manager.asyncSendCommand(s),!0},removeEventListener:function(e,n,a){if(!window.LL_Storage_Manager||!LL_Storage_Manager.asyncSupported)return!1;for(var t in LL_Storage_Manager.handlers)if(LL_Storage_Manager.handlers.hasOwnProperty(t)&&LL_Storage_Manager.handlers["_"+t]===a){var o=e.removeEventCommand;if(!o)return!1;var r=o+"("+n+","+t+")";LL_Storage_Manager.asyncSendCommand(r)}return!0},dispatchEvent:function(e,n,a){if(!window.LL_Storage_Manager||!LL_Storage_Manager.asyncSupported)return!1;var t=e.dispatchEventCommand;if(!t)return!1;var o=null,r=t+"("+n+","+a+","+")";if(LL_Storage_Manager.asyncSendCommand(r,o),e.eventsToInvalidate&&e.eventsToInvalidate.length>0)for(var i=0;e.eventsToInvalidate.length>i;i++){var s=e.eventsToInvalidate[i];s.invalidate(n,a)}return!0},invalidateEvent:function(e,n,a){if(!window.LL_Storage_Manager||!LL_Storage_Manager.asyncSupported)return!1;var t=e.invalidateCommand;if(!t)return!1;var o=null,r=t+"("+n+","+a+","+")";return LL_Storage_Manager.asyncSendCommand(r,o),!0},extParams:{},setExtParams:function(e){LL_Cobrowse_Manager.extParams=e}};LL_Cobrowse_Manager.Events.SessionDisconnected.eventsToInvalidate.push(LL_Cobrowse_Manager.Events.NumberGenerated,LL_Cobrowse_Manager.Events.EscalationAccepted),LL_Cobrowse_Manager.Events.EscalationAccepted.eventsToInvalidate.push(LL_Cobrowse_Manager.Events.NumberGenerated);var urlPattern={protocol:"",query:"",domain:"",path:"",ref:"",params:[],setupPattern:function(t){urlPattern.protocol="",urlPattern.query="",urlPattern.domain="",urlPattern.path="",urlPattern.ref="",urlPattern.params=[],"function"!=typeof String.prototype.LL_startsWith&&(String.prototype.LL_startsWith=function(t){return 0==t.length?!0:0==this.indexOf(t)}),"function"!=typeof String.prototype.LL_endsWith&&(String.prototype.LL_endsWith=function(t){if(0==t.length)return!0;if(this.length<t.length)return!1;var r=this.substr(this.length-t.length);return r==t}),t=t.toLowerCase();var r=t.indexOf("://");urlPattern.protocol=t.substring(0,r),t=t.substring(r+3);var n=t.indexOf("?"),e=t.indexOf("/"),u=t.indexOf("#");0>n&&0>e&&0>u?urlPattern.domain=t:0>n&&0>u?(urlPattern.domain=t.substring(0,e),urlPattern.path=t.substring(e+1)):0>e&&0>u?(urlPattern.domain=t.substring(0,n),urlPattern.query=t.substring(n+1)):0>n&&0>e&&(urlPattern.domain=t.substring(0,u),urlPattern.ref=t.substring(u+1)),n>0&&e>0&&u>0?(urlPattern.domain=t.substring(0,e),urlPattern.path=t.substring(e+1,n),urlPattern.query=t.substring(n+1,u),urlPattern.ref=t.substring(u+1)):n>0&&u>0?(urlPattern.domain=t.substring(0,n),urlPattern.query=t.substring(n+1,u),urlPattern.ref=t.substring(u+1)):e>0&&u>0?(urlPattern.domain=t.substring(0,e),urlPattern.path=t.substring(e+1,u),urlPattern.ref=t.substring(u+1)):n>0&&e>0&&(urlPattern.domain=t.substring(0,e),urlPattern.path=t.substring(e+1,n),urlPattern.query=t.substring(n+1)),urlPattern.path.length>0&&urlPattern.path.LL_startsWith("/")&&(urlPattern.path=urlPattern.path.subStr(1)),urlPattern.query.length>0&&(urlPattern.params=urlPattern.query.indexOf("&")>=0?urlPattern.query.split("&"):Array(urlPattern.query))},match:function(t,r){if(urlPattern.setupPattern(t),!r)return!1;r=r.toLowerCase();var n=r.indexOf("://");(-1==n||n>6)&&(r="http://"+r),n=r.indexOf("://");var e=r.substring(0,n);r=r.substring(n+3);var u=r.indexOf("?"),s=r.indexOf("/"),a=r.indexOf("#"),i="",l="",g="",h="";if(0>u&&0>s&&0>a?i=r:0>u&&0>a?(i=r.substring(0,s),l=r.substring(s+1)):0>s&&0>a?(i=r.substring(0,u),g=r.substring(u+1)):0>u&&0>s&&(i=r.substring(0,a),h=r.substring(a+1)),u>0&&s>0&&a>0?(i=r.substring(0,s),l=r.substring(s+1,u),g=r.substring(u+1,a),h=r.substring(a+1)):u>0&&a>0?(i=r.substring(0,u),g=r.substring(u+1,a),h=r.substring(a+1)):s>0&&a>0?(i=r.substring(0,s),l=r.substring(s+1,a),h=r.substring(a+1)):u>0&&s>0&&(i=r.substring(0,s),l=r.substring(s+1,u),g=r.substring(u+1)),urlPattern.query&&0!=urlPattern.query.length&&"*"!=urlPattern.query&&"+"!=urlPattern.query){if(urlPattern.query){var P;if(P=g.indexOf("&")>=0?g.split("&"):Array(g),!P)return!1;for(var o="",b={},d=0;P.length>d;d++){var f=P[d].split("=");b[f[0]]=f[1]}for(var d=0;urlPattern.params.length>d;d++){o=urlPattern.params[d].split("=")[0];var p=urlPattern.params[d].split("=")[1];if(!urlPattern.arrayContainsKey(b,o))return!1;if(!urlPattern.equalsWithWildcard(p,b[o]))return!1}}}else if(!urlPattern.equalsWithWildcard(urlPattern.query,g))return!1;l&&l.LL_startsWith("/")&&(l=l.substring(1));var W=urlPattern.equalsWithWildcard(urlPattern.protocol,e)&&urlPattern.equalsHostWithWildcard(urlPattern.domain,i)&&urlPattern.equalsWithWildcard(urlPattern.path,l)&&urlPattern.equalsWithWildcard(urlPattern.ref,h);return W},equalsHostWithWildcard:function(t,r){var n=urlPattern.equalsWithWildcard(t,r);return!n&&t.LL_startsWith("*.")&&(n=urlPattern.equalsWithWildcard(t,"."+r)),n},equalsWithWildcard:function(t,r){if(!(t&&0!=t.length||r&&0!=r.length))return!0;if((!r||0==r.length)&&"*"==t)return!0;if(!r||0==r.length||!t||0==t.length)return!1;if(t.LL_startsWith("*"))return r.LL_endsWith(t.substring(1));if(t.LL_endsWith("*")){var n=r.LL_startsWith(t.substring(0,t.length-1));return n}return t.LL_startsWith("+")?r.LL_endsWith(t.substring(1))&&r.length>t.length-1:t.LL_endsWith("+")?r.LL_startsWith(t.substring(0,t.length-1))&&r.length>t.length+1:t==r},arrayContainsKey:function(t,r){for(var n in t)if(n==r)return!0;return!1}};
        LL_Deployment.allowICB = true;
        LL_Deployment.allowACB = true;
        LL_Deployment.restrictionGroup = "NONE";
        LL_Deployment.mainServerPath = "216a497680152ed22e52-01d6a426a21216ea0f0f91a356c3fa59.ssl.cf2.rackcdn.com/llscripts/";
        LL_Deployment.icbType = "SCRIPT";
        LL_Deployment.Mac_ACB_OS_Versions = "10.7+";
        LL_Deployment.stealthUrls = [];
        LL_Deployment.acbUrls = [];
        LL_Deployment.buttonVisibility = true;
        LL_Deployment.buttonExpand = false;
        LL_Deployment.StartSessionNetworkWaitTime = 60000;
        
            LL_Deployment.hostEngineURL = "https://8f544770ae5b7cfb8345-6636004133269479b2733e2a336860f6.ssl.cf2.rackcdn.com/engine.js";
        
            LL_Deployment.acbWinMode = true;
        
            LL_Deployment.acbNetMode = true;
        
        try {
            //check stealth URLS
            for (var i=0; i< LL_Deployment.stealthUrls.length; i++) {
                if(urlPattern.match(LL_Deployment.stealthUrls[i], self.location.href)) {
                    LL_Deployment.buttonVisibility = false;
                    break;
                }
            }
        }
        catch(e) {}
        
            try {
                //check forceACB URLS
                for (var i=0; i< LL_Deployment.acbUrls.length; i++) {
                    if(urlPattern.match(LL_Deployment.acbUrls[i], self.location.href)) {
                        LL_Deployment.allowICB = false;
                        break;
                    }
                }
            }
            catch(e) {}
            var LL_Debug={debugLevel:parseInt(window.LL_Deployment&&LL_Deployment.debugLevel?LL_Deployment.debugLevel:"0"),error:function(e,L,n){e&&LL_Debug.debugLevel>0&&LL_Debug.sendCommand(e,"E",{type:L,message:n})},set:function(e,L,n){e&&LL_Debug.debugLevel>1&&LL_Debug.sendCommand(e,"S",{key:L,value:n})},setItems:function(e,L){if(e&&LL_Debug.debugLevel>1)for(var n in L)L.hasOwnProperty(n)&&LL_Debug.sendCommand(e,"S",{key:n,value:L[n]})},log:function(e,L){e&&LL_Debug.debugLevel>1&&LL_Debug.sendCommand(e,"L",{state:L})},info:function(e,L){e&&LL_Debug.debugLevel>10&&LL_Debug.sendCommand(e,"I",{message:L})},newContext:function(e){e&&LL_Debug.debugLevel>0},sendCommand:function(e,L,n){if(e&&window.LL_Storage_Manager&&LL_Storage_Manager.asyncSupported){var a="logData("+LL_Storage_Manager.prepareCommandArgs(e,L,n)+")";LL_Storage_Manager.asyncSendCommand(a)}}};

        try {
            LL_customFunctions = null;
        }
        catch (ex) {}

        LL_CustomUI = {"activateText":"Expert would like to activate Advanced Co Browsing","activateWindowOK":"OK","partialSupportedText":"You are using a browser that is not yet fully supported. Some features may not work well, but you are welcome to have a look around.","partialSupported_font_family":"Trebuchet MS","partialSupported_font_size":"14","partialSupported_background_color":"ffffff","partialSupported_width":"280","partialSupported_height":"177","partialSupported_text_color":"444444","syncIsLostText":"The customer closed the session, or navigated to a page which does not support co browse. When the customer returns, co browse will resume.","syncIsLostText_font_family":"Trebuchet MS","syncIsLostText_font_size":"14","syncIsLostText_background_color":"ffffff","syncIsLostText_width":"280","syncIsLostText_height":"177","syncIsLostText_color":"444444","takingOutsideText":"This link will take you outside of the co browsing session. To open it in a new browser window ","clickHereText":"click here","V4LLPanel_redirect_popup_font_family":"Trebuchet MS","V4LLPanel_redirect_popup_width":"280","V4LLPanel_redirect_popup_height":"120","V4LLPanel_redirect_popup_background":"ffffff","V4LLPanel_redirect_popup_text_color":"444444","V4LLPanel_redirect_popup_text_font_size":"12","greeting":"<p><strong>Need Help?</strong></p><p>You're just a few steps away from enjoying a new experience that lets our experts browse the site with you to better assist and guide you.</p>","altGreeting":"&nbsp;","startButton":"Start","privacyHeader":"Your privacy is important to us","privacyText":"Co Browse is a secure service governed by our <a target=\"_blank\" href=\"/privacy_policy.asp\">Privacy Policy.</a>","leaveFeedback":"Please leave feedback","getInstantHelp":"Get Instant Help!","v3PleaseWait":"Please wait...","v3ToolTip":"","v3toProceedClickButton":"<center>To proceed click the button below.</center>","v3PassCodeGenerated":"Passcode generated.","v3SessionIsOver":"Session ended","v3ServersBusy":"<span style='text-size:12px;font-weight:bold'>All servers are busy.</span>","v3TryLater":"<span style='text-size:12px;font-weight:normal;text-align:left;'>Service is temporary unavailable. Please try again later. Thank you for your patience.</span>","v3SessionTimedOut":"Your session timed out.","v3CloseWindowNotice":"You can now close this window","v3CodeInstructions":"After you provide the code to company Expert click the button below.","v3ReturnToWebsiteButton":"Return to Website","v3ProceedButton":"Activate session","v3InstantHelp":"Instant Help","v3AgentsOffline":"Agents are not available to assist at this time. Please call during the office hours listed below.","v3Unavailable":"We apologize for the inconvenience, but this service is unavailable at the moment.","v3ClientProgressBar_hint_0":"Establishing secure connection...","v3ClientProgressBar_hint_1":"Do not close this window.","v3ClientProgressBar_hint_2":"Do not close this window. It will minimize automatically.","v3ClientProgressBar_hint_3":"Expert connected","v3ClientProgressBar_hint_4":"Please minimize this window but do not close it.","v3SessionCouldNotBeStarted":"Session could not be started.","v3SessionCouldNotBeActivated":"Session could not be activated.","v3SessionEndedOldJava":"<span style='font-size:18px;line-height:24px;font-weight:normal;'>This session is unable to connect. Co-browsing requires an up-to-date Java environment. Please consider updating your Java to <a href='https://www.java.com/' target='_blank'>the most recent version</a> in order to co-browse.</span>","v3CallExpert":"","v3ProvidePassCode":"and provide the code below","v3GeneratingPassCode":"Generating passcode","v3ClickRun":"Click <b>Run</b> or <b>Yes</b> if prompted.","v3AgentConnecting":"<b>Agent is connecting... please do not close this window.</b>","v3EstablishingConnection":"<b>Establishing secure connection.</b><br /> Please do not close this window.","v3CertAccepted":"Agent will see your page momentarily... please do not close this window. <br /><br />This window will automatically minimize when the agent is connected.","v3MinimizeNow":"Minimize now","v3CertRejected_1":"IMPORTANT!\n\nPlease accept the Java certificate.\n\nIt verifies the identity of the service provider, and gives others permission to view your screen.\n\nNo software will be installed onto your computer.","v3CertRejected_2":"Since you rejected Java Certificates, Visual Sharing is now disabled.\n\nTo enable it please close all browser windows and start over.","V3FirefoxPluginIcon_text_part1":"If you see a","V3FirefoxPluginIcon_text_part2":"&nbsp;icon, click it to activate the Java plugin","v3ChromeTip":"If you see <strong>\"Run this time\"</strong> or <strong>\"Always run on this site\"</strong> button above, click it.","V3Activating_text":"Activating...","v3Chrome37TooltipTextFirstPart":"If you see <strong>\"Plug-in blocked\"</strong> ","v3Chrome37TooltipTextSecondPart":"icon, click it, select <strong>\"Always allow\"</strong> and press <strong>\"Done\"</strong>","CDelay_text":"To activate advanced Co Browsing, please accept the <em>security certificate</em> by clicking <span>\"Run\"</span>.","CDelay_redisplay_certificate":"Redisplay security certificate","CDelay_terminate_1":"To terminate this session&nbsp;","CDelay_terminate_2":"click here","reactive_headerBranding":"Browse the website with an Expert","reactive_buttonLabel":"Initiate","reactive_pageTitle":"Get Instant Help!","ht_waitingAgent":"Waiting for agent to connect","ht_agentCanSeeScreen":"Agent can now see your screen","ht_endSessionMessage":"Are you sure you want to end this session?","activateText_font_family":"Tahoma","activateText_font_size":"23","activateText_color":"000000","activateACBButton_width":"159","activateACBButton_font_family":"Tahoma","activateACBButton_font_size":"23","activateACBButton_color":"000000","activateACBButton_text_hover":"ffffff","V4LLPanel_CollapsedNarrowNoAgent_width":"157","V4LLPanel_CollapsedNarrowNoAgent_height":"36","V4LLPanel_CollapsedNarrowNoAgent_right":"16","V4LLPanel_CollapsedNarrowNoAgent_bottom":"0","ADA_compliance":"true","V4LLPanel_CollapsedNumContNarrow_font_family":"Tahoma","V4LLPanel_CollapsedNumContNarrow_font_size":"14","V4LLPanel_CollapsedNumContNarrow_color":"444444","V4LLPanel_HintBlock_width":"157","V4LLPanel_HintBlock_height":"78","V4LLPanel_HintBlock_right":"16","V4LLPanel_HintBlock_FirstLineText":"Browse together","V4LLPanel_HintBlock_FirstLineText_font_family":"Trebuchet MS","V4LLPanel_HintBlock_FirstLineText_font_size":"14","V4LLPanel_HintBlock_FirstLineText_font_weight":"bold","V4LLPanel_HintBlock_FirstLineText_font_style":"normal","V4LLPanel_HintBlock_FirstLineText_color":"343434","V4LLPanel_HintBlock_SecondLineText":"with our experts online","V4LLPanel_HintBlock_SecondLineText_font_family":"Trebuchet MS","V4LLPanel_HintBlock_SecondLineText_font_size":"10","V4LLPanel_HintBlock_SecondLineText_font_weight":"normal","V4LLPanel_HintBlock_SecondLineText_font_style":"normal","V4LLPanel_HintBlock_SecondLineText_color":"343434","V4LLPanel_InnerTitle_font_family":"Tahoma","V4LLPanel_InnerTitle_font_size":"14","V4LLPanel_InnerTitle_color":"444444","V4LLPanel_width":"284","V4LLPanel_PanelClose_right":"6","V4LLPanel_TogglerText_font_family":"Tahoma","V4LLPanel_TogglerText_font_size":"14","V4LLPanel_TogglerText_color":"444444","V4LLPanel_passToBeginText_color":"444444","V4LLPanel_passToBeginText_font_size":"14","V4LLPanel_PhoneNumber_font_family":"Trebuchet MS","V4LLPanel_PhoneNumber_digits_font_family":"Trebuchet MS","V4LLPanel_phoneNum_font_size":"16","V4LLPanel_provideCodeMessage_color":"444444","V4LLPanel_provideCodeMessage_font_size":"14","V4LLPanel_provideCodeMessage_font_family":"Trebuchet MS","V4LLPanel_NumberBox_background_color":"ececec","V4LLPanel_NumberBox_color":"444444","V4LLPanel_NumberBox_font_size":"24","V4LLPanel_NumberBox_font_family":"Trebuchet MS","V4LLPanel_TermsAndConditions_font_size":"10","V4LLPanel_TermsAndConditions_color":"6e6e6e","V4LLPanel_TermsAndConditions_font_family":"Trebuchet MS","V4LLPanel_PoweredBy_color":"696969","V4LLPanel_PoweredBy_font_family":"Trebuchet MS","V4LLPanel_PoweredBy_font_size":"10","V4LLPanel_notconnected_header_text":"Co-browse","V4LLPanel_notconnected_provideNumber_text":"Provide the ID number below","V4LLPanel_notconnected_callUsAt_text":"","V4LLPanel_notconnected_phoneNumber":"","V4LLPanel_notconnected_poweredBy_text":"Powered by Oracle Co-browse","V4LLPanel_notconnected_termsAndConditions_text":"","V4LLPanel_position":"bottom_right","V4LLPanel_position_offset":"16","V4LLPanel_header_height":"39","V4LLPanel_header_logo_right_gap":"7","V4LLPanel_header_text":"Live Expert","V4LLPanel_header_text_color":"444444","V4LLPanel_header_text_font_family":"Tahoma","V4LLPanel_header_text_font_size":"14","V4LLPanel_header_text_font_weight":"normal","V4LLPanel_header_text_font_style":"normal","V4LLPanel_header_number_color":"444444","V4LLPanel_header_number_font_family":"Tahoma","V4LLPanel_header_number_font_size":"14","V4LLPanel_Connected_content_height":"74","V4LLPanel_Connected_content_text":"Expert connected","V4LLPanel_Connected_content_text_color":"444444","V4LLPanel_Connected_content_text_font_family":"Trebuchet MS","V4LLPanel_Connected_content_text_font_size":"20","V4LLPanel_Connected_content_text_font_weight":"normal","V4LLPanel_Connected_content_text_font_style":"normal","V4LLPanel_Connected_disconnect_height":"57","V4LLPanel_Connected_disconnect_button_text":"Disconnect","V4LLPanel_Connected_disconnect_button_text_color":"fefefe","V4LLPanel_Connected_disconnect_button_text_hover_color":"ffffff","V4LLPanel_Connected_disconnect_button_text_font_family":"Trebuchet MS","V4LLPanel_Connected_disconnect_button_text_font_size":"14","V4LLPanel_Connected_disconnect_button_text_font_weight":"normal","V4LLPanel_Connected_disconnect_button_text_font_style":"normal","V4LLPanel_Connected_footer_height":"32","V4LLPanel_Connected_footer_text":"powered by LiveLOOK Co Browsing","V4LLPanel_Connected_footer_text_color":"444444","V4LLPanel_Connected_footer_text_font_family":"Trebuchet MS","V4LLPanel_Connected_footer_text_font_size":"10","V4LLPanel_Connected_footer_text_font_weight":"normal","V4LLPanel_Connected_footer_text_font_style":"normal","V4LLPanel_Connected_collapsed_height":"33","V4LLPanel_notSupported_width":"285","V4LLPanel_notSupported_height":"47","V4LLPanel_notSupported_right":"16","V4LLPanel_notSupported_header_text":"Live Expert","V4LLPanel_Title_notSupported_font_family":"Tahoma","V4LLPanel_Title_notSupported_font_size":"14","V4LLPanel_Title_notSupported_color":"444444","V4LLPanel_HintBlock_notSupported_width":"157","V4LLPanel_HintBlock_notSupported_height":"78","V4LLPanel_HintBlock_notSupported_right":"16","V4LLPanel_GenericToggler_notSupported_width":"157","V4LLPanel_notSupported_text":"Your browser does not support Co Browsing option. Expert will be happy to assist you over the phone.","V4LLPanel_notSupportedEnvText_notSupported_font_family":"Trebuchet MS","V4LLPanel_notSupportedEnvText_notSupported_font_size":"10","V4LLPanel_notSupportedEnvText_notSupported_color":"444444","V4LLPanel_notSupported_moreInfoText":"More info","V4LLPanel_moreInfoLink_notSupported_font_family":"Trebuchet MS","V4LLPanel_moreInfoLink_notSupported_font_size":"10","V4LLPanel_moreInfoLink_notSupported_color":"68769d","V4LLPanel_termsAndConditionsWindow_font_family":"Tahoma","V4LLPanel_termsAndConditionsWindow_color":"444444","V4LLPanel_termsAndConditionsWindow_font_size":"12","V4LLPanel_termsAndConditionsWindow_startSessionButton_color":"fefefe","V4LLPanel_termsAndConditionsWindow_startSessionButton_font_size":"12","V4LLPanel_termsAndConditionsWindow_startSessionButton_font_family":"Verdana","V4LLPanel_termsAndConditionsWindow_startSessionButton_text":"Start Session Now","V4LLPanel_TermsAndConditionsWindowHeadline_font_family":"Tahoma","V4LLPanel_TermsAndConditionsWindowHeadline_color":"444444","V4LLPanel_TermsAndConditionsWindowHeadline_font_size":"14","V4LLPanel_TermsAndConditionsWindowScrollBar_TrackBG_color":"0f0e0f","V4LLPanel_TermsAndConditionsWindowScrollBar_DragBG_color":"f70af7","V4LLPanel_TermsAndConditionsWindowHeadline":"","V4LLPanel_TermsAndConditionsWindowText":"","V4LLPanel_WaitingWindowBackgroundColor":"2f2f2f","V4LLPanel_WaitingWindowHeadlineText":"Co-Browse","V4LLPanel_WaitingWindowHeadlineTextFontFamily":"Tahoma","V4LLPanel_WaitingWindowHeadlineTextFontSize":"12","V4LLPanel_WaitingWindowHeadlineTextFontColor":"ffffff","V4LLPanel_WaitingWindowBodyTextFontFamily":"Trebuchet MS","V4LLPanel_WaitingWindowBodyTextFontColor":"e9e9e9","V4LLPanel_WaitingWindowBodyTextFontSize":"14","V4LLPanel_WaitingWindowBodyText":"Client is navigating to a new page","V4LLPanel_DisconnectConfirmWindow_background_color":"ffffff","V4LLPanel_DisconnectConfirmWindow_border_color":"aeaeae","V4LLPanel_DisconnectConfirmWindow_text_font_size":"14","V4LLPanel_DisconnectConfirmWindow_text_color":"444444","V4LLPanel_DisconnectConfirmWindow_text_font_weight":"normal","V4LLPanel_DisconnectConfirmWindow_text_font_style":"normal","V4LLPanel_DisconnectConfirmWindow_text_font_family":"Trebuchet MS","V4LLPanel_DisconnectConfirmWindow_text":"Are you sure you want to terminate this session?","V4LLPanel_DisconnectConfirmWindow_text_no":"No","V4LLPanel_DisconnectConfirmWindow_text_yes":"Yes","V4LLPanel_CloseConfirmButton_text_color":"010101","V4LLPanel_CloseConfirmButton_hover_text_color":"ffffff","V4LLPanel_CloseConfirmButton_text_font_family":"Trebuchet MS","V4LLPanel_CloseConfirmButton_text_font_size":"18","V4LLPanel_CloseConfirmButton_text_font_weight":"normal","V4LLPanel_CloseConfirmButton_text_font_style":"normal","V4LLPanel_CloseConfirmButton_text":"Are you sure you want to terminate this session?","V4LLPanel_CloseConfirmButton_text_no":"No","V4LLPanel_CloseConfirmButton_text_yes":"Yes","closeSessionEndWindowLink_text":"Close","ADA_V4LLPanel_PanelClose":"Collapse Browse with Specialist widget","ADA_V4LLPanel_CollapsedNumContNarrow":"Expand Browse with Specialist widget","ADA_V4LLPanel_PanelMinimize":"Collapse Browse with Specialist widget","ADA_V4LLPanel_PanelClose_disconnect":"Disconnect session for browse with specialist","ADA_V4LLPanel_CloseDeclineButton":"Decline session end","ADA_V4LLPanel_CloseConfirmButton":"Confirm session end","ADA_V4LLPanel_DisconnectConfirmWindow_infoEnd":"End of informational layer","ADA_V4LLPanel_DisconnectTrigger":"Disconnect session for browse with specialist","ADA_V4LLPanel_notconnected_poweredBy_modalEnd":"End of Modal Layer","ADA_V4LLPanel_CollapsedNumContNarrow_connected":"Expert connected","ADA_V4LLPanel_PanelClose_close":"Close","ADA_V4LLPanel_CloseDeclineButtonTC":"Decline session end","ADA_V4LLPanel_CloseConfirmButtonTC":"Confirm session end","ADA_V4LLPanel_modalEnd":"End of modal dialog","ADA_V4LLPanel_closeSessionEndWindowLink":"Close Session Ended dialog","LL_sessionEnded_popup_font_family":"Trebuchet MS","LL_sessionEnded_popup_font_size":"12","LL_sessionEnded_title_font_family":"Trebuchet MS","LL_sessionEnded_title_font_size":"34","LL_sessionEnded_description_font_family":"Trebuchet MS","LL_sessionEnded_description_font_size":"22","LL_sessionEnded_Close_Modal_Window_button_font_family":"Trebuchet MS","LL_sessionEnded_Close_Modal_Window_button_font_size":"14","LL_sessionEnded_feedback_font_family":"Trebuchet MS","LL_sessionEnded_feedback_font_size":"14","LL_sessionEnded_window_title":"Session ended","LL_sessionEnded_window_text":"You can now close this window","LL_sessionEnded_window_leave_feedback_text":"Please leave feedback","v4_activated_text":"Activated","LL_sessionEnded_popup_background_color":"ffffff","LL_sessionEnded_title_font_color":"da0000","LL_sessionEnded_description_font_color":"464646","LL_sessionEnded_Close_Modal_Window_button_width":"61","LL_CloseModal_Link_buttom_color":"ffffff","LL_Feedback_Button_color":"838383","partialSupported_PanelClose_background":"/framework/v4/resources/images/V4LLPanel/white/partialSupported_PanelClose_background.png","partialSupported_separator":"/framework/v4/resources/images/V4LLPanel/white/partialSupported_separator.png","syncIsLostText_PanelClose_background":"/framework/v4/resources/images/V4LLPanel/white/syncIsLostText_PanelClose_background.png","syncIsLostText_separator":"/framework/v4/resources/images/V4LLPanel/white/syncIsLostText_separator.png","V4LLPanel_redirect_popup_cancel_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_redirect_popup_cancel_background.png","V4LLPanel_redirect_popup_separator":"/framework/v4/resources/images/V4LLPanel/white/syncIsLostText_separator.png","activateACBButton_image":"/framework/v4/resources/images/activateButton_gray.png","activateACBButton_image_hover":"/framework/v4/resources/images/activateButton_red.png","V4LLPanel_CollapsedNarrowNoAgent_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_CollapsedNarrowNoAgent_background.png","V4LLPanel_InnerLogo_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_InnerLogo_background.png","V4LLPanel_HintBlock_background":"/framework/v4/resources/images/V4LLPanel/V4LLPanelhoverTooltipBg.png","V4LLPanel_notConnected_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_notConnected_background.png","V4LLPanel_PanelClose_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanelMinimizeBottom_white.png","LLpassToBeginText_background":"/framework/v4/resources/images/V4LLPanel/white/LLpassToBeginText_background.png","V4LLPanel_PhoneNumber_background":"/company/config/53779276/v4/res/nikesc53779276us2//images/1033/V4LLPanel_PhoneNumber_background.png","V4LLPanel_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_background.png","V4LLPanel_separator":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_separator.png","V4LLPanel_header_logo":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_header_logo.png","V4LLPanel_header_close_image":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_header_close_image.png","V4LLPanel_Connected_disconnect_button":"/framework/v4/resources/images/V4LLPanel/V4LLPanelDisconnectButton.png","V4LLPanel_Connected_disconnect_button_hover":"/framework/v4/resources/images/V4LLPanel/V4LLPanelDisconnectButton_hover.png","V4LLPanel_Connected_disconnect_button_pressed":"/framework/v4/resources/images/V4LLPanel/V4LLPanelDisconnectButton_hover.png","V4LLPanel_Connected_collapsed_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_Connected_collapsed_background.png","V4LLPanel_notSupported_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_notSupported_background.png","V4LLPanel_notSupported_logo":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_notSupported_logo.png","V4LLPanel_PanelClose_notSupported_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_PanelClose_notSupported_background.png","V4LLPanel_HintBlock_notSupported_background":"/framework/v4/resources/images/V4LLPanel/V4LLPanelhoverTooltipBg.png","V4LLPanel_GenericToggler_notSupported_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_GenericToggler_notSupported_background.png","V4LLPanel_termsAndConditionsWindow_textShadow":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_termsAndConditionsWindow_textShadow.png","V4LLPanel_termsAndConditionsWindow_startSessionButton":"/framework/v4/resources/images/V4LLPanel/V4LLPanelStartSessionNowGray.png","V4LLPanel_termsAndConditionsWindow_startSessionButtonHover":"/framework/v4/resources/images/V4LLPanel/V4LLPanelStartSessionNow.jpg","V4LLPanel_WaitingWindowSeparator":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanelSepLine_white.png","V4LLPanel_WaitingWindowLogo":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanelLogo_white.png","V4LLPanel_WaitingWindowClose":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanel_redirect_popup_cancel_background.png","V4LLPanel_WaitingWindowPreloader":"/framework/v4/resources/images/V4LLPanel/wait.gif","V4LLPanel_PanelMinimizeButton_background":"/framework/v4/resources/images/V4LLPanel/V4LLPanelMinimize.png","V4LLPanel_PanelCloseButton_background":"/framework/v4/resources/images/V4LLPanel/white/V4LLPanelCloseButton_white.png","V4LLPanel_CloseConfirmButton_background":"/framework/v4/resources/images/V4LLPanel/V4LLPanelDisconnectButton.png","V4LLPanel_CloseConfirmButton_background_hover":"/framework/v4/resources/images/V4LLPanel/V4LLPanelDisconnectButton_hover.png","LL_sessionEnded_popup_close_button":"/framework/v4/resources/images/V4LLPanel/session_ended_close_button.png","LL_sessionEnded_popup_cancel_button":"/framework/v4/resources/images/V4LLPanel/closeicon.png","LL_sessionEnded_popup_image":"/framework/v4/resources/images/V4LLPanel/stopwatch.png","FAQURL":"/framework/faq/faq.aspx","PrivacyURL":"/privacy_policy.asp","Slideshow":"flash/slideshow_combined_generic.swf","V4LLPanel_FAQURL":"","V4LLPanel_PhoneNumberURL":"","V4LLPanel_MoreInfo":"http://www.sharescreen.net/"};
        LL_CustomUI.V4PanelState = "new";
        Array.prototype.indexOf||(Array.prototype.indexOf=function(e){for(var r=0;this.length>r;r++)if(this[r]===e)return r;return-1});var LL_BR_Core=new function(){this.browser=null,this.ICBSupported=!1,this.ACBSupported="none",this.ICBAllowed=window.LL_Deployment?LL_Deployment.allowICB:!1,this.ACBAllowed=window.LL_Deployment?LL_Deployment.allowACB:!1,this.ll_posY=0,this.Init=function(){LL_BR_Core.ICBSupported=LL_BR_Core.ICBAllowed?LL_BR_Core.IsICBSupported():!1,LL_BR_Core.ACBSupported=LL_BR_Core.ACBAllowed?LL_BR_Core.IsACBSupported():"none"},this.isMobile={Android:function(){return navigator.userAgent.match(/Android/i)?!0:!1},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)?!0:!1},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)?!0:!1},iOSVersion:function(){try{var e,r=navigator.userAgent.match(/(?:CPU iPhone OS|CPU OS)\s(?:(\d_\d|\d_\d_\d))? like Mac OS X/i),a=0;return r?(r.length>1&&(e=r[1],e&&(e=e.split("_")),e.length>0&&(a=e[0]),e.length>1&&(a+="."+e[1])),a):a}catch(o){return 0}},Windows:function(){return navigator.userAgent.match(/IEMobile/i)?!0:!1},any:function(){return LL_BR_Core.isMobile.Android()||LL_BR_Core.isMobile.BlackBerry()||LL_BR_Core.isMobile.iOS()||LL_BR_Core.isMobile.Windows()}},this.hasRequiredVersion=function(e,r){try{for(var a=e.split("."),o=r.split("."),n=Math.min(a.length,o.length),t=0;n>t;t++){var i=Number(o[t]),s=Number(a[t]);if((isNaN(i)||isNaN(s))&&(i=o[t],s=a[t]),i>s)return!0;if(s>i)return!1}return!0}catch(l){return!0}},this.IsICBSupported=function(){if(LL_BR_Core.browser||(LL_BR_Core.browser=LL_BR_Core.DetectBrowser()),LL_BR_Core.isMobile.iOS()){var e=new Number(LL_BR_Core.isMobile.iOSVersion());return e&&!isNaN(e)&&6>e&&0!=e?!1:!0}if(-1!=LL_BR_Core.browser.OS.indexOf("Mac OS")&&LL_BR_Core.browser.OSVersion){var r="10.5";return LL_BR_Core.hasRequiredVersion(r,LL_BR_Core.browser.OSVersion)}if(LL_BR_Core.browser.WebSocket&&LL_BR_Core.browser.PostMessage&&LL_BR_Core.browser.LocalStorage)return!0;if("MSIE"==LL_BR_Core.browser.BrowserName)try{var a=Number(LL_BR_Core.browser.BrowserVersion);if(a>=8)return!0}catch(o){}return!1},this.IsLTBSupported=function(e){var r=LL_Deployment&&LL_Deployment.restrictionGroup?LL_Deployment.restrictionGroup.toUpperCase():"NONE";if(!r||"NONE"==r||"none"==e)return e;LL_BR_Core.browser||(LL_BR_Core.browser=LL_BR_Core.DetectBrowser());var a=window.LL_Deployment&&LL_Deployment.acbMacMode,o=LL_BR_Core.browser,n="none";return("GROUP1"==r||"GROUP2"==r||"GROUP3"==r)&&("Windows"==o.OS?("Chrome"==o.BrowserName||"MSIE"==o.BrowserName||"Firefox"==o.BrowserName)&&(n=e):"Mac OS X"==o.OS&&(0>o.OSVersion.indexOf("10.9")||a)&&("Chrome"==o.BrowserName||"Safari"==o.BrowserName&&o.BrowserVersion>="5.5")&&(n=e),"none"==n&&"GROUP2"==r&&("Windows"==o.OS||"Mac OS X"==o.OS)&&(n=e)),window.LL_Log&&n!=e&&LL_Log.event("Message","LL_BR_Core.IsLTBSupported","Restricted ACB("+r+") mode"),n},this.IsACBSupported=function(){LL_BR_Core.browser||(LL_BR_Core.browser=LL_BR_Core.DetectBrowser());var e=LL_BR_Core.browser,r="none";if("Windows"!=e.OS||"Vista"!=e.OSVersion&&"7"!=e.OSVersion&&"8"!=e.OSVersion&&"8.1"!=e.OSVersion||("MSIE"==e.BrowserName&&window.LL_Deployment&&LL_Deployment.acbNetMode?r=".net":window.LL_Deployment&&LL_Deployment.acbWinMode&&(r="win")),"Safari"==e.BrowserName&&"Windows"==e.OS)return LL_BR_Core.IsLTBSupported(r);if("Opera"==e.BrowserName&&"Windows"==e.OS)return"none";if(window.LL_Deployment&&LL_Deployment.acbNetMode){if("MSIE"==e.BrowserName&&e.NetVersion>="2.0")return LL_BR_Core.IsLTBSupported(".net");if("Chrome"==e.BrowserName&&"Windows"==e.OS){var a=0;if(window.clientInformation&&window.clientInformation.plugins)for(var o=0;clientInformation.plugins.length>o;o++)"ClickOnce plugin for Chrome"==clientInformation.plugins[o].name&&(a=1);if(1==a)return LL_BR_Core.IsLTBSupported(".net")}if("Firefox"==e.BrowserName&&e.NetVersion>="2.0")return LL_BR_Core.IsLTBSupported(".net")}if(".net"==r)return LL_BR_Core.IsLTBSupported(r);if(-1!=e.OS.indexOf("Mac OS")&&e.OSVersion&&window.LL_Deployment&&LL_Deployment.acbMacMode&&e.OSVersion){var n;n=LL_Deployment.Mac_ACB_OS_Versions&&LL_Deployment.Mac_ACB_OS_Versions.length>0?LL_Deployment.Mac_ACB_OS_Versions.split(","):[];for(var t=!0,o=0;n.length>o;o++)if(0==n[o].indexOf("!")){var i=n[o].replace(/^\D+/g,"");if(-1!=e.OSVersion.indexOf(i)){t=!1;break}}if(t)for(var o=0;n.length>o;o++){if(n[o].indexOf("+")>-1){var i=n[o].replace("+","");if(LL_BR_Core.hasRequiredVersion(i,LL_BR_Core.browser.OSVersion))return LL_BR_Core.IsLTBSupported("mac");break}if(-1==n[o].indexOf("!")&&-1!=e.OSVersion.indexOf(n[o]))return LL_BR_Core.IsLTBSupported("mac")}}if(1==navigator.javaEnabled()){var s="",l="1.5",p=deployJava.getJREs(),d=p.length;if(d)for(var o=0;d>o;o++){var v=p[o],u=!l||l&&""+v>""+l;u&&""+v>""+s&&(s=v)}if(s)return window.LL_Deployment&&LL_Deployment.unsupportedJavaVersions?0>LL_Deployment.unsupportedJavaVersions.indexOf(s)?LL_BR_Core.IsLTBSupported("java"):LL_BR_Core.IsLTBSupported(r):LL_BR_Core.IsLTBSupported("java")}return LL_BR_Core.IsLTBSupported(r)},this.DetectBrowser=function(){var e=navigator.userAgent.toLowerCase(),r={};if(r.OS="",r.OSVersion="",r.BrowserName="",r.BrowserVersion="",r.NetVersion="",r.WebSocket=!1,r.PostMessage=!1,r.LocalStorage=!1,/windows/i.test(e)?r.OS="Windows":/mac os x/i.test(e)?r.OS="Mac OS X":/mac/i.test(e)?r.OS="Mac OS":/linux/i.test(e)&&(r.OS="Linux"),"Windows"==r.OS)/windows nt.+\sarm\;/i.test(e)?r.OSVersion="RT":/windows nt[\/\s](\d+\.\d+)/i.test(e)&&("6.0"==RegExp.$1?r.OSVersion="Vista":"6.1"==RegExp.$1?r.OSVersion="7":"6.2"==RegExp.$1?r.OSVersion="8":"6.3"==RegExp.$1&&(r.OSVersion="8.1"));else if("Mac OS X"==r.OS){/mac os x[\/\s](\d+_\d+_\d+)/i.test(e)||/mac os x[\/\s](\d+_\d+)/i.test(e)?r.OSVersion=(""+RegExp.$1).replace(/_/g,"."):/mac os x[\/\s](\d+\.\d+\.\d+)/i.test(e)||/mac os x[\/\s](\d+\.\d+)/i.test(e)?r.OSVersion=RegExp.$1:/cpu os[\/\s](\d+_\d+)/i.test(e)?(r.OS="IOS",r.OSVersion=(""+RegExp.$1).replace(/_/g,".")):/cpu iphone os[\/\s](\d+_\d+)/i.test(e)&&(r.OS="IOS",r.OSVersion=(""+RegExp.$1).replace(/_/g,"."));var a=r.OSVersion.split(".");a.length>1&&(r.OSVersion=a[0]+"."+a[1])}if(/firefox[\/\s](\d+\.\d+)/i.test(e))r.BrowserName="Firefox",r.BrowserVersion=""+RegExp.$1;else if(/msie[\/\s](\d+\.\d+)/i.test(e)){r.BrowserName="MSIE";var o=/*@cc_on function () {
                switch (@_jscript_version) {
                    case 1.0: return 3.0;
                    case 3.0: return 4.0;
                    case 5.0: return 5.0;
                    case 5.1: return 5.0;
                    case 5.5: return 5.5;
                    case 5.6: return 6.0;
                    case 5.7: return (window.XMLHttpRequest ? 7.0 : 6.0);
                    case 5.8: return 8.0;
                    case 9: return 9.0;
                    case 10: return 10.0;
                    default: return @_jscript_version;
                }
            } () || @*/
0;r.BrowserVersion=o.toFixed(1)}else/trident\/7.0/i.test(e)?(r.BrowserName="MSIE",r.BrowserVersion="11.0"):/opera/i.test(e)&&/version[\/\s](\d+\.\d+)/i.test(e)?(r.BrowserName="Opera",r.BrowserVersion=""+RegExp.$1):/chrome/i.test(e)&&/opr[\/\s](\d+\.\d+)/i.test(e)?(r.BrowserName="Opera",r.BrowserVersion=""+RegExp.$1):/chrome[\/\s](\d+\.\d+)/i.test(e)?(r.BrowserName="Chrome",r.BrowserVersion=""+RegExp.$1):/crios[\/\s](\d+\.\d+)/i.test(e)?(r.BrowserName="Chrome",r.BrowserVersion=""+RegExp.$1):/safari[\/\s](\d+\.\d+)/i.test(e)?(r.BrowserName="Safari",r.BrowserVersion=""+RegExp.$1,/version[\/\s](\d+\.\d+)/i.test(e)&&(r.BrowserVersion=""+RegExp.$1)):("Mac OS"==r.OS||"Mac OS X"==r.OS||"IOS"==r.OS)&&/version[\/\s](\d+\.\d+)/i.test(e)&&(r.BrowserName="Safari",r.BrowserVersion=""+RegExp.$1);if("Windows"==r.OS&&"RT"!=r.OSVersion){var n=e.match(/\.net(\d+\.\d+)|\.net\sclr\s(\d+\.\d+)/g);if(n){for(var t=0;n.length>t;t++)n[t]=n[t].replace(/\.net\sclr\s/,"").replace(/\.net/,"");n.sort(),r.NetVersion=n[n.length-1]}}return r.WebSocket="WebSocket"in window,r.PostMessage="postMessage"in window,r.LocalStorage="localStorage"in window,r}},LL_Flash_Detector={getControlVersion:function(){var e,r;try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),e=r.GetVariable("$version")}catch(a){}if(!e)try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),e="WIN 6,0,21,0",r.AllowScriptAccess="always",e=r.GetVariable("$version")}catch(a){}if(!e)try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),e=r.GetVariable("$version")}catch(a){}if(!e)try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),e="WIN 3,0,18,0"}catch(a){}if(!e)try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),e="WIN 2,0,0,11"}catch(a){e=-1}return e},getFlashVersion:function(){var e=-1,r=navigator.userAgent?navigator.userAgent.toLowerCase():"";if(null!=navigator.plugins&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var a=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"",o=navigator.plugins["Shockwave Flash"+a].description,n=o.split(" "),t=n[2].split("."),i=t[0],s=t[1],l=n[3];""==l&&(l=n[4]),"d"==l[0]?l=l.substring(1):"r"==l[0]&&(l=l.substring(1),l.indexOf("d")>0&&(l=l.substring(0,l.indexOf("d"))));var e=i+"."+s+"."+l}}else if(-1!=r.indexOf("webtv/2.6"))e=4;else if(-1!=r.indexOf("webtv/2.5"))e=3;else if(-1!=r.indexOf("webtv"))e=2;else{var p=-1!=navigator.appVersion.indexOf("MSIE")||-1!=navigator.userAgent.indexOf("Trident"),d=-1!=navigator.appVersion.toLowerCase().indexOf("win")?!0:!1,v=-1!=r.indexOf("opera")?!0:!1;p&&d&&!v&&(e=LL_Flash_Detector.getControlVersion())}if(e&&"-1"!=e){e=(""+e).replace("WIN",""),e=e.replace(/\,/g,"."),e=e.replace(/^\s+|\s+$/g,"");var u=e.split(".");e=1==u.length?u[0]+".0":u[0]+"."+u[1]}else e=null;return e}},deployJava={debug:null,firefoxJavaVersion:null,myInterval:null,preInstallJREList:null,returnPage:null,brand:null,locale:null,installType:null,EAInstallEnabled:!1,EarlyAccessURL:null,oldMimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",mimeType:"application/java-deployment-toolkit",browserName:null,browserName2:null,getJREs:function(){var e=[];if(deployJava.isPluginInstalled())for(var r=deployJava.getPlugin(),a=r.jvms,o=0;a.getLength()>o;o++)e[o]=a.get(o).version;else{var n=deployJava.getBrowser();"MSIE"==n?deployJava.testUsingActiveX("1.7.0")?e[0]="1.7.0":deployJava.testUsingActiveX("1.6.0")?e[0]="1.6.0":deployJava.testUsingActiveX("1.5.0")?e[0]="1.5.0":deployJava.testUsingActiveX("1.4.2")?e[0]="1.4.2":deployJava.testForMSVM()&&(e[0]="1.1"):"Netscape Family"==n&&(deployJava.getJPIVersionUsingMimeType(),null!=deployJava.firefoxJavaVersion?e[0]=deployJava.firefoxJavaVersion:deployJava.testUsingMimeTypes("1.7")?e[0]="1.7.0":deployJava.testUsingMimeTypes("1.6")?e[0]="1.6.0":deployJava.testUsingMimeTypes("1.5")?e[0]="1.5.0":deployJava.testUsingMimeTypes("1.4.2")?e[0]="1.4.2":"Safari"==deployJava.browserName2&&(deployJava.testUsingPluginsArray("1.7.0")?e[0]="1.7.0":deployJava.testUsingPluginsArray("1.6")?e[0]="1.6.0":deployJava.testUsingPluginsArray("1.5")?e[0]="1.5.0":deployJava.testUsingPluginsArray("1.4.2")&&(e[0]="1.4.2")))}if(deployJava.debug)for(var o=0;e.length>o;++o)alert("We claim to have detected Java SE "+e[o]);return e},versionCheck:function(e){var r=0,a="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$",o=e.match(a);if(null!=o){for(var n=!0,t=[],i=1;o.length>i;++i)"string"==typeof o[i]&&""!=o[i]&&(t[r]=o[i],r++);"+"==t[t.length-1]?(n=!1,t.length--):"*"==t[t.length-1]&&t.length--;for(var s=deployJava.getJREs(),i=0;s.length>i;++i)if(deployJava.compareVersionToPattern(s[i],t,n))return!0;return!1}return alert("Invalid versionPattern passed to versionCheck: "+e),!1},isWebStartInstalled:function(e){var r=deployJava.getBrowser();if("?"==r||"Safari"==deployJava.browserName2)return!0;("undefined"==e||null==e)&&(e="1.4.2");var a=!1,o="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$",n=e.match(o);return null!=n?a=deployJava.versionCheck(e+"+"):(deployJava.debug&&alert("Invalid minimumVersion argument to isWebStartInstalled(): "+e),a=deployJava.versionCheck("1.4.2+")),a},getJPIVersionUsingMimeType:function(){for(var e=0;navigator.mimeTypes.length>e;++e){var r=navigator.mimeTypes[e].type,a=r.match(/^application\/x-java-applet;jpi-version=(.*)$/);if(null!=a){deployJava.firefoxJavaVersion=a[1];break}}},isPluginInstalled:function(){var e=deployJava.getPlugin();return e&&e.jvms?!0:!1},isAutoUpdateEnabled:function(){return deployJava.isPluginInstalled()?deployJava.getPlugin().isAutoUpdateEnabled():!1},setEarlyAccess:function(e){deployJava.EAInstallEnabled=e},isPlugin2:function(){if(deployJava.isPluginInstalled()&&deployJava.versionCheck("1.6.0_10+"))try{return deployJava.getPlugin().isPlugin2()}catch(e){}return!1},allowPlugin:function(){deployJava.getBrowser();var e="Chrome"!=deployJava.browserName2&&"Safari"!=deployJava.browserName2&&"Opera"!=deployJava.browserName2;return e},getPlugin:function(){deployJava.refresh();var e=null;return deployJava.allowPlugin()&&(e=document.getElementById("deployJavaPlugin")),e},compareVersionToPattern:function(e,r,a){var o="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$",n=e.match(o);if(null!=n){for(var t=0,i=[],s=1;n.length>s;++s)"string"==typeof n[s]&&""!=n[s]&&(i[t]=n[s],t++);var l=Math.min(i.length,r.length);if(a){for(var s=0;l>s;++s)if(i[s]!=r[s])return!1;return!0}for(var s=0;l>s;++s){if(i[s]<r[s])return!1;if(i[s]>r[s])return!0}return!0}return!1},getBrowser:function(){if(null==deployJava.browserName){var e=navigator.userAgent.toLowerCase();deployJava.debug&&alert("userAgent -> "+e),-1!=e.indexOf("msie")||-1!=e.indexOf("trident")?(deployJava.browserName="MSIE",deployJava.browserName2="MSIE"):-1!=e.indexOf("firefox")?(deployJava.browserName="Netscape Family",deployJava.browserName2="Firefox"):-1!=e.indexOf("chrome")?(deployJava.browserName="Netscape Family",deployJava.browserName2="Chrome"):-1!=e.indexOf("safari")?(deployJava.browserName="Netscape Family",deployJava.browserName2="Safari"):-1!=e.indexOf("mozilla")?(deployJava.browserName="Netscape Family",deployJava.browserName2="Other"):-1!=e.indexOf("opera")?(deployJava.browserName="Netscape Family",deployJava.browserName2="Opera"):(deployJava.browserName="?",deployJava.browserName2="unknown"),deployJava.debug&&alert("Detected browser name:"+deployJava.browserName+", "+deployJava.browserName2)}return deployJava.browserName},testUsingActiveX:function(e){var r="JavaWebStart.isInstalled."+e+".0";if(!(ActiveXObject||"ActiveXObject"in window))return deployJava.debug&&alert("Browser claims to be IE, but no ActiveXObject object?"),!1;try{return null!=new ActiveXObject(r)}catch(a){return!1}},testForMSVM:function(){var e="{08B0E5C0-4FCB-11CF-AAA5-00401C608500}";if("undefined"!=typeof oClientCaps){var r=oClientCaps.getComponentVersion(e,"ComponentID");return""==r||"5,0,5000,0"==r?!1:!0}return!1},testUsingMimeTypes:function(e){if(!navigator.mimeTypes)return deployJava.debug&&alert("Browser claims to be Netscape family, but no mimeTypes[] array?"),!1;for(var r=0;navigator.mimeTypes.length>r;++r){s=navigator.mimeTypes[r].type;var a=s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);if(null!=a&&deployJava.compareVersions(a[1],e))return!0}return!1},testUsingPluginsArray:function(e){if(!navigator.plugins||!navigator.plugins.length)return!1;for(var r=navigator.platform.toLowerCase(),a=0;navigator.plugins.length>a;++a)if(s=navigator.plugins[a].description,-1!=s.search(/^Java Switchable Plug-in (Cocoa)/)){if(deployJava.compareVersions("1.5.0",e))return!0}else if(-1!=s.search(/^Java/)&&-1!=r.indexOf("win")&&(deployJava.compareVersions("1.5.0",e)||deployJava.compareVersions("1.6.0",e)))return!0;return deployJava.compareVersions("1.5.0",e)?!0:!1},done:function(){},compareVersions:function(e,r){for(var a=e.split("."),o=r.split("."),n=0;a.length>n;++n)a[n]=Number(a[n]);for(var n=0;o.length>n;++n)o[n]=Number(o[n]);return 2==a.length&&(a[2]=0),a[0]>o[0]?!0:a[0]<o[0]?!1:a[1]>o[1]?!0:a[1]<o[1]?!1:a[2]>o[2]?!0:a[2]<o[2]?!1:!0},enableAlerts:function(){deployJava.browserName=null,deployJava.debug=!0},poll:function(){deployJava.refresh();var e=deployJava.getJREs();0==deployJava.preInstallJREList.length&&0!=e.length&&(clearInterval(deployJava.myInterval),null!=deployJava.returnPage&&(location.href=deployJava.returnPage)),0!=deployJava.preInstallJREList.length&&0!=e.length&&deployJava.preInstallJREList[0]!=e[0]&&(clearInterval(deployJava.myInterval),null!=deployJava.returnPage&&(location.href=deployJava.returnPage))},writePluginTag:function(){},refresh:function(){navigator.plugins.refresh(!1);var e=deployJava.getBrowser();if("Netscape Family"==e&&deployJava.allowPlugin()){var r=document.getElementById("deployJavaPlugin");null==r&&deployJava.writeEmbedTag()}},writeEmbedTag:function(){},do_initialize:function(){if(deployJava.writePluginTag(),null==deployJava.locale){var e=null;if(null==e)try{e=navigator.userLanguage}catch(r){}if(null==e)try{e=navigator.systemLanguage}catch(r){}if(null==e)try{e=navigator.language}catch(r){}null!=e&&(e.replace("-","_"),deployJava.locale=e)}}};deployJava.do_initialize(),LL_BR_Core.Init();if (window.LL_CustomUI && !LL_CustomUI.commonFunctions) {
    LL_CustomUI.commonFunctions = { };
    // Printing positioning values depending on passed parameters

    LL_CustomUI.commonFunctions.stopEvent = function (evt) {
        if (!evt)
            return;
        if (evt.preventDefault) evt.preventDefault();
        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.stopImmediatePropagation) evt.stopImmediatePropagation();
        evt.cancelBubble = true;
        evt.returnValue = false;
    };

    LL_CustomUI.commonFunctions.doFocus = function (control) {
        try {
            //thanks to IE8
            document.getElementById(control).focus();
        }
        catch (e) { }
    };

    LL_CustomUI.commonFunctions.globalMouseOverHandler = function (evt) {
        if (!evt) return;
        var obj = evt.target || event.srcElement;
        var controlID = obj ? obj.id : "";
        if (controlID == "V4LLPanel_CloseDeclineButton") {
            LL_CustomUI.V4Panel.toggleConfirmNoBtn(true);
        }
        else if (controlID == "V4LLPanel_CloseConfirmButton") {
            LL_CustomUI.V4Panel.toggleConfirmYesBtn(true);
        }
    }

    LL_CustomUI.commonFunctions.toggleADA_State = function (nodeList, action) {
        if (!nodeList || !action)
            return;
        var nodes = nodeList.split(',');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i].replace(/\s/g, '');
            if (node) {
                var nodeElem = document.getElementById(node);
                if (!nodeElem)
                    continue;
                if (action.toLowerCase() == "disable") {
                    nodeElem.setAttribute("disabled", "disabled");
                    nodeElem.setAttribute("aria-hidden", "true");
                }
                else if (action.toLowerCase() == "enable") {
                    nodeElem.setAttribute("disabled", "");
                    try {
                        nodeElem.removeAttribute("disabled");
                    }
                    catch (e) { }
                    nodeElem.disabled = false;
                    nodeElem.setAttribute("aria-hidden", "false");
                }
            }
        }
    }

    LL_CustomUI.commonFunctions.globalKeyHandler = function (evt) {
        if (!evt) return;
        var isParentTCWindow = function (targetNode) {
            if (targetNode) {
                var targetParent = targetNode.parentNode;
                if (targetParent && targetParent.id == "V4LLPanel_LogoToggler") {
                    targetParent = targetParent.parentNode;
                    if (targetParent && targetParent.id == "V4LLPanel_MovingToggler") {
                        targetParent = targetParent.parentNode;
                        if (targetParent && targetParent.id == "V4LLPanel_InnerContainer") {
                            targetParent = targetParent.parentNode;
                            return targetParent && targetParent.id == "V4LLTermsAndConditionsWindow";
                        }
                    }
                }
            }

            return false;
        }

        var obj = evt.target || event.srcElement;
        if (!obj)
            return;
        var controlID = obj ? obj.id : "";
        var keynum = window.event ? evt.keyCode : evt.which;
        var stopEvent = false;
        if (obj && obj.disabled) {
            //disable any events on disabled elements
            stopEvent = true;
        }
        else if (keynum == 10 || keynum == 13 || keynum == 32) {
            //JAWS disables Enter on some links - adding space just in case
            if (controlID == "V4LLPanel_InnerTitle" || controlID == "V4LLPanel_CollapsedNumContNarrow" || controlID == "V4LLPanel_CollapsedNarrowNoAgent") {
                if (!LL_CustomUI.V4Panel.isOpen)
                    LL_CustomUI.V4Panel.expand();
                stopEvent = true;
            }
            else if (controlID == "V4LLPanel_PanelMinimize") {
                stopEvent = true;
                var ignore = LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen || (LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow") && LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow").style.display == "block") || (LL_CustomUI.$("V4LLPanelDisconnectConfirmWindowTC") && LL_CustomUI.$("V4LLPanelDisconnectConfirmWindowTC").style.display == "block");
                if (!ignore) {
                    var isTC_window = LL_CustomUI.termsAndConditionsWindow && LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && isParentTCWindow(evt.target || event.srcElement);
                    if (isTC_window)
                        LL_CustomUI.termsAndConditionsWindow.collapse();
                    else
                        LL_CustomUI.V4Panel.collapse();
                }

            }
            else if (controlID == "V4LLPanel_PanelClose") {
                stopEvent = true;
                var ignore = LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen || (LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow") && LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow").style.display == "block") || (LL_CustomUI.$("V4LLPanelDisconnectConfirmWindowTC") && LL_CustomUI.$("V4LLPanelDisconnectConfirmWindowTC").style.display == "block");
                if (!ignore) {
                    if (LL_CustomUI.V4PanelState == "new") {
                        var isTC_window = LL_CustomUI.termsAndConditionsWindow && LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && isParentTCWindow(evt.target || event.srcElement);
                        if (isTC_window)
                            //T&C window
                            LL_CustomUI.termsAndConditionsWindow.openDisconnectConfirmWindow();
                        else if (window.LL_BR_Core && (!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported == "none"))
                            //service not supported window
                            LL_CustomUI.V4Panel.collapse();
                        else
                            //generic V4 Panel
                            LL_CustomUI.V4Panel.openDisconnectConfirmWindow();
                    }
                    else {
                        LL_CustomUI.V4Panel.collapse();
                    }
                }
            }
            else if (controlID == "V4LLPanel_CloseDeclineButtonTC") {
                stopEvent = true;
                LL_CustomUI.termsAndConditionsWindow.declineSessionEnd();
            }
            else if (controlID == "V4LLPanel_CloseConfirmButtonTC") {
                stopEvent = true;
                LL_CustomUI.termsAndConditionsWindow.confirmSessionEnd();
            }
            else if (controlID == "V4LLPanel_CloseDeclineButton") {
                stopEvent = true;
                LL_CustomUI.V4Panel.declineSessionEnd();
            }
            else if (controlID == "V4LLPanel_CloseConfirmButton") {
                stopEvent = true;
                LL_CustomUI.V4Panel.confirmSessionEnd();
            }
            else if (controlID == "LL_sessionEnded_cancel") {
                stopEvent = true;
                LL_CustomUI.SessionEndedPopup.hide();
            }
            else if (controlID == "V4LLPanel_DisconnectTrigger") {
                stopEvent = true;
                LL_CustomUI.V4Panel.doDisconnect();
            }
            else if (controlID == "redirect_cancel") {
                stopEvent = true;
                LL_CustomUI.RedirectPopup.hide();
            }
        }
        else if (keynum == 27) {
            if (LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen) {
                stopEvent = true;
                LL_CustomUI.V4Panel.declineSessionEnd();
            }
            else if (LL_CustomUI.termsAndConditionsWindow.isDisconnectConfirmWindowOpen) {
                stopEvent = true;
                LL_CustomUI.termsAndConditionsWindow.declineSessionEnd();
            }
        }

        if (stopEvent) {
            LL_CustomUI.commonFunctions.stopEvent(evt);
            return false;
        }
    }

    LL_CustomUI.commonFunctions.removeNodes = function (nodeList) {
        if (!nodeList)
            return;
        var nodes = nodeList.split(',');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i].replace(/\s/g, '');
            if (node) {
                var nodeElem = document.getElementById(node);
                if (nodeElem && nodeElem.parentNode)
                    nodeElem.parentNode.removeChild(nodeElem);
            }

        }
    };
    LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition = function (positionValue, offset, isHint) {
        var finalPosition = "";
        var bottom = "bottom: 0;";
        if(isHint == "true") {
            bottom = "bottom: 30px;";
        }
        switch (positionValue)
        {
            case "bottom_right":
                if (offset == "")
                {
                    finalPosition = bottom + " right: 0;";
                }
                else
                {
                    finalPosition = bottom + " right:" + offset + "px;";
                }
                break;
            case "top_left":
                if (offset == "") {
                    finalPosition = "top: 0; left: 0;";
                } else {
                    finalPosition = "top: 0; left:" + offset + "px;";
                }
                break;
            case "top_middle":
                finalPosition = "top: 0;";
                break;
            case "right_middle":
                finalPosition = "right: 0;";
                break;
            case "top_right":
                if (offset == "") {
                    finalPosition = "top: 0; right: 0;";
                } else {
                    finalPosition = "top: 0; right:" + offset + "px;";
                }
                break;
            case "bottom_left":
                if (offset == "") {
                    finalPosition = bottom + " left: 0;";
                } else {
                    finalPosition = bottom + " left:" + offset + "px;";
                }
                break;
            case "bottom_middle":
                finalPosition = bottom;
                break;
            case "left_middle":
                finalPosition = "left: 0;";
                break;
        }

        return finalPosition;
    };

    LL_CustomUI.commonFunctions.isQuirksMode = function() {
        return (LL_CustomUI.commonFunctions.isIELower10() && document.compatMode.toLowerCase() == "backcompat");
    };

    LL_CustomUI.commonFunctions.isIELower10 = function() {
        return (navigator.appName.toLowerCase() == "microsoft internet explorer" && LL_CustomUI.commonFunctions.getInternetExplorerVersion() < 10.0);
    };

    LL_CustomUI.commonFunctions.isIE6 = function() {
        return (navigator.appName.toLowerCase() == "microsoft internet explorer" && parseFloat(navigator.appVersion) < 7.0);
    };

    LL_CustomUI.commonFunctions.isAnyIE = function() {
        //return (navigator.appName.toLowerCase() == "microsoft internet explorer");
        return LL_CustomUI.commonFunctions.getInternetExplorerVersion() > 0; //in IE11 navigator.appName is Netscape!!!
    };

    LL_CustomUI.commonFunctions.isSafari = function() {
        return /^((?!chrome).)*safari/i.test(navigator.userAgent);
    };

    LL_CustomUI.commonFunctions.isBottomLocation = function() {
        var windowPosition = LL_CustomUI.V4LLPanel_position;
        return (windowPosition == "bottom_right" || windowPosition == "bottom_left" || "bottom_middle");
    }

    // Left location
    LL_CustomUI.commonFunctions.isLeftLocation = function() {
        var windowPosition = LL_CustomUI.V4LLPanel_position;
        return (windowPosition == "left_middle");
    }

    // Right location
    LL_CustomUI.commonFunctions.isRightLocation = function() {
        var windowPosition = LL_CustomUI.V4LLPanel_position;
        return (windowPosition == "right_middle");
    }

    // Getting an element with passed ID
    LL_CustomUI.$ = function(id) {
        return document.getElementById(id);
    };

    // Getting element size
    LL_CustomUI.commonFunctions.getElementSize = function (element) {
        var originElement = LL_CustomUI.$(element);
        var elementHeight = originElement ? originElement.offsetHeight : 0;
        var elementWidth = originElement ? originElement.offsetWidth : 0;
        return {
            "elementHeight": elementHeight,
            "elementWidth": elementWidth
        }
    };

    LL_CustomUI.commonFunctions.getDocHeight = function () {
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );
    };

    LL_CustomUI.commonFunctions.GetScrollPosition = function () {
        if (!document || !document.body)
            return 0;
        var ScrollTop = document.body.scrollTop;
        if (ScrollTop == 0) {
            if (window.pageYOffset) {
                ScrollTop = window.pageYOffset;
            } else {
                ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
            }
        }
        return ScrollTop;
    };

    // Returns the version of Internet Explorer or a -1
    LL_CustomUI.commonFunctions.getInternetExplorerVersion = function() {
        var rv = -1; 
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.userAgent.indexOf('Trident/7.0') > -1)
            rv = 11;
        return rv;
    },

    LL_CustomUI.commonFunctions.getViewport = function() {

        var viewPortWidth;
        var viewPortHeight;

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
        }

        // older versions of IE
        else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
        }
        return [viewPortWidth, viewPortHeight];
    }

    // Adjusting the window position if in old browser and compatibility mode
    LL_CustomUI.commonFunctions.setPositionOnScroll = function (el, offset, position) {
        var elem = LL_CustomUI.$(el);
        if (!elem)
            return;

        var docDimensions = LL_CustomUI.commonFunctions.getViewport(),
        docHeight = docDimensions[1],
        elDimensions = LL_CustomUI.commonFunctions.getElementSize(el),
        elHeight = elDimensions.elementHeight,
        scrollPosition = LL_CustomUI.commonFunctions.GetScrollPosition();

        if(position == "right_middle" || position == "left_middle") {
            elem.style.top = (docHeight / 2 - elHeight / 2 + scrollPosition - offset) + "px";
        } else {
            elem.style.top = (docHeight - elHeight + scrollPosition - offset) + "px";
        }

    };

    // Setting element in the middle of the window
    LL_CustomUI.commonFunctions.setElementInTheMiddle = function (el, position, windowHeight) {
        var element = LL_CustomUI.$(el);
        var elementSize = LL_CustomUI.commonFunctions.getElementSize(el);
        var elementWidth = elementSize.elementWidth;
        var elementHeight = elementSize.elementHeight;
        var documentWidth = document.body.clientWidth;
        var documentViewPortDimensions = LL_CustomUI.commonFunctions.getViewport();
        var documentHeight = documentViewPortDimensions[1];

        if (position.indexOf("top") >= 0 || position.indexOf("bottom") >= 0) {
            element.style.left = (documentWidth - elementWidth) / 2 + "px";
        } else {
            if (el == "V4LLPanel" && window.LL_CustomUI.V4PanelState && window.LL_CustomUI.V4PanelState == "new") {
                if(window.LL_BR_Core && (!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported == "none")) {
                    element.style.top = (documentHeight - LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight) / 2 + "px";
                } else {
                    element.style.top = (documentHeight - LL_CustomUI.V4Panel.numberGenerationWindowHeight) / 2 + "px";
                }
            } else if(window.LL_CustomUI.V4PanelState && window.LL_CustomUI.V4PanelState != "new") {
                element.style.top = (documentHeight - LL_CustomUI.V4Panel.agentConnectedWindowHeight) / 2 + "px";
            } else if (el == "V4LLTermsAndConditionsWindow") {
            	element.style.top = (documentHeight - LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowHeight) / 2 + "px";
            } else {
                element.style.top = (documentHeight - elementHeight) / 2 + "px";
            }
        }
    };

    LL_CustomUI.commonFunctions.listen = function (evnt, elem, func) {
        if (typeof elem === "string") {
            var els = elem.split(',');
            for (var i = 0; i < els.length; i++) {
                var el = document.getElementById(els[i].replace(/\s/g, ''));
                if (el)
                    LL_CustomUI.commonFunctions.listen(evnt, el, func);
            }

            return;
        }
        else {
            if (elem.addEventListener)  // W3C DOM
                elem.addEventListener(evnt, func, false);
            else if (elem.attachEvent) { // IE DOM
                elem.attachEvent("on" + evnt, func);
                if (elem === window) { //IE8 compatibility
                    if (elem.document) {
                        elem.document.attachEvent("on" + evnt, func);
                        if (elem.document.body)
                            elem.document.body.attachEvent("on" + evnt, func);
                    }
                }
                else if (elem === window.document) {
                    if (elem.body)
                        elem.body.attachEvent("on" + evnt, func);
                }
            }
            else { // Not much to do
                elem[evnt] = func;
            }
        }
    };

    LL_CustomUI.commonFunctions.removeListener = function (evnt, elem, func) {
        if (typeof elem === "string") {
            var els = elem.split(',');
            for (var i = 0; i < els.length; i++) {
                var el = document.getElementById(els[i].replace(/\s/g, ''));
                if (el)
                    LL_CustomUI.commonFunctions.removeListener(evnt, el, func);
            }

            return;
        }
        else {
            try {
                if (elem.removeEventListener) {// W3C DOM
                    elem.removeEventListener(evnt, func, true);
                }
                else if (elem.detachEvent) { // IE DOM
                    elem.detachEvent("on" + evnt, func);
                    if (elem === window) { //IE8 compatibility
                        if (elem.document) {
                            elem.document.detachEvent("on" + evnt, func);
                            if (elem.document.body)
                                elem.document.body.detachEvent("on" + evnt, func);
                        }
                    }
                    else if (elem === window.document) {
                        if (elem.body)
                            elem.body.detachEvent("on" + evnt, func);
                    }

                } else {
                    elem["on" + evnt] = null;
                }
            }
            catch (e) {
            }
        }
    };

    LL_CustomUI.commonFunctions.Timeout = function(fn, interval) {
        var id = setTimeout(fn, interval);
        this.cleared = false;
        this.clear = function () {
            this.cleared = true;
            clearTimeout(id);
        };
    };

    LL_CustomUI.commonFunctions.preloadImages = function () {
        var reg = (/\/framework\/v4\/resources\/images\/V4LLPanel\/|\/company\/.+\.(gif|jpg|jpeg|tiff|png)$/i);
        for (prop in LL_CustomUI) {
            try {
                if (typeof LL_CustomUI[prop] == "string" && reg.test(LL_CustomUI[prop])) {
                    var img = new Image();
                    img.src = LL_CustomUI.img(LL_CustomUI[prop]);
                }
            }
            catch (ex) { }
        }
    };

    if (!LL_CustomUI.commonFunctions.ADA) {

        LL_CustomUI.commonFunctions.ADA = {};

        LL_CustomUI.commonFunctions.ADA.ADA_Compliance = LL_CustomUI.ADA_compliance == "true";
        LL_CustomUI.commonFunctions.ADA.border_color = 'Gray';
        LL_CustomUI.commonFunctions.ADA.elementIDs = [ 'V4LLPanel_PanelMinimize','V4LLPanel_PanelClose','V4LLPanel_CollapsedNumContNarrow','V4LLPanel_TermsAndConditions','V4LLPanel_DisconnectTrigger','V4LLPanel_moreInfoLink','redirect_accept','LL_Feedback_Button','LL_CloseModal_Link','V4LLPanel_CloseDeclineButtonTC','V4LLPanel_CloseConfirmButtonTC','V4LLPanel_StartSessionNow','V4LLPanel_CollapsedNarrowNoAgent','V4LLPanel_GenericToggler','V4LLPanel_InnerTitle'];
        LL_CustomUI.commonFunctions.ADA.BOAelementIDs = ['V4LLPanel_CloseDeclineButton', 'V4LLPanel_CloseConfirmButton'];
        LL_CustomUI.commonFunctions.ADA.CreateStyleForFocus = function () {
            if (!LL_CustomUI.commonFunctions.ADA.ADA_Compliance)
                return;
            else if (document.getElementById("LL_idForStyle"))
                return;
            else if (!LL_CustomUI.commonFunctions.isAnyIE())
                return;

            var style = document.createElement('style');
            style.type = 'text/css';
            style.setAttribute("id", "LL_idForStyle");

            var css = "";
            for (var i = 0; i < this.elementIDs.length; i++) {
                css += "#" + this.elementIDs[i] + ":focus{border: 0.5px solid " + this.border_color + "}\r\n ";
            }
            for (var i = 0; i < this.BOAelementIDs.length; i++) {
                css += "#" + this.BOAelementIDs[i] + ":focus{border: .5px solid black}\r\n ";
            }

            try {
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }

                document.getElementsByTagName('head')[0].appendChild(style);
            }
            catch (e) { }
        };
   }
    
}

if (window.LL_CustomUI && !LL_CustomUI.img) {
    LL_CustomUI.img = function (url) {
        var retUrl = url ? url.toLowerCase() : "";
        if (!retUrl || retUrl.indexOf("//") == 0 || retUrl.indexOf("http:") == 0 || retUrl.indexOf("https:") == 0)
            return retUrl;

        retUrl = retUrl.replace(/\/\//g, '/');
        return "https://" + LL_Deployment.mainServerPath + (retUrl.indexOf('/') == 0 ? '' : '/') + retUrl;
    }
}


if (!window.LL_Frames) 
    LL_Frames = { };

LL_Frames.frameUrl = '';
LL_Frames.frameOverflow_body = '';
LL_Frames.frameOverflow_html = '';
LL_Frames.frameEmbed = function (frameID, url, blockWidth, blockHeight, customRules) {

    //added IE6, IE7, IE8 compatibility
    var frm = document.getElementById(frameID);

    var isScrollable = false;
    var isTransparent = true;
    var isCancellable = false;

    if (customRules) {
        isScrollable = customRules.isScrollable;
        isTransparent = customRules.isTransparent;
        isCancellable = customRules.isCancellable;
    }

    if (frm && frm.style.display == "block" && LL_Frames.frameUrl == url) {
        //already embedded and shown
        return;
    }

    var innerHeight = window.innerHeight;
    var innerWidth = window.innerWidth;
    if (!innerWidth) {
        //IE
        if (!(document.documentElement.clientWidth == 0))
            innerWidth = document.documentElement.clientWidth;
        else //quirks mode
            innerWidth = document.body.clientWidth;
    }
    if (!innerHeight) {
        //strict mode
        if (!(document.documentElement.clientWidth == 0))
            innerHeight = document.documentElement.clientHeight;
        else //quirks mode
            innerHeight = document.body.clientHeight;

    }

    var wh = innerHeight, ww = innerWidth, w = blockWidth, h = blockHeight;

    var docBody = document.body,
    docHtml = document.documentElement;

    var documentFullHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, docHtml.clientHeight, docHtml.scrollHeight, docHtml.offsetHeight);
    var isDecentBrowser = false;
    try {
        isDecentBrowser = ("WebSocket" in window) && ("localStorage" in window);
    }
    catch (e) { }

    var extContainer = document.getElementById("LL_ExtDIV");
    if (!extContainer) {
        extContainer = document.createElement("div");
        extContainer.setAttribute('id', 'LL_ExtDIV');
        extContainer.style.position = "absolute";
        extContainer.style.top = "0";
        extContainer.style.background = "#111";
        extContainer.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=40)";
        extContainer.style.opacity = "0.4";
        extContainer.style.left = "0";
        extContainer.style.width = isDecentBrowser ? "100%" : ("" + innerWidth + "px");
        extContainer.style.height = isDecentBrowser ? "100%" : ("" + documentFullHeight + "px");
        extContainer.style.zIndex = "10000";
        extContainer.style.overflow = "hidden";
        document.body.appendChild(extContainer);
    }
    else
        extContainer.style.display = "block";

    var closeImgContainerWid = isCancellable ? 40 : 0;
    var closeImgContainerHei = isCancellable ? 40 : 0;

    var ieVersion = LL_CustomUI.commonFunctions.getInternetExplorerVersion();

    var innerContainer = document.getElementById("LL_InnerDIV");
    if (!innerContainer) {
        innerContainer = document.createElement("div");
        innerContainer.setAttribute("id", "LL_InnerDIV");
        innerContainer.setAttribute("align", "center");
        
        // If IE 6.0 - set absolute position, else - fixed
        if(ieVersion != -1 && ieVersion == 6.0) {
            innerContainer.style.position = "absolute";
        } else {
            innerContainer.style.position = "fixed";
        }

        innerContainer.style.left = "" + ((ww - w - closeImgContainerWid) / 2) + "px";
        innerContainer.style.top = "" + (Math.max(5, (wh - h - closeImgContainerHei) / 2 - 50)) + "px";
        innerContainer.style.overflow = "hidden";
        innerContainer.style.width = (w + closeImgContainerWid) + "px";
        innerContainer.style.height = (h + closeImgContainerHei) + "px";
        innerContainer.style.textAlign = "center";
        innerContainer.style.zIndex = "10001";

        document.body.appendChild(innerContainer);
    }
    else {
        innerContainer.style.left = "" + ((ww - w - closeImgContainerWid) / 2) + "px";
        innerContainer.style.top = "" + (Math.max(5, (wh - h - closeImgContainerHei) / 2 - 50)) + "px";
        innerContainer.style.width = (w + closeImgContainerWid) + "px";
        innerContainer.style.height = (h + closeImgContainerHei) + "px";
        innerContainer.style.display = "block";
    }

    LL_Frames.frameOverflow_body = document.body.style.overflow;
    LL_Frames.frameOverflow_html = docHtml.style.overflow;
    document.body.style.overflow = "hidden";
    docHtml.style.overflow = "hidden";

    if (frm) {
        if (LL_Frames.frameUrl == url) {
            //just show it
            frm.style.display = "block";
            return;
        }

        //frame with some other URL and probably size
        //remove it first
        LL_CustomUI.commonFunctions.removeNodes(frm.id);
        frm = "";
    }

    frm = document.createElement("iframe");
    frm.setAttribute("id", frameID);
    frm.setAttribute("name", frameID);
    frm.setAttribute("src", url);
    frm.width = "" + w + "px";
    frm.height = "" + h + "px";
    frm.frameBorder = 0;
    if (!isScrollable) {
        frm.setAttribute('scrolling', 'no');
    }
    if (isTransparent) {
        frm.setAttribute('allowTransparency', 'true');
    }
    frm.setAttribute("style", "display: none; border: 0 none; position: absolute; overflow: hidden; background-color:transparent; top:" + closeImgContainerWid/2 + "px; left:"+closeImgContainerHei/2+"px;");

    var showFrame = function () {
        document.getElementById(frameID).style.display = "block";
    }

    if (frm.attachEvent)
        frm.attachEvent("onload", showFrame);
    else
        frm.addEventListener("load", showFrame, false);

    document.getElementById("LL_InnerDIV").appendChild(frm);
    LL_Frames.frameUrl = url;

    if (!isTransparent)
        document.getElementById(frameID).style.backgroundColor = "white";
    if (isScrollable)
        document.getElementById(frameID).style.overflow = "auto";
    if (isCancellable) {
        var cancelBtn = document.getElementById("cancelImg_" + frameID);
        if (!cancelBtn) {
            cancelBtn = document.createElement("img");
            cancelBtn.setAttribute("id", "cancelImg_" + frameID);
            cancelBtn.setAttribute("name", "cancelImg_" + frameID);
            cancelBtn.setAttribute("src", "https://" + LL_Deployment.mainServerPath + "/webinterfaces/icb/client/resources/img/llclosebtn.png");
            cancelBtn.setAttribute("style", "display:none;border:0 none;position: absolute;background-color:transparent;z-index:10008;right:5px;top:5px;width:30px;height:30px;cursor:pointer;");
            document.getElementById("LL_InnerDIV").appendChild(cancelBtn);
            setTimeout(function () {
                document.getElementById("cancelImg_" + frameID).style.display = "block";
            }, 1000);
        }

        cancelBtn.onclick = function () {
            LL_Frames.killFrame(frameID);
        }
    }

};

LL_Frames.killFrame = function (frameID) {
    LL_CustomUI.commonFunctions.removeNodes("LL_ExtDIV");

    var div = document.getElementById("LL_InnerDIV");
    if (div) {
        //HIDE this DIV instead of REMOVE - to fix Chrome bug
        div.style.display = "none";
        //document.body.removeChild(div);
        div = "";
    }

    var frm = document.getElementById(frameID);
    if (frm) {
        //HIDE instead of REMOVE - to fix Firefox bug
        frm.style.display = "none";
        //document.body.removeChild(frm);
        frm = "";
    }

    document.body.style.overflow = LL_Frames.frameOverflow_body;
    document.documentElement.style.overflow = LL_Frames.frameOverflow_html;
}

if (window.LL_CustomUI && !LL_CustomUI.RedirectPopup) {
    LL_CustomUI.tempHref = "";
    LL_CustomUI.RedirectPopup = {};
    LL_CustomUI.RedirectPopup.modalMask = '<div id="LL_modal_mask" style="position:fixed; top:0; left:0; width:100%; height:100%; text-align:center; z-index: 99990; opacity:0.4;filter: alpha(opacity=40);background: black;"></div>';
    LL_CustomUI.RedirectPopup.windowHTML = '<div id="LL_redirect_popup" role="dialog" style="font-family: '+ LL_CustomUI.V4LLPanel_redirect_popup_font_family +';font-size:'+ LL_CustomUI.V4LLPanel_redirect_popup_text_font_size +'px; border: 1px solid #B6B6B6;background: #'+ LL_CustomUI.V4LLPanel_redirect_popup_background +';width: 280px;position: fixed;top: 23%;height: 120px;z-index: 99999;margin-left: -223px;text-align: center;left: 50%;border-radius: 9px;padding: 16px;padding-top:25px;">'+
        '<span style="display:block;width:14px;height:14px;position:absolute;right:12px;top:11px;background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_redirect_popup_cancel_background) + ') no-repeat;cursor:pointer;" id="redirect_cancel" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CloseNavigatingAway_modal + '" tabindex="0"></span>' +
        '<span id="LL_redirect_title" style="padding: 10px;text-align: left;color: #' + LL_CustomUI.V4LLPanel_redirect_popup_text_color + ';margin-left: 13px;float: left;position: relative;margin-top: 6px;background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_separator) + ') repeat-x;"><span aria-hidden="true">' + LL_CustomUI.takingOutsideText + '</span><a id="redirect_accept" style="color: #' + LL_CustomUI.V4LLPanel_redirect_popup_text_color + '; font-weight: bold;font-size: ' + LL_CustomUI.V4LLPanel_redirect_popup_text_font_size + 'px;" href="#" tabindex="0" aria-label="' + LL_CustomUI.ADA_V4LLPanel_takingOutsideText + '">' + LL_CustomUI.clickHereText + '</a>.</span>' +
        '<span hidden="true" style="display:none;" aria-hidden="false">' + LL_CustomUI.ADA_V4LLPanel_notconnected_poweredBy_modalEnd + '</span></div>';
    LL_CustomUI.RedirectPopup.show = function(href) {
        LL_CustomUI.tempHref = href;
        if (LL_CustomUI.$("LL_modal_mask") != null) { // #lightbox exists
            LL_CustomUI.$('LL_modal_mask').style.display = "block";
        }
        else {
            var LLPanelRedirectPopupWindowMask = document.createElement('div');
            LLPanelRedirectPopupWindowMask.innerHTML = LL_CustomUI.RedirectPopup.modalMask;
            document.body.appendChild(LLPanelRedirectPopupWindowMask);
            setTimeout(function() {
                LL_CustomUI.RedirectPopup.create();
            },100);
        }
        if (LL_CustomUI.$("LL_redirect_popup") != null) { // dialog exists
            LL_CustomUI.$('LL_redirect_popup').style.display = "block";
        }
        else {
            var LLPanelRedirectPopupWindow = document.createElement('div');
            LLPanelRedirectPopupWindow.innerHTML = LL_CustomUI.RedirectPopup.windowHTML;
            document.body.appendChild(LLPanelRedirectPopupWindow);
        }

        LL_CustomUI.commonFunctions.doFocus('LL_redirect_popup');
        //LL_CustomUI.$('LL_redirect_popup').focus();

    };
    
    LL_CustomUI.RedirectPopup.create = function() {
        LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("LL_modal_mask"), function () {
            LL_CustomUI.RedirectPopup.hide(); 
        });

        LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("redirect_cancel"), function () {
            LL_CustomUI.RedirectPopup.hide();
        });

        //LL_CustomUI.commonFunctions.removeListener("click", LL_CustomUI.$("redirect_accept"), function() { });

        LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("redirect_accept"), function (event) {
            if (event.preventDefault) event.preventDefault();
            if (event.stopPropagation) event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            event.cancelBubble = true;
            event.returnValue = false;
            window.open(LL_CustomUI.tempHref, '_blank');
            LL_CustomUI.RedirectPopup.hide();
            return false;
        });
    };
    
    LL_CustomUI.RedirectPopup.hide = function() {
        LL_CustomUI.$('LL_modal_mask').style.display = "none";
        LL_CustomUI.$('LL_redirect_popup').style.display = "none";
    };
}

// Waiting popup
if (window.LL_CustomUI && !LL_CustomUI.WaitingPopup) {
    LL_CustomUI.WaitingPopup = {};
    LL_CustomUI.WaitingPopup.windowHTML = '<div id="V4LLPanel_waitingPopup" style="display:none;oapcity:0;padding-bottom: 30px; top: 23%; left: 50%; margin-left: -155px; text-align: center; width: 310px;background-color: #'+ LL_CustomUI.V4LLPanel_WaitingWindowBackgroundColor +';border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;box-shadow: 0 1px 16px #bebebe; border: 1px solid #aeaeae; padding: 3px; position: absolute;">' + 
        '<div style="margin-bottom: 40px; width: 303px; height: 38px; position: relative; left: 0; top: 0; margin-left: 4px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_WaitingWindowSeparator) + ') repeat-x left bottom !important;" class="LLV4Separator"><div style="margin:5px 16px 0 3px; width: 23px; height: 24px; float: left; background:url('+ LL_CustomUI.img(LL_CustomUI.V4LLPanel_WaitingWindowLogo) +') no-repeat !important;" class="LLV4Logo"><div id="V4LLPanel_close_waiting_popup" style="position: absolute; width:11px; height:10px; cursor:pointer; margin:2px 2px 0 0; right: 0; background:url('+ LL_CustomUI.img(LL_CustomUI.V4LLPanel_WaitingWindowClose) +') no-repeat !important;"></div></div><span style="position:absolute; top: 8px; left: 34px; font-family:'+ LL_CustomUI.V4LLPanel_WaitingWindowHeadlineTextFontFamily +' !important; font-size: '+ LL_CustomUI.V4LLPanel_WaitingWindowHeadlineTextFontSize +'px; color: #'+ LL_CustomUI.V4LLPanel_WaitingWindowHeadlineTextFontColor +' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_WaitingWindowHeadlineText + '</span></div>' +
        '<span style="color: #'+ LL_CustomUI.V4LLPanel_WaitingWindowBodyTextFontColor +'; font-size: '+ LL_CustomUI.V4LLPanel_WaitingWindowBodyTextFontSize +'px; font-family: ' + LL_CustomUI.V4LLPanel_WaitingWindowBodyTextFontFamily + ';">' + LL_CustomUI.V4LLPanel_WaitingWindowBodyText + '</span>' +
        '<img src="' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_WaitingWindowPreloader) + '" alt="' + LL_CustomUI.V4LLPanel_WaitingWindowBodyText_alt + '" style="margin:35px 0 60px 0;" />' +
        '<div style="clear:both;"></div>' +
        '</div>';

    LL_CustomUI.WaitingPopup.show = function() {
        if (LL_CustomUI.$("V4LLPanel_waitingPopup") != null) { // dialog exists
            LL_CustomUI.WaitingPopup.openClose();
        }
        else {
            var LLPanelWaitingPopupWindow = document.createElement('div');
            LLPanelWaitingPopupWindow.innerHTML = LL_CustomUI.WaitingPopup.windowHTML;
            document.body.appendChild(LLPanelWaitingPopupWindow);            
        }

        LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("V4LLPanel_close_waiting_popup"), function () {
            LL_CustomUI.WaitingPopup.hide();
        });

    };
    LL_CustomUI.WaitingPopup.hide = function () {
        if (LL_CustomUI.$('V4LLPanel_waitingPopup')) {
            LL_CustomUI.$('V4LLPanel_waitingPopup').style.opacity = 0;
            setTimeout(function () {
                LL_CustomUI.$('V4LLPanel_waitingPopup').style.display = "none";
            }, 1500);
        }
    };
    
    LL_CustomUI.WaitingPopup.openClose = function() {
        LL_CustomUI.$('V4LLPanel_waitingPopup').style.display = "block";
        setTimeout(function() {
            LL_CustomUI.$('V4LLPanel_waitingPopup').style.opacity = 0.9;
        }, 1030);
        setTimeout(function() {
            LL_CustomUI.WaitingPopup.hide();
        }, 3030); 
    };
}

if (window.LL_CustomUI && !LL_CustomUI.ErrorPopup) {
    //requires jquery 1.8

    LL_CustomUI.ErrorPopup = {};
    LL_CustomUI.ErrorPopup.modalMask = '<div id="LL_modal_mask" style="position:absolute; top:0; left:0; width:100%; height:100%; text-align:center; z-index: 900; opacity:0.4;filter: alpha(opacity=40);background: black;"></div>';
    LL_CustomUI.ErrorPopup.windowHTML = '<div id="LL_error_popup" style="font-family: Trebuchet MS;font-size:12px; border: 1px solid #B6B6B6;background: #603030;width: 280px;position: absolute;top: 23%;min-height: 120px;z-index: 1000;margin-left: -223px;text-align: center;left: 50%;border-radius: 9px;padding: 16px;padding-top:25px;">'+
        '<span style="display:block;width:14px;height:14px;position:absolute;right:12px;top:11px;background:url(' + LL_CustomUI.img('/webinterfaces/icb/client/resources/img/LLICBClose.png') + ') no-repeat;cursor:pointer;" id="LL_error_cancel"></span>' +
        '<div id="LL_error_message" style="width:240px; word-wrap: break-word; padding: 10px;text-align: left;color: #C8C5D1;margin-left: 13px;float: left;position: relative;margin-top: 6px;background:url(' + LL_CustomUI.img('/webinterfaces/icb/client/resources/img/llICBSepLine.png') + ') repeat-x;"></div>' +
        '</div>';
    LL_CustomUI.ErrorPopup.isVisible = function() {
        var $ = LL_jQuery;
        return ($("#LL_error_popup").length > 0 && $('#LL_error_popup').css("display") != "none");
    };
    LL_CustomUI.ErrorPopup.show = function(text) {
        var $ = LL_jQuery;
        if (LL_CustomUI.SyncLossPopup && LL_CustomUI.SyncLossPopup.isVisible())
            return;
        if ($("#LL_modal_mask").length > 0) { // #lightbox exists
            $('#LL_modal_mask').show();
        }
        else {
            $("body").append(LL_CustomUI.ErrorPopup.modalMask);
        }
        if ($("#LL_error_popup").length > 0) { // dialog exists
            $('#LL_error_popup').show();
        }
        else {
            $("body").append(LL_CustomUI.ErrorPopup.windowHTML);
        }
        $("#LL_error_message").html(text);
        $("#LL_modal_mask").live('click', function() { 
            LL_CustomUI.ErrorPopup.hide();
        });
        $('#LL_error_cancel').on('click', function() {            
            LL_CustomUI.ErrorPopup.hide();
        });
    };
    LL_CustomUI.ErrorPopup.hide = function() {
        var $ = LL_jQuery;
        $('#LL_modal_mask').hide();
        $('#LL_error_popup').hide();
    };
}

if (window.LL_CustomUI && !LL_CustomUI.SyncLossPopup) {
    //requires jquery 1.8

    LL_CustomUI.SyncLossPopup = {};
    LL_CustomUI.SyncLossPopup.syncLossText = LL_CustomUI.syncIsLostText;
    LL_CustomUI.SyncLossPopup.modalMask = '<div id="LL_modal_mask_nc" style="position:absolute; top:0; left:0; width:100%; height:100%; text-align:center; z-index: 900; opacity:0.4;filter: alpha(opacity=40);background: black;"></div>';
    LL_CustomUI.SyncLossPopup.windowHTML = '<div id="syncIsLost" style="font-family:Trebuchet MS;font-size:14px; border: 1px solid #B6B6B6;background: #2F2F2F;width: 280px;position: absolute;top: 23%;min-height:177px;z-index:10000;margin-left: -223px;text-align: center;left: 50%;border-radius: 9px;padding: 16px;padding-top:25px;">'+
        '<span style="display:block;width:14px;height:14px;position:absolute;right:12px;top:11px;background:url(' + LL_CustomUI.img('/webinterfaces/icb/client/resources/img/LLICBClose.png') + ') no-repeat;cursor:pointer;" id="LL_syncloss_cancel"></span>' +
        '<div id="syncIsLost_Text" style="width:240px; word-wrap: break-word; padding: 10px;text-align: left;color:#C8C5D1;margin-left: 13px;float: left;position: relative;margin-top: 6px;background:url(' + LL_CustomUI.img('/webinterfaces/icb/client/resources/img/llICBSepLine.png') + ') repeat-x;"></div>' +
        '</div>';
    LL_CustomUI.SyncLossPopup.isVisible = function() {
        var $ = LL_jQuery;
        return ($("#syncIsLost").length > 0 && $('#syncIsLost').css("display") != "none");
    };
    LL_CustomUI.SyncLossPopup.show = function(noScript, url) {
        var $ = LL_jQuery;
        if (LL_CustomUI.ErrorPopup && LL_CustomUI.ErrorPopup.isVisible())
            LL_CustomUI.ErrorPopup.hide();

        if ($("#LL_modal_mask_nc").length > 0) { // #lightbox exists
            $('#LL_modal_mask_nc').show();
        }
        else {
            $("body").append(LL_CustomUI.SyncLossPopup.modalMask);
        }
        if ($("#syncIsLost").length > 0) { // dialog exists
            $('#syncIsLost').show();
        }
        else {
            $("body").append(LL_CustomUI.SyncLossPopup.windowHTML);
        }
        $("#syncIsLost_Text").html(
            LL_CustomUI.SyncLossPopup.syncLossText + "<br /><br />Debug data: " +  (noScript ? " (ERR_NO_SCRIPT, last known URL: " + url + ")" : " (ERR_NO_RESPONSE, URL: "+ url + ")")
            );
        $('#LL_syncloss_cancel').on('click', function() {            
            LL_CustomUI.SyncLossPopup.hide();
        });
    };
    LL_CustomUI.SyncLossPopup.hide = function() {
        var $ = LL_jQuery;
        $('#LL_modal_mask_nc').hide();
        $('#syncIsLost').hide();
    };
}

//Session ended dialog
if (window.LL_CustomUI && !LL_CustomUI.SessionEndedPopup) {
    LL_CustomUI.SessionEndedPopup = {};
    LL_CustomUI.SessionEndedPopup.FEEDBACK_URL = (window.LL_Deployment && LL_Deployment.feedbackUrl)? LL_Deployment.feedbackUrl:'';

    LL_CustomUI.SessionEndedPopup.show = function () {
        var windowHTML = '<div id="LL_sessionEnded_popup" role="dialog" aria-live="assertive" style="box-shadow: 0 1px 16px #bebebe; font-family: Trebuchet MS; font-size: 12px; border: 1px solid #B6B6B6; position: fixed; _position: absolute; top: 28%; left: 40%; height: 300px; width: 650px; z-index: 1000; margin-left: -223px; text-align: center; padding: 16px; padding-top: 25px; display: none; background-color: #' + LL_CustomUI.LL_sessionEnded_popup_background_color + ';">' +
        '<span id="LL_sessionEnded_title" style="_line-height: 28px;font-family: '+ LL_CustomUI.LL_sessionEnded_title_font_family +';font-weight: normal;font-size: '+ LL_CustomUI.LL_sessionEnded_title_font_size +'px;color: #' + LL_CustomUI.LL_sessionEnded_title_font_color + ';position:absolute;left: 13%;top: 35%;">' + LL_CustomUI.v3SessionIsOver + '</span>' +
        '<span id="LL_sessionEnded_description" style="font-family: '+ LL_CustomUI.LL_sessionEnded_description_font_family +';  font-weight: normal;  font-size: '+ LL_CustomUI.LL_sessionEnded_description_font_size +'px; color: #'+ LL_CustomUI.LL_sessionEnded_description_font_color +'; position:absolute; left: 13%; top: 53%; text-align: center;">' + LL_CustomUI.v3CloseWindowNotice + '</span>' +
        '<span id="LL_sessionEnded_Close_Modal_Window" style="background: url(' + LL_CustomUI.img(LL_CustomUI.LL_sessionEnded_popup_close_button) + ') no-repeat; width: '+ LL_CustomUI.LL_sessionEnded_Close_Modal_Window_button_width +'px; padding-top:8px;padding-bottom:12px; font-family: '+ LL_CustomUI.LL_sessionEnded_Close_Modal_Window_button_font_family +'; font-weight: bold; font-size: '+ LL_CustomUI.LL_sessionEnded_Close_Modal_Window_button_font_size +'px; color: #'+ LL_CustomUI.LL_CloseModal_Link_buttom_color +'; text-align:center; position:absolute; left: 15%; top: 73%; text-align: center; display:none;"><a id="LL_CloseModal_Link" tabindex="0" aria-label="' + LL_CustomUI.ADA_V4LLPanel_closeSessionEndWindowLink + '" href="javascript:void(0);" style="color:#'+ LL_CustomUI.LL_CloseModal_Link_buttom_color +';text-decoration:none;"><span aria-hidden="true">' + LL_CustomUI.closeSessionEndWindowLink_text + '</span></a></span>' +
		'<span id="LL_sessionEnded_feedback" style="font-family: '+ LL_CustomUI.LL_sessionEnded_feedback_font_family +';  font-weight: bold;  font-size: '+ LL_CustomUI.LL_sessionEnded_feedback_font_size +'px; color: #'+ LL_CustomUI.LL_Feedback_Button_color +'; text-align:center; position:absolute; left: 15%; top: 63%; text-align: center; display:none;"><a id="LL_Feedback_Button" tabindex="0" aria-label="' + LL_CustomUI.ADA_V4LLPanel_Feedback + '" href="javascript:void(0);" style="color:#'+ LL_CustomUI.LL_Feedback_Button_color +';"><span aria-hidden="true">' + LL_CustomUI.leaveFeedback + '</span></a></span>' +
        '<span id="LL_sessionEnded_cancel" tabindex="0" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CloseSession_modal + '" role="button" style="display:block;  width:37px;  height:37px;  position:absolute;  right:-13px;  top:-16px;  background: url(' + LL_CustomUI.img(LL_CustomUI.LL_sessionEnded_popup_cancel_button) + ') no-repeat;  cursor:pointer;"></span>' +
        '<span id="LL_sessionEnded_clock" style="display:block; width:200px; height:300px; position: absolute; padding: 0px; right:8%; top: 15%; background: url(' + LL_CustomUI.img(LL_CustomUI.LL_sessionEnded_popup_image) + ') no-repeat;" ></span>' +
        '</div>';
        if (!LL_CustomUI.$("LL_sessionEnded_popup")) { // dialog does not exist
            var div = document.createElement("DIV");
            div.innerHTML = windowHTML;
            document.body.appendChild(div);
        }
        LL_CustomUI.$("LL_sessionEnded_popup").style.display = "block";
        if (LL_CustomUI.$("LL_sessionEnded_cancel")) {
            LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("LL_sessionEnded_cancel"), function () {
                LL_CustomUI.SessionEndedPopup.hide();
            });
        }
		// Show a "Close" link in the Session Ended window in case of a mobile browser
		if (LL_CustomUI.SessionEndedPopup.detectMobileBrowser()) {
			LL_CustomUI.$("LL_sessionEnded_Close_Modal_Window").style.display = "block";
            LL_CustomUI.$("LL_sessionEnded_popup").style.width = "250px";
            LL_CustomUI.$("LL_sessionEnded_popup").style.left = "57%";
            LL_CustomUI.$("LL_sessionEnded_description").style.left = "0";
            LL_CustomUI.$("LL_sessionEnded_Close_Modal_Window").style.left = "39%";
            LL_CustomUI.$("LL_sessionEnded_clock").style.display = "none";
            LL_CustomUI.$("LL_sessionEnded_feedback").style.top = "90%";
            LL_CustomUI.$("LL_sessionEnded_feedback").style.left = "25%";
			if (LL_CustomUI.$("LL_sessionEnded_Close_Modal_Window")) {
				LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("LL_sessionEnded_Close_Modal_Window"), function () {
					LL_CustomUI.SessionEndedPopup.hide();
				});
			}
		}
        if (LL_CustomUI.SessionEndedPopup.FEEDBACK_URL) {
            LL_CustomUI.$("LL_sessionEnded_feedback").style.display = "block";
            if (LL_CustomUI.$("LL_Feedback_Button")) {
                LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("LL_Feedback_Button"), function () {
                    LL_CustomUI.SessionEndedPopup.openFeedback();
                });
                LL_CustomUI.$("LL_Feedback_Button").style.display = "block";
            }
        }
        else {
            LL_CustomUI.$("LL_sessionEnded_feedback").style.display = "none";
        }

        LL_CustomUI.commonFunctions.doFocus('LL_sessionEnded_popup');
        //document.getElementById("LL_sessionEnded_popup").focus();
    },

    LL_CustomUI.SessionEndedPopup.hide = function () {
        if (LL_CustomUI.$("LL_sessionEnded_popup")) {
            LL_CustomUI.$("LL_sessionEnded_popup").style.display = "none";
        }
    },
	
	LL_CustomUI.SessionEndedPopup.detectMobileBrowser = function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},

    LL_CustomUI.SessionEndedPopup.setFeedbackURL = function (url) {
        LL_CustomUI.SessionEndedPopup.FEEDBACK_URL = url;
    },

    LL_CustomUI.SessionEndedPopup.openFeedback = function () {
        if (LL_CustomUI.$("LL_Feedback_Button")) {
            LL_CustomUI.$("LL_Feedback_Button").style.display = "none";
        }

        var left = (screen.width - 650) / 2;
        var top = screen.height < 800 ? 0 : (screen.height - 700) / 2 - 50;
        var newWindow = window.open(LL_CustomUI.SessionEndedPopup.FEEDBACK_URL, "LLFeedback", 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,titlebar=0,status=0,width=650,height=700,top=' + top + ',left=' + left);
        try {
            newWindow.opener = window;
            newWindow.focus();
        } catch (ex) { }
    }
}


if (window.LL_BR_Core && (!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported == "none") && LL_CustomUI.V4PanelState == "new") {
    //service not supported
    if (window.LL_CustomUI) {
        LL_CustomUI.V4Panel = {};
        LL_CustomUI.V4Panel.notSupportedEnvWindow = "";
        LL_CustomUI.V4Panel.initialHandle = "";
        LL_CustomUI.V4Panel.isOpen = false;
        LL_CustomUI.V4Panel.isPreviewMode = false;
        LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight = 170;
        LL_CustomUI.V4Panel.eventWritten = false;

        LL_CustomUI.V4Panel.windowHTML = '<div id="V4LLPanel_HintBlock" style="' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset, "true") + ' background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_HintBlock_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_HintBlock_notSupported_width + 'px !important; height: ' + LL_CustomUI.V4LLPanel_HintBlock_notSupported_height + 'px !important; z-index:10000; position: fixed; _position:absolute; cursor:pointer; visibility:hidden;" onmouseout="LL_CustomUI.V4Panel.hint.hide();"><span id="V4LLPanel_Hint_FirstLine" style="display: block; text-align: center; font-size: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_size +'px; font-family: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_family +'; color: #'+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_color +'; width: 157px; font-style: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_style +' ; font-weight: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_weight +'; margin-top: 13px;">'+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText +'</span><span id="V4LLPanel_Hint_SecondLine" style="display: block; text-align: center; font-size: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_size +'px; font-family: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_family +'; color: #'+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_color +'; font-weight: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_weight +' ; font-style: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_style +'; width: 157px;">'+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText +'</span></div>';

        if (LL_CustomUI.commonFunctions.isLeftLocation()) {
            if (LL_CustomUI.commonFunctions.isAnyIE()) {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_GenericToggler_notSupported_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space:nowrap; bottom: 40px; left: 9px; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else if(LL_CustomUI.commonFunctions.isSafari()) {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_GenericToggler_notSupported_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space:nowrap; bottom: 40px; left: 8px; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_GenericToggler_notSupported_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space:nowrap; bottom: 28px; left: 8px; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            }
        } else if (LL_CustomUI.commonFunctions.isRightLocation()) {
            if (LL_CustomUI.commonFunctions.isAnyIE()) {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_GenericToggler_notSupported_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space: nowrap; bottom: 45px; left: 14px; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else if(LL_CustomUI.commonFunctions.isSafari()) {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_GenericToggler_notSupported_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space: nowrap; bottom: 40px; left: 8px; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_GenericToggler_notSupported_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space: nowrap; bottom: 28px; left: 8px; transform-origin: left top 0; -moz-transform-origin: left top; -o-transform-origin: left top 0; -webkit-transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            }
        } else {
            LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_GenericToggler_notSupported_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><div id="V4LLPanel_InnerLogo" style="margin: 9px 10px 0 10px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; _margin-left: 5px !important;"></div><span id="V4LLPanel_InnerTitle" style="position:absolute; top: 11px; left: 42px; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span></div>';
        }

        LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel" style="' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + 'background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_background) + ') no-repeat !important; position:fixed; _position: absolute; z-index: 1500002; height: 0; overflow: hidden; width: ' + LL_CustomUI.V4LLPanel_width + 'px !important;">';
        LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_InnerContainer" style="position: relative; padding: 42px 0 0 4px; zoom: 1; height: 130px; width: 277px !important;">';
        LL_CustomUI.V4Panel.windowHTML += '<div style="width: 256px; height: 46px; cursor: pointer; position: absolute;  left: 0; top: 0; margin-left: 10px;background:url(' + LL_CustomUI.img(LL_CustomUI.LLpassToBeginText_background) + ') repeat-x left bottom !important;" id="V4LLPanel_MovingToggler" onclick="LL_CustomUI.V4Panel.collapse()"><div id="V4LLPanel_LogoToggler" style="background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notSupported_logo) + ') no-repeat !important; margin:13px 16px 0 3px;width: 23px;height: 24px;float: left;" class="LLV4Logo"><div id="V4LLPanel_PanelClose" tabindex="0.1" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_PanelClose + '" style="background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PanelClose_notSupported_background) + ') no-repeat !important; position: absolute; width:17px; height:17px; cursor:pointer; margin:7px 0 0 0; right: 0;"></div></div><span id="V4LLPanel_TogglerText" style="position:absolute; top: 17px; left: 34px; font-family: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Title_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_Title_notSupported_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notSupported_header_text + '</span></div>';
        LL_CustomUI.V4Panel.windowHTML += '<p id="V4LLPanel_notSupportedEnvText" style="padding: 0 10px; margin: 14px 0; font-family: ' + LL_CustomUI.V4LLPanel_notSupportedEnvText_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_notSupportedEnvText_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_notSupportedEnvText_notSupported_color + ' !important;">' + LL_CustomUI.V4LLPanel_notSupported_text + '</p>';
        LL_CustomUI.V4Panel.windowHTML += '<a id="V4LLPanel_moreInfoLink" style="position: absolute; bottom:10px; right:20px; font-family: ' + LL_CustomUI.V4LLPanel_notSupportedEnvText_notSupported_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_moreInfoLink_notSupported_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_moreInfoLink_notSupported_color + ' !important;" href="' + LL_CustomUI.V4LLPanel_MoreInfo + '" target="_blank">' + LL_CustomUI.V4LLPanel_notSupported_moreInfoText + '</a>';
        LL_CustomUI.V4Panel.windowHTML += '</div>';
        LL_CustomUI.V4Panel.windowHTML += '</div>';
        LL_CustomUI.V4Panel.innerHTML = LL_CustomUI.V4Panel.windowHTML;

        LL_CustomUI.V4Panel.start = function () {
            LL_CustomUI.V4Panel.notSupportedEnvWindow = LL_CustomUI.$("V4LLPanel");
        };

        LL_CustomUI.V4Panel.getInitialHandle = function () {
            LL_CustomUI.V4Panel.initialHandle = LL_CustomUI.$("V4LLPanel_GenericToggler");
        };

        // Initializing the open/close functionality
        LL_CustomUI.V4Panel.toggle = function (action) {
            if (action == "expand") {      // Open if the block is closed
                LL_CustomUI.V4Panel.start();
                LL_CustomUI.V4Panel.isOpen = true;
                LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "hidden";
                LL_CustomUI.$("V4LLPanel_GenericToggler").style.visibility = "visible";
                //console.log("" + new Date().toLocaleString() + ": displaying collapsed panel: #10");

                LL_CustomUI.V4Panel.notSupportedEnvWindow.style.height = LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight + "px";
                if (!LL_CustomUI.V4Panel.eventWritten && window.LL_Log) {
                    LL_CustomUI.V4Panel.eventWritten = true;
                    LL_Log.event("NotSupported", "ui.js", navigator.userAgent);
                }
            }
            else if (action == "collapse") {      // Closing
                if (!LL_CustomUI.V4Panel.isOpen)
                    return;
                LL_CustomUI.V4Panel.start();
                LL_CustomUI.V4Panel.isOpen = false;
                LL_CustomUI.$("V4LLPanel_GenericToggler").style.visibility = "visible";
                //console.log("" + new Date().toLocaleString() + ": displaying collapsed panel: #11");

                if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.V4Panel.notSupportedEnvWindow.style.height = 1 + "px";
                } else {
                    LL_CustomUI.V4Panel.notSupportedEnvWindow.style.height = 0 + "px";
                }

            }
        };
        LL_CustomUI.V4Panel.expand = function () {
            LL_CustomUI.V4Panel.toggle("expand");
        };
        LL_CustomUI.V4Panel.collapse = function () {
            LL_CustomUI.V4Panel.toggle("collapse");
        };
        LL_CustomUI.V4Panel.hide = function (ms) {
            if (!ms) ms = 0;
            setTimeout(function () {
                try {
                    LL_CustomUI.$("V4LLPanel_HintBlock").style.display = "none";
                    LL_CustomUI.$("V4LLPanel_GenericToggler").style.display = "none";
                    LL_CustomUI.$("V4LLPanel").style.display = "none";
                }
                catch (e) { }
            }, ms);
        };

        LL_CustomUI.V4Panel.hint = {};
        LL_CustomUI.V4Panel.hint.show = function () {
            if (LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility == "hidden" && (LL_CustomUI.V4LLPanel_position == "bottom_right" || LL_CustomUI.V4LLPanel_position == "bottom_left" || LL_CustomUI.V4LLPanel_position == "bottom_middle")) {
                LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "visible";
            }
        };
        LL_CustomUI.V4Panel.hint.hide = function () {
            LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "hidden";
        };

        LL_CustomUI.V4Panel.setPresentationCode = function () { };

        // Preview mode for the customization through the admin console
        LL_CustomUI.V4Panel.enablePreviewMode = function () {
            LL_CustomUI.V4Panel.isPreviewMode = true;
        };

        // Initializing the environment
        LL_CustomUI.V4Panel.appendElements = function () {
            // Appending the element to DOM
            if (LL_CustomUI.$("V4LLPanel")) {
                //this element was already added
                return;
            }
            var LLPanelNotSupportedEnvWindow = document.createElement('div');
            //LLPanelNotSupportedEnvWindow.innerHTML = LL_CustomUI.V4Panel.innerHTML;
            LLPanelNotSupportedEnvWindow.innerHTML = LL_CustomUI.V4Panel.windowHTML;
            //document.body.appendChild(LL_CustomUI.V4Panel.windowHTML);
            document.body.appendChild(LLPanelNotSupportedEnvWindow);

            if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
                LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_HintBlock", LL_CustomUI.V4LLPanel_position);
                LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_GenericToggler", LL_CustomUI.V4LLPanel_position);
                LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel", LL_CustomUI.V4LLPanel_position);
            }

            if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.$("V4LLPanel").style.height = 1 + "px";
            }

            // Adding a "scroll" event listener for Quirks mode
            if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.commonFunctions.listen("scroll", window, function () {
                    //var positionProperty = LL_CustomUI.$("V4LLPanel_GenericToggler").style.position;
                    //if (positionProperty == "absolute") {
                    var scrollPosition = LL_CustomUI.commonFunctions.GetScrollPosition();
                    if(LL_CustomUI.$("V4LLPanel_GenericToggler") != null) {
                        LL_CustomUI.$("V4LLPanel_GenericToggler").style.bottom = -scrollPosition + "px";
                    }
                    if(LL_CustomUI.$("V4LLPanel_HintBlock") != null) {
                        LL_CustomUI.$("V4LLPanel_HintBlock").style.bottom = -scrollPosition + 30 + "px";
                    }
                    if(LL_CustomUI.$("V4LLPanel") != null) {
                        LL_CustomUI.$("V4LLPanel").style.bottom = -scrollPosition + "px";
                    }
                //}
                });
            }

            // Adjusting the panels position on window scroll
            if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.commonFunctions.listen("scroll", window, function () {
                    if(LL_CustomUI.$("V4LLPanel_GenericToggler") != null) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_GenericToggler", 0, LL_CustomUI.V4LLPanel_position);
                    }
                    if(LL_CustomUI.$("V4LLPanel_HintBlock") != null) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_HintBlock", 30, LL_CustomUI.V4LLPanel_position);
                    }
                    if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                    } else {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight, LL_CustomUI.V4LLPanel_position);
                    }

                });
            }

            // Adjusting the panels position on window resize
            if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.commonFunctions.listen("resize", window, function () {
                    if (!document.getElementById("V4LLPanel_GenericToggler") || !document.getElementById("V4LLPanel_HintBlock"))
                        return;
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_GenericToggler", 0, LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_HintBlock", 30, LL_CustomUI.V4LLPanel_position);
                    if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                    } else {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight, LL_CustomUI.V4LLPanel_position);
                    }

                });
            }

            // Adjusting the panels position on page load
            if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_GenericToggler", 0, LL_CustomUI.V4LLPanel_position);
                LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_HintBlock", 30, LL_CustomUI.V4LLPanel_position);
                if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                } else {
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight, LL_CustomUI.V4LLPanel_position);
                }
            }

            // Adding an event listener to the window object to hide the panel if clicked outside
            LL_CustomUI.commonFunctions.listen("click", window, function (event) {
                var obj = event.target || event.srcElement;
                if (obj.id.indexOf("LLPanel") < 0 && LL_CustomUI.V4Panel.isOpen == true) {
                    LL_CustomUI.V4Panel.collapse();
                    //console.log("" + new Date().toLocaleString() + ": outside window area clicked: #4");

                }

                // Adjusting the middle panel position when resized
                if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
                    LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
                        if (!document.getElementById("V4LLPanel_GenericToggler") || !document.getElementById("V4LLPanel_HintBlock"))
                            return;

                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_HintBlock", LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_GenericToggler", LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel", LL_CustomUI.V4LLPanel_position);
                    });
                }
            });

            // Adding a triggering listener for the flying window
            if (typeof LL_Deployment.v4CustomButtonID != "undefined" && LL_Deployment.v4CustomButtonID != "" && LL_Deployment.v4CustomButtonID && window.LL_CustomUI.V4PanelState == "new") {
                LL_CustomUI.anyPositionV4PanelOpener.init();
                LL_CustomUI.$("V4LLPanel_GenericToggler").style.visibility = "hidden";

                if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled) {
                    LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.visibility = "hidden";

                }
            }
        };

        LL_CustomUI.V4Panel.init = LL_CustomUI.V4Panel.appendElements;
    }
}

LL_CustomUI.V4Panel_init = function () {

    LL_CustomUI.commonFunctions.removeListener("keyup", window, LL_CustomUI.commonFunctions.globalKeyHandler);
    LL_CustomUI.commonFunctions.listen("keyup", window, LL_CustomUI.commonFunctions.globalKeyHandler);
    LL_CustomUI.commonFunctions.ADA.CreateStyleForFocus();

    if (window.LL_CustomUI && !LL_CustomUI.V4Panel) {
        //ICB/ACB toolbar
        if (LL_CustomUI.V4PanelState == "new") {
            //agent is not connected
            LL_CustomUI.V4Panel = { };
            LL_CustomUI.V4Panel.automaticClosingTimer = "";
            LL_CustomUI.V4Panel.windowHTML = "";
            LL_CustomUI.V4Panel.numberGenerationView = "";
            LL_CustomUI.V4Panel.numberGenerationWindow = "";
            LL_CustomUI.V4Panel.initialHandle = "";
            LL_CustomUI.V4Panel.initialHandleNumberGenerated = "";
            LL_CustomUI.V4Panel.faqURL = LL_CustomUI.V4LLPanel_FAQURL;
            LL_CustomUI.V4Panel.isOpen = false;
            LL_CustomUI.V4Panel.numberAlreadyGenerated = false;
            LL_CustomUI.V4Panel.isPreviewMode = false;
            LL_CustomUI.V4Panel.isAgentConnected = false;
            LL_CustomUI.V4Panel.numberGenerationWindowHeight = 302;
            LL_CustomUI.V4Panel.presentationCode = "";
            LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen = false;
                        
            LL_CustomUI.V4Panel.mobile_timer = "";
            LL_CustomUI.V4Panel.orginalHeight = "";
            
            // Preventing cropping of the panel in case of Right and Left locations
            if(LL_CustomUI.commonFunctions.isLeftLocation() || LL_CustomUI.commonFunctions.isRightLocation()) {
                LL_CustomUI.V4Panel.numberGenerationWindowHeight = 308;
            }
            
		
            if(typeof LL_CustomUI.V4LLPanel_notconnected_phoneNumber != "undefined" && LL_CustomUI.V4LLPanel_notconnected_phoneNumber != "") {
                if(LL_CustomUI.V4LLPanel_notconnected_phoneNumber.indexOf("[n]") >= 0) {
                    LL_CustomUI.V4LLPanel_notconnected_phoneNumber = LL_CustomUI.V4LLPanel_notconnected_phoneNumber.replace("[n]", "<br />");
                }
            }

            if(typeof LL_CustomUI.V4LLPanel_notconnected_provideNumber_text != "undefined" && LL_CustomUI.V4LLPanel_notconnected_provideNumber_text != "") {
                if (LL_CustomUI.V4LLPanel_notconnected_provideNumber_text.indexOf("[n]") >= 0) {
                    LL_CustomUI.V4LLPanel_notconnected_provideNumber_text = LL_CustomUI.V4LLPanel_notconnected_provideNumber_text.replace("[n]", "<br />");
                }
            }

            // If there's a link instead of the phone number - wrap the phone number field text in a link
            if(typeof LL_CustomUI.V4LLPanel_PhoneNumberURL != "undefined" && LL_CustomUI.V4LLPanel_PhoneNumberURL != "") {
                LL_CustomUI.V4LLPanel_notconnected_phoneNumber = '<a href='+ LL_CustomUI.V4LLPanel_PhoneNumberURL +' target="_blank" style="color: #' + LL_CustomUI.V4LLPanel_passToBeginText_color + ' !important;">' + LL_CustomUI.V4LLPanel_notconnected_phoneNumber + '</a>';
            }

            if(LL_CustomUI.commonFunctions.isLeftLocation()) {
                if(LL_CustomUI.commonFunctions.isAnyIE()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div style="z-index:1500001; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" id="V4LLPanel_CollapsedNarrowNoAgent" onclick="LL_CustomUI.V4Panel.expand()"><span style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); float:left; margin:46px 8px 12px 9px; font-family: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_color + ';" id="V4LLPanel_CollapsedNumContNarrow" tabindex="0" role="button" aria-live="assertive" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow + '"></span><div id="V4LLPanel_InnerLogo" style="margin: 19px 10px 0 5px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                } else {
                    LL_CustomUI.V4Panel.windowHTML += '<div style="z-index:1500001; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" id="V4LLPanel_CollapsedNarrowNoAgent" onclick="LL_CustomUI.V4Panel.expand()"><span style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); float:left; margin:59px 8px 0 -8px; font-family: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_color + ';" id="V4LLPanel_CollapsedNumContNarrow" tabindex="0" role="button" aria-live="assertive" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow + '"></span><div id="V4LLPanel_InnerLogo" style="margin: 48px 10px 0 5px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                }
            } else if(LL_CustomUI.commonFunctions.isRightLocation()) {
                if(LL_CustomUI.commonFunctions.isAnyIE()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div style="z-index:1500001; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" id="V4LLPanel_CollapsedNarrowNoAgent" onclick="LL_CustomUI.V4Panel.expand()"><span style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); float:left; margin:47px 8px 0 11px; font-family: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_color + ';" id="V4LLPanel_CollapsedNumContNarrow" tabindex="0" role="button" aria-live="assertive" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow + '"></span><div id="V4LLPanel_InnerLogo" style="margin: 19px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                } else {
                    LL_CustomUI.V4Panel.windowHTML += '<div style="z-index:1500001; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" id="V4LLPanel_CollapsedNarrowNoAgent" onclick="LL_CustomUI.V4Panel.expand()"><span style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); float:left; margin:59px 8px 0 -3px; font-family: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_color + ';" id="V4LLPanel_CollapsedNumContNarrow" tabindex="0" role="button" aria-live="assertive" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow + '"></span><div id="V4LLPanel_InnerLogo" style="margin: 48px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                }
            } else {
                LL_CustomUI.V4Panel.windowHTML += '<div style="z-index:1500001; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" id="V4LLPanel_CollapsedNarrowNoAgent" onclick="LL_CustomUI.V4Panel.expand()"><div id="V4LLPanel_InnerLogo" style="margin: 9px 10px 0 10px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;" class="LLV4Logo"></div><span style="display:inline-block; width: 98px; text-align:center; float:left; margin:12px 0 0 0; font-family: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_CollapsedNumContNarrow_color + ';" id="V4LLPanel_CollapsedNumContNarrow" tabindex="0" role="button" aria-live="assertive" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow + '"></span></div>';
            }

            LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_HintBlock" style="' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset, "true") + ' z-index:20000; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_HintBlock_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_HintBlock_width + 'px; height: ' + LL_CustomUI.V4LLPanel_HintBlock_height + 'px; onmouseout="LL_CustomUI.V4Panel.hint.hide();"><span id="V4LLPanel_Hint_FirstLine" style="display: block; text-align: center; font-size: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_size +'px; font-family: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_family +'; color: #'+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_color +'; width: 157px; font-style: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_style +' ; font-weight: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_weight +'; margin-top: 13px;">'+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText +'</span><span id="V4LLPanel_Hint_SecondLine" style="display: block; text-align: center; font-size: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_size +'px; font-family: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_family +'; color: #'+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_color +'; font-weight: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_weight +' ; font-style: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_style +'; width: 157px;">'+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText +'</span></div>';

            if(LL_CustomUI.commonFunctions.isLeftLocation()) {
                if(LL_CustomUI.commonFunctions.isAnyIE()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url('+ LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) +') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space:nowrap; bottom: 40px; left: 9px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
                } else if(LL_CustomUI.commonFunctions.isSafari()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space:nowrap; bottom: 40px; left: 8px; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
                } else {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space:nowrap; bottom: 28px; left: 8px; transform-origin: left top 0; -moz-transform-origin: left top 0; -o-transform-origin: left top 0; -webkit-transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
                }
            } else if(LL_CustomUI.commonFunctions.isRightLocation()) {
                if(LL_CustomUI.commonFunctions.isAnyIE()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space: nowrap; bottom: 45px; left: 14px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
                } else if(LL_CustomUI.commonFunctions.isSafari()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space: nowrap; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; bottom: 40px; left: 13px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
                } else {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space: nowrap; transform-origin: left top 0; -moz-transform-origin: left top 0; -o-transform-origin: left top 0; -webkit-transform-origin: left top 0; bottom: 28px; left: 13px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
                }
            } else {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_GenericToggler" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()" onmouseout="LL_CustomUI.V4Panel.hint.hide();" onmouseover="LL_CustomUI.V4Panel.hint.show();"><div id="V4LLPanel_InnerLogo" style="margin: 9px 10px 0 10px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div><span id="V4LLPanel_InnerTitle" style="position:absolute; top: 11px; left: 42px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText" tabindex="0" role="button">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span></div>';
            }

            LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel" style="position: fixed; _position: absolute !important; z-index: 1500002; height: 0; overflow: hidden; width: ' + LL_CustomUI.V4LLPanel_width + 'px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notConnected_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '">';
            LL_CustomUI.V4Panel.windowHTML +=     '<div id="V4LLPanel_InnerContainer" style="position: relative; padding: 42px 0 0 4px; zoom: 1; height: 130px; width: 277px !important;">';
            LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_MovingToggler" style="width: 256px; height: 46px; position: absolute; left: 0; top: 0; margin-left: 10px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_separator) + ') repeat-x left bottom !important;" class="LLV4Separator"><div id="V4LLPanel_LogoToggler" style="margin:13px 16px 0 3px; width: 23px; height: 24px; float: left; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important;" class="LLV4Logo"><div id="V4LLPanel_PanelMinimize" tabindex="0" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_PanelMinimize + '" style="position: absolute; width:15px; height:10px; cursor:pointer; margin:7px 0 0 0; _margin: 3px 0 0 0; right: 26px; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PanelMinimizeButton_background) + ') no-repeat left bottom !important;" onclick="LL_CustomUI.V4Panel.collapse()"></div><div id="V4LLPanel_PanelClose" role="button" tabindex="0.1" aria-label="' + LL_CustomUI.ADA_V4LLPanel_PanelClose_disconnect + '" style="position: absolute; width:11px; height:10px; cursor:pointer; margin:7px 0 0 0; right: 0; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PanelCloseButton_background) + ') no-repeat !important;" onclick="LL_CustomUI.V4Panel.openDisconnectConfirmWindow()"></div></div><span id="V4LLPanel_TogglerText" style="position:absolute; top: 17px; left: 34px; font-family:' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanelDisconnectConfirmWindow" aria-atomic="true" role="dialog" style="display:none; position:absolute; top:47px;left:2px;width:232px;_width:250px;background-color:#' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_background_color + ';border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;border:1px solid #' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_border_color + ';box-shadow: 0 1px 16px #000; z-index:11; text-align: center;padding:28px 10px;"><span style="font-size:' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_size + 'px; color:#' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_color + '; font-weight:' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_weight + '; font-style: ' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_style + '; font-family: ' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_family + ';">' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text + '</span><br /><a id="V4LLPanel_CloseDeclineButton" tabindex="0" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CloseDeclineButton + '" onmouseout="LL_CustomUI.V4Panel.toggleConfirmNoBtn(false)" onclick="LL_CustomUI.V4Panel.declineSessionEnd()" style="height: 24px !important; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background) + ') no-repeat; color: #' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color + '; font-family: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_size + 'px; font-weight: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_style + ' !important; width:103px; text-align:center; display:inline-block; text-decoration:none; padding-top:3px; padding-bottom:2px; margin-top:35px;margin-right:10px;" href="javascript:void(0)">' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_no + '</a><a id="V4LLPanel_CloseConfirmButton" tabindex="0" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CloseConfirmButton + '" onmouseout="LL_CustomUI.V4Panel.toggleConfirmYesBtn(false)" onclick="LL_CustomUI.V4Panel.confirmSessionEnd()" style="height: 24px !important; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background) + ') no-repeat; color: #' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color + '; font-family: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_size + 'px; font-weight: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_style + ' !important; width:103px; text-align:center; display:inline-block; text-decoration:none; padding-top:3px;padding-bottom:2px;margin-top:35px;" href="javascript:void(0)">' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_yes + '</a><p hidden="true" aria-hidden="false" style="display:none;">' + LL_CustomUI.ADA_V4LLPanel_DisconnectConfirmWindow_infoEnd + '</p></div></div>';
            LL_CustomUI.V4Panel.windowHTML +=             '<div aria-atomic="true" style="height:85px;margin-left:10px; width: 252px; _margin-left: 12px !important; overflow:hidden;background: url(' + LL_CustomUI.img(LL_CustomUI.LLpassToBeginText_background) + ') repeat-x left bottom !important;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="background-color:transparent; margin-top:0;">';
            LL_CustomUI.V4Panel.windowHTML +=                 '<tr style="background-color:transparent;">';
            LL_CustomUI.V4Panel.windowHTML +=                     '<td style="height:85px;vertical-align:middle;padding:0; border:0; background-color: transparent !important;">';
        
            if(LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.V4Panel.windowHTML +=   '<p id="V4LLPanel_passToBeginText" style="line-height: 18px;font-weight:normal;position:relative;float:left;-webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box; margin-bottom:7px; text-align: center; margin-top:5px; width:243px; margin-left:10px; padding-top:6px; overflow: hidden; color: #' + LL_CustomUI.V4LLPanel_passToBeginText_color + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_passToBeginText_font_size + 'px !important; _margin-top: 0 !important;" class="LLV4Separator">';
                LL_CustomUI.V4Panel.windowHTML +=       '<div id="V4LLPanel_PhoneNumber" role="dialog" style="position:relative;float:left;margin-left:20px; padding:6px 0 7px 48px; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PhoneNumber_background) + ') no-repeat 0 2px !important; font-family: ' + LL_CustomUI.V4LLPanel_PhoneNumber_font_family + ';">'
                LL_CustomUI.V4Panel.windowHTML +=           '<span id="V4LLPanel_PhoneNumberText"  aria-hidden="true" style="position:relative;float:left;color: #' + LL_CustomUI.V4LLPanel_passToBeginText_color + ' !important;">';
                LL_CustomUI.V4Panel.windowHTML +=               LL_CustomUI.V4LLPanel_notconnected_callUsAt_text;
                LL_CustomUI.V4Panel.windowHTML +=           '</span>';
                LL_CustomUI.V4Panel.windowHTML +=           '<span id="V4LLPanel_phoneNum"  aria-hidden="true" style="font-size: ' + LL_CustomUI.V4LLPanel_phoneNum_font_size + 'px;color: #' + LL_CustomUI.V4LLPanel_passToBeginText_color + ' !important; font-family: ' + LL_CustomUI.V4LLPanel_PhoneNumber_digits_font_family + ' !important;">';
                LL_CustomUI.V4Panel.windowHTML +=               LL_CustomUI.V4LLPanel_notconnected_phoneNumber;
                LL_CustomUI.V4Panel.windowHTML +=           '</span>';
                LL_CustomUI.V4Panel.windowHTML +=           '<span id="V4LLPanel_HiddenPhone" style="display:none;" aria-hidden="false">';
                LL_CustomUI.V4Panel.windowHTML +=               LL_CustomUI.V4LLPanel_notconnected_callUsAt_text + ' &nbsp; ' + LL_CustomUI.V4LLPanel_notconnected_phoneNumber;
                LL_CustomUI.V4Panel.windowHTML +=           '</span>';
                LL_CustomUI.V4Panel.windowHTML +=       '</div>';
                LL_CustomUI.V4Panel.windowHTML +=   '</p>';
            } else {
                LL_CustomUI.V4Panel.windowHTML +=   '<p id="V4LLPanel_passToBeginText" style="line-height: 18px;font-weight:normal;position:relative;float:left;-webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box; margin-bottom:7px; text-align: center; margin-top:5px; width:243px; margin-left:10px; padding-top:6px; overflow: hidden; color: #'+ LL_CustomUI.V4LLPanel_passToBeginText_color +' !important; font-size: ' + LL_CustomUI.V4LLPanel_passToBeginText_font_size + 'px !important; _margin-top: 0 !important;" class="LLV4Separator">';
                LL_CustomUI.V4Panel.windowHTML +=       '<span id="V4LLPanel_PhoneNumber" role="dialog" style="position:relative;float:left;padding:6px 0 7px 48px; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PhoneNumber_background) + ') no-repeat 0 2px !important; font-family: ' + LL_CustomUI.V4LLPanel_PhoneNumber_font_family + ';color: #'+ LL_CustomUI.V4LLPanel_passToBeginText_color +' !important;">';
                LL_CustomUI.V4Panel.windowHTML +=           '<span id="V4LLPanel_PhoneNumberText" aria-hidden="true" style="position:relative;float:left;color: #' + LL_CustomUI.V4LLPanel_passToBeginText_color + ' !important;">';
                LL_CustomUI.V4Panel.windowHTML +=               LL_CustomUI.V4LLPanel_notconnected_callUsAt_text;
                LL_CustomUI.V4Panel.windowHTML +=          '</span>';
                LL_CustomUI.V4Panel.windowHTML +=          '<span id="V4LLPanel_phoneNum" aria-hidden="true" style="font-size: ' + LL_CustomUI.V4LLPanel_phoneNum_font_size + 'px;color: #' + LL_CustomUI.V4LLPanel_passToBeginText_color + ' !important; font-family: ' + LL_CustomUI.V4LLPanel_PhoneNumber_digits_font_family + ' !important;">';
                LL_CustomUI.V4Panel.windowHTML +=               LL_CustomUI.V4LLPanel_notconnected_phoneNumber;
                LL_CustomUI.V4Panel.windowHTML +=           '</span>';
                LL_CustomUI.V4Panel.windowHTML +=           '<span id="V4LLPanel_HiddenPhone" style="display:none;" aria-hidden="false">';
                LL_CustomUI.V4Panel.windowHTML +=               LL_CustomUI.V4LLPanel_notconnected_callUsAt_text + ' &nbsp; ' + LL_CustomUI.V4LLPanel_notconnected_phoneNumber;
                LL_CustomUI.V4Panel.windowHTML +=           '</span>';
                LL_CustomUI.V4Panel.windowHTML +=       '</span>';
                LL_CustomUI.V4Panel.windowHTML +=   '</p>';
            }

            LL_CustomUI.V4Panel.windowHTML +=                     '</td>';
            LL_CustomUI.V4Panel.windowHTML +=                 '</tr>';
            LL_CustomUI.V4Panel.windowHTML +=             '</table></div>';
            LL_CustomUI.V4Panel.windowHTML +=             '<div style="height:37px;overflow:hidden;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="background-color: transparent; margin-top:0;">';
            LL_CustomUI.V4Panel.windowHTML +=                 '<tr style="background-color:transparent;">';
            LL_CustomUI.V4Panel.windowHTML +=                     '<td style="height: 37px;vertical-align: middle; padding: 0; border: 0; background-color: transparent !important;">';
            LL_CustomUI.V4Panel.windowHTML +=                         '<p id="V4LLPanel_provideCodeMessage" style="line-height: 17px;font-weight:normal;width:277px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; text-align:center; text-align:center; margin: 0; padding: 0 10px; color:#' + LL_CustomUI.V4LLPanel_provideCodeMessage_color + '; font-size: ' + LL_CustomUI.V4LLPanel_provideCodeMessage_font_size + 'px !important; font-family: ' + LL_CustomUI.V4LLPanel_provideCodeMessage_font_family + ';">';
            LL_CustomUI.V4Panel.windowHTML +=                             LL_CustomUI.V4LLPanel_notconnected_provideNumber_text;
            LL_CustomUI.V4Panel.windowHTML +=                         '</p>';
            LL_CustomUI.V4Panel.windowHTML +=                     '</td>';
            LL_CustomUI.V4Panel.windowHTML +=                 '</tr>';
            LL_CustomUI.V4Panel.windowHTML +=             '</table></div>';
            LL_CustomUI.V4Panel.windowHTML +=         '<p id="V4LLPanel_NumberBox" aria-live="assertive" style="font-weight:normal;-webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box; text-align: center; padding: 13px 0 12px 0; margin: 5px 0; height:22px; line-height:23px; width:252px; margin-left:10px; background-color: #' + LL_CustomUI.V4LLPanel_NumberBox_background_color + ' !important; color: #' + LL_CustomUI.V4LLPanel_NumberBox_color + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_NumberBox_font_size + 'px !important; font-family: ' + LL_CustomUI.V4LLPanel_NumberBox_font_family + ';"><span style="margin-top:3px; background:url(' + LL_CustomUI.img('/framework/v4/resources/images/V4LLPanel/V4LLPanelPreload.gif') + ') no-repeat; width:15px; height:15px; display:block; margin:0 auto; margin-top:1px;" id="V4LLPanel_Preload"></span></p>';
            LL_CustomUI.V4Panel.windowHTML +=         '<p id="V4LLPanel_DisconnectBtn" style="display:none;width:252px; margin-left:10px; margin-top:7px; padding-top:12px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_separator) + ') repeat-x !important; _margin-top:19px !important;" class="LLV4Separator"><a id="V4LLPanel_DisconnectTrigger" role="button" tabindex="0.1" aria-label="' + LL_CustomUI.ADA_V4LLPanel_DisconnectTrigger + '" onmouseover="LL_CustomUI.V4Panel.toggleDisconnectBtn(true)" onmouseout="LL_CustomUI.V4Panel.toggleDisconnectBtn(false)" onclick="LL_CustomUI.V4Panel.doDisconnect()" style="height: 24px !important; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_disconnect_button) + ') no-repeat; color: #' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_color + '; font-family: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_size + 'px; font-weight: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_style + ' !important; margin-bottom:8px; margin-top:2px; width:142px; text-align:center; display:block; text-decoration:none; padding-top:5px; margin-left:58px;" href="javascript:void(0)">' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text + '</a></p>';
            LL_CustomUI.V4Panel.windowHTML +=         '<div id="V4LLPanel_termsAndConditionsText" style="width:252px; margin-left:10px; padding-top:18px; margin-top:10px; text-align:center; background: url(' + LL_CustomUI.img(LL_CustomUI.LLpassToBeginText_background) + ') repeat-x left top !important;" class="LLV4Separator">';
            LL_CustomUI.V4Panel.windowHTML +=             '<a href="javascript:void(0)" onclick="LL_CustomUI.V4Panel.openTermsAndConditions();" id="V4LLPanel_TermsAndConditions" style="font-weight:normal;margin-bottom:6px; margin-top:15px; font-size: ' + LL_CustomUI.V4LLPanel_TermsAndConditions_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_TermsAndConditions_color + ' !important; font-family: '+ LL_CustomUI.V4LLPanel_TermsAndConditions_font_family +' !important;">' + LL_CustomUI.V4LLPanel_notconnected_termsAndConditions_text + '</a>';
            LL_CustomUI.V4Panel.windowHTML +=         '</div>';
            LL_CustomUI.V4Panel.windowHTML +=         '<p id="V4LLPanel_PoweredBy" style="font-weight:normal;width:252px; margin-left: 10px !important; text-align: center; padding: 4px 0; margin: 14px 0; padding-top:8px; height:15px; clear:both; background: url(' + LL_CustomUI.img(LL_CustomUI.LLpassToBeginText_background) + ') repeat-x left top !important; color: #' + LL_CustomUI.V4LLPanel_PoweredBy_color + ' !important; font-family: ' + LL_CustomUI.V4LLPanel_PoweredBy_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_PoweredBy_font_size + 'px !important; _margin-left: 12px !important;" class="LLV4Separator">' + LL_CustomUI.V4LLPanel_notconnected_poweredBy_text + '</p><span hidden="true" style="display:none;" aria-hidden="false">' + LL_CustomUI.ADA_V4LLPanel_notconnected_poweredBy_modalEnd + '</span>';
            LL_CustomUI.V4Panel.windowHTML +=     '</div>';
            LL_CustomUI.V4Panel.windowHTML += '</div>';

            LL_CustomUI.V4Panel.innerHTML = LL_CustomUI.V4Panel.windowHTML;
            LL_CustomUI.V4Panel.displayError = function () {
                if (LL_CustomUI.V4Panel.displayError_shown)
                    return;

                LL_CustomUI.$("V4LLPanel_NumberBox").style.display = "none";
                LL_CustomUI.$("V4LLPanel_provideCodeMessage").innerHTML = LL_CustomUI.v3TryLater; //"<br />The service is temporary unavailable. <br />Please try again later.";
                LL_CustomUI.$("V4LLPanel_provideCodeMessage").style.width = "250px";
                LL_CustomUI.$("V4LLPanel_provideCodeMessage").style.margin = "5px";
                LL_CustomUI.$("V4LLPanel_provideCodeMessage").style.padding = "5px";
                var InnerTitle_copy = LL_CustomUI.$("V4LLPanel_InnerTitle").cloneNode(true);
                InnerTitle_copy.setAttribute("id", "V4LLPanel_InnerTitle_error");
                LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").appendChild(InnerTitle_copy);
                var p = LL_CustomUI.$("V4LLPanel_provideCodeMessage");
                var i = 1;
                //return;
                try {
                    while (i < 6) {
                        p = p.parentNode;
                        if (p.style.height)
                            p.style.height = parseInt(p.style.height) + 23 + "px";
                        i++;
                        if (p.nodeName == "BODY")
                            break;
                    }
                }
                catch (ex) { }
                LL_CustomUI.V4Panel.displayError_shown = true;
            };

            LL_CustomUI.V4Panel.start = function () {
                LL_CustomUI.V4Panel.numberGenerationWindow = LL_CustomUI.$("V4LLPanel");
            };

            LL_CustomUI.V4Panel.getInitialHandle = function () {
                LL_CustomUI.V4Panel.initialHandle = LL_CustomUI.$("V4LLPanel_GenericToggler");
                LL_CustomUI.V4Panel.initialHandleNumberGenerated = LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent");
            };

            // Initializing the open/close functionality
            LL_CustomUI.V4Panel.toggle = function (action) {
                if (action == "expand") {
                    LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_PanelMinimize,V4LLPanel_PanelClose,V4LLPanel_TermsAndConditions,V4LLPanel_PoweredBy,V4LLPanel_HiddenPhone,V4LLPanel_provideCodeMessage", "enable");
                    LL_CustomUI.V4Panel.isOpen = true;
                    LL_CustomUI.V4Panel.start();

                    // Showing the LLPanel
                    LL_CustomUI.V4Panel.numberGenerationWindow.style.height = LL_CustomUI.V4Panel.numberGenerationWindowHeight + "px";

                    if(LL_CustomUI.commonFunctions.isQuirksMode()) {
                        if(parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                        } else {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
                        }
                    }

                    LL_CustomUI.commonFunctions.doFocus("V4LLPanel");
                    //document.getElementById("V4LLPanel").focus();
                    // Generating a random access code for demo purposes
                    if (!LL_CustomUI.V4Panel.numberAlreadyGenerated) {
                        if (LL_CustomUI.V4Panel.isPreviewMode) {
                            var randomNumber = Math.floor(Math.random() * 900000) + 100000;
                            LL_CustomUI.V4Panel.setPresentationCode(randomNumber);
                        }
                        else {
                            LL_ICB_Core.init();
                            LL_ICB_Core.StartSession();
                        }
                    }
                    else {
                        LL_CustomUI.commonFunctions.doFocus('V4LLPanel_NumberBox');
                    //LL_CustomUI.$('V4LLPanel_NumberBox').focus();
                    }

                    LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "hidden";
                    LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").style.visibility = "hidden";

                    if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                        LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                    }
                    LL_CustomUI.V4Panel.automaticClosingTimer = new LL_CustomUI.commonFunctions.Timeout(function () {
                        //console.log("" + new Date().toLocaleString() + ": collapsing due to timer: #5");

                        LL_CustomUI.V4Panel.collapse();
                    }, 9999);

                }
                else if (action == "collapse") {      // Closing
                    //do not collapse the Panel if Yes/No Dialog is shown;
                    if (LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen || (LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow") && LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow").style.display == "block")) {
                        return;
                    }
                    else if (!LL_CustomUI.V4Panel.isOpen && !LL_CustomUI.V4Panel.presentationCode)
                        return;

                    LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_PanelMinimize,V4LLPanel_PanelClose,V4LLPanel_TermsAndConditions,V4LLPanel_PoweredBy,V4LLPanel_CloseConfirmButton,V4LLPanel_CloseDeclineButton,V4LLPanel_HiddenPhone,V4LLPanel_provideCodeMessage", "disable");

                    LL_CustomUI.V4Panel.isOpen = false;
                    LL_CustomUI.V4Panel.start();
                
                    if(LL_CustomUI.commonFunctions.isQuirksMode()) {
                        LL_CustomUI.V4Panel.numberGenerationWindow.style.height = 1 + "px";
                    } else {
                        LL_CustomUI.V4Panel.numberGenerationWindow.style.height = 0 + "px";
                    }

                    if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && LL_CustomUI.V4Panel.presentationCode)
                        LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.visibility = "hidden";

                    LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").style.visibility = "visible";
                    LL_CustomUI.commonFunctions.doFocus('V4LLPanel_CollapsedNarrowNoAgent');
                    //LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").focus();
                    LL_CustomUI.$("V4LLPanel_GenericToggler").style.display = "none";
                
                    if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                        LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                    }
                }
            };
            LL_CustomUI.V4Panel.expand = function() {
                LL_CustomUI.V4Panel.toggle("expand");
            };
            LL_CustomUI.V4Panel.collapse = function() {
                LL_CustomUI.V4Panel.toggle("collapse");
            };
            LL_CustomUI.V4Panel.hide = function(ms) {
                if (!ms) ms = 0;
                setTimeout(function () {
                    try {
                        LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").style.display = "none";
                        LL_CustomUI.$("V4LLPanel_HintBlock").style.display = "none";
                        LL_CustomUI.$("V4LLPanel_GenericToggler").style.display = "none";
                        LL_CustomUI.$("V4LLPanel").style.display = "none";
                    }
                    catch (e) { }
                }, ms);
            };
            LL_CustomUI.V4Panel.setPresentationCode = function(pc) {
                LL_CustomUI.V4Panel.presentationCode = pc;
                var collapsedNumContNarrow = LL_CustomUI.$("V4LLPanel_CollapsedNumContNarrow");
                if (window.LL_ICB_Core && LL_ICB_Core.SID) {
                    collapsedNumContNarrow.innerHTML = LL_CustomUI.V3Activating_text;
                    collapsedNumContNarrow.style.fontWeight = "bold";
                }
                else {
                    collapsedNumContNarrow.innerHTML = pc;
                }

                //store it in case there will be a redirect
                if (window.LL_Storage_Manager && window.LL_ICB_Core && LL_ICB_Core.presentationToken) {
                    LL_Storage_Manager.setItemAsync(LL_ICB_Core.presentationToken, "presentationCode", pc);
                }

                var pcNoSpace = pc;
                if (pc.length == 6)
                    pc = "" + pc.substring(0, 3) + " " + pc.substring(3, 6);
                setTimeout(function () {
                    try {
                        if (LL_CustomUI.$('V4LLPanel_NumberBox')) {
                            //LL_CustomUI.$('V4LLPanel_NumberBox').focus();
                            if (window.LL_ICB_Core && LL_ICB_Core.SID) {
                                LL_CustomUI.$("V4LLPanel_NumberBox").innerHTML = LL_CustomUI.V3Activating_text;
                            }
                            else {
                                LL_CustomUI.$('V4LLPanel_NumberBox').innerHTML = pc;
                            }
                            LL_CustomUI.commonFunctions.doFocus('V4LLPanel_NumberBox');
                        //setTimeout(function() { LL_CustomUI.$('V4LLPanel_PhoneNumber').focus(); }, 777);
                        }
                    }
                    catch (e) { }
                }, 40);
                LL_CustomUI.V4Panel.numberAlreadyGenerated = true;
            };

            LL_CustomUI.V4Panel.setAgentConnected = function() {
                LL_CustomUI.$("V4LLPanel_DisconnectBtn").style.display = "block";
                LL_CustomUI.V4Panel.isAgentConnected = true;
            };

            LL_CustomUI.V4Panel.toggleDisconnectBtn = function(flag) {
                var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_disconnect_button_hover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_disconnect_button)) + "') no-repeat",
                colorStyle = flag ? LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_hover_color : LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_color;
                
                LL_CustomUI.$("V4LLPanel_DisconnectTrigger").style.background = style;
                LL_CustomUI.$("V4LLPanel_DisconnectTrigger").style.color = "#" + colorStyle;
            };

            LL_CustomUI.V4Panel.doDisconnect = function(evt) {
                LL_CustomUI.V4Panel.hide();
                // Agent is not connected yet, LL_ICB_Core.doDisconnect(true, true) is defined in ll_startICB.js
                if (window.LL_Debug) {
                    var pc_token = window.communicationHandler ? communicationHandler.presentationToken : LL_ICB_Core.presentationToken;
                    LL_Debug.set(pc_token, "DisconnectReason", "UserAction");
                }
                LL_ICB_Core.doDisconnect(true, evt);
                if (window.LL_Storage_Manager) {
                    LL_Storage_Manager.clear(LL_ICB_Core.siteCode);
                    LL_Storage_Manager.clear(LL_ICB_Core.siteCode);
                    LL_Storage_Manager.clear(LL_ICB_Core.presentationToken);
                }
            };

            // Opening the terms and conditions popup
            LL_CustomUI.V4Panel.openTermsAndConditions = function () {
                try {
                    var tcWindowReference = window.open(LL_CustomUI.V4Panel.faqURL, "FAQ", "toolbar=0,scrollbars=yes,location=0,statusbar=0,menubar=0,resizable=0,titlebar=0,status=0,width=615,height=613, left=" + ((screen.width - 610) / 2) + ",top=" + ((screen.height - 613) / 2));
                    tcWindowReference.focus();
                }
                catch (ex) { }
            };

            // V4Panel close confirmation box
            LL_CustomUI.V4Panel.openDisconnectConfirmWindow = function () {

                LL_CustomUI.V4Panel.toggleConfirmYesBtn(false);
                LL_CustomUI.V4Panel.toggleConfirmNoBtn(false);

                LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow").style.display = "block";
                LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen = true;

                // Clearing the automatic closing timer if the confirm window is open
                if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                    LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                }

                LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_CloseDeclineButton,V4LLPanel_CloseConfirmButton", "enable");
                LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_PanelMinimize,V4LLPanel_PanelClose,V4LLPanel_TermsAndConditions", "disable");
        	    
                LL_CustomUI.commonFunctions.doFocus('V4LLPanelDisconnectConfirmWindow');
            //LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow").focus();
            };

            LL_CustomUI.V4Panel.confirmSessionEnd = function (event) {
                LL_CustomUI.V4Panel.declineSessionEnd(); // Closing the session end prompt
                // agent is not connected (LL_ICB_Core.doDisconnect(true, true) - in ll_startICB.js)
                if (window.LL_Debug) {
                    var pc_token = window.communicationHandler ? communicationHandler.presentationToken : LL_ICB_Core.presentationToken;
                    LL_Debug.set(pc_token, "DisconnectReason", "UserAction");
                }
                if (LL_ICB_Core.errorOccured)
                    LL_ICB_Core.errorOccured = false;
                LL_ICB_Core.doDisconnect(true, event);
            };

            LL_CustomUI.V4Panel.declineSessionEnd = function () {
                LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_PanelMinimize,V4LLPanel_PanelClose,V4LLPanel_TermsAndConditions", "enable");
                try {
                    LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen = false;
                    LL_CustomUI.$("V4LLPanelDisconnectConfirmWindow").style.display = "none";
                }
                catch (e) { }

                // Resetting the automatic closing timer
                if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                    LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                }
                LL_CustomUI.V4Panel.automaticClosingTimer = new LL_CustomUI.commonFunctions.Timeout(function () {
                    try {
                        //console.log("" + new Date().toLocaleString() + ": collapsing due to timer: #6");
                        LL_CustomUI.V4Panel.collapse();
                    }
                    catch (ex) { }
                }, 9999);

                LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_CloseDeclineButton,V4LLPanel_CloseConfirmButton", "disable");

            };

            LL_CustomUI.V4Panel.toggleConfirmYesBtn = function(flag) {
                var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background_hover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background)) + "') no-repeat";
                var colorStyle = flag ? LL_CustomUI.V4LLPanel_CloseConfirmButton_hover_text_color : LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color;
                if(LL_CustomUI.$("V4LLPanel_CloseConfirmButton")) {
                    LL_CustomUI.$("V4LLPanel_CloseConfirmButton").style.background = style;
                    LL_CustomUI.$("V4LLPanel_CloseConfirmButton").style.color = "#" + colorStyle;
                }
            };

            LL_CustomUI.V4Panel.toggleConfirmNoBtn = function(flag) {
                var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background_hover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background)) + "') no-repeat";
                var colorStyle = flag ? LL_CustomUI.V4LLPanel_CloseConfirmButton_hover_text_color : LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color;
                if(LL_CustomUI.$("V4LLPanel_CloseDeclineButton")) {
                    LL_CustomUI.$("V4LLPanel_CloseDeclineButton").style.background = style;
                    LL_CustomUI.$("V4LLPanel_CloseDeclineButton").style.color = "#" + colorStyle;
                }
            };

            LL_CustomUI.V4Panel.loadScrollPlugin = function ($) {
                //if (typeof(jQuery) == "undefined")
                //jQuery = $;

                var loadScript = function () { };
                if (window.LL_ICB_Core && typeof LL_ICB_Core.createJsonRequest === "function") 
                    loadScript = LL_ICB_Core.createJsonRequest;
                else if (window.LL_Mini_Launcher && typeof LL_Mini_Launcher.createJsonRequest === "function") 
                    loadScript = LL_Mini_Launcher.createJsonRequest;

                loadScript("https://" + LL_Deployment.mainServerPath + "/webinterfaces/icb/client/js/include/jquery.jscrollpane.min.js", "jscrollpane_url");
            };


            // Showing the hints block
            LL_CustomUI.V4Panel.hint = { };
            LL_CustomUI.V4Panel.hint.show = function() {
                if (LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility == "hidden" && (LL_CustomUI.V4LLPanel_position == "bottom_right" || LL_CustomUI.V4LLPanel_position == "bottom_left"  || LL_CustomUI.V4LLPanel_position == "bottom_middle")) {
                    LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "visible";
                }
            };
            LL_CustomUI.V4Panel.hint.hide = function() {
                LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "hidden";
            };

            // Preview mode for the customization through the admin console
            LL_CustomUI.V4Panel.enablePreviewMode = function () {
                LL_CustomUI.V4Panel.isPreviewMode = true;
            };

            LL_CustomUI.V4Panel.isAndroid = function() {
                try {
                    var nua = navigator.userAgent;
                    var is_android = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);
                    if(is_android) {
                        return true;
                    }else {
                        return false;
                    }
                }catch(ex) {
                    return false;
                }
            };
            
            LL_CustomUI.V4Panel.adaptV4panel = function() {
                LL_CustomUI.V4Panel.orginalHeight = window.innerHeight;
                LL_CustomUI.V4Panel.mobile_timer = "";
                	
                LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
                    LL_CustomUI.V4Panel.orginalHeight = window.innerHeight;
                    LL_CustomUI.V4Panel.showAdaptedV4Panel();
                });
                
                LL_CustomUI.commonFunctions.listen("scroll", window, function (event) {
                    LL_CustomUI.V4Panel.showAdaptedV4Panel();
                });
                                
                var appletContainer = document.getElementsByTagName('body')[0];          
                appletContainer.addEventListener('gestureend', LL_CustomUI.V4Panel.showAdaptedV4Panel, false);
            
                setTimeout(function() {
                    LL_CustomUI.V4Panel.showAdaptedV4Panel();
                }, 100);
            };

            LL_CustomUI.V4Panel.showAdaptedV4Panel = function() {
                
                clearTimeout(LL_CustomUI.V4Panel.mobile_timer);
                LL_CustomUI.V4Panel.mobile_timer = setTimeout(function() {
                    if(window.innerHeight/LL_CustomUI.V4Panel.orginalHeight < 0.7) {
                        document.getElementById("V4LLPanel_CollapsedNarrowNoAgent").style.position = "fixed";	            
                        document.getElementById("V4LLPanel_CollapsedNarrowNoAgent").style.top ="";	            
                        document.getElementById("V4LLPanel_CollapsedNarrowNoAgent").style.left ="";
                    }else {	        
                        document.getElementById("V4LLPanel_CollapsedNarrowNoAgent").style.position = "absolute";
                        document.getElementById("V4LLPanel_CollapsedNarrowNoAgent").style.top = (window.innerHeight - 36) + window.scrollY + "px";
                        document.getElementById("V4LLPanel_CollapsedNarrowNoAgent").style.left = (window.innerWidth - 175) + window.scrollX + "px";
                        
                    }
                    
                }, 333);
            };

            // Initializing the environment
            LL_CustomUI.V4Panel.appendElements = function () {
                if (LL_CustomUI.$("V4LLPanel")) {
                    //this element was already added
                    return;
                }

                // Appending the element to DOM
                var LLPanelNumberGenerationWindow = document.createElement('div');
                LLPanelNumberGenerationWindow.innerHTML = LL_CustomUI.V4Panel.windowHTML;
                document.body.appendChild(LLPanelNumberGenerationWindow);

                try {
                    if(LL_CustomUI.V4Panel.isAndroid()) {
                        LL_CustomUI.V4Panel.adaptV4panel();
                    }
                }catch(ex) {}
                
                if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
                    LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_CollapsedNarrowNoAgent", LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_GenericToggler", LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel", LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_HintBlock", LL_CustomUI.V4LLPanel_position);
                }

                // Adjusting the middle panel position when resized
                if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
                    LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
                        if (!document.getElementById("V4LLPanel_CollapsedNarrowNoAgent"))
                            return;
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_CollapsedNarrowNoAgent", LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_GenericToggler", LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel", LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_HintBlock", LL_CustomUI.V4LLPanel_position);
                    });
                }

                // Adding a "scroll" event listener for Quirks mode
                if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.listen("scroll", window, function () {
                        //var positionProperty = LL_CustomUI.$("V4LLPanel_GenericToggler").style.position;
                        //if (positionProperty == "absolute") {
                        var scrollPosition = LL_CustomUI.commonFunctions.GetScrollPosition();
                        if(LL_CustomUI.$("V4LLPanel_GenericToggler") != null) {
                            LL_CustomUI.$("V4LLPanel_GenericToggler").style.bottom = -scrollPosition + "px";
                        }
                        if(LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent") != null) {
                            LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").style.bottom = -scrollPosition + "px";
                        }
                        if(LL_CustomUI.$("V4LLPanel_HintBlock") != null) {
                            LL_CustomUI.$("V4LLPanel_HintBlock").style.bottom = -scrollPosition + 30 + "px";
                        }
                        if(LL_CustomUI.$("V4LLPanel") != null) {
                            LL_CustomUI.$("V4LLPanel").style.bottom = -scrollPosition + "px";
                        }
                    //}
                    });
                }

                // Adjusting the panels position on window scroll
                if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.listen("scroll", window, function () {
                        if(LL_CustomUI.$("V4LLPanel_GenericToggler") != null) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_GenericToggler", 0, LL_CustomUI.V4LLPanel_position);
                        }
                        if(LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent") != null) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_CollapsedNarrowNoAgent", 0, LL_CustomUI.V4LLPanel_position);
                        }
                        if(LL_CustomUI.$("V4LLPanel_HintBlock") != null) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_HintBlock", 30, LL_CustomUI.V4LLPanel_position);
                        }
                        
                        if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                        } else {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
                        }

                    });
                }

                // Adjusting the panels position on window resize
                if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.listen("resize", window, function () {
                        if (!document.getElementById("V4LLPanel_CollapsedNarrowNoAgent"))
                            return;
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_GenericToggler", 0, LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_CollapsedNarrowNoAgent", 0, LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_HintBlock", 30, LL_CustomUI.V4LLPanel_position);
                        if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                        } else {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
                        }

                    });
                }

                // Adjusting the panels position on window load
                if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_GenericToggler", 0, LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_CollapsedNarrowNoAgent", 0, LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_HintBlock", 30, LL_CustomUI.V4LLPanel_position);
                    if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                    } else {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
                    }
                }

                if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.$("V4LLPanel").style.height = 1 + "px";
                }

                //Appending the number generation box
                LL_CustomUI.$("V4LLPanel").className += "makeVisible";

                // Adding an event listener to the window object to hide the panel if clicked outside
                LL_CustomUI.commonFunctions.listen("click", window, function (event) {
                    var obj = event.target || event.srcElement;
                    if (obj.id.indexOf("LLPanel") < 0 && LL_CustomUI.V4Panel.isOpen == true) {
                        //console.log("" + new Date().toLocaleString() + ": outside area clicked: #7");
                        LL_CustomUI.V4Panel.collapse();
                    }
                });

                // Clearing the automatic closing timer if mouse is over the panel
                if (!LL_CustomUI.V4Panel.isPreviewMode) {
                    LL_CustomUI.commonFunctions.listen("mouseover", LL_CustomUI.$("V4LLPanel"), function (event) {
                        if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                            LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                        }
                    });

                    // Resetting a new automatic closing timer if the mouse is out of the panel
                    LL_CustomUI.commonFunctions.listen("mouseout", LL_CustomUI.$("V4LLPanel"), function (event) {
                        //should work only if panel is visible and expanded

                        if ((window.LL_Deployment && LL_Deployment.v4CustomButtonID) && !LL_CustomUI.V4Panel.presentationCode)
                            return;

                        if (!LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen) {
                            if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                                LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                            }
                            LL_CustomUI.V4Panel.automaticClosingTimer = new LL_CustomUI.commonFunctions.Timeout(function () {
                                try {
                                    //console.log("" + new Date().toLocaleString() + ": timer-based collapse: #8");
                                    LL_CustomUI.V4Panel.collapse();
                                }
                                catch (ex) { }
                            }, 9999);
                        }
                    });
                }

                LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_PanelMinimize,V4LLPanel_PanelClose,V4LLPanel_TermsAndConditions,V4LLPanel_PoweredBy,V4LLPanel_CloseConfirmButton,V4LLPanel_CloseDeclineButton,V4LLPanel_HiddenPhone,V4LLPanel_provideCodeMessage", "disable");

                // Adding a triggering listener for the flying window
                if (typeof LL_Deployment.v4CustomButtonID != "undefined" && LL_Deployment.v4CustomButtonID != "" && LL_Deployment.v4CustomButtonID && window.LL_CustomUI.V4PanelState == "new") {
                    LL_CustomUI.anyPositionV4PanelOpener.init();
                    LL_CustomUI.$("V4LLPanel_GenericToggler").style.visibility = "hidden";

                    if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled) {
                        LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.visibility = "hidden";

                        // Dynamically appending the JS libs needed for the scrollbar
                        if (typeof ($) != "undefined") {
                            LL_CustomUI.V4Panel.loadScrollPlugin($);
                        }
                    }
                }

                // Showing the terms and conditions window if it's enabled
                if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && (typeof LL_Deployment.v4CustomButtonID == "undefined" || LL_Deployment.v4CustomButtonID == "")) {

                    // Dynamically appending the JS libs needed for the scrollbar
                    if (typeof ($) != "undefined") {
                        LL_CustomUI.V4Panel.loadScrollPlugin($);
                    }

                    LL_CustomUI.termsAndConditionsWindow.appendElements();
                    LL_CustomUI.$("V4LLPanel_GenericToggler").style.visibility = "hidden";

                    if (typeof LL_Deployment.v4CustomButtonID != "undefined" && LL_Deployment.v4CustomButtonID != "") {
                        LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.visibility = "hidden";
                    }
                }

                LL_CustomUI.commonFunctions.removeListener("mouseover", "V4LLPanel_CloseDeclineButton,V4LLPanel_CloseConfirmButton", LL_CustomUI.commonFunctions.globalMouseOverHandler);
                LL_CustomUI.commonFunctions.listen("mouseover", "V4LLPanel_CloseDeclineButton,V4LLPanel_CloseConfirmButton", LL_CustomUI.commonFunctions.globalMouseOverHandler);
            }

            LL_CustomUI.V4Panel.init = LL_CustomUI.V4Panel.appendElements;
        }
        else {
            //agent is already connected
            LL_CustomUI.V4Panel = { };
            LL_CustomUI.V4Panel.windowHTML = "";
            LL_CustomUI.V4Panel.agentConntectedView = "";
            LL_CustomUI.V4Panel.numberGenerationWindow = "";
            LL_CustomUI.V4Panel.initialHandleNumberGenerated = "";
            LL_CustomUI.V4Panel.faqURL = LL_CustomUI.V4LLPanel_FAQURL;
            LL_CustomUI.V4Panel.isAgentConnected = false;
            LL_CustomUI.V4Panel.closeWhenIdleTimeout = "";
            LL_CustomUI.V4Panel.automaticClosingTimer = "";
            LL_CustomUI.V4Panel.isOpen = false;
            LL_CustomUI.V4Panel.isPreviewMode = false;
            LL_CustomUI.V4Panel.agentConnectedWindowHeight = 214;
            LL_CustomUI.V4Panel.numberGenerationWindowHeight = 302;
            LL_CustomUI.V4Panel.presentationCode = "";
	    	
            // Preventing cropping of the panel in case of Right and Left locations
            if(LL_CustomUI.commonFunctions.isLeftLocation() || LL_CustomUI.commonFunctions.isRightLocation()) {
                LL_CustomUI.V4Panel.numberGenerationWindowHeight = 308;
            }

            LL_CustomUI.V4Panel.mobile_timer = "";
            LL_CustomUI.V4Panel.orginalHeight = "";

            if(LL_CustomUI.commonFunctions.isLeftLocation()) {
                if(LL_CustomUI.commonFunctions.isAnyIE()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_CollapsedNarrow" style="width:36px; height:157px; visibility:hidden; z-index:1500001; position:fixed; _position:absolute !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + ' cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_collapsed_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()"><span id="V4LLPanel_CollapsedNumContNarrow" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow_connected + '" role="button" aria-live="assertive" tabindex="0" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); margin:46px 8px 12px 9px; float:left; font-family: ' + LL_CustomUI.V4LLPanel_header_number_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_header_number_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_header_number_color + '; ' +  LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"></span><div id="V4LLPanel_InnerLogo" style="background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_logo) + ') no-repeat !important; margin: 19px 10px 0 5px; width: 23px; height: 24px; float: left; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                } else {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_CollapsedNarrow" style="width:36px; height:157px; visibility:hidden; z-index:1500001; position:fixed; _position:absolute !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + ' cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_collapsed_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()"><span id="V4LLPanel_CollapsedNumContNarrow" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow_connected + '" role="button" aria-live="assertive" tabindex="0" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); float:left; margin:59px 8px 0 -8px; font-family: ' + LL_CustomUI.V4LLPanel_header_number_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_header_number_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_header_number_color + '; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"></span><div id="V4LLPanel_InnerLogo" style="background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_logo) + ') no-repeat !important; margin: 48px 10px 0 5px; width: 23px; height: 24px; float: left; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                }
            } else if(LL_CustomUI.commonFunctions.isRightLocation()) {
                if(LL_CustomUI.commonFunctions.isAnyIE()) {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_CollapsedNarrow" style="width:36px; height:157px; visibility:hidden; z-index:1500001; position:fixed; _position:absolute !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + ' cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_collapsed_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()"><span id="V4LLPanel_CollapsedNumContNarrow" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow_connected + '" role="button" aria-live="assertive" tabindex="0" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); margin:46px 8px 12px 12px; float: left; font-family: ' + LL_CustomUI.V4LLPanel_header_number_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_header_number_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_header_number_color + '; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"></span><div id="V4LLPanel_InnerLogo" style="background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_logo) + ') no-repeat !important; margin: 19px 10px 0 9px; width: 23px; height: 24px; float: left; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                } else {
                    LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_CollapsedNarrow" style="width:36px; height:157px; visibility:hidden; z-index:1500001; position:fixed; _position:absolute !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + ' cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_collapsed_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()"><span id="V4LLPanel_CollapsedNumContNarrow" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow_connected + '" role="button" aria-live="assertive" tabindex="0" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); float:left; margin:59px 8px 0 -3px; font-family: ' + LL_CustomUI.V4LLPanel_header_number_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_header_number_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_header_number_color + '; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"></span><div id="V4LLPanel_InnerLogo" style="background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_logo) + ') no-repeat !important; margin: 48px 10px 0 9px; width: 23px; height: 24px; float: left; _margin-left: 5px !important;" class="LLV4Logo"></div></div>';
                }
            } else {
                LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_CollapsedNarrow" style="width:157px; height:36px; visibility:hidden; z-index:1500001; position:fixed; _position:absolute !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + ' cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_collapsed_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '" onclick="LL_CustomUI.V4Panel.expand()"><div id="V4LLPanel_InnerLogo" style="background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_logo) + ') no-repeat !important; margin: 9px 10px 0 10px; width: 23px; height: 24px; float: left; _margin-left: 5px !important;" class="LLV4Logo"></div><span id="V4LLPanel_CollapsedNumContNarrow" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CollapsedNumContNarrow_connected + '" role="button" aria-live="assertive" tabindex="0" style="font-family: ' + LL_CustomUI.V4LLPanel_header_number_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_header_number_font_size + 'px; float:left; margin:12px 0 0 0; display:inline-block; width: 98px; text-align:center; color: #' + LL_CustomUI.V4LLPanel_header_number_color + '; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"></span></div>';
            }

            LL_CustomUI.V4Panel.windowHTML +=   '<div id="V4LLPanel" style="width: 284px; position: fixed; _position:absolute !important; z-index: 1500002; height: 0; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_background) + ') no-repeat !important;' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '">';
            LL_CustomUI.V4Panel.windowHTML +=       '<div id="V4LLPanel_InnerContainer" style="position: relative; padding: 42px 0 0 4px; zoom: 1; height: 130px; width: 277px !important;">';
            LL_CustomUI.V4Panel.windowHTML += '<div id="V4LLPanel_MovingToggler"  style="width: 256px; height: 46px; cursor: pointer; position: absolute; left: 0; top: 0; margin-left: 10px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_separator) + ') repeat-x left bottom;" class="LLV4Separator" onclick="LL_CustomUI.V4Panel.collapse()"><div id="V4LLPanel_LogoToggler" style="background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_logo) + ') no-repeat !important; margin:13px 16px 0 3px; width: 23px; height: 24px; float: left;" class="LLV4Logo"><div id="V4LLPanel_PanelClose" aria-label="' + LL_CustomUI.ADA_V4LLPanel_PanelClose + '" role="button" tabindex="0" style="position: absolute; width:17px; height:17px; cursor:pointer; margin:7px 0 0 0; right: 0; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_header_close_image) + ') no-repeat !important;"></div></div><span id="V4LLPanel_TogglerText" style="position:absolute; top: 17px; left: 34px; font-family: ' + LL_CustomUI.V4LLPanel_header_text_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_header_text_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_header_text_color + ' !important; font-weight: ' + LL_CustomUI.V4LLPanel_header_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_header_text_font_style + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_header_text + '</span>';
            LL_CustomUI.V4Panel.windowHTML +=           '</div>';
            LL_CustomUI.V4Panel.windowHTML +=           '<p id="V4LLPanel_ExpertConnectedText" style="margin-top:30px; margin-bottom:8px; padding-bottom:14px; text-align:center; width:252px; margin-left:10px; color: #' + LL_CustomUI.V4LLPanel_Connected_content_text_color + ' !important; font-family: ' + LL_CustomUI.V4LLPanel_Connected_content_text_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_Connected_content_text_font_size + 'px !important; font-weight: ' + LL_CustomUI.V4LLPanel_Connected_content_text_font_weight + ' !important; font-style: '+ LL_CustomUI.V4LLPanel_Connected_content_text_font_style +' !important; _padding-top:19px !important; ">' + LL_CustomUI.V4LLPanel_Connected_content_text + '</span>';
            LL_CustomUI.V4Panel.windowHTML +=           '<p id="V4LLPanel_DisconnectBtn" style="width:252px; margin-left:10px; margin-top:7px; padding-top:12px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_separator) + ') repeat-x !important; _margin-top:10px !important;" class="LLV4Separator"><a id="V4LLPanel_DisconnectTrigger" tabindex="0.1" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_DisconnectTrigger + '" onmouseover="LL_CustomUI.V4Panel.toggleDisconnectBtn(true)" onmouseout="LL_CustomUI.V4Panel.toggleDisconnectBtn(false)" onclick="LL_CustomUI.V4Panel.doDisconnect()" style="height: 24px !important; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_disconnect_button) + ') no-repeat; color: #' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_color + '; font-family: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_size + 'px; font-weight: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_font_style + ' !important; margin-bottom:8px; margin-top:2px; width:142px; text-align:center; display:block; text-decoration:none; padding-top:5px; margin-left:58px;" href="javascript:void(0)">' + LL_CustomUI.V4LLPanel_Connected_disconnect_button_text + '</a></p>';
            LL_CustomUI.V4Panel.windowHTML +=           '<p id="V4LLPanel_PoweredBy" style="width:252px; margin-left: 10px !important; text-align: center; padding: 4px 0; margin: 14px 0; padding-top:8px; height:15px; clear:both; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_separator) + ') repeat-x left top !important; color: #'+ LL_CustomUI.V4LLPanel_Connected_footer_text_color +' !important; font-family: ' + LL_CustomUI.V4LLPanel_Connected_footer_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_Connected_footer_text_font_size + 'px !important; font-weight: ' + LL_CustomUI.V4LLPanel_Connected_footer_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_Connected_footer_text_font_style + ' !important; _margin-left: 12px !important;" class="LLV4Separator">' + LL_CustomUI.V4LLPanel_Connected_footer_text + '</p>';
            LL_CustomUI.V4Panel.windowHTML +=       '</div>';
            LL_CustomUI.V4Panel.windowHTML +=       '<div style="display:none">' + LL_CustomUI.ADA_V4LLPanel_modalEnd + '</div>';
            LL_CustomUI.V4Panel.windowHTML +=   '</div>';

            LL_CustomUI.V4Panel.innerHTML = LL_CustomUI.V4Panel.windowHTML;

            LL_CustomUI.V4Panel.start = function () {
                LL_CustomUI.V4Panel.agentConntectedView = LL_CustomUI.$("V4LLPanel");
            },

            LL_CustomUI.V4Panel.getInitialHandle = function () {
                LL_CustomUI.V4Panel.agentConntectedView = LL_CustomUI.$("V4LLPanel_CollapsedNarrow");
            },

            LL_CustomUI.V4Panel.toggle = function (action) {
                if (action == "expand") {      // Open if the block is closed
                    LL_CustomUI.V4Panel.start();
                    LL_CustomUI.V4Panel.isOpen = true;

                    LL_CustomUI.V4Panel.agentConntectedView.style.height = LL_CustomUI.V4Panel.agentConnectedWindowHeight + "px";
                    LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.visibility = "hidden";
                    LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_DisconnectTrigger,V4LLPanel_PanelClose", "enable");
                    LL_CustomUI.commonFunctions.doFocus('V4LLPanel');
                    //document.getElementById("V4LLPanel").focus();
                    // A hack for Quirks mode
                    if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                        window.scrollBy(0, 1);
                    }
                }
                else if (action == "collapse") {      // Closing
                    LL_CustomUI.V4Panel.start();

                    // Handling Quirks mode
                    if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                        LL_CustomUI.V4Panel.agentConntectedView.style.height = 1 + "px";
                    } else {
                        LL_CustomUI.V4Panel.agentConntectedView.style.height = 0 + "px";
                    }

                    LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.visibility = "visible";
                    LL_CustomUI.commonFunctions.toggleADA_State("V4LLPanel_DisconnectTrigger,V4LLPanel_PanelClose", "disable");
                    LL_CustomUI.commonFunctions.doFocus('V4LLPanel_CollapsedNarrow');
                    //LL_CustomUI.$("V4LLPanel_CollapsedNarrow").focus();

                    LL_CustomUI.V4Panel.isOpen = false;

                    // Preview mode functionality
                    if (LL_CustomUI.V4Panel.isPreviewMode) {
                        LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.visibility = "visible";
                        LL_CustomUI.V4Panel.setPresentationCode("123456");
                    }

                    if (!LL_CustomUI.V4Panel.isPreviewMode && LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                        LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                    }
                }
            },
            LL_CustomUI.V4Panel.expand = function () {
                LL_CustomUI.V4Panel.toggle("expand");
                // Adjusting the panel position if it has position absolute - obsolete browsers/compatability mode
                var positionProperty = LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.position;
                if (positionProperty == "absolute") {
                    var scrollPosition = LL_CustomUI.commonFunctions.GetScrollPosition();
                    if(scrollPosition == 0) {
                        window.scrollBy(0, 1);
                    } else {
                        window.scrollBy(0, -1);
                    }
                }
            },
            LL_CustomUI.V4Panel.collapse = function () {
                LL_CustomUI.V4Panel.toggle("collapse");
            },
            LL_CustomUI.V4Panel.hide = function (ms) {
                if (!ms) ms = 0;
                setTimeout(function () {
                    try {
                        LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.display = "none";
                        LL_CustomUI.$("V4LLPanel").style.display = "none";
                    }
                    catch (e) { }
                }, ms);

            },
            LL_CustomUI.V4Panel.toggleDisconnectBtn = function (flag) {
                var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_disconnect_button_hover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_Connected_disconnect_button)) + "') no-repeat",
                colorStyle = flag ? LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_hover_color : LL_CustomUI.V4LLPanel_Connected_disconnect_button_text_color;
                
                LL_CustomUI.$("V4LLPanel_DisconnectTrigger").style.background = style;
                LL_CustomUI.$("V4LLPanel_DisconnectTrigger").style.color = "#" + colorStyle;
            },
            LL_CustomUI.V4Panel.doDisconnect = function (evt) {
                LL_CustomUI.V4Panel.hide();
                //this doDisconnect is raised when the Agent is connected already,  LL_ICB_Core.doDisconnect(true, evt) is defined in restoreSession.js
                if (window.LL_Debug && window.communicationHandler) {
                    LL_Debug.set(communicationHandler.presentationToken, "DisconnectReason", "UserAction");
                }
                LL_ICB_Core.doDisconnect(true, evt);
                // Showing a spinner image when the session is being disconnected
                LL_CustomUI.V4Panel.setSpinner();
                if (LL_Storage_Manager && window.communicationHandler) {
                    LL_Storage_Manager.clear(LL_ICB_Core.siteCode);
                    LL_Storage_Manager.clear(LL_ICB_Core.siteCode);
                    LL_Storage_Manager.clear(communicationHandler.presentationToken);
                }
            },
            LL_CustomUI.V4Panel.setPresentationCode = function (pc) {
                LL_CustomUI.V4Panel.presentationCode = pc;
                var container = LL_CustomUI.$("V4LLPanel_CollapsedNumContNarrow");
                if (window.LL_ICB_Core && LL_ICB_Core.SID) {
                    pc = LL_CustomUI.v4_activated_text;
                    if(container)
                        container.style.fontWeight = "bold";
                }

                if (container) {
                    if (container.innerHTML != pc)
                        container.innerHTML = pc;
                }
                else
                    setTimeout(function () {
                        LL_CustomUI.V4Panel.setPresentationCode(pc);
                    }, 1000);
            },
            // Indicates that the agent is connected and shows the "Disconnect button"
            LL_CustomUI.V4Panel.setAgentConnected = function () {
                LL_CustomUI.V4Panel.isAgentConnected = true;
                LL_CustomUI.V4Panel.isOpen = true;

                if (LL_Deployment.icbType == "FRAME") {
                    LL_CustomUI.$("V4LLPanel").style.height = LL_CustomUI.V4Panel.agentConnectedWindowHeight + "px";
                    LL_CustomUI.$("V4LLPanel_ExpertConnectedText").style.display = "block";

                    // Setting up automatic closure in 4 seconds if mouse is not over the panel
                    if (!LL_CustomUI.V4Panel.isPreviewMode) {
                        if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                            LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                        }
                        LL_CustomUI.V4Panel.automaticClosingTimer = new LL_CustomUI.commonFunctions.Timeout(function () {
                            LL_CustomUI.V4Panel.collapse();
                        }, 3999);
                    }
                } else {
                    LL_CustomUI.$("V4LLPanel_ExpertConnectedText").style.display = "block";
                    LL_CustomUI.V4Panel.collapse();
                }
            },
            // Preview mode for the customization through the admin console
            LL_CustomUI.V4Panel.enablePreviewMode = function () {
                isPreviewMode = true;
            },
            // Setting a spinner image instead of the access code when the session was disconnected
            LL_CustomUI.V4Panel.setSpinner = function() {
                var spinnerHTML = "<img src="+ LL_CustomUI.img('/framework/v4/resources/images/V4LLPanel/V4LLPanelPreload.gif') +" style='margin-top:2px;' alt='Please wait...' />",
                    container = LL_CustomUI.$("V4LLPanel_CollapsedNumContNarrow");

                if(container) {
                    container.innerHTML = spinnerHTML;
                }
            },
            LL_CustomUI.V4Panel.isAndroid = function() {
                try {
                    var nua = navigator.userAgent;
                    var is_android = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);
                    if(is_android) {
                        return true;
                    }else {
                        return false;
                    }
                }catch(ex) {
                    return false;
                }
            };
            
            LL_CustomUI.V4Panel.adaptV4panel = function() {
                LL_CustomUI.V4Panel.orginalHeight = window.innerHeight;
                LL_CustomUI.V4Panel.mobile_timer = "";
                	
                LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
                    LL_CustomUI.V4Panel.orginalHeight = window.innerHeight;
                    LL_CustomUI.V4Panel.showAdaptedV4Panel();
                });
                
                LL_CustomUI.commonFunctions.listen("scroll", window, function (event) {
                    LL_CustomUI.V4Panel.showAdaptedV4Panel();
                });
                                
                var appletContainer = document.getElementsByTagName('body')[0];          
                appletContainer.addEventListener('gestureend', LL_CustomUI.V4Panel.showAdaptedV4Panel, false);
            
                setTimeout(function() {
                    LL_CustomUI.V4Panel.showAdaptedV4Panel();
                }, 100);
            };

            LL_CustomUI.V4Panel.showAdaptedV4Panel = function() {
                
                clearTimeout(LL_CustomUI.V4Panel.mobile_timer);
                LL_CustomUI.V4Panel.mobile_timer = setTimeout(function() {
                    if(window.innerHeight/LL_CustomUI.V4Panel.orginalHeight < 0.7) {
                        document.getElementById("V4LLPanel_CollapsedNarrow").style.position = "fixed";	            
                        document.getElementById("V4LLPanel_CollapsedNarrow").style.top ="";	            
                        document.getElementById("V4LLPanel_CollapsedNarrow").style.left ="";
                    }else {	        
                        document.getElementById("V4LLPanel_CollapsedNarrow").style.position = "absolute";
                        document.getElementById("V4LLPanel_CollapsedNarrow").style.top = (window.innerHeight - 36) + window.scrollY + "px";
                        document.getElementById("V4LLPanel_CollapsedNarrow").style.left = (window.innerWidth - 175) + window.scrollX + "px";
                        
                    }
                    
                }, 333);
            };

            // Initializing the environment
            LL_CustomUI.V4Panel.appendElements = function () {

                LL_CustomUI.commonFunctions.removeNodes("V4LLPanel_HintBlock,V4LLPanel_GenericToggler,V4LLPanel,V4LLPanel_CollapsedNarrowNoAgent,V4LLPanel_CollapsedNarrow");

                // Appending the element to DOM
                var LLPanelAgentConnectedWindow = document.createElement('div');
                LLPanelAgentConnectedWindow.innerHTML = LL_CustomUI.V4Panel.windowHTML;
                document.body.appendChild(LLPanelAgentConnectedWindow);

                LL_CustomUI.V4Panel.setAgentConnected();
                
                try {
                    if(LL_CustomUI.V4Panel.isAndroid()) {
                        LL_CustomUI.V4Panel.adaptV4panel();
                    }
                }catch(ex) {}

                if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
                    LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_CollapsedNarrow", LL_CustomUI.V4LLPanel_position);
                    LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel", LL_CustomUI.V4LLPanel_position);
                }

                // Adjusting the middle panel position when resized
                if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
                    LL_CustomUI.commonFunctions.listen("resize", window, function (event) {

                        if (!document.getElementById("V4LLPanel_CollapsedNarrow"))
                            return;
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_CollapsedNarrow", LL_CustomUI.V4LLPanel_position);
                        LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel", LL_CustomUI.V4LLPanel_position);
                    });
                }

                // Adding a "scroll" event listener for Quirks mode
                if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.listen("scroll", window, function () {
                        var positionProperty = LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.position;
                        if (positionProperty == "absolute") {
                            var scrollPosition = LL_CustomUI.commonFunctions.GetScrollPosition();
                            LL_CustomUI.$("V4LLPanel_CollapsedNarrow").style.bottom = -scrollPosition + "px";
                            LL_CustomUI.$("V4LLPanel").style.bottom = -scrollPosition + "px";
                        }
                    });
                }

                // Adjusting the panels position on page load
                if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_CollapsedNarrow", 0, LL_CustomUI.V4LLPanel_position);
                    if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                    } else {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.agentConnectedWindowHeight, LL_CustomUI.V4LLPanel_position);
                    }
                }

                // Adjusting the panels position on window resize
                if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.listen("resize", window, function () {
                        if (!document.getElementById("V4LLPanel_CollapsedNarrow"))
                            return;

                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_CollapsedNarrow", 0, LL_CustomUI.V4LLPanel_position);
                        if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                        } else {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.agentConnectedWindowHeight, LL_CustomUI.V4LLPanel_position);
                        }

                    });
                }

                // Adjusting the panels position on window scroll
                if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.commonFunctions.listen("scroll", window, function () {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_CollapsedNarrow", 0, LL_CustomUI.V4LLPanel_position);
                        if (parseInt(LL_CustomUI.$("V4LLPanel").style.height) >= 1) {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", 0, LL_CustomUI.V4LLPanel_position);
                        } else {
                            LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel", LL_CustomUI.V4Panel.agentConnectedWindowHeight, LL_CustomUI.V4LLPanel_position);
                        }

                    });
                }

                // Adding an event listener to the window object to hide the panel if clicked outside
                LL_CustomUI.commonFunctions.listen("click", window, function (event) {
                    var obj = event.target || event.srcElement;
                    if (obj.id.indexOf("LLPanel") < 0 && LL_CustomUI.V4Panel.isOpen) {
                        LL_CustomUI.V4Panel.collapse();
                        //console.log("" + new Date().toLocaleString() + ": timer-based collapse: #9");

                    }
                });
                // Clearing the automatic closing timer if mouse is over the panel
                if (!LL_CustomUI.V4Panel.isPreviewMode) {
                    LL_CustomUI.commonFunctions.listen("mouseover", LL_CustomUI.$("V4LLPanel"), function (event) {
                        if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                            LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                        }
                    });

                    // Resetting a new automatic closing timer if the mouse is out of the panel
                    LL_CustomUI.commonFunctions.listen("mouseout", LL_CustomUI.$("V4LLPanel"), function (event) {
                        if (LL_CustomUI.V4Panel.automaticClosingTimer != 0) {
                            LL_CustomUI.V4Panel.automaticClosingTimer.clear();
                        }
                        LL_CustomUI.V4Panel.automaticClosingTimer = new LL_CustomUI.commonFunctions.Timeout(function () {
                            try {
                                if (LL_CustomUI.V4PanelState !== "new")
                                    LL_CustomUI.V4Panel.collapse();
                            }
                            catch (ex) { }
                        }, 3999);
                    });
                }

                //retrieve presentation code
                if (window.LL_Storage_Manager && window.LL_ICB_Core && LL_ICB_Core.presentationToken) {
                    LL_Storage_Manager.getItemAsync(LL_ICB_Core.presentationToken, "presentationCode", function (value) {
                        if (value && value != "null" && value != "undefined")
                            LL_CustomUI.V4Panel.setPresentationCode(value);
                    });
                }
            };

            LL_CustomUI.V4Panel.init = LL_CustomUI.V4Panel.appendElements;
        }
    }
}

//setTimeout(function() {LL_CustomUI.V4Panel_init()},500);
LL_CustomUI.V4Panel_init();


// Flying animation
if (window.LL_CustomUI && !LL_CustomUI.anyPositionV4PanelOpener) {
    LL_CustomUI.anyPositionV4PanelOpener = {};

    LL_CustomUI.anyPositionV4PanelOpener.movingTimer = 0;
    LL_CustomUI.anyPositionV4PanelOpener.blockWidth = 284;
    LL_CustomUI.anyPositionV4PanelOpener.blockHeight = LL_CustomUI.V4Panel.numberGenerationWindowHeight;
    LL_CustomUI.anyPositionV4PanelOpener.position = LL_CustomUI.V4LLPanel_position;
    LL_CustomUI.anyPositionV4PanelOpener.offset = LL_CustomUI.V4LLPanel_position_offset;
    LL_CustomUI.anyPositionV4PanelOpener.elementToMove = "";
    LL_CustomUI.anyPositionV4PanelOpener.movementSpeed = 1;
    LL_CustomUI.anyPositionV4PanelOpener.viewportSize = "";
    LL_CustomUI.anyPositionV4PanelOpener.viewportWidth = "";
    LL_CustomUI.anyPositionV4PanelOpener.viewportHeight = "";
    LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID = LL_Deployment.v4CustomButtonID;
    LL_CustomUI.anyPositionV4PanelOpener.animationAlreadyPlayed = false;
	LL_CustomUI.anyPositionV4PanelOpener.initialized = false;

    // Getting an element with passed ID
    LL_CustomUI.anyPositionV4PanelOpener.$ = function (id) {
        return document.getElementById(id);
    };

    LL_CustomUI.anyPositionV4PanelOpener.getOffset = function (el) {
        var box = el.getBoundingClientRect();
    
        var body = document.body;
        var docElem = document.documentElement;
        
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        
        return {
            top: Math.round(top) - LL_CustomUI.commonFunctions.GetScrollPosition(), 
            left: Math.round(left)
        }
    };

    LL_CustomUI.anyPositionV4PanelOpener.animate = function (opts) {

        var start = new Date;

        var id = setInterval(function () {
            var timePassed = new Date - start,
            progress = timePassed / opts.duration;

            if (progress > 1) {
                progress = 1;
            }

            var delta = opts.delta(progress);
            opts.step(delta);

            if (progress == 1) {
                clearInterval(id)
            }
        }, opts.delay || 10);

    };

    LL_CustomUI.anyPositionV4PanelOpener.animateProperty = function (obj) {
        var toHorizontal = obj.xDimension,
        toVertical = obj.yDimension,
        blockWidth = obj.xDimension,
        blockHeight = obj.yDimension,
        blockOpacity = obj.opacity,
        position = obj.position,
        element = obj.element,
        openerElementOffset = LL_CustomUI.anyPositionV4PanelOpener.getOffset(LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID));

        LL_CustomUI.anyPositionV4PanelOpener.animate({
            delay: 10,
            duration: obj.duration || 1000,
            delta: obj.delta,
            step: function (delta) {
                switch (obj.mode) {
                    case "position":
                        try {
                            if(position == "top_right") {
                                element.style.right = openerElementOffset.left + toVertical * delta + "px";
                            } else {
                                element.style.left = openerElementOffset.left + toVertical * delta + "px";
                            }
                            element.style.top = openerElementOffset.top + toHorizontal * delta + "px";
							
                            // Fix for IE scrollbars overlapping the content
                            if(position.indexOf("bottom") >= 0) {
                                if(parseInt(element.style.top) >= openerElementOffset.top + toHorizontal * delta) {
                                    element.style.top = "auto";
                                }
                            }
							
							// Fix for vertical scrollbars
							if(position.indexOf("right") >= 0) {
								if(parseInt(element.style.left) >= openerElementOffset.left + toVertical * delta) {
                                    element.style.left = "auto";
                                }
							}

                            // Marking the panel as open - for Not supported environment view only
                            if(!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported == "none") {
                                LL_CustomUI.V4Panel.isOpen = true;
                            }
							
                        } catch(ex) {}
                        break;
                    case "size":
                        try {
                            element.style.width = blockWidth * delta + "px";
                            element.style.height = blockHeight * delta + "px";
                        } catch(ex) {}
                        break;
                    case "opacity":
                        try {
                            element.style.opacity = blockOpacity * delta;
                        } catch(ex) {}
                        break;
                }
            }
        })
    };

    LL_CustomUI.anyPositionV4PanelOpener.circ = function (progress) {
        return 1 - Math.sin(Math.acos(progress));
    };

    LL_CustomUI.anyPositionV4PanelOpener.getViewport = function () {

        var viewPortWidth,
        viewPortHeight;

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
        }

        // older versions of IE
        else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
        }
        return [viewPortWidth, viewPortHeight];
    };
    
    LL_CustomUI.anyPositionV4PanelOpener.openButtonForminLauncher = function () {
		// Since this function may be called several times we need to assure the contents are run only once
		if(!LL_CustomUI.anyPositionV4PanelOpener.initialized) {
			if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && (LL_CustomUI.V4Panel.presentationCode == "" || typeof (LL_CustomUI.V4Panel.presentationCode) == "undefined")) {
				LL_CustomUI.termsAndConditionsWindow.appendElements();
				LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.$("V4LLTermsAndConditionsWindow");
			} else {
				LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.$("V4LLPanel");
			}

			if (!LL_CustomUI.anyPositionV4PanelOpener.elementToMove) {
			    //UI not yet ready
			    //console.log("" + new Date().toLocaleString() + ": element not ready: #1");
			    setTimeout(LL_CustomUI.anyPositionV4PanelOpener.openButtonForminLauncher, 55);
			    return;
			}

			var positionLeft = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.left;
			var positionRight = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.right;
			var positionTop = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.top;
			var positionBottom = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.bottom;

			// if the object exists and doesn't have click hanlder - add the handler
			if (LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID)) {
				
				LL_CustomUI.anyPositionV4PanelOpener.click();
			   
				LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID).LL_onclickHanlderExist = true;
			}
			
			LL_CustomUI.commonFunctions.listen("resize", window, function () {
				if(typeof (LL_CustomUI.anyPositionV4PanelOpener.elementToMove) != "undefined" && LL_CustomUI.anyPositionV4PanelOpener.elementToMove != "") {
					if(positionLeft != "") {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.left = positionLeft;
					} else {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.left = "auto";
					}
					if(positionRight != "") {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.right = positionRight;
					} else {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.right = "auto";
					}
					if(positionTop != "") {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.top = positionTop;
					} else {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.top = "auto";
					}
					if(positionBottom != "") {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.bottom = positionBottom;
					} else {
						LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.bottom = "auto";
					}
				}
			});

			if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
				LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
					if (LL_CustomUI.anyPositionV4PanelOpener.elementToMove)
						LL_CustomUI.commonFunctions.setElementInTheMiddle(LL_CustomUI.anyPositionV4PanelOpener.elementToMove.id, LL_CustomUI.V4LLPanel_position);
				});
			}
			
			LL_CustomUI.anyPositionV4PanelOpener.initialized = true;
		}
    };
    
    LL_CustomUI.anyPositionV4PanelOpener.click = function () {
        var envSupported = LL_BR_Core.ICBSupported || LL_BR_Core.ACBSupported != "none";

        if ((!LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent") && envSupported) ||
            (!LL_CustomUI.$("V4LLPanel_GenericToggler") && !envSupported)) {
            //console.log("" + new Date().toLocaleString() + ": element not ready: #2");

            //retry in 333 ms
            setTimeout(LL_CustomUI.anyPositionV4PanelOpener.click, 333);
            return;
        }

        // Setting the view to the V4Panel if the number is already generated
        if (LL_ICB_Core.presentationCode != "") {
            LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.$("V4LLPanel");
        }

        if (!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported == "none") {
            LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.$("V4LLPanel");
            LL_CustomUI.anyPositionV4PanelOpener.blockHeight = LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight;
            LL_CustomUI.V4Panel.numberGenerationWindowHeight = LL_CustomUI.V4Panel.notSupportedEnvironmentWindowHeight;
        }

        if (!LL_CustomUI.anyPositionV4PanelOpener.animationAlreadyPlayed && (LL_CustomUI.V4Panel.presentationCode == "" || typeof (LL_CustomUI.V4Panel.presentationCode) == "undefined")) {

            var openerElementOffset = LL_CustomUI.anyPositionV4PanelOpener.getOffset(LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID));
            var positionToMoveTo = LL_CustomUI.anyPositionV4PanelOpener.GenerateLLV4PanelPosition(LL_CustomUI.anyPositionV4PanelOpener.position, LL_CustomUI.anyPositionV4PanelOpener.offset);

            var positionAnimationObject = {
                element: LL_CustomUI.anyPositionV4PanelOpener.elementToMove,
                delta: LL_CustomUI.anyPositionV4PanelOpener.circ,
                duration: 600,
                mode: "position",
                xDimension: parseInt(positionToMoveTo[0]) - openerElementOffset.top,
                yDimension: parseInt(positionToMoveTo[1]) - openerElementOffset.left,
                opacity: "",
                position: LL_CustomUI.V4LLPanel_position
            }

            LL_CustomUI.anyPositionV4PanelOpener.animateProperty(positionAnimationObject);

            var dimensionsAnimationObject = {
                element: LL_CustomUI.anyPositionV4PanelOpener.elementToMove,
                delta: LL_CustomUI.anyPositionV4PanelOpener.circ,
                duration: 600,
                mode: "size",
                xDimension: LL_CustomUI.anyPositionV4PanelOpener.blockWidth,
                yDimension: LL_CustomUI.anyPositionV4PanelOpener.blockHeight,
                opacity: "",
                position: ""
            }

            LL_CustomUI.anyPositionV4PanelOpener.animateProperty(dimensionsAnimationObject);

            var opacityAnimationObject = {
                element: LL_CustomUI.anyPositionV4PanelOpener.elementToMove,
                delta: LL_CustomUI.anyPositionV4PanelOpener.circ,
                duration: 600,
                mode: "opacity",
                xDimension: "",
                yDimension: "",
                opacity: 1,
                position: ""
            }

            LL_CustomUI.anyPositionV4PanelOpener.animateProperty(opacityAnimationObject);

            if (!LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled) {
                setTimeout(function () {
                    LL_CustomUI.$("V4LLPanel_CollapsedNarrowNoAgent").style.visibility = "hidden";
                    LL_CustomUI.V4Panel.expand();
                }, 10);
            }

            LL_CustomUI.anyPositionV4PanelOpener.animationAlreadyPlayed = true;

            if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled) {
                setTimeout(function () {
                    LL_CustomUI.termsAndConditionsWindow.initializeScrollBar();
                    LL_CustomUI.termsAndConditionsWindow.setScrollBarStyles();
                }, 100);
            };

        } else {
            if (typeof (LL_CustomUI.anyPositionV4PanelOpener.elementToMove) != "undefined" && LL_CustomUI.anyPositionV4PanelOpener.elementToMove != "") {
                if (LL_CustomUI.V4PanelState == "new") {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.height = LL_CustomUI.V4Panel.numberGenerationWindowHeight + "px";
                } else {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.height = LL_CustomUI.V4Panel.agentConnectedWindowHeight + "px";
                }
                if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && !LL_CustomUI.termsAndConditionsWindow.isScrollbarInitialized) {
                    LL_CustomUI.termsAndConditionsWindow.initializeScrollBar();
                    LL_CustomUI.termsAndConditionsWindow.setScrollBarStyles();
                }
                // Marking the panel as open - for Not supported environment view only
                if(!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported == "none") {
                    LL_CustomUI.V4Panel.isOpen = true;
                }
            }
        }
    }

    LL_CustomUI.anyPositionV4PanelOpener.init = function () {

        if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled && (LL_CustomUI.V4Panel.presentationCode == "" || typeof (LL_CustomUI.V4Panel.presentationCode) == "undefined")) {
            LL_CustomUI.termsAndConditionsWindow.appendElements();
            LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.$("V4LLTermsAndConditionsWindow");
        } else {
            LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.$("V4LLPanel");
        }

        var positionLeft = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.left;
        var positionRight = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.right;
        var positionTop = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.top;
        var positionBottom = LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.bottom;

        // if the object exists and doesn't have click hanlder - add the handler
        if (LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID) && !LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID).LL_onclickHanlderExist) {

            // Start the animation when the triggering element is clicked
            LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID), function (event) {
                //console.log("" + new Date().toLocaleString() + ": element clicked: #3");
                LL_CustomUI.anyPositionV4PanelOpener.click();
               
            });
            
            LL_CustomUI.$(LL_CustomUI.anyPositionV4PanelOpener.v4CustomButtonID).LL_onclickHanlderExist = true;
        }
        LL_CustomUI.commonFunctions.listen("resize", window, function () {
            if(typeof (LL_CustomUI.anyPositionV4PanelOpener.elementToMove) != "undefined" && LL_CustomUI.anyPositionV4PanelOpener.elementToMove != "") {
                if(positionLeft != "") {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.left = positionLeft;
                } else {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.left = "auto";
                }
                if(positionRight != "") {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.right = positionRight;
                } else {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.right = "auto";
                }
                if(positionTop != "") {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.top = positionTop;
                } else {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.top = "auto";
                }
                if(positionBottom != "") {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.bottom = positionBottom;
                } else {
                    LL_CustomUI.anyPositionV4PanelOpener.elementToMove.style.bottom = "auto";
                }
            }
        });

        if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
            LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
                if (LL_CustomUI.anyPositionV4PanelOpener.elementToMove)
                    LL_CustomUI.commonFunctions.setElementInTheMiddle(LL_CustomUI.anyPositionV4PanelOpener.elementToMove.id, LL_CustomUI.V4LLPanel_position);
            });
        }
    };

    LL_CustomUI.anyPositionV4PanelOpener.GenerateLLV4PanelPosition = function (positionValue, offset) {
        var top = "",
        left = "";

        LL_CustomUI.anyPositionV4PanelOpener.viewportSize = LL_CustomUI.anyPositionV4PanelOpener.getViewport();
        LL_CustomUI.anyPositionV4PanelOpener.viewportWidth = LL_CustomUI.anyPositionV4PanelOpener.viewportSize[0];
        LL_CustomUI.anyPositionV4PanelOpener.viewportHeight = LL_CustomUI.anyPositionV4PanelOpener.viewportSize[1];

        switch (positionValue) {
            case "bottom_right":
                if (offset == "") {
                    top = LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight;
                    left = LL_CustomUI.anyPositionV4PanelOpener.viewportWidth - LL_CustomUI.anyPositionV4PanelOpener.blockWidth;
                }
                else {
                    top = LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight;
                    left = LL_CustomUI.anyPositionV4PanelOpener.viewportWidth - LL_CustomUI.anyPositionV4PanelOpener.blockWidth - offset;
                }
                break;
            case "top_left":
                if (offset == "") {
                    top = 0;
                    left = 0;
                } else {
                    top = 0;
                    left = offset;
                }
                break;
            case "top_middle":
                top = 0;
                left = (LL_CustomUI.anyPositionV4PanelOpener.viewportWidth - LL_CustomUI.anyPositionV4PanelOpener.blockWidth) / 2;
                break;
            case "right_middle":
                top = (LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight) / 2;
                left = LL_CustomUI.anyPositionV4PanelOpener.viewportWidth - LL_CustomUI.anyPositionV4PanelOpener.blockWidth;
                break;
            case "top_right":
                if (offset == "") {
                    top = 0;
                    left = LL_CustomUI.anyPositionV4PanelOpener.viewportWidth - LL_CustomUI.anyPositionV4PanelOpener.blockWidth;
                } else {
                    top = 0;
                    left = offset;
                }
                break;
            case "bottom_left":
                if (offset == "") {
                    left = 0;
                    top = LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight;
                } else {
                    left = offset;
                    top = LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight;
                }
                break;
            case "bottom_middle":
                top = LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight;
                left = (LL_CustomUI.anyPositionV4PanelOpener.viewportWidth - LL_CustomUI.anyPositionV4PanelOpener.blockWidth) / 2;
                break;
            case "left_middle":
                top = (LL_CustomUI.anyPositionV4PanelOpener.viewportHeight - LL_CustomUI.anyPositionV4PanelOpener.blockHeight) / 2;
                left = 0;
                break;
        }

        return [top, left];
    };
}

// Flying animation
if (window.LL_CustomUI && !LL_CustomUI.termsAndConditionsWindow) {
    // Requires jQuery
    LL_CustomUI.termsAndConditionsWindow = {};
    //LL_CustomUI.V4LLPanel_TermsAndConditionsWindowText = "This is a test";
    LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled = !!LL_CustomUI.V4LLPanel_TermsAndConditionsWindowText;
    if (LL_CustomUI.termsAndConditionsWindow.isTermsAndConditionsEnabled) {
        LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowHeight = 302;
        LL_CustomUI.termsAndConditionsWindow.isSessionStartButtonClicked = false;
        LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock = "";
        LL_CustomUI.termsAndConditionsWindow.isScrollbarInitialized = false;
        LL_CustomUI.termsAndConditionsWindow.isDisconnectConfirmWindowOpen = false;
		LL_CustomUI.termsAndConditionsWindow.initialized = false;

        // Preventing cropping of the panel in case of Right and Left locations
        if(LL_CustomUI.commonFunctions.isLeftLocation() || LL_CustomUI.commonFunctions.isRightLocation()) {
            LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowHeight = 308;
        }

        var windowHTML = "";
        if (LL_CustomUI.commonFunctions.isLeftLocation()) {
            if (LL_CustomUI.commonFunctions.isAnyIE()) {
                windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space:nowrap; bottom: 40px; left: 9px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else if(LL_CustomUI.commonFunctions.isSafari()) {
                windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space:nowrap; bottom: 40px; left: 8px; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else {
                windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space:nowrap; bottom: 28px; left: 8px; transform-origin: left top 0; -moz-transform-origin: left top 0; -o-transform-origin: left top 0; -webkit-transform-origin: left top 0; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 4px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            }
        } else if (LL_CustomUI.commonFunctions.isRightLocation()) {
            if (LL_CustomUI.commonFunctions.isAnyIE()) {
                windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space: nowrap; bottom: 45px; left: 14px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else if(LL_CustomUI.commonFunctions.isSafari()) {
                windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg) translate(0, 100%); -webkit-transform:rotate(-90deg) translate(0, 100%); -moz-transform:rotate(-90deg) translate(0, 100%); -o-transform: rotate(-90deg) translate(0, 100%); position:absolute; white-space: nowrap; -moz-transform-origin: 0% 100%; -o-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: left top 0; bottom: 40px; left: 13px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            } else {
                windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><span id="V4LLPanel_InnerTitle" style="writing-mode:tb-rl; filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); transform: rotate(180deg); -webkit-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -o-transform: rotate(-90deg); position:absolute; white-space: nowrap; transform-origin: left top 0; -moz-transform-origin: left top 0; -o-transform-origin: left top 0; -webkit-transform-origin: left top 0; bottom: 28px; left: 13px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div id="V4LLPanel_InnerLogo" style="margin: 124px 10px 0 9px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div></div>';
            }
        } else {
            windowHTML += '<div id="V4LLPanel_TermsAndConditionsToggler" onmouseover="LL_CustomUI.termsAndConditionsWindow.hint.show();" onmouseout="LL_CustomUI.termsAndConditionsWindow.hint.hide();" style="position:fixed; _position: absolute !important; z-index: 1500001; cursor:pointer; overflow: hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_width + 'px !important; height: ' + LL_CustomUI.V4LLPanel_CollapsedNarrowNoAgent_height + 'px !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '"><div id="V4LLPanel_InnerLogo" style="margin: 9px 10px 0 10px; width: 23px; height: 24px; float: left; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important; _margin-left: 5px !important;"></div><span id="V4LLPanel_InnerTitle" style="position:absolute; top: 11px; left: 42px; font-family: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ';" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span></div>';
        }

        windowHTML += '<div id="V4LLPanel_HintBlock" style="' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset, "true") + ' z-index:1500002; position:fixed; _position: absolute !important; cursor:pointer; visibility:hidden; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_HintBlock_background) + ') no-repeat !important; width: ' + LL_CustomUI.V4LLPanel_HintBlock_width + 'px; height: ' + LL_CustomUI.V4LLPanel_HintBlock_height + 'px;"><span id="V4LLPanel_Hint_FirstLine" style="display: block; text-align: center; font-size: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_size +'px; font-family: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_family +'; color: #'+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_color +'; width: 157px; font-style: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_style +' ; font-weight: '+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText_font_weight +'; margin-top: 13px;">'+ LL_CustomUI.V4LLPanel_HintBlock_FirstLineText +'</span><span id="V4LLPanel_Hint_SecondLine" style="display: block; text-align: center; font-size: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_size +'px; font-family: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_family +'; color: #'+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_color +'; font-weight: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_weight +' ; font-style: '+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText_font_style +'; width: 157px;">'+ LL_CustomUI.V4LLPanel_HintBlock_SecondLineText +'</span></div>';

        windowHTML += '<div id="V4LLTermsAndConditionsWindow" style="font-size:12px; position: fixed; _position: absolute !important; z-index: 1500002; height: 0; overflow: hidden; width: ' + LL_CustomUI.V4LLPanel_width + 'px; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_notConnected_background) + ') no-repeat !important; ' + LL_CustomUI.commonFunctions.GenerateLLV4PanelPosition(LL_CustomUI.V4LLPanel_position, LL_CustomUI.V4LLPanel_position_offset) + '">';
        windowHTML += '<div id="V4LLPanel_InnerContainer" style="text-align:center;position: relative; padding: 58px 0 0 4px; zoom: 1; height: 165px; width: 277px !important;">';
        windowHTML += '<div id="V4LLPanel_MovingToggler" style="width: 256px; height: 49px; position: absolute; left: 0; top: 0; margin-left: 10px; background: url(' + LL_CustomUI.img(LL_CustomUI.LLpassToBeginText_background) + ') repeat-x left bottom !important;" class="LLV4Separator"><div id="V4LLPanel_LogoToggler" style="margin:13px 16px 0 3px; width: 23px; height: 24px; float: left; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_InnerLogo_background) + ') no-repeat !important;" class="LLV4Logo"><div id="V4LLPanel_PanelMinimize" style="position: absolute; width:15px; height:10px; cursor:pointer; margin:7px 0 0 0; _margin: 3px 0 0 0; right: 26px; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PanelMinimizeButton_background) + ') no-repeat left bottom !important;" onclick="LL_CustomUI.termsAndConditionsWindow.collapse()"></div><div id="V4LLPanel_PanelClose" role="button" tabindex="0" aria-label="' + LL_CustomUI.ADA_V4LLPanel_PanelClose_close + '" style="position: absolute; width:11px; height:10px; cursor:pointer; margin:7px 0 0 0; right: 0; background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_PanelCloseButton_background) + ') no-repeat !important;" onclick="LL_CustomUI.termsAndConditionsWindow.openDisconnectConfirmWindow()"></div></div><span id="V4LLPanel_TogglerText" style="position:absolute; top: 17px; left: 34px; font-family:' + LL_CustomUI.V4LLPanel_InnerTitle_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_InnerTitle_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_InnerTitle_color + ' !important;" class="V4LLTitleText">' + LL_CustomUI.V4LLPanel_notconnected_header_text + '</span><div role="dialog" id="V4LLPanelDisconnectConfirmWindowTC" style="display:none; position:absolute; top:47px;left:2px;width:232px;_width:250px;background-color:#' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_background_color + ';border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;border:1px solid #' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_border_color + ';box-shadow: 0 1px 16px #000; z-index:11; text-align: center;padding:28px 10px;"><span style="font-size:' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_size + 'px; color:#' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_color + '; font-weight:' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_weight + '; font-style: ' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_style + '; font-family: ' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text_font_family + ';">' + LL_CustomUI.V4LLPanel_DisconnectConfirmWindow_text + '</span><br /><a id="V4LLPanel_CloseDeclineButtonTC" tabindex="0" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CloseDeclineButtonTC + '" onmouseover="LL_CustomUI.termsAndConditionsWindow.toggleConfirmNoBtn(true)" onmouseout="LL_CustomUI.termsAndConditionsWindow.toggleConfirmNoBtn(false)" onclick="LL_CustomUI.termsAndConditionsWindow.declineSessionEnd()" style="height: 24px !important; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background) + ') no-repeat; color: #' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color + '; font-family: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_size + 'px; font-weight: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_style + ' !important; width:103px; text-align:center; display:inline-block; text-decoration:none; padding-top:3px; padding-bottom:2px; margin-top:35px;margin-right:10px;" href="javascript:void(0)">' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_no + '</a><a id="V4LLPanel_CloseConfirmButtonTC" tabindex="0" role="button" aria-label="' + LL_CustomUI.ADA_V4LLPanel_CloseConfirmButtonTC + '" onmouseover="LL_CustomUI.termsAndConditionsWindow.toggleConfirmYesBtn(true)" onmouseout="LL_CustomUI.termsAndConditionsWindow.toggleConfirmYesBtn(false)" onclick="LL_CustomUI.termsAndConditionsWindow.confirmSessionEnd()" style="height: 24px !important; background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background) + ') no-repeat; color: #' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color + '; font-family: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_family + '; font-size: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_size + 'px; font-weight: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_weight + ' !important; font-style: ' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_font_style + ' !important; width:103px; text-align:center; display:inline-block; text-decoration:none; padding-top:3px;padding-bottom:2px;margin-top:35px;" href="javascript:void(0)">' + LL_CustomUI.V4LLPanel_CloseConfirmButton_text_yes + '</a></div></div>';
        windowHTML += '<div class="v4-button-scroll-pane" style="word-wrap: break-word; font-family: ' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_font_family + ';height: 148px;text-align:left;margin-bottom:21px;margin-top:5px;width:260px;margin-left:10px;overflow-y:auto; overflow-x: hidden; color:#' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_color + ' !important;font-size: ' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_font_size + 'px !important;">';
        windowHTML += '<p style="width: 243px; margin-top:0px; margin-bottom:8px; font-family: ' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowHeadline_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowHeadline_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowHeadline_color + ' !important;">' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowHeadline + '</p>';
        windowHTML += '<p style="width: 243px; margin-top:7px; margin-bottom:7px; line-height:14px; font-family: ' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_font_family + ' !important; font-size: ' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_font_size + 'px !important; color: #' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_color + ' !important;">' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowText + '</p>';
        windowHTML += '<div style="height:15px;width:1px;clear:both"></div>';
        windowHTML += '</div>';
        windowHTML += '<div style="z-index:10;left:5px;height:21px;position:absolute;top:198px;width:252px;background:url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_termsAndConditionsWindow_textShadow) + ') repeat-x left bottom !important"></div>';
        windowHTML += '<div style="clear:both;"></div><a href="javascript:void(0)" id="V4LLPanel_StartSessionNow" onmouseover="LL_CustomUI.termsAndConditionsWindow.toggleSessionConnectButton(true)" onmouseout="LL_CustomUI.termsAndConditionsWindow.toggleSessionConnectButton(false)" style="text-decoration:none;background: url(' + LL_CustomUI.img(LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButton) + ') repeat-x left bottom;border:0;padding-left:15px;padding-right:16px;padding-top:5px;padding-bottom:7px;font-size:'+ LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButton_font_size +'px; color:#' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButton_color + '; font-family: ' + LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButton_font_family + '">'+ LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButton_text +'</a>';
        windowHTML += '<div id="V4LLPanel_termsAndConditionsText" style="width:252px; margin-left:10px; padding-top:18px; margin-top:16px; text-align:center; background: url(' + LL_CustomUI.img(LL_CustomUI.LLpassToBeginText_background) + ') repeat-x left top !important;" class="LLV4Separator">';
        windowHTML += '<a href="javascript:void(0)" onclick="LL_CustomUI.V4Panel.openTermsAndConditions();" id="V4LLPanel_TermsAndConditions" style="font-weight:normal;margin-bottom:6px; margin-top:15px; font-size: ' + LL_CustomUI.V4LLPanel_TermsAndConditions_font_size + 'px; color: #' + LL_CustomUI.V4LLPanel_TermsAndConditions_color + ' !important; font-family: ' + LL_CustomUI.V4LLPanel_TermsAndConditions_font_family + ' !important;">' + LL_CustomUI.V4LLPanel_notconnected_termsAndConditions_text + '</a>';
        windowHTML += '</div>';
        windowHTML += '</div>';
        windowHTML += '</div>';

        LL_CustomUI.termsAndConditionsWindow.windowHTML = windowHTML;

        // Initializing the environment
        LL_CustomUI.termsAndConditionsWindow.appendElements = function () {
            // Appending the element to DOM if it's not already appended
			if(!LL_CustomUI.termsAndConditionsWindow.initialized) {
				var LLPanelTermsAndConditions = document.createElement('div');
				LLPanelTermsAndConditions.innerHTML = LL_CustomUI.termsAndConditionsWindow.windowHTML;
				document.body.appendChild(LLPanelTermsAndConditions);

				LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("V4LLPanel_StartSessionNow"), function (event) {
					LL_CustomUI.termsAndConditionsWindow.startSession();
				});

				LL_CustomUI.commonFunctions.listen("click", LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler"), function (event) {
					LL_CustomUI.termsAndConditionsWindow.expand();
				});
				
				if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
					LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_TermsAndConditionsToggler", LL_CustomUI.V4LLPanel_position);
					LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLTermsAndConditionsWindow", LL_CustomUI.V4LLPanel_position);
				}

				// Adjusting the middle panel position when resized
				if ((LL_CustomUI.V4LLPanel_position).indexOf("middle") > 0) {
					LL_CustomUI.commonFunctions.listen("resize", window, function (event) {
						if (!document.getElementById("V4LLPanel_TermsAndConditionsToggler"))
							return;
						LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLPanel_TermsAndConditionsToggler", LL_CustomUI.V4LLPanel_position);
						LL_CustomUI.commonFunctions.setElementInTheMiddle("V4LLTermsAndConditionsWindow", LL_CustomUI.V4LLPanel_position);
					});
				}

				// Adding a "scroll" event listener for Quirks mode
				if (LL_CustomUI.commonFunctions.isQuirksMode()) {
					LL_CustomUI.commonFunctions.listen("scroll", window, function () {
						var positionProperty = LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.position;
						if (positionProperty == "absolute") {
							var scrollPosition = LL_CustomUI.commonFunctions.GetScrollPosition();
							LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.bottom = -scrollPosition + "px";
							LL_CustomUI.$("V4LLTermsAndConditionsWindow").style.bottom = -scrollPosition + "px";
						}
					});
				}

				// Adjusting the panels position on window scroll
				if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
					LL_CustomUI.commonFunctions.listen("scroll", window, function () {
						LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_TermsAndConditionsToggler", 0, LL_CustomUI.V4LLPanel_position);
						LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
						if (parseInt(LL_CustomUI.$("V4LLTermsAndConditionsWindow").style.height) >= 1) {
							LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
						} else {
							LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
						}

					});
				}

				// Adjusting the panels position on window resize
				if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
					LL_CustomUI.commonFunctions.listen("resize", window, function () {
						if (!document.getElementById("V4LLPanel_TermsAndConditionsToggler"))
							return;
						LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_TermsAndConditionsToggler", 0, LL_CustomUI.V4LLPanel_position);
						LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
						if (parseInt(LL_CustomUI.$("V4LLTermsAndConditionsWindow").style.height) >= 1) {
							LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
						} else {
							LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
						}

					});
				}

				// Adjusting the panels position on window load
				if (LL_CustomUI.commonFunctions.isBottomLocation() && ((LL_CustomUI.commonFunctions.getInternetExplorerVersion() <= 7 && LL_CustomUI.commonFunctions.getInternetExplorerVersion() != -1)) || LL_CustomUI.commonFunctions.isQuirksMode()) {
					LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLPanel_TermsAndConditionsToggler", 0, LL_CustomUI.V4LLPanel_position);
					LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
					if (parseInt(LL_CustomUI.$("V4LLTermsAndConditionsWindow").style.height) >= 1) {
						LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
					} else {
						LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", LL_CustomUI.V4Panel.numberGenerationWindowHeight, LL_CustomUI.V4LLPanel_position);
					}
				}

				if (LL_CustomUI.commonFunctions.isQuirksMode()) {
					LL_CustomUI.$("V4LLTermsAndConditionsWindow").style.height = 1 + "px";
				}
				
				LL_CustomUI.termsAndConditionsWindow.initialized = true;
			}
        };

        // V4Panel close confirmation box
        LL_CustomUI.termsAndConditionsWindow.openDisconnectConfirmWindow = function() {
            LL_CustomUI.$("V4LLPanelDisconnectConfirmWindowTC").style.display = "block";
            LL_CustomUI.termsAndConditionsWindow.isDisconnectConfirmWindowOpen = true;
			
            LL_CustomUI.commonFunctions.listen("keyup", window, function (event) {
                if(LL_CustomUI.termsAndConditionsWindow.isDisconnectConfirmWindowOpen) {
                    if(window.event) // IE
                    {
                        keynum = event.keyCode;
                    }
                    else if(event.which) // Netscape/Firefox/Opera
                    {
                        keynum = event.which;
                    }
                    if(keynum == 13) {
                        LL_CustomUI.termsAndConditionsWindow.declineSessionEnd();
                    }
                }
            });        	
        };

        LL_CustomUI.termsAndConditionsWindow.confirmSessionEnd = function (event) {
            LL_CustomUI.V4Panel.declineSessionEnd(); // Closing the session end prompt
            if (window.LL_Debug) {
                LL_Debug.set(LL_ICB_Core.presentationToken, "DisconnectReason", "UserAction");
            }
            // agent is definitely is not connected 
            LL_ICB_Core.doDisconnect(true, event);
        };

        LL_CustomUI.termsAndConditionsWindow.declineSessionEnd = function () {
            try {
                LL_CustomUI.V4Panel.isDisconnectConfirmWindowOpen = false;
                LL_CustomUI.$("V4LLPanelDisconnectConfirmWindowTC").style.display = "none";
            }
            catch (e) { }
        };

        LL_CustomUI.termsAndConditionsWindow.toggleConfirmYesBtn = function(flag) {
            var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background_hover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background)) + "') no-repeat";
            var colorStyle = flag ? LL_CustomUI.V4LLPanel_CloseConfirmButton_hover_text_color : LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color;
            if(LL_CustomUI.$("V4LLPanel_CloseConfirmButtonTC")) {
                LL_CustomUI.$("V4LLPanel_CloseConfirmButtonTC").style.background = style;
                LL_CustomUI.$("V4LLPanel_CloseConfirmButtonTC").style.color = "#" + colorStyle;
            }
        };

        LL_CustomUI.termsAndConditionsWindow.toggleConfirmNoBtn = function(flag) {
            var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background_hover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_CloseConfirmButton_background)) + "') no-repeat";
            var colorStyle = flag ? LL_CustomUI.V4LLPanel_CloseConfirmButton_hover_text_color : LL_CustomUI.V4LLPanel_CloseConfirmButton_text_color;
            if(LL_CustomUI.$("V4LLPanel_CloseDeclineButtonTC")) {
                LL_CustomUI.$("V4LLPanel_CloseDeclineButtonTC").style.background = style;
                LL_CustomUI.$("V4LLPanel_CloseDeclineButtonTC").style.color = "#" + colorStyle;
            }
        };

        LL_CustomUI.termsAndConditionsWindow.jQueryInitializeScrollBar = function ($) {
            try {
                $('.v4-button-scroll-pane').jScrollPane({
                    mouseWheelSpeed: 20,
                    contentWidth: '0px'
                });
                LL_CustomUI.termsAndConditionsWindow.isScrollbarInitialized = true;
            } catch (e) { }
        };

        LL_CustomUI.termsAndConditionsWindow.initializeScrollBar = function () {
            if (typeof ($) != "undefined") {
                LL_CustomUI.termsAndConditionsWindow.jQueryInitializeScrollBar($);
            }
        };

        LL_CustomUI.termsAndConditionsWindow.hint = { };
        LL_CustomUI.termsAndConditionsWindow.hint.show = function() {
            if (LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility == "hidden" && (LL_CustomUI.V4LLPanel_position == "bottom_right" || LL_CustomUI.V4LLPanel_position == "bottom_left"  || LL_CustomUI.V4LLPanel_position == "bottom_middle")) {
                LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "visible";
            }
        };
        LL_CustomUI.termsAndConditionsWindow.hint.hide = function() {
            LL_CustomUI.$("V4LLPanel_HintBlock").style.visibility = "hidden";
        };

        LL_CustomUI.termsAndConditionsWindow.jQuerySetScrollBarStyles = function ($) {
            if ($(".jspContainer")) {
                $(".jspContainer").css({
                    'overflow': 'hidden',
                    'position': 'relative'
                });
            }
            if ($(".jspPane")) {
                $(".jspPane").css({
                    'position': 'absolute'
                });
            }
            $('.v4-button-scroll-pane').css({
                'overflow': 'auto'
            });
            if ($(".jspVerticalBar")) {
                $(".jspVerticalBar").css({
                    'position': 'absolute',
                    'top': '0',
                    'right': '0',
                    'width': '5px',
                    'bottom': '5px',
                    'margin-bottom': '12px'
                });
            }
            if ($(".jspTrack")) {
                $(".jspTrack").css({
                    'background': '#' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowScrollBar_TrackBG_color,
                    'position': 'relative',
                    'width': '5px',
                    'border-radius': '5px',
                    '-moz-border-radius': '5px',
                    '-webkit-border-radius': '5px'

                });
            }
            if ($(".jspDrag")) {
                $(".jspDrag").css({
                    'background': '#' + LL_CustomUI.V4LLPanel_TermsAndConditionsWindowScrollBar_DragBG_color,
                    'position': 'relative',
                    'top': '0',
                    'cursor': 'pointer',
                    'left': '0',
                    'width': '5px',
                    'border-radius': '5px',
                    '-moz-border-radius': '5px',
                    '-webkit-border-radius': '5px'
                });
            }

        };
        LL_CustomUI.termsAndConditionsWindow.setScrollBarStyles = function () {
            if (typeof ($) != "undefined") {
                LL_CustomUI.termsAndConditionsWindow.jQuerySetScrollBarStyles($);
            }
        };

        LL_CustomUI.termsAndConditionsWindow.start = function () {
            LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock = LL_CustomUI.$("V4LLTermsAndConditionsWindow");
        };

        LL_CustomUI.termsAndConditionsWindow.toggleSessionConnectButton = function (flag) {
            var style = "url('" + (flag ? LL_CustomUI.img(LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButtonHover) : LL_CustomUI.img(LL_CustomUI.V4LLPanel_termsAndConditionsWindow_startSessionButton)) + "') repeat-x";
            LL_CustomUI.$("V4LLPanel_StartSessionNow").style.background = style;
        };

        // Initializing the open/close functionality
        LL_CustomUI.termsAndConditionsWindow.toggle = function (action) {
            if (action == "expand") {
                LL_CustomUI.termsAndConditionsWindow.start();

                // Showing the LLPanel
                LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock.style.height = LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowHeight + "px";

                if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                    if (parseInt(LL_CustomUI.$("V4LLTermsAndConditionsWindow").style.height) >= 1) {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", 0, LL_CustomUI.V4LLPanel_position);
                    } else {
                        LL_CustomUI.commonFunctions.setPositionOnScroll("V4LLTermsAndConditionsWindow", LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowHeight, LL_CustomUI.V4LLPanel_position);
                    }
                }
            }
            else if (action == "collapse") {      // Closing
                LL_CustomUI.termsAndConditionsWindow.start();

                if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                    LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock.style.height = 1 + "px";
                } else {
                    LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock.style.height = 0 + "px";
                }

                LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.display = "block";
                LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.visibility = "visible";
            }
        };

        LL_CustomUI.termsAndConditionsWindow.collapse = function () {
            LL_CustomUI.termsAndConditionsWindow.toggle("collapse");
        };

        LL_CustomUI.termsAndConditionsWindow.expand = function () {
            LL_CustomUI.termsAndConditionsWindow.toggle("expand");
            if (!LL_CustomUI.termsAndConditionsWindow.isScrollbarInitialized) {
                LL_CustomUI.termsAndConditionsWindow.initializeScrollBar();
                LL_CustomUI.termsAndConditionsWindow.setScrollBarStyles();
            }
        };

        LL_CustomUI.termsAndConditionsWindow.startSession = function () {
            LL_CustomUI.termsAndConditionsWindow.start();
            if (LL_CustomUI.commonFunctions.isQuirksMode()) {
                LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock.style.height = 1 + "px";
            } else {
                LL_CustomUI.termsAndConditionsWindow.termsAndConditionsWindowBlock.style.height = 0 + "px";
            }

            LL_CustomUI.V4Panel.expand();

            LL_CustomUI.termsAndConditionsWindow.isSessionStartButtonClicked = true;

            LL_CustomUI.anyPositionV4PanelOpener.elementToMove = LL_CustomUI.anyPositionV4PanelOpener.$("V4LLPanel");

            LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.display = "none";
            LL_CustomUI.$("V4LLPanel_TermsAndConditionsToggler").style.visibility = "hidden";

        }
    }
}
if (window.LL_CustomUI && !LL_CustomUI.LLActivationPopup) {
    LL_CustomUI.LLActivationPopup = {};
    LL_CustomUI.LLActivationPopup.ACB_started = false;
    LL_CustomUI.LLActivationPopup.listen = function (event) {

        if (!event) return;
        var cmd = event.data;

        if (cmd == "activate_cancel") {
            setTimeout(function () {
                LL_CustomUI.LLActivationPopup.closePopup();
            }, 333);
        }
        else if (cmd == "activate_OK") {
            setTimeout(function () {
                LL_CustomUI.LLActivationPopup.startCBSession();
            }, 333);
        }
        else if (cmd == "escalate_OK") {
            setTimeout(function () {
                LL_CustomUI.LLActivationPopup.startCBSession();
            }, 333);
        }
        else if (cmd == "activate_NET") {
            setTimeout(function () {
                LL_CustomUI.LLActivationPopup.netRunClickonce();
            }, 333);
        }
        else if (cmd == "NET_cancel") {
            setTimeout(function () {
                LL_CustomUI.LLActivationPopup.netCloseSession();
            }, 333);
        }
    };
    LL_CustomUI.LLActivationPopup.showPopup = function () {
        if (LL_CustomUI.LLActivationPopup.ACB_started)
            return;

        LL_Frames.frameEmbed("LL_activate_frame", LL_ICB_Core.activateHtmlUrl + "&siteid=" + LL_ICB_Core.siteCode + "&pc_token=" + LL_ICB_Core.presentationToken + "&ll_user_agent=" + escape(navigator.userAgent), 717, 471);

        if (window.LL_Debug) {
            LL_Debug.log(LL_ICB_Core.presentationToken, "V4_ActivatePromptDisplayed");
        }

        if (window.addEventListener) {
            //Firefox, Safari, Opera, Chrome, IE9
            window.addEventListener("message", LL_CustomUI.LLActivationPopup.listen, false);
        }
        else if (window.attachEvent) {
            //IE8
            window.attachEvent("onmessage", LL_CustomUI.LLActivationPopup.listen);
        }
    };
    LL_CustomUI.LLActivationPopup.closePopup = function (e) {
        LL_Frames.killFrame("LL_activate_frame");
        LL_Frames.killFrame("LL_clickonce_frame");

    };
    LL_CustomUI.LLActivationPopup.netDelayPromptTimer = 0;
    LL_CustomUI.LLActivationPopup.startCBSession = function (e) {
        if (LL_CustomUI.LLActivationPopup.ACB_started)
            return;
        LL_CustomUI.LLActivationPopup.ACB_started = true;
        LL_CustomUI.LLActivationPopup.closePopup(e);
        if (window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.EscalationAccepted, LL_ICB_Core.presentationToken, LL_ICB_Core.EscalationAccepted_listener);
            LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.EscalationAccepted, LL_ICB_Core.presentationToken, LL_ICB_Core.presentationToken);
        }
        if (window.LL_Debug) {
            LL_Debug.log(LL_ICB_Core.presentationToken, "V4_ActivatePromptClicked");
        }
        if (LL_BR_Core.ACBSupported == ".net")
            LL_CustomUI.LLActivationPopup.netDelayPromptTimer = setTimeout(function () {
                LL_Frames.killFrame("LL_activate_frame");
                LL_Frames.frameEmbed("LL_clickonce_frame", LL_ICB_Core.clickonceDelayUrl + "&siteid=" + LL_ICB_Core.siteCode + "&pc_token=" + LL_ICB_Core.presentationToken, 894, 724);
            }, 60000);
    };
    LL_CustomUI.LLActivationPopup.netRunClickonce = function () {
        LL_CustomUI.LLActivationPopup.closePopup();
    };
    LL_CustomUI.LLActivationPopup.netCloseSession = function () {
        LL_ICB_Core.doDisconnect(true);
        if (window.LL_Debug)
            LL_Debug.set(LL_ICB_Core.presentationToken, "DisconnectReason", "UserAction");

    }
};
if (window.LL_CustomUI && !LL_CustomUI.LLEscalationPopup) {
    LL_CustomUI.LLEscalationPopup = {};
    LL_CustomUI.LLEscalationPopup.ACB_started = false;
    LL_CustomUI.LLEscalationPopup.listen = function (event) {

        if (!event) return;
        var cmd = event.data;

        if (cmd == "escalate_cancel") {
            setTimeout(function () {
                LL_CustomUI.LLEscalationPopup.closePopup();
            }, 333);
        }
        else if (cmd == "escalate_OK") {
            setTimeout(function () {
                LL_CustomUI.LLEscalationPopup.startCBSession();
            }, 333);
        }
        else if (cmd == "escalate_ClickOnce") {
            setTimeout(function () {
                LL_CustomUI.LLEscalationPopup.startClickOnceSession();
            }, 333);
        }
        else if (cmd == "activate_NET") {
            setTimeout(function () {
                LL_CustomUI.LLEscalationPopup.netRunClickonce();
            }, 333);
        }
        else if (cmd == "NET_cancel") {
            setTimeout(function () {
                LL_CustomUI.LLEscalationPopup.netCloseSession();
            }, 333);
        }

    };
    LL_CustomUI.LLEscalationPopup.showPopup = function () {

        if (LL_CustomUI.LLEscalationPopup.ACB_started)
            return;

        LL_Frames.frameEmbed("LL_escalate_frame", escalateHtmlUrl + "&siteid=" + LL_ICB_Core.siteCode + "&pc_token=" + communicationHandler.presentationToken + "&ll_user_agent=" + escape(navigator.userAgent), 717, 471);

        if (window.addEventListener) {
            //Firefox, Safari, Opera, Chrome, IE9
            window.addEventListener("message", LL_CustomUI.LLEscalationPopup.listen, false);
        }
        else {
            //IE8
            window.attachEvent("onmessage", LL_CustomUI.LLEscalationPopup.listen);
        }
    };
    LL_CustomUI.LLEscalationPopup.closePopup = function (e) {

        LL_Frames.killFrame("LL_escalate_frame");
        LL_Frames.killFrame("LL_clickonce_frame");

    };
    LL_CustomUI.LLEscalationPopup.startCBSession = function (e) {
        LL_CustomUI.LLEscalationPopup.ACB_started = true;
        LL_CustomUI.LLEscalationPopup.closePopup(e);
        if (window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.EscalationAccepted, communicationHandler.presentationToken);
            LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.EscalationAccepted, communicationHandler.presentationToken, communicationHandler.presentationToken);
        }
    };
    LL_CustomUI.LLEscalationPopup.netDelayPromptTimer = 0;
    LL_CustomUI.LLEscalationPopup.startClickOnceSession = function (e) {
        if (LL_CustomUI.LLEscalationPopup.ACB_started)
            return;

        LL_CustomUI.LLEscalationPopup.ACB_started = true;
        LL_CustomUI.LLEscalationPopup.closePopup(e);

        LL_CustomUI.LLEscalationPopup.netDelayPromptTimer = setTimeout(function () {
            LL_Frames.frameEmbed("LL_clickonce_frame", clickonceDelayUrl + "&mode=escalate&siteid=" + LL_ICB_Core.siteCode + "&pc_token=" + communicationHandler.presentationToken, 894, 724);
        }, 60000);

    };
    LL_CustomUI.LLEscalationPopup.netCloseSession = function () {
        LL_ICB_Core.doDisconnect(true);
    };
    LL_CustomUI.LLEscalationPopup.netRunClickonce = function (e) {
        LL_CustomUI.LLEscalationPopup.closePopup(e);
    }
};
if (window.LL_CustomUI && !LL_CustomUI.SoundPlayer) {
    LL_CustomUI.SoundPlayer = (function () {
        var soundEmbed;
        var audio;
        var playSound = function (which) {
            if (typeof audio != "undefined") {
                audio.load();
                audio.play();
                return;
            }

            var browserVersion = navigator.appName;
            var isIE = true ? browserVersion.indexOf("Explorer") > 1 : false;

            var a = document.createElement('audio');
            if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))) {
                audio = new Audio(communicationHandler.mainServerUrl + "/sounds/" + which + ".mp3");
                audio.load();
                audio.loop = false;
                audio.play();
            }
            else if (!!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''))) {
                audio = new Audio(communicationHandler.mainServerUrl + "/sounds/" + which + ".wav");
                audio.load();
                audio.loop = false;
                audio.play();
            }
            else if (isIE) {
                if (typeof soundEmbed == "undefined" || soundEmbed == null) {
                    soundEmbed = document.createElement("bgsound");
                    soundEmbed.setAttribute("src", communicationHandler.mainServerUrl + "/sounds/" + which + ".mp3");
                    soundEmbed.setAttribute("loop", "1");
                    soundEmbed.setAttribute("autostart", "autostart");
                } else {
                    document.body.removeChild(soundEmbed);
                    soundEmbed = null;
                    soundEmbed = document.createElement("bgsound");
                    soundEmbed.setAttribute("src", communicationHandler.mainServerUrl + "/sounds/" + which + ".mp3");
                    soundEmbed.setAttribute("loop", "1");
                    soundEmbed.setAttribute("autostart", "autostart");
                }

                soundEmbed.setAttribute("style", "width: 5px; height: 5px;");
                document.body.appendChild(soundEmbed);
            }
            else {
                if (typeof soundEmbed == "undefined" && soundEmbed == null) {
                    soundEmbed = document.createElement("embed");
                    soundEmbed.setAttribute("src", communicationHandler.mainServerUrl + "/sounds/" + which + ".mp3");
                    soundEmbed.setAttribute("hidden", true);
                    soundEmbed.setAttribute("autostart", true);
                }
                else {
                    document.body.removeChild(soundEmbed);
                    soundEmbed = null;
                    soundEmbed = document.createElement("embed");
                    soundEmbed.setAttribute("src", communicationHandler.mainServerUrl + "/sounds/" + which + ".mp3");
                    soundEmbed.setAttribute("hidden", true);
                    soundEmbed.setAttribute("autostart", true);
                }

                soundEmbed.setAttribute("style", "width: 5px; height: 5px;");
                document.body.appendChild(soundEmbed);
            }
        };

        return {
            playSound: playSound
        };
    })();
}
LL_CustomUI.commonFunctions.preloadImages();




        var llicb = {
            coBrowseLiteUrl:        "https://216a497680152ed22e52-01d6a426a21216ea0f0f91a356c3fa59.ssl.cf2.rackcdn.com/llscripts//webinterfaces/icb/client/js/ll_starticb.js?version=20150311",
            failCounter: 0,
            loadScript: function(url, callback) {
                try {
                    var head = document.getElementsByTagName('head')[0];
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = url;
                    if (callback) {
                        script.onreadystatechange = callback;
                        script.onload = callback;
                    }
                    head.appendChild(script);
                } catch(e) {
                    if (llicb.failCounter++ <2) {
                        setTimeout(function() { 
                            llicb.loadScript(url); 
                        }, 3000);  
                    }
                }
            },
            setDefaultParameters: function() {
                ll_coBrowseLiteAgentUrl = "//www.livelook.com/welcome/icb/ll_icb.html?version=20150311";
                ll_buttonVisibility     = LL_Deployment.buttonVisibility;
            }
        }

        llicb.setDefaultParameters();
        llicb.loadScript(llicb.coBrowseLiteUrl);
        