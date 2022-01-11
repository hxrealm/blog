---
layout: post
title: Java和Javascript相互调用的实例
date: 2015-12-14 15:49
comments: true
categories: [javascript]
---

在用HTML5做跨平台应用开发时,尝尝会用到java和js方法互调的问题,对初学者而言,可能会有点难,在这里分享一些自己在实际开发过程中的用法,这里以单点登录的实现方法为例，希望对你有帮助: 

首先是java中实现JS方法并实现主动调用JS中方法: 
    
    // Javascript接口类
    public class SingleLoginJSInterface {

        private static final String CODE_SUCCESS = "100";
        private static final String CODE_CANCEL = "101";
        private static final String CODE_GET_TOKEN_ERROR = "102";
        private static final String MSG_SUCCESS = "成功";
        private static final String MSG_CANCEL = "用户取消";
        private static final String MSG_GET_TOKEN_ERROR = "获取token失败";
        private static final String CODE = "code";
        private static final String MSG = "msg";
        private static final String UNAME = "uname";
        private static final String UID = "uid";
        private static final String TOKEN = "token";
        
        // Javascript接口方法
        @JavascriptInterface
        public void login() {
            Log.d("singlesignon", "login");
            final String appId = HttpUtils.getInstance().getAppId();
            Log.d("singlesignon", "appId:" + appId);
            Context context = BrowserApplication.getInstance();
            GioneeAccount gioneeAccount = GioneeAccount.getInstance(context);
            gioneeAccount.login(context, appId, new LoginResultListener() {

                @Override
                public void onSucess(Object obj) {
                    Log.d("singlesignon", "success object:" + obj);
                    handlerResult(obj);
                }

                @Override
                public void onCancel(Object obj) {
                    Log.d("singlesignon", "cancel object:" + obj);
                    sendParamsToJS(CODE_CANCEL, MSG_CANCEL);
                }

                @Override
                public void onGetTokenError(Object obj) {
                    Log.d("singlesignon", "tokenerror object:" + obj);
                    sendParamsToJS(CODE_GET_TOKEN_ERROR, MSG_GET_TOKEN_ERROR);
                }

                private void handlerResult(Object obj) {
                    LoginInfo loginInfo = (LoginInfo) obj;
                    String name = loginInfo.getName();
                    String uid = loginInfo.getUid();
                    String token = loginInfo.getToken();

                    JSONObject object = new JSONObject();
                    try {
                        object.put(CODE, CODE_SUCCESS);
                        object.put(MSG, MSG_SUCCESS);
                        object.put(UNAME, name);
                        object.put(UID, uid);
                        JSONObject tokenJSON = new JSONObject(token);
                        object.put(TOKEN, tokenJSON);
                    } catch (JSONException e) {
                        Log.d("singlesignon", "JSONException");
                        e.printStackTrace();
                    }
                    sendParamsToJS(object);
                }

                private void sendParamsToJS(String code, String msg) {

                    JSONObject object = new JSONObject();
                    try {
                        object.put(CODE, code);
                        object.put(MSG, msg);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    sendParamsToJS(object);
                }

                private void sendParamsToJS(JSONObject object) {
                    Log.d("singlesignon", "object:" + object);
                    Controller
                            .getInstance()
                            .getCurrentTab()
                            .getWebView()
                            // java中调用JS的方法
                            .loadUrl(
                                    "javascript:GNBrowser.singleLogin.middleware('"
                                            + object + "')");
                }
            });
        }

    }

然后就可以在引用的js文件中直接通过window.SingleLoginJSInterface.login()来直接调用上面的login()方法了. 

Javascript调用Java中的方法代码封装：

    (function(){
        var gnLocalBrowser = {
            singleLogin: {
                get: null,
                support: function(){
                    return gnLocalBrowser.support('singleLogin');
                },
                login: function(){
                    if(this.support().status){
                       this.support().name.login();
                    }
                },
                callback: function(){
                    var that = this;
                    var param = this.getData().token;
                    
                    if(window.singleLoginJumpUrl){
                        if(window.$ === Zepto || window.$ === jQuery){
                            $.ajax({
                                url: window.singleLoginJumpUrl,
                                type: 'get',
                                data: {h:param.h,n:param.n,t:param.t,v:param.v},
                                dataType: 'json',
                                beforeSend: function(){},
                                success: function(data){
                                    alert(JSON.stringify(data));
                                    if(data.success){
                                        window.location.reload();
                                    }
                                },
                                error: function(){
                                    alert('登陆失败，请重新登陆');
                                }
                            });
                        }
                    } else {
                        alert('登陆成功，未检测到请求成功的URL！');
                    }
                },
                middleware: function(data){ // JAVA调用JS的方法
                    try{
                        //alert('JSON string is :-------' + data);
                        data = gnLocalBrowser.json2obj(data);
                        //alert('json parse is success.');
                    } catch(e){
                        //alert('json format is error.')
                        data = null;
                    }

                    if(data && data.code === '100'){
                        this.setData(data);
                        this.callback();
                    } else {
                        this.loginFail(data);
                    }
                },
                loginFail: function(data){
                    //alert('登录异常，请重新登录！');
                    document.title = 'hello world';
                },
                loginSuccess: function(){
                    alert('登录成功！');
                },
                getData: function(){
                    return this.userData;
                },
                setData: function(data){
                    this.userData = data;
                },
            },
            json2obj: function(json){
                return JSON.parse(json);
            },
            support: function(name){
                var classMaps = {
                    'singleLogin': 'SingleLoginJSInterface',
                };
                var status = window[classMaps[name]] !== undefined ? true : false;
                return {'status': status, 'name': window[classMaps[name]]};
            }
        };

        window.GNBrowser = gnLocalBrowser;

    })();