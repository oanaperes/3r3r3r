// the file is in use before Agent is connected
// *** var LLActivationPopup - was moved to hostUI.js to be available in both - launcher and engine

if (window.LL_ICB_Core) 
    LL_ICB_Core = {};


var LL_ICB_Core = {
    buttonVisibility: ll_buttonVisibility,
    panelShown: false,
    localStorageSupported: !!window.localStorage,
    LastKnownMode: null,
    lastKnownState: null,
    //calculationOfTouchMove: 0,
    CobrowseMode: "ICB",
    validationRequestUrl: LL_Deployment.scriptServerPath + "/webinterfaces/icb/llscripts/validate.aspx",
    startRequestUrl: LL_Deployment.scriptServerPath + "/webinterfaces/icb/llscripts/start_session.aspx",
    hostStatusUpdateUrl: LL_Deployment.scriptServerPath + "/webinterfaces/icb/llscripts/host_alive.aspx",
    activateHtmlUrl: LL_Deployment.scriptServerPath + "/framework/v4/activate.aspx?lang=" + LL_Deployment.language,
    clickonceDelayUrl: LL_Deployment.scriptServerPath + "/framework/v4/clickoncedelay.aspx?lang=" + LL_Deployment.language,
    browser: null,
    validationToken: "",
    presentationCode: "",
    presentationToken: "",
    configuration: "",
    siteCode: "",
    clientState: "",
    EventGettingInterval: "",
    validateRequestSent: false,
    processedRequestSent: false,
    validateHostSessionTimeout: 0,
    StartSessionTimeout: 0,
    StartSessionNetworkTimeout: 0,
    StartSessionNetworkTime_Start: 0,
    StartSessionInitiated: "",
    StartHostAliveTimer: 0,
    SID: "",
    SID_interval: 0,
    noPingResponseTimer: 0,
    noPingResponsePeriod: 180000,
    pingCounter: 0,
    action: {
        // for start session
        verifyAll: 0,
        skipToken: 1,
        skipTokenAndTimer: 2,
        // no ping request
        setTimer: 3,
        clearTimer: 4
    },
    flags: {
        escalationListener_added: false
    },
    activePingVerificationFromStartSession: false,
    doPreloadEngine: false,
    engineStarted: false,
    windowTitleAction: {
        Add_PC: "Add",
        Remove_PC: "Remove"
    },
    init: function () {
        this.siteCode = ll_siteCodeLite;
        if (window.LL_Deployment && LL_Deployment.icbType == "SCRIPT")
            this.doPreloadEngine = true;

        if (window.LL_customFunctions && typeof LL_customFunctions().init === "function") {
            try {
                LL_customFunctions().init("launcher");
            }
            catch (e) { }
        }
    },

    //iOS Safari workaround for multi-tab support
    mobSafariShowCount: 0,
    mobSafariPingWait: false,
    mobSafariPageShow: function(evt) {
        if (LL_ICB_Core.mobSafariShowCount++ == 0) {
            //this is actually page_load, ignore
            return;
        }

        LL_ICB_Core.mobSafariPageShow_internal(evt);
    },

    ios8PageHidden: false,
    ios8PageShow: function (evt) {
        if (!window.document) {
            LL_ICB_Core.mobSafariPingWait = false;
            return;
        }
        else if (document.visibilityState != "visible") {
            LL_ICB_Core.ios8PageHidden = true;
            return;
        }
        LL_ICB_Core.mobSafariPageShow_internal(evt);
        LL_ICB_Core.ios8PageHidden = false;
    },

    mobSafariPageShow_internal: function (evt) {
        if (LL_ICB_Core.presentationToken || (window.communicationHandler && communicationHandler.presentationToken)) {
            //session already started 
            LL_ICB_Core.mobSafariPingWait = false;
            return;
        }

        //check sync local storage - we are in mob Safari
        var pcTokenLocal = LL_Storage_Manager.getItem(LL_ICB_Core.siteCode, "pc_token");
        if (!pcTokenLocal) {
            //session not started from other tabs, nothing to do
            LL_ICB_Core.mobSafariPingWait = false;
            return;
        }

        LL_ICB_Core.mobSafariPingWait = true;
        LL_ICB_Core.presentationToken = pcTokenLocal;
        LL_PingTimeout();
        //repeat ping request if it fails the first time
        LL_PingTimer = setTimeout(LL_PingTimeout, 5000);
    },

    //MAC OS X Safari workaround for Chat
    waitForStorage: function () {
        if (LL_ICB_Core.mobSafariPingWait || LL_ICB_Core.ios8PageHidden) {
            //ignore SID-related events until this flag is set
            return;
        }
        try {
            var args = arguments;
            var key, value;
            if (args.length > 1) {
                key = args[0];
                value = args[1];
            }
            else {
                key = "CHAT_" + LL_ICB_Core.siteCode.replace(/:/g, "").toUpperCase();
                value = localStorage.getItem(key);
            }

            if (value) {
                var valueParts = value.split(";");
                if (valueParts.length == 2) {
                    var SID = valueParts[0];
                    var time = valueParts[1];

                    //check if it is expired
                    var currentTime = new Date().getTime();
                    var timeDiff = currentTime - time;
                    if (timeDiff < 2 * 60 * 1000 && LL_ICB_Core.SID_listener) {
                        //not yet expired
                        setTimeout(function () {
                            LL_ICB_Core.SID_listener(SID);

                            //remove the item
                            localStorage.removeItem(key);
                        }, 0);
                        LL_ICB_Core.removeChatListener();
                    }
                    else {
                        //expired
                        localStorage.removeItem(key);
                    }
                }
            }
        }
        catch (e) { }
    },

    onStorageChange: function (e) {
        //fires when local storage is updated
        var keyName = e.key;
        var value = e.newValue;
        if (keyName == "CHAT_" + LL_ICB_Core.siteCode.replace(/:/g, "").toUpperCase() && value) {
            LL_ICB_Core.waitForStorage(keyName, value);
        }
    },

    SID_listener: function (newSID) {
        if (LL_ICB_Core.mobSafariPingWait || LL_ICB_Core.ios8PageHidden) {
            //ignore SID-related events until this flag is set
            return;
        }

        if (window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated, LL_ICB_Core.siteCode, LL_ICB_Core.SID_listener);
        }
        if (!LL_ICB_Core.panelShown) {
            //display button if we are in stealth mode
            LL_ICB_Core.displayButton(true);
        }
        if (this.SID && LL_CustomUI.V4Panel.presentationCode) {
            //another chat-based session is in progress: ignore new event
            return;
        }

        else if (LL_ICB_Core.EventGettingInterval || LL_CustomUI.V4Panel.presentationCode) {
            //standalone session is in progress
            //if no agent is connected: terminate it, and start a chat session
            if (!LL_ICB_Core.lastKnownState || LL_ICB_Core.lastKnownState == "WAIT" || LL_ICB_Core.lastKnownState == "DISCONNECTED") {
                //do not do anything here - wait until engine is loaded, and the event is caught there
                setTimeout("LL_ICB_Core.SID_listener('" + newSID + "');", 1000);
                return;
            }
            return;
        }
        var newSIDSession = false;
        if (!this.SID) {
            LL_ICB_Core.SID = newSID;
            newSIDSession = true;
        }

        LL_CustomUI.V4Panel.setPresentationCode(LL_CustomUI.V3Activating_text);

        //re-draw
        LL_CustomUI.V4Panel.collapse();

        if (newSIDSession) {
            //Nov 11 2013: disable ICB session for Chat integration for FRAME approach
            if (LL_Deployment.icbType != "SCRIPT" && LL_ICB_Core.CobrowseMode == "ICB" && LL_BR_Core.ACBSupported != "none") {
                LL_ICB_Core.CobrowseMode = "ACB " + LL_BR_Core.ACBSupported;
            }
            LL_ICB_Core.StartSession();
        }
    },

    lastCheckedToken: null,
    lastCheckedEscalationToken: null,
    SessionStarted_listener: function (newpcToken) {
        if (LL_ICB_Core.presentationToken || LL_ICB_Core.lastCheckedToken == newpcToken) {
            //session already started
            return;
        }

        if (!window.LL_Session) {
            LL_Session = {};
        }
        //always true if this event is caught in this window
        LL_Session.isInactive = true;

        //check if the token is valid
        LL_ICB_Core.lastCheckedToken = newpcToken;
        LL_ICB_Core.presentationToken = newpcToken;
        if (LL_ICB_Core.hostStatusUpdate) {
            LL_ICB_Core.hostStatusUpdate();
            LL_PingTimer = setTimeout(LL_PingTimeout, 5000);
        }
    },
    EscalationAccepted_listener: function (newpcToken) {
        if (LL_ICB_Core.presentationToken && LL_ICB_Core.presentationToken != newpcToken) {
            //wrong token found 
            return;
        }
        LL_CustomUI.LLActivationPopup.closePopup();
    },
    addKeyboardListener: function (wnd) {

        //display button on Ctrl+Enter
        if (wnd.attachEvent) {
            wnd.attachEvent("onkeydown", LL_ICB_Core.keyCodeListener);
            if (wnd.document) {
                //IE8 compatibility
                wnd.document.attachEvent("onkeydown", LL_ICB_Core.keyCodeListener);
                if (wnd.document.body)
                    wnd.document.body.attachEvent("onkeydown", LL_ICB_Core.keyCodeListener);
            }
        }
        else if (wnd.addEventListener) {
            wnd.addEventListener("keydown", LL_ICB_Core.keyCodeListener, false);
        }
        else {
            wnd.document.onkeydown = LL_ICB_Core.keyCodeListener;
        }
    },

    touchStartTimer: 0,
    gesture: null,
    touchDiff: 0,
    touchTimePressed: 1000,
    touchStart: function (e) {
        var touches = e.touches || e.changedTouches;
        if (touches && touches.length >= 3) {
            //3 fingers or more
            LL_ICB_Core.touchStartTimer = (new Date()).getTime();
        }
    },

    touchEnd: function (e) {
        if (LL_ICB_Core.buttonVisibility || LL_ICB_Core.panelShown || LL_ICB_Core.touchStartTimer == 0) {
            return;
        }
        //check how long it was going on 
        var currentTime = (new Date()).getTime();
        if (currentTime - LL_ICB_Core.touchStartTimer >= LL_ICB_Core.touchTimePressed) {
            //longer than a second 
            e.preventDefault();
            LL_ICB_Core.displayButton(true);
        }

        LL_ICB_Core.touchStartTimer = 0;
    },

    touchMove: function (e) { },

    touchMSEvents: function (e) {
        if (e.type == "pointerdown") {
            LL_ICB_Core.gesture.addPointer(e.pointerId);
            return;
        }
        if (e.type == "MSGestureHold") {
            if (e.detail == 1) {
                LL_ICB_Core.touchStartTimer = (new Date()).getTime();
                return;
            }
            else {
                var currentTime = (new Date()).getTime();
                LL_ICB_Core.touchDiff = currentTime - LL_ICB_Core.touchStartTimer;

                if (LL_ICB_Core.touchDiff >= LL_ICB_Core.touchTimePressed) {
                    LL_ICB_Core.displayButton(true);
                }
                LL_ICB_Core.touchStartTimer = 0;
            }
        }
    },

    touchMSPreventContext: function (e) {
        if (LL_ICB_Core.touchDiff >= LL_ICB_Core.touchTimePressed) {
            LL_ICB_Core.touchDiff = 0;
            if (e.preventDefault)
                e.preventDefault();
            if (e.stopPropagation)
                e.stopPropagation();
            if(e.stopImmediatePropagation)
                e.stopImmediatePropagation();
            e.returnValue = false;

            window.removeEventListener("contextmenu", LL_ICB_Core.touchMSPreventContext, false);

            return false;
        }
    },

    addStealthModeListeners: function () {
        if (LL_BR_Core.isMobile.any()) {
            window.addEventListener("touchstart", LL_ICB_Core.touchStart, false);
            window.addEventListener("touchmove", LL_ICB_Core.touchMove, false);
            window.addEventListener("touchend", LL_ICB_Core.touchEnd, false);
        }
        else if (LL_BR_Core.browser.OS == "Windows" && LL_BR_Core.browser.OSVersion == "RT") {
            if (window.document && document.body) {
                LL_ICB_Core.gesture = new MSGesture();
                LL_ICB_Core.gesture.target = document.body;
                document.body.addEventListener("pointerdown", LL_ICB_Core.touchMSEvents, false);
                document.body.addEventListener("MSGestureHold", LL_ICB_Core.touchMSEvents, false);
                window.addEventListener("contextmenu", LL_ICB_Core.touchMSPreventContext, false);
            }
        }
        else {
            LL_ICB_Core.addKeyboardListener(self);
            //also listen in nested same-origin iframes
            for (var cnt = 0; cnt < frames.length; cnt++) {
                var frmElement = frames[cnt];
                var sameOrigin = false;
                try {
                    sameOrigin = !!frmElement.location.href;
                }
                catch (e) {
                    sameOrigin = false;
                }
                if (sameOrigin)
                    LL_ICB_Core.addKeyboardListener(frmElement);
            }
        }
    },

    removeKeyboardListener: function (wnd) {
        if (wnd.detachEvent) {
            wnd.detachEvent("onkeydown", LL_ICB_Core.keyCodeListener);
            if (wnd.document) {
                //IE8 compatibility
                wnd.document.detachEvent("onkeydown", LL_ICB_Core.keyCodeListener);
                if (wnd.document.body)
                    wnd.document.body.detachEvent("onkeydown", LL_ICB_Core.keyCodeListener);
            }
        }
        else if (wnd.removeEventListener) {
            wnd.removeEventListener("keydown", LL_ICB_Core.keyCodeListener, false);
        }
    },

    removeStealthModeListeners: function () {
        if (LL_BR_Core.isMobile.any()) {
            window.removeEventListener("touchstart", LL_ICB_Core.touchStart, false);
            window.removeEventListener("touchmove", LL_ICB_Core.touchMove, false);
            window.removeEventListener("touchend", LL_ICB_Core.touchEnd, false);
        }
        else if (LL_BR_Core.browser.OS == "Windows" && LL_BR_Core.browser.OSVersion == "RT") {
            if (window.document && document.body) {
                document.body.removeEventListener("pointerdown", LL_ICB_Core.touchMSEvents, false);
                document.body.removeEventListener("MSGestureHold", LL_ICB_Core.touchMSEvents, false);
            }
        }
        else {
            LL_ICB_Core.removeKeyboardListener(self);
            for (var cnt = 0; cnt < frames.length; cnt++) {
                var frmElement = frames[cnt];
                var sameOrigin = false;
                try {
                    sameOrigin = !!frmElement.location.href;
                }
                catch (e) {
                    sameOrigin = false;
                }
                if (sameOrigin)
                    LL_ICB_Core.removeKeyboardListener(frmElement);
            }
        }
    },

    keyCodeListener: function (e) {
        if (LL_ICB_Core.buttonVisibility || LL_ICB_Core.panelShown || LL_CustomUI.V4Panel.isAgentConnected)
            return;
        if (!e)
            e = window.event;

        var keyCode = e.keyCode ? e.keyCode : e.which;
        var ctrlPressed = e.ctrlKey;
        if (ctrlPressed && (keyCode == 13 || keyCode == 10)) {

            if (e && e.preventDefault)
                e.preventDefault();
            if (e && e.stopPropagation)
                e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            setTimeout(function () {
                LL_ICB_Core.displayButton(true);
            }, 111);
            return false;
        }
    },

    getParameter: function (scope, paramName) {
        try {
            if (scope.location && scope.location.search) {
                var searchString = scope.location.search.substring(1), i, val, params = searchString.split("&");
                for (i = 0; i < params.length; i++) {
                    val = params[i].split("=");
                    if (val[0] == paramName) {
                        return unescape(val[1]);
                    }
                }
            }
        } catch (e) { }
        return null;
    },

    engineAlreadyLoaded: function () {
        if (LL_Deployment.icbType == "FRAME") {
            var sessionMode = LL_ICB_Core.getParameter(self, "session_mode") || LL_ICB_Core.getParameter(parent, "session_mode") || LL_ICB_Core.getParameter(top, "session_mode");
            if (sessionMode)
                return true;
        }
        else {
            if (window.communicationHandler && communicationHandler.presentationToken && communicationHandler.presentationToken == LL_ICB_Core.presentationToken && LL_ICB_Core.ltb_urls)
                //active session is in progress
                return true;
        }

        var w = self;
        while (w != window.top) {
            try {
                w = w.parent;
            }
            catch (ex) { break; }
            try {
                if (w.LL_ICB_Core || w.communicationHandler)
                    return true;
            }
            catch (ex) { }
        }

        //assume true if window name is IFRAME name
        return window.name == "ll_mainframe";
    },

    setExtParams: function (paramObject) {
        try{
            LL_Cobrowse_Manager.extParams = paramObject;
        }
        catch (ex) { }
    },

    displayPC: function (newPC, startsessionCall) {
        if (LL_ICB_Core.presentationCode == newPC)
            return;

        LL_ICB_Core.presentationCode = newPC;

        //the button might have been rendered in UNSUPPORTED state for some urls 
        //try to detect this case and re-render it if necessary
        if (typeof LL_CustomUI.V4Panel.notSupportedEnvWindow != "undefined") {
            if (typeof LL_CustomUI.V4Panel.automaticClosingTimer != "undefined" && LL_CustomUI.V4Panel.automaticClosingTimer != 0)
                LL_CustomUI.V4Panel.automaticClosingTimer.clear();

            LL_CustomUI.commonFunctions.removeNodes("V4LLPanel,V4LLPanel_CollapsedNumContNarrow,V4LLPanel_GenericToggler,V4LLPanel_CollapsedNarrowNoAgent,V4LLPanel_TermsAndConditionsToggler,V4LLPanel_HintBlock,V4LLTermsAndConditionsWindow");
            LL_CustomUI.anyPositionV4PanelOpener.animationAlreadyPlayed = false;
            LL_CustomUI.V4Panel.isOpen = false;
            LL_CustomUI.V4Panel = null;
            LL_CustomUI.V4Panel_init();
            LL_CustomUI.V4Panel.init();

            LL_ICB_Core.panelShown = true;

            setTimeout(function () {
                var pc = newPC;
                LL_CustomUI.V4Panel.setPresentationCode(pc);
                if (!startsessionCall)
                    LL_CustomUI.V4Panel.collapse();
            }, 111);
            return;
        }

        var pc = newPC;
        LL_CustomUI.V4Panel.setPresentationCode(pc);
        if (!startsessionCall)
            LL_CustomUI.V4Panel.collapse();

    },

    displayButton: function (forceButton) {
        if (!forceButton && !LL_ICB_Core.buttonVisibility)
            return;
        else if (LL_ICB_Core.panelShown || LL_ICB_Core.engineAlreadyLoaded())
            return;

        if (!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported != "none")
            LL_ICB_Core.CobrowseMode = "ACB " + LL_BR_Core.ACBSupported;

        try {
            LL_CustomUI.V4Panel.init();
        }
        catch (e) {
            //IE+require.js workaround - document.ready was fired, but document.body may still be NULL 
            setTimeout(function () {
                LL_ICB_Core.displayButton(forceButton);
            }, 1000);
            return;
        }

        LL_ICB_Core.panelShown = true;
        LL_ICB_Core.removeStealthModeListeners();
    },

    /*
    Jsonp request to Main server with given url parameter
    */
    createJsonRequest: function (url, id) {
        var body = document.getElementsByTagName("body")[0];
        LL_ICB_Core.RemoveElement(body, id); //ll_jsonp_script

        var _jsonp_script = document.createElement("script");
        _jsonp_script.id = id;
        _jsonp_script.className = "ll_jsonp_script";
        _jsonp_script.src = url;

        body.appendChild(_jsonp_script);
    },

    startSessionInternal: function (verificationType) {
        var time = new Date().getTime();

        // look if there is a pc_token in LocalStorage, and check if it belongs to a live session
        if (verificationType == LL_ICB_Core.action.verifyAll && LL_ICB_Core.presentationToken && LL_ICB_Core.presentationToken != "undefined" && LL_ICB_Core.presentationToken != "null") {
            //verify state of the current presentation token
            LL_ICB_Core.activePingVerificationFromStartSession = true;
            LL_ICB_Core.hostStatusUpdate();
            return false;
        }
        else if (verificationType != LL_ICB_Core.action.skipTokenAndTimer && LL_ICB_Core.StartSessionInitiated && LL_ICB_Core.StartSessionInitiated != "null") {
            // session might have started from another window/tab. Wait until we detect a valid presentation token, or until the timeout expires
            if ((time - LL_ICB_Core.StartSessionInitiated) < 20000) {
                setTimeout(LL_ICB_Core.StartSession, 5000);
                return false;
            }
        }
        if (LL_ICB_Core.mobSafariPingWait) {
            //if this flag is set - we are on mob Safari and waiting for verification whether the session was already started
            //ignore this call
            return false;
        }

        //notify other window or tabs that we are about to start a session 
        LL_Storage_Manager.setItemAsync(ll_siteCodeLite, "StartSessionInitiated", time);

        if (!LL_ICB_Core.validateRequestSent) {
            if (LL_CustomUI.SessionEndedPopup)
                LL_CustomUI.SessionEndedPopup.hide();
            LL_ICB_Core.validateRequestSent = false;

            LL_ICB_Core.StartSessionNetworkTime_Start = new Date().getTime();
            // start timer for network issues error display. If session is running, the timer will be reseted to null
            LL_ICB_Core.StartSessionNetworkTimeout = setTimeout(function () {
                LL_ICB_Core.sessionError({ "requestStatus": "TIMEOUT", "errorCode": 100 });
            }, LL_Deployment.StartSessionNetworkWaitTime ? LL_Deployment.StartSessionNetworkWaitTime : 60000);

            if (window.LL_customFunctions && typeof LL_customFunctions().validate === "function") {
                //custom validation functions
                try {
                    LL_customFunctions().validate(LL_ICB_Core.siteCode, LL_ICB_Core.GetLocalTime());
                }
                catch (e) {
                    clearTimeout(LL_ICB_Core.StartSessionNetworkTimeout);
                    LL_ICB_Core.StartSessionNetworkTimeout = 0;
                    LL_ICB_Core.sessionError({ "requestStatus": "ERROR", "errorCode": 110 });
                }
            }
            else {
                var validationRequestUrl = LL_ICB_Core.validationRequestUrl + "?siteID=" + LL_ICB_Core.siteCode + "&localtime=" + LL_ICB_Core.GetLocalTime();
                if (LL_ICB_Core.CobrowseMode && LL_ICB_Core.CobrowseMode.indexOf("ACB ") === 0) {
                    validationRequestUrl += "&host_umode=cobrowsing";
                }

                LL_ICB_Core.createJsonRequest(validationRequestUrl, "validationRequestUrl_livelook");

                LL_ICB_Core.StartSessionTimeout = setTimeout(function () {
                    LL_ICB_Core.startSessionInternal(LL_ICB_Core.action.skipTokenAndTimer);
                }, 10000);
            }
        }
    },
    /*
    Create session via JSONP request to main server, request return onValidateHostSession(jsonObj) function call with validate HostS ession
    */
    StartSession: function () {
        if (LL_ICB_Core.errorOccured)
            return;

        if (window.pageManipulation && pageManipulation.EventGettingInterval != 0) {
            clearInterval(pageManipulation.EventGettingInterval);
            pageManipulation.EventGettingInterval = 0;
        }

        if (!document.getElementById(LL_Storage_Manager.dataServerID) && LL_Storage_Manager.asyncReady) {
            LL_Storage_Manager.asyncReady = false;
            LL_Storage_Manager.init(true);
        }

        // Issue with two hosts with two different numbers
        LL_Storage_Manager.getItemsAsync(ll_siteCodeLite, "pc_token,StartSessionInitiated", function (val) {
            LL_ICB_Core.StartSessionInitiated = val.StartSessionInitiated != "null" ? val.StartSessionInitiated : null;
            LL_ICB_Core.presentationToken = val.pc_token != "null" ? val.pc_token : null;
            LL_ICB_Core.startSessionInternal(LL_ICB_Core.action.verifyAll);
        }, function () {
            LL_ICB_Core.StartSessionInitiated = null;
            LL_ICB_Core.presentationToken = null;
            LL_ICB_Core.startSessionInternal(LL_ICB_Core.action.skipTokenAndTimer);
        })

    },

    /*
    call function from jsonp request from 'StartSession' function 
    */
    validateHostSession: function (jsonObj) {
        if (!LL_ICB_Core.processedRequestSent && !LL_ICB_Core.validateRequestSent) {
            if (LL_ICB_Core.StartSessionTimeout != 0) {
                clearTimeout(LL_ICB_Core.StartSessionTimeout);
                LL_ICB_Core.StartSessionTimeout = 0;
            }

            LL_ICB_Core.validateRequestSent = true;

            if (jsonObj.requestStatus) {
                LL_ICB_Core.validationToken = jsonObj.validationToken;

                var startRequestUrl = LL_ICB_Core.startRequestUrl + "?validationToken=" + LL_ICB_Core.validationToken + "&siteID=" + LL_ICB_Core.siteCode + "&acb_mode=" + LL_BR_Core.ACBSupported + "&localtime=" + LL_ICB_Core.GetLocalTime();
                if (LL_ICB_Core.CobrowseMode && LL_ICB_Core.CobrowseMode.indexOf("ACB ") == 0) {
                    startRequestUrl += "&host_umode=cobrowsing";
                }
                if (LL_ICB_Core.SID) {
                    startRequestUrl += "&SID=" + escape(LL_ICB_Core.SID);
                }

                if (window.LL_Cobrowse_Manager && LL_Cobrowse_Manager.preferredGrid) {
                    startRequestUrl += "&grid=" + escape(LL_Cobrowse_Manager.preferredGrid);
                }

                //external parameters
                try{
                    if (LL_Cobrowse_Manager.extParams) {
                        if (LL_Cobrowse_Manager.extParams.hasOwnProperty("extKey")) {
                            var value = LL_Cobrowse_Manager.extParams["extKey"];
                            if (value)
                                startRequestUrl += "&extKey=" + escape(value);
                        }
                    }
                }
                catch (ex) { }
                if (LL_Deployment.language) {
                    startRequestUrl += "&lang=" + escape(LL_Deployment.language);
                }

                LL_ICB_Core.createJsonRequest(startRequestUrl, "validateHostSession_livelook");
                LL_ICB_Core.processedRequestSent = false;
                LL_ICB_Core.validateHostSessionTimeout = setTimeout(function () { LL_ICB_Core.validateHostSession(jsonObj); }, 10000);
            } else {
                //alert(jsonObj.msg);
            }
        }
    },

    /*
    call function from jsonp request from 'startHostSession' function 
    */
    startHostSession: function (jsonObj) {

        if (LL_ICB_Core.processedRequestSent)
            return;

        //stop processing if time for session to connect is more than 3 mins - error is displayed for the client already
        var curTime = new Date().getTime();
        var startDuration = curTime - LL_ICB_Core.StartSessionNetworkTime_Start;
        if (startDuration >= (LL_Deployment.StartSessionNetworkWaitTime ? LL_Deployment.StartSessionNetworkWaitTime : 60000)) {
            return;
        }

        try {
            if (jsonObj.requestStatus) {

                //clear timer
                LL_Storage_Manager.removeItemAsync(ll_siteCodeLite, "StartSessionInitiated");
                LL_ICB_Core.StartSessionInitiated = "";

                LL_ICB_Core.presentationCode = jsonObj.presentationCode;
                LL_ICB_Core.presentationToken = jsonObj.presentationToken;
                LL_ICB_Core.configuration = jsonObj.configuration;


                if (LL_Storage_Manager) {
                    //under IE8 will clear both sync/async - OK in this case
                    LL_Storage_Manager.clear(ll_siteCodeLite);
                    LL_Storage_Manager.setItem(ll_siteCodeLite, "pc_token", LL_ICB_Core.presentationToken);
                    //LL_Storage_Manager.setItemAsync(ll_siteCodeLite, "pc_token", LL_ICB_Core.presentationToken);
                    LL_Storage_Manager.setItemsAsync(ll_siteCodeLite, { "pc_token": LL_ICB_Core.presentationToken, "pc": LL_ICB_Core.presentationCode, "SID": LL_ICB_Core.SID });
                }

                var pc = LL_ICB_Core.presentationCode;
                if (!LL_CustomUI.V4Panel.presentationCode)
                    LL_CustomUI.V4Panel.setPresentationCode(pc);

                if (LL_ICB_Core.EventGettingInterval) {
                    clearInterval(LL_ICB_Core.EventGettingInterval);
                    LL_ICB_Core.EventGettingInterval = 0;
                }
                LL_ICB_Core.startHostAlive();

                if (LL_ICB_Core.StartSessionNetworkTimeout != 0) {
                    clearTimeout(LL_ICB_Core.StartSessionNetworkTimeout);
                    LL_ICB_Core.StartSessionNetworkTimeout = 0;
                }
                if (LL_ICB_Core.validateHostSessionTimeout != 0) {
                    clearTimeout(LL_ICB_Core.validateHostSessionTimeout);
                    LL_ICB_Core.validateHostSessionTimeout = 0;
                }
                LL_ICB_Core.processedRequestSent = true;

                if (window.LL_Cobrowse_Manager) {
                    LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated, LL_ICB_Core.siteCode, LL_ICB_Core.SID_listener);
                    LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
                    LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.presentationToken);
                    LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);

                    if (window.LL_Debug) {
                        var itemList = {
                            "ScreenHeight": screen.height, 
                            "ScreenWidth": screen.width,
                            "JavaEnabled": navigator.javaEnabled(),
                            "CookiesEnabled": navigator.cookieEnabled,
                            "ICBSupported": LL_BR_Core.ICBSupported,
                            "ACBSupported": LL_BR_Core.ACBSupported,
                            "UserAgentString" : navigator.userAgent
                        };
                        if (LL_ICB_Core.SID) 
                            itemList["SID"] = LL_ICB_Core.SID;
                        
                        LL_Debug.setItems(LL_ICB_Core.presentationToken, itemList);
                        LL_Debug.info(LL_ICB_Core.presentationToken, "Session started");
                    }
                }
                if(LL_ICB_Core.CobrowseMode.indexOf("ACB ") < 0)
                    LL_ICB_Core.startEngine();
            }
        } catch (e) { }
        LL_ICB_Core.setSessionParams();
    },
    disconnectHandler: function (token) {
        if (!LL_ICB_Core.presentationToken || token != LL_ICB_Core.presentationToken)
            return;
        LL_ICB_Core.doDisconnect(false, true);
    },

    setInputValuesToLocalStorage: function () {
        var result = LL_ICB_Core.getIdentificator(document.getElementsByTagName("input"), "");
        result += LL_ICB_Core.getIdentificator(document.getElementsByTagName("select"), "");
        result += LL_ICB_Core.getIdentificator(document.getElementsByTagName("textarea"), "");

        var iframes = document.getElementsByTagName("iframe");
        for (var i = 0; i < iframes.length; i++) {
            try {
                if (iframes[i].contentWindow.document) {
                    result += LL_ICB_Core.getIdentificator(iframes[i].contentWindow.document.getElementsByTagName("input"), LL_ICB_Core.getDomPath(iframes[i]));
                    result += LL_ICB_Core.getIdentificator(iframes[i].contentWindow.document.getElementsByTagName("select"), LL_ICB_Core.getDomPath(iframes[i]));
                    result += LL_ICB_Core.getIdentificator(iframes[i].contentWindow.document.getElementsByTagName("textarea"), LL_ICB_Core.getDomPath(iframes[i]));
                }
            } catch (ex) { }
        }

        if (result.length > 0) {
            result = result.substr(0, result.length - 1);
        }

        return "[" + result + "]";
    },

    getIdentificator: function (elements, iframePath) {
        var result = "";
        var checked = "";
        var value = "";
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                checked = elements[i].checked;
            }
            if (elements[i].value) {
                value = elements[i].value
            }
            result += '{ "framePath": "' + iframePath + '", "path": "' + LL_ICB_Core.getDomPath(elements[i]) + '", "value": "' + value + '", "checked": "' + checked + '" },';
            checked = "";
            value = "";
        }
        return result;
    },

    getDomPath: function (element) {
        //if (element.length != 1) throw 'Requires one element.';
        var path, node = element;
        while (node) {
            var realNode = node;
            var name = realNode.tagName;
            if (!name) {
                break;
            }
            name = name.toLowerCase();

            var parent = node.parentElement;
            if (!parent) {
                break;
            }
            var siblings = LL_ICB_Core.getChildrenByTagName(parent.children, name);
            if (siblings.length > 1) {
                name += ':eq(' + LL_ICB_Core.indexOfChild(siblings, realNode) + ')';
            }
            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    },

    getChildrenByTagName: function (children, tagName) {
        var result = new Array();
        for (var i = 0; i < children.length; i++) {
            if (children[i].tagName && children[i].tagName.toLowerCase() == tagName.toLowerCase()) {
                result[result.length] = children[i];
            }
        }
        return result;
    },

    indexOfChild: function (children, element) {
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element) {
                return i;
            }
        }
        return result;
    },

    hostStatusUpdate: function () {
        if (!LL_ICB_Core.presentationToken)
            return;

        LL_ICB_Core.noPingResponse(LL_ICB_Core.action.setTimer);

        var hostStatusUpdateUrl = LL_ICB_Core.hostStatusUpdateUrl + "?pc_token=" + LL_ICB_Core.presentationToken /*+ "&localtime=" + LL_ICB_Core.GetLocalTime()*/;
        if (LL_ICB_Core.CobrowseMode && LL_ICB_Core.CobrowseMode.indexOf("ACB ") == 0) {
            hostStatusUpdateUrl += "&host_umode=cobrowsing";
        }
        if (LL_CustomUI.LLActivationPopup.ACB_started && (LL_BR_Core.ACBSupported == ".net" || LL_BR_Core.ACBSupported == "win")) {
            hostStatusUpdateUrl += "&event=activationAccepted";
        }
        if (!LL_ICB_Core.browser)
            LL_ICB_Core.browser = LL_BR_Core.DetectBrowser();

        if (LL_ICB_Core.browser) {
            if (LL_ICB_Core.browser.BrowserName == "Safari")
                hostStatusUpdateUrl += "&localtime=" + LL_ICB_Core.GetLocalTime();
            else if (LL_ICB_Core.browser.BrowserName == "MSIE" && (LL_ICB_Core.pingCounter++ % 3 == 0)) {
                hostStatusUpdateUrl += "&localtime=" + LL_ICB_Core.GetLocalTime();
            }
        }

        LL_ICB_Core.createJsonRequest(hostStatusUpdateUrl, "hostStatusUpdate_livelook");
    },

    doDisconnect: function (sendEvent, shouldRemovePanel) {
        if (typeof shouldRemovePanel === "undefined") {
            //compatibility with mini-launcher flow
            shouldRemovePanel = true;
        }

        if ((window.pageManipulation && !pageManipulation.isSessionStoped) || LL_ICB_Core.engineStarted) {
            // engine loading started but not completed. Wait until complete. 
            setTimeout("LL_ICB_Core.doDisconnect(" + sendEvent + "," + shouldRemovePanel + ")", 111);
            return;
        }

        LL_ICB_Core.mobSafariPingWait = false;
        LL_ICB_Core.ios8PageHidden = false;
        LL_ICB_Core.engineStarted = false;
        LL_ICB_Core.changeWindowTitle(LL_ICB_Core.windowTitleAction.Remove_PC, LL_ICB_Core.presentationCode);
        LL_ICB_Core.lastKnownState = null;
        LL_ICB_Core.flags.escalationListener_added = false;
        if(window.LL_CustomUI && LL_CustomUI.LLActivationPopup)
            LL_CustomUI.LLActivationPopup.ACB_started = false;
        if (!LL_BR_Core.ICBSupported && LL_BR_Core.ACBSupported != "none")
            LL_ICB_Core.CobrowseMode = "ACB " + LL_BR_Core.ACBSupported;
        else
            LL_ICB_Core.CobrowseMode = "ICB";

        var isTimerActive = LL_ICB_Core.EventGettingInterval;
        if (isTimerActive) {
            clearInterval(LL_ICB_Core.EventGettingInterval);
            LL_ICB_Core.EventGettingInterval = 0;
        }
        if (window.pageManipulation && pageManipulation.EventGettingInterval != 0) {
            clearInterval(pageManipulation.EventGettingInterval);
            pageManipulation.EventGettingInterval = 0;
        }

        if (window.LL_Cobrowse_Manager)
            LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);

        if (shouldRemovePanel) {
            LL_CustomUI.V4PanelState = "new";
            LL_CustomUI.V4Panel.numberAlreadyGenerated = false;
            LL_CustomUI.V4Panel.displayError_shown = false;

            setTimeout(function () {
                if (!LL_ICB_Core.displayButton && LL_ICB_Core.doDisconnect) {
                    //engine got loaded in a wrong time
                    //call doDisconnect there to avoid exceptions
                    LL_ICB_Core.doDisconnect(false);
                    return;
                }
                else if (!LL_ICB_Core.buttonVisibility) {
                    LL_ICB_Core.addStealthModeListeners();
                }
                else if (LL_Deployment.delayTimer) {
                    setTimeout(function () {
                        LL_ICB_Core.displayButton(true);
                    }, LL_Deployment.delayTimer);
                }
                else {
                    LL_ICB_Core.displayButton();
                }
            }, 777);
        }
        if (LL_CustomUI.LLActivationPopup.netDelayPromptTimer != 0) {
            clearTimeout(LL_CustomUI.LLActivationPopup.netDelayPromptTimer);
            LL_CustomUI.LLActivationPopup.netDelayPromptTimer = 0;
        }
        if (LL_ICB_Core.StartSessionNetworkTimeout != 0) {
            clearTimeout(LL_ICB_Core.StartSessionNetworkTimeout);
            LL_ICB_Core.StartSessionNetworkTimeout = 0;
        }
        if (LL_ICB_Core.noPingResponseTimer != 0) {
            LL_ICB_Core.noPingResponse(LL_ICB_Core.action.clearTimer);
        }
        try {
            LL_CustomUI.LLActivationPopup.closePopup();
        }
        catch (e) { }

        if (sendEvent && LL_ICB_Core.presentationToken) {

            var hostStatusUpdateUrl = LL_ICB_Core.hostStatusUpdateUrl + "?pc_token=" + LL_ICB_Core.presentationToken + "&localtime=" + LL_ICB_Core.GetLocalTime() + "&state=DISCONNECTED";
            LL_ICB_Core.createJsonRequest(hostStatusUpdateUrl, "hostStatusUpdateUrl_livelook");
            if (window.LL_Cobrowse_Manager)
                LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.presentationToken);

            if (window.LL_Debug) {
                LL_Debug.log(LL_ICB_Core.presentationToken, "SessionTerminated");
            }
        }

        if (LL_Storage_Manager) {

            LL_Storage_Manager.getItemsAsync(ll_siteCodeLite, "pc_token,StartSessionInitiated", function (items) {
                if (!LL_ICB_Core.presentationToken) {
                    //came here second time - happens under IE
                    return;
                }

                var flagFromLS = items.StartSessionInitiated;
                var tokenFromLS = items.pc_token;
                var lastSessionUrl = LL_Storage_Manager.getItem(LL_ICB_Core.presentationToken, "lastSessionUrl");
                var currentToken = LL_ICB_Core.presentationToken;

                LL_Storage_Manager.clear(currentToken);
                LL_Storage_Manager.clear(ll_siteCodeLite);

                LL_ICB_Core.SID = "";
                LL_ICB_Core.presentationToken = "";
                //LL_Storage_Manager.removeItem(ll_siteCodeLite, "pc_token");
                LL_Storage_Manager.clearAsync(LL_ICB_Core.siteCode, function () {
                    LL_Storage_Manager.setItemAsync(ll_siteCodeLite, "StartSessionInitiated", flagFromLS);
                    if (tokenFromLS && tokenFromLS != currentToken && tokenFromLS != "null") {
                        LL_Storage_Manager.setItemAsync(ll_siteCodeLite, "pc_token", tokenFromLS);
                    }
                });
                LL_Storage_Manager.clearAsync(currentToken, function () {
                    if (lastSessionUrl) {
                        LL_Storage_Manager.setItem(LL_ICB_Core.presentationToken, "lastSessionUrl", lastSessionUrl);
                    }
                });

            });
            //LL_Storage_Manager.removeItem(ll_siteCodeLite, "pc_token");
            //LL_Storage_Manager.removeItemAsync(ll_siteCodeLite, "pc_token");

        }
        clearTimeout(LL_ICB_Core.StartSessionTimeout);
        clearTimeout(LL_ICB_Core.validateHostSessionTimeout);

        LL_ICB_Core.StartSessionTimeout = 0;
        LL_ICB_Core.validateHostSessionTimeout = 0;
        LL_ICB_Core.validateRequestSent = false;
        LL_ICB_Core.processedRequestSent = false;
        LL_ICB_Core.presentationCode = "";
        LL_CustomUI.V4Panel.presentationCode = "";
        if (shouldRemovePanel) {
            if (LL_CustomUI.V4Panel.automaticClosingTimer != 0)
                LL_CustomUI.V4Panel.automaticClosingTimer.clear();

            LL_CustomUI.commonFunctions.removeNodes("V4LLPanel,V4LLPanel_CollapsedNumContNarrow,V4LLPanel_GenericToggler,V4LLPanel_CollapsedNarrowNoAgent,V4LLPanel_TermsAndConditionsToggler,V4LLPanel_HintBlock,V4LLTermsAndConditionsWindow");
            if(typeof LL_CustomUI.termsAndConditionsWindow != "undefined") 
                LL_CustomUI.termsAndConditionsWindow.initialized = false;

            LL_ICB_Core.panelShown = false;
            LL_CustomUI.anyPositionV4PanelOpener.animationAlreadyPlayed = false;
            LL_CustomUI.V4Panel.isOpen = false;
        }

        //add listener to the start session event
        if (window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
        }

        if (window.LL_Session)
            LL_Session.isInactive = false;

    },

    createNoAccessDiv: function (id) {
        var divTag = document.createElement("div");
        divTag.id = id;
        divTag.style.width = '100%';
        divTag.style.height = '100%';
        divTag.style.left = '0px';
        divTag.style.top = '0px';
        divTag.style.display = 'block';
        divTag.style.position = 'fixed';
        divTag.style.zIndex = 9999;
        divTag.style.background = "#000";
        divTag.style.opacity = '0';
        divTag.style.filter = 'alpha(opacity=0)';
        divTag.style.cursor = 'progress';


        if (!document.getElementById(id))
            document.body.appendChild(divTag);
    },

    noPingResponse: function (setTimer) {
        if (setTimer == LL_ICB_Core.action.setTimer && !LL_ICB_Core.noPingResponseTimer) {
            LL_ICB_Core.noPingResponseTimer = setTimeout(function () {
                LL_Storage_Manager.removeItemAsync(ll_siteCodeLite, "StartSessionInitiated");
                LL_ICB_Core.StartSessionInitiated = "";
                LL_ICB_Core.doDisconnect(true, true);
                if (window.LL_Debug)
                    LL_Debug.set(LL_ICB_Core.presentationToken, "DisconnectReason", "TimeoutHostExpired");

            }, LL_ICB_Core.noPingResponsePeriod);
        }
        else if (setTimer == LL_ICB_Core.action.clearTimer && LL_ICB_Core.noPingResponseTimer) {
            clearTimeout(LL_ICB_Core.noPingResponseTimer);
            LL_ICB_Core.noPingResponseTimer = 0;
        }
    },

    startEngine: function (doNotWait) {
        if (!doNotWait && (!LL_ICB_Core.doPreloadEngine || LL_ICB_Core.engineStarted || LL_ICB_Core.CobrowseMode != "ICB" || !LL_ICB_Core.presentationToken))
            return;

        LL_Storage_Manager.setItem(ll_siteCodeLite, "session_mode", "host");
        LL_Storage_Manager.setItem(ll_siteCodeLite, "pc_token_redirect", LL_ICB_Core.presentationToken);

        if (LL_ICB_Core.StartHostAliveTimer != 0) {
            clearTimeout(LL_ICB_Core.StartHostAliveTimer);
            LL_ICB_Core.StartHostAliveTimer = 0;
        }
        LL_ICB_Core.removeChatListener();

        var interval = doNotWait ? 0 : 2000;
        setTimeout(function () {
            if (!LL_ICB_Core.presentationToken) {
                //session was stopped while we were waiting
                LL_ICB_Core.engineStarted = false;
                return;
            }
            LL_ICB_Core.noPingResponse(LL_ICB_Core.action.clearTimer);

            clearInterval(LL_ICB_Core.EventGettingInterval);
            LL_ICB_Core.EventGettingInterval = 0;

            if (window.LL_Cobrowse_Manager)
                LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);

            var startRequestUrl;

            if (window.LL_Deployment && LL_Deployment.hostEngineURL) {
                startRequestUrl = LL_Deployment.hostEngineURL;
            }
            else {
                var ms = LL_Deployment.scriptServerPath;
                ms = (ms == "//int.sharescreen.net") ? "//www.livelook.us" : ms;
                startRequestUrl = ms + "/webinterfaces/icb/engine.aspx?session_mode=host";
            }
            if (window.LL_Deployment) {
                if (LL_Deployment.version) {
                    var del_char = startRequestUrl.indexOf("?") == -1 ? "?" : "&";
                    startRequestUrl += del_char + LL_Deployment.version;
                }
                if (LL_Deployment.language) {
                    var del_char = startRequestUrl.indexOf("?") == -1 ? "?" : "&";
                    startRequestUrl += del_char + "lang=" + LL_Deployment.language;
                }
            }
            if (window.LL_Debug) {
                LL_Debug.info(LL_ICB_Core.presentationToken, "Loading engine " + startRequestUrl);
            }
            ll_userType = "host";
            LL_ICB_Core.createJsonRequest(startRequestUrl, "engine_livelook");

        }, interval);

        //TODO: add mechanism to check whether engine did load after 5 seconds
        LL_ICB_Core.engineStarted = true;
    },

    hostStateUpdate: function (hostStatusUpdateResponse) {

        if (hostStatusUpdateResponse && hostStatusUpdateResponse.sessionState != "ERROR") {
            LL_ICB_Core.noPingResponse(LL_ICB_Core.action.clearTimer);
        }

        var presentation_Token = hostStatusUpdateResponse.presentationToken;
        if (presentation_Token && presentation_Token != LL_ICB_Core.presentationToken && hostStatusUpdateResponse.sessionState == "DISCONNECTED") {
            return;
        }

        if (hostStatusUpdateResponse && hostStatusUpdateResponse.sessionState != "ERROR") {
            if (LL_PingTimer != 0) {
                clearTimeout(LL_PingTimer);
                LL_PingTimer = 0;
            }
            LL_ICB_Core.mobSafariPingWait = false;
        }

        var startsessionCall = LL_ICB_Core.activePingVerificationFromStartSession;
        if (hostStatusUpdateResponse.sessionState != "DISCONNECTED") {
            LL_ICB_Core.activePingVerificationFromStartSession = false;
            LL_Storage_Manager.removeItemAsync(ll_siteCodeLite, "StartSessionInitiated");
            LL_ICB_Core.StartSessionInitiated = "";
        }

        LL_ICB_Core.lastKnownState = hostStatusUpdateResponse.sessionState;

        switch (hostStatusUpdateResponse.sessionState) {
            case 'WAIT':
                if (!LL_ICB_Core.panelShown) {
                    //show it now
                    LL_ICB_Core.displayButton(true);
                }
                if (!LL_ICB_Core.EventGettingInterval) {
                    LL_ICB_Core.startHostAlive();
                    if (window.LL_Cobrowse_Manager) {
                        LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
                        //LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.presentationToken);
                        LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);
                    }
                    var session_mode = hostStatusUpdateResponse.session_mode;
                    if (session_mode)
                        LL_ICB_Core.CobrowseMode = "ACB " + session_mode;
                    if (LL_ICB_Core.CobrowseMode == "ICB")
                        LL_ICB_Core.startEngine();


                    if (window.LL_Debug) {
                        LL_Debug.info(LL_ICB_Core.presentationToken, "Connected page " + (window.location.protocol + "//" + window.location.hostname + window.location.pathname) + " to an active session");
                    }
                }

                if (!LL_ICB_Core.LastKnownMode)
                    LL_ICB_Core.LastKnownMode = (LL_ICB_Core.CobrowseMode == "ICB") ? "ICB" : "ACB";

                if (!LL_CustomUI.V4Panel.presentationCode || LL_CustomUI.V4Panel.presentationCode != hostStatusUpdateResponse.pc) {
                    LL_ICB_Core.displayPC(hostStatusUpdateResponse.pc, startsessionCall);
                }
                break;
            case 'ACTIVATE':
                if (LL_ICB_Core.engineAlreadyLoaded())
                    return;

                if (!LL_ICB_Core.panelShown) {
                    //show it now
                    LL_ICB_Core.displayButton(true);
                }
                if (!LL_ICB_Core.EventGettingInterval) {
                    LL_ICB_Core.startHostAlive();
                    if (window.LL_Cobrowse_Manager) {
                        LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
                        //LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.presentationToken);
                        LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);
                    }
                    if (window.LL_Debug) {
                        LL_Debug.info(LL_ICB_Core.presentationToken, "Connected page " + (window.location.protocol + "//" + window.location.hostname + window.location.pathname) + " to an active session");
                    }
                }

                LL_ICB_Core.LastKnownMode = "ACB";

                if (!LL_CustomUI.V4Panel.presentationCode) {
                    LL_ICB_Core.displayPC(hostStatusUpdateResponse.pc, startsessionCall);
                }
                if (!LL_ICB_Core.flags.escalationListener_added && window.LL_Cobrowse_Manager) {
                    LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.EscalationAccepted, LL_ICB_Core.presentationToken, LL_ICB_Core.EscalationAccepted_listener);
                    LL_ICB_Core.flags.escalationListener_added = true;
                    LL_ICB_Core.changeWindowTitle(LL_ICB_Core.windowTitleAction.Add_PC, hostStatusUpdateResponse.pc);
                    LL_CustomUI.LLActivationPopup.showPopup();

                    LL_CustomUI.V4Panel.setAgentConnected();
                    if (!LL_CustomUI.V4Panel.presentationCode)
                        LL_CustomUI.V4Panel.setPresentationCode(LL_ICB_Core.presentationCode);
                }
                break;
            case 'ACTIVE':
                if (LL_ICB_Core.engineAlreadyLoaded())
                    return;

                LL_ICB_Core.LastKnownMode = "ICB";

                if (!LL_ICB_Core.EventGettingInterval) {
                    LL_ICB_Core.setSessionParams();
                    if (window.LL_Cobrowse_Manager) {
                        LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
                        //LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.presentationToken);
                        LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);

                        LL_Cobrowse_Manager.Events.ContextReady.dispatch(LL_ICB_Core.presentationToken);
                    }
                    if (window.LL_Debug) {
                        LL_Debug.info(LL_ICB_Core.presentationToken, "Connected page " + (window.location.protocol + "//" + window.location.hostname + window.location.pathname) + " to an active session");
                    }
                    LL_ICB_Core.startEngine(true);
                }

                if (LL_CustomUI.LLActivationPopup.netDelayPromptTimer != 0) {
                    try {
                        clearTimeout(LL_CustomUI.LLActivationPopup.netDelayPromptTimer);
                        LL_CustomUI.LLActivationPopup.netDelayPromptTimer = 0;

                    }
                    catch (e) { }
                }

                var gridUrl = hostStatusUpdateResponse.gridServer.gridUrl;
                var hostToken = hostStatusUpdateResponse.gridServer.hostToken;

                LL_ICB_Core.changeWindowTitle(LL_ICB_Core.windowTitleAction.Remove_PC, hostStatusUpdateResponse.pc);

                if (LL_ICB_Core.localStorageSupported) {
                    if (!LL_ICB_Core.presentationToken) {
                        LL_ICB_Core.presentationToken = hostStatusUpdateResponse.presentationToken;
                        LL_ICB_Core.presentationCode = hostStatusUpdateResponse.pc;
                    }

                    if (LL_ICB_Core.presentationToken)
                        LL_Storage_Manager.removeItem(LL_ICB_Core.presentationToken, 'lastSessionUrl');

                    LL_Storage_Manager.setItem(ll_siteCodeLite, "presentationToken_host", LL_ICB_Core.presentationToken);

                    var data_to_store = {
                        "currentPageUrl_host": window.location.href,
                        "siteCode_host": LL_ICB_Core.siteCode,
                        "participantId_host": hostStatusUpdateResponse.participantId,
                        "hostToken_host": hostToken,
                        "gridUrl_host": gridUrl
                    };

                    if (LL_Deployment.icbType != "SCRIPT") {
                        try {
                            data_to_store.inputValues = escape(LL_ICB_Core.setInputValuesToLocalStorage());
                        }
                        catch (e) { }
                    }

                    LL_Storage_Manager.setItemsAsync(LL_ICB_Core.presentationToken, data_to_store, function () {
                        clearInterval(LL_ICB_Core.EventGettingInterval);
                        LL_ICB_Core.EventGettingInterval = 0;
                        if (LL_Deployment.icbType != "SCRIPT") {
                            var domainWithoutProtocol = ll_coBrowseLiteAgentUrl.substring(10);
                            domainWithoutProtocol = domainWithoutProtocol.substr(domainWithoutProtocol.indexOf("/"));

                            var delimiter = domainWithoutProtocol.indexOf("?") == -1 ? "?" : "&";
                            var scriptSrvPath = LL_Deployment.scriptServerPath;
                            if (scriptSrvPath.indexOf('//') == 0)
                                scriptSrvPath = scriptSrvPath.substring(2);
                            domainWithoutProtocol = domainWithoutProtocol + delimiter + "session_mode=host&ms=" + scriptSrvPath + "&pc_token_redirect=" + LL_ICB_Core.presentationToken;
                            window.location = domainWithoutProtocol;
                        }
                        else {
                            LL_ICB_Core.createNoAccessDiv("llnoaccess");
                            LL_Storage_Manager.setItem(ll_siteCodeLite, "session_mode", "host");
                            LL_Storage_Manager.setItem(ll_siteCodeLite, "pc_token_redirect", LL_ICB_Core.presentationToken);
                            if (!LL_ICB_Core.engineStarted) {
                                LL_ICB_Core.startICBsession();
                            }
                            setTimeout(function () {
                                try{
                                    document.getElementById("llnoaccess").style.display = 'none';
                                }
                                catch (e) { }
                            }, 4444);
                        }
                    }, function () { /*timeout, do nothing, just wait for the next ping*/ });
                }


                break;
            case 'ELEVATING':
                if (LL_ICB_Core.engineAlreadyLoaded())
                    return;

                //if number is not shown: show it
                if (!LL_ICB_Core.panelShown) {
                    //show it now
                    LL_ICB_Core.displayButton(true);
                }
                if (!LL_CustomUI.V4Panel.presentationCode) {
                    LL_ICB_Core.displayPC(hostStatusUpdateResponse.pc, startsessionCall);
                }
                
                LL_ICB_Core.changeWindowTitle(LL_ICB_Core.windowTitleAction.Add_PC, hostStatusUpdateResponse.pc);

                //load engine
                if (!LL_ICB_Core.EventGettingInterval) {
                    LL_ICB_Core.startHostAlive();
                    if (window.LL_Cobrowse_Manager) {
                        LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
                        //LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.presentationToken);
                        LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);
                    }
                    if (window.LL_Debug) {
                        LL_Debug.info(LL_ICB_Core.presentationToken, "Connected page " + (window.location.protocol + "//" + window.location.hostname + window.location.pathname) + " to an active session");
                    }

                    LL_ICB_Core.startEngine(true);
                }

                LL_ICB_Core.LastKnownMode = "ICB";

                break;
            case 'ELEVATED':
                if (LL_ICB_Core.engineAlreadyLoaded())
                    return;

                LL_ICB_Core.LastKnownMode = "ACB";

                if (!LL_ICB_Core.EventGettingInterval) {
                    if (window.LL_Cobrowse_Manager) {
                        LL_Cobrowse_Manager.removeEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
                        //LL_Cobrowse_Manager.dispatchEvent(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.presentationToken);
                        LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.SessionDisconnected, LL_ICB_Core.presentationToken, LL_ICB_Core.disconnectHandler);
                    }
                }
                
                LL_ICB_Core.changeWindowTitle(LL_ICB_Core.windowTitleAction.Remove_PC, hostStatusUpdateResponse.pc);

                try {
                    LL_CustomUI.LLActivationPopup.closePopup();
                }
                catch (e) { }

                //same as disconnected - hide toolbar, stop pings
                if (LL_CustomUI.LLActivationPopup.netDelayPromptTimer != 0) {
                    try {
                        clearTimeout(LL_CustomUI.LLActivationPopup.netDelayPromptTimer);
                        LL_CustomUI.LLActivationPopup.netDelayPromptTimer = 0;

                    }
                    catch (e) { }
                }

                if (LL_ButtonTimer != 0) {
                    clearTimeout(LL_ButtonTimer);
                    LL_ButtonTimer = 0;
                }

                if (LL_ICB_Core.panelShown) {
                    //hide it 
                    LL_CustomUI.V4Panel.hide(222);
                    if (window.LL_Debug) {
                        LL_Debug.info(LL_ICB_Core.presentationToken, "Hiding launch panel for " + (window.location.protocol + "//" + window.location.hostname + window.location.pathname) + " due to an active ACB session");
                    }
                }

                if (LL_ICB_Core.EventGettingInterval) {
                    clearInterval(LL_ICB_Core.EventGettingInterval);
                    LL_ICB_Core.EventGettingInterval = 0;
                }
                break;

            case 'DISCONNECTED':
                //LL_ICB_Core.changeWindowTitle(LL_ICB_Core.windowTitleAction.Remove_PC, hostStatusUpdateResponse.pc);
                if (!LL_ICB_Core.activePingVerificationFromStartSession) {
                    var sessionAlive = !!LL_ICB_Core.EventGettingInterval;
                    LL_ICB_Core.doDisconnect(false, sessionAlive);
                    if (!sessionAlive) {
                        LL_ICB_Core.customFunctionProceed();
                    }

                    if (sessionAlive) {
                        //active session was in progress
                        if (window.LL_Debug) {
                            LL_Debug.set(presentation_Token, "DisconnectReason", hostStatusUpdateResponse.reason);
                        }
                    }
                }
                else {
                    LL_ICB_Core.activePingVerificationFromStartSession = false;
                    LL_Storage_Manager.removeItemAsync(ll_siteCodeLite, "pc_token") //, success_callback_function, timeout_callback_function)
                    LL_ICB_Core.startSessionInternal(LL_ICB_Core.action.skipToken);
                }

                if (window.LL_Session)
                    LL_Session.isInactive = false;

                break;
            case 'ERROR':
                if (window.LL_Debug) {
                    var response = "";
                    try {
                        response = JSON.stringify(hostStatusUpdateResponse);
                    }
                    catch (e) { }
                    LL_Debug.error(LL_ICB_Core.presentationToken, "Error", response);
                }
                break;
        }
    },

    changeWindowTitle: function (action, pc) {
        if (LL_BR_Core.browser.OS.indexOf("Mac OS") == -1)
            return;

        if (window.document && typeof document.title == "string") {
            if (action == LL_ICB_Core.windowTitleAction.Add_PC) {
                if (document.title.indexOf(pc) == -1) {
                    document.title = "(#" + pc + ") " + document.title;
                }
            }
            else {
                if (document.title.indexOf(pc) > -1) {
                    var title = "(#" + pc + ") ";
                    document.title = document.title.replace(title, "");
                }
            }
        }
    },
    setSessionParams: function () {
        if (!window.LL_Session)
            LL_Session = {};
        LL_Session.presentationToken = LL_ICB_Core.presentationToken;
        LL_Session.SID = LL_ICB_Core.SID;
        LL_Session.presentationCode = LL_ICB_Core.presentationCode;
    },
    customFunctionProceed: function () {
        try{
            if (window.LL_customFunctions && LL_customFunctions().customLauncher) {
                LL_customFunctions().customLauncher.apply(this, []);
            }
        }
        catch (e) { }
    },

    startICBsession: function () {
        var ms = LL_Deployment.scriptServerPath;
        ms = (ms == "//int.sharescreen.net") ? "//www.livelook.us" : ms;
        var startRequestUrl = ms + "/webinterfaces/icb/engine.aspx?siteID=" + escape(LL_ICB_Core.siteCode) + "&pc_token=" + escape(LL_ICB_Core.presentationToken);
        ll_userType = "host";
        LL_ICB_Core.createJsonRequest(startRequestUrl, "engine_livelook");
    },

    RemoveElement: function (element, child_id) {
        if (document.getElementById(child_id)) {
            var child = document.getElementById(child_id);
            if (child && element) {
                element.removeChild(child);
            }
        }
    },

    GetScrollPosition: function () {
        var ScrollTop = document.body.scrollTop;
        if (ScrollTop == 0) {
            if (window.pageYOffset) {
                ScrollTop = window.pageYOffset;
            } else {
                ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
            }
        }
        return ScrollTop;
    },

    GetLocalTime: function () {
        return Math.round((new Date()).getTime() / 1000);
    },

    sendCurrentPageUrlState: function () {

        if (LL_Deployment.icbType != "FRAME") {
            return;
        }

        llsyncLost = 0;
        if (LL_ICB_Core.EventCurrentPageUrlStateInterval) {
            clearInterval(LL_ICB_Core.EventCurrentPageUrlStateInterval);
        }

        if (!LL_ICB_Core.presentationToken && window.LL_Storage_Manager) {
            var pc_token = LL_Storage_Manager.getItem(ll_siteCodeLite, "pc_token");
            if (!pc_token || pc_token == "null")
                LL_Storage_Manager.getItemAsync(ll_siteCodeLite, "pc_token", function (value) {
                    LL_ICB_Core.presentationToken = value;
                });
            else
                LL_ICB_Core.presentationToken = pc_token;
        }

        LL_ICB_Core.EventCurrentPageUrlStateInterval = setInterval(function () {
            var topLocation = null;
            try {
                topLocation = top.location.href;
            }
            catch (e) {
                topLocation = null;
            }
            if (!topLocation) {
                //sync is lost
                if (++llsyncLost > 2) {
                    LL_Storage_Manager.setItemAsync(LL_ICB_Core.presentationToken, "currentPageUrl_host", window.location.href);
                    if (LL_ICB_Core.localStorageSupported && LL_ICB_Core.presentationToken) {
                        LL_Storage_Manager.removeItem(LL_ICB_Core.presentationToken, 'lastSessionUrl');
                        //localStorage.removeItem('lastPageStateForrediraction');
                    }

                    parent.postMessage("path=" + self.location.href, "*");
                    llsyncLost = 0;
                }
            }
        }, 333);
    },

    getTimeString: function () {
        var today = new Date();
        var hours = today.getHours();
        if (hours < 10)
            hours = "0" + hours;

        var mins = today.getMinutes();
        if (mins < 10)
            mins = "0" + mins;

        var secs = today.getSeconds();
        if (secs < 10)
            secs = "0" + secs;

        return "" + hours + ":" + mins + ":" + secs;
    },

    startHostAlive: function () {

        LL_ICB_Core.LastKnownMode = null; //new session
        if (window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.Events.ContextReady.dispatch(LL_ICB_Core.presentationToken);
        }
        if (window.LL_CustomUI && LL_CustomUI.SessionEndedPopup)
            LL_CustomUI.SessionEndedPopup.hide();

        if (LL_ICB_Core.StartHostAliveTimer != 0) {
            clearTimeout(LL_ICB_Core.StartHostAliveTimer);
            LL_ICB_Core.StartHostAliveTimer = 0;
        }
        LL_ICB_Core.removeChatListener();
        LL_ICB_Core.StartHostAliveTimer = setTimeout(function () {
            try {
                if (!LL_ICB_Core.engineAlreadyLoaded()) {
                    LL_ICB_Core.EventGettingInterval = setInterval(LL_ICB_Core.hostStatusUpdate, 2000);
                    LL_ICB_Core.hostStatusUpdate();
                }
            }
            catch (e) {
            }
        }, 5000);

        LL_ICB_Core.setSessionParams();

    },

    sessionError: function (objError) {
        // objError = {"requestStatus" : "ERROR", "errorCode" : 1}
        LL_ICB_Core.errorOccured = true;
        LL_CustomUI.V4Panel.displayError(objError.errorCode);
        if (window.LL_Debug && LL_ICB_Core.presentationToken) {
            LL_Debug.error(LL_ICB_Core.presentationToken, "Error", "Session Start Error, code: " + objError.errorCode);
        }
        LL_ICB_Core.doDisconnect(false, false);
    },
    removeChatListener: function () {
        if (LL_ICB_Core.SID_interval != 0) {
            clearInterval(LL_ICB_Core.SID_interval);
            LL_ICB_Core.SID_interval = 0;
        }
        if (window.removeEventListener)
            window.removeEventListener("storage", LL_ICB_Core.onStorageChange, false);
        else if (window.detachEvent)
            window.detachEvent("onstorage", LL_ICB_Core.onStorageChange);
    }
};


var LL_ButtonTimer = 0, LL_PingTimer = 0;
var LL_PingTimeout = function () {
    try {
        LL_ICB_Core.hostStatusUpdate();
    }
    catch (e) {
        clearTimeout(LL_PingTimer);
        LL_PingTimer = 0;
        return;
    }

    LL_PingTimer = setTimeout(LL_PingTimeout, 5000);
};
var LL_Page_Loaded = function () {
    LL_ICB_Core.init();

    if (typeof LL_ICB_Core.engineAlreadyLoaded === "undefined")
        //nothing to do if we are already inside engine.js
        return;

    if (!LL_ICB_Core.engineAlreadyLoaded()) {
        if (!LL_ICB_Core.buttonVisibility)
            LL_ICB_Core.addStealthModeListeners();
        else if (LL_Deployment.delayTimer)
            LL_ButtonTimer = setTimeout(function () {
                try {
                    LL_ICB_Core.displayButton(true);
                }
                catch (e) { }
            }, LL_Deployment.delayTimer);
        else
            LL_ICB_Core.displayButton();

        if (LL_Storage_Manager && LL_BR_Core.ICBSupported && window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.ChatCobrowseInitiated, LL_ICB_Core.siteCode, LL_ICB_Core.SID_listener);
        }

        if (window.LL_BR_Core && LL_BR_Core.isMobile.iOS() && LL_BR_Core.browser && LL_BR_Core.browser.BrowserName == "Safari") {
            if (LL_BR_Core.browser.OSVersion && LL_BR_Core.browser.OSVersion.indexOf("7.") == 0)
                window.addEventListener("pageshow", LL_ICB_Core.mobSafariPageShow, false);
            else {
                //assume IOS 8.+
                if (window.document) 
                    document.addEventListener("visibilitychange", LL_ICB_Core.ios8PageShow, false);
            }
        }

        if (LL_ICB_Core.localStorageSupported) {
            LL_ICB_Core.SID_interval = setInterval(LL_ICB_Core.waitForStorage, 15000);
            if (window.addEventListener)
                window.addEventListener("storage", LL_ICB_Core.onStorageChange, false);
            else if (window.attachEvent)
                window.attachEvent("onstorage", LL_ICB_Core.onStorageChange);
        }

        // add start session listener
        if (window.LL_Cobrowse_Manager) {
            LL_Cobrowse_Manager.addEventListener(LL_Cobrowse_Manager.Events.NumberGenerated, LL_ICB_Core.siteCode, LL_ICB_Core.SessionStarted_listener);
        }
        var pcTokenLocal = LL_Storage_Manager.getItem(ll_siteCodeLite, "pc_token");
        LL_Storage_Manager.getItemAsync(ll_siteCodeLite, "pc_token",
            function (value) {
                var pcToken = value;
                if (!pcToken || pcToken == "undefined" || pcToken == "null") {
                    //sometimes async local storage may be reported as enabled
                    //but it is actually disable due to privacy settings
                    //if async local storage returns null - let's try sync local storage as the last resort
                    //say Hi to Safari
                    pcToken = pcTokenLocal;
                }
                if (window.name != "ll_mainframe") {
                    //check if the token is valid, and connect this page to the session if yes
                    if (pcToken && pcToken != "undefined" && pcToken != "null") {
                        LL_ICB_Core.presentationToken = pcToken;
                        if (LL_ICB_Core.hostStatusUpdate) {
                            LL_ICB_Core.hostStatusUpdate();
                            LL_PingTimer = setTimeout(LL_PingTimeout, 5000);
                        }
                    }
                    else {
                        LL_ICB_Core.customFunctionProceed();
                    }
                }
            },
            function () {
                //timeout
                if (pcTokenLocal && pcTokenLocal != "undefined" && pcTokenLocal != "null") {
                    LL_ICB_Core.presentationToken = pcTokenLocal;
                    if (LL_ICB_Core.hostStatusUpdate) {
                        LL_ICB_Core.hostStatusUpdate();
                        LL_PingTimer = setTimeout(LL_PingTimeout, 5000);
                    }
                }
                else {
                    setTimeout(LL_Page_Loaded, 1);
                }
            });

    }
    else {
        //for detection if session is out of scope
        var sessionMode = LL_ICB_Core.getParameter(self, "session_mode") || LL_ICB_Core.getParameter(parent, "session_mode");
        if (sessionMode != "Agent") {
            if (window.name == "ll_mainframe") {
                LL_ICB_Core.sendCurrentPageUrlState();
            }
        }
    }
}

LL_Page_Loaded();
