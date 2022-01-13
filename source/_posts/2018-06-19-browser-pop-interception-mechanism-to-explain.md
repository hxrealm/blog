---
title: 浏览器弹窗拦截机制解剖
cover: /gallery/8.jpg
tags:
  - 经验之谈
categories:
  - 前端技术
date: 2018-06-19 22:04:00
---

上一篇文章[《在浏览器新窗口中打开的几种方式》](/blog/open-a-new-window-in-the-browser/)介绍了在浏览器中打开新窗口的一些场景，但没有提到在浏览器中打开新窗口时会遇到弹窗被拦截（或阻止）的情况。

本篇文章将从浏览器弹窗拦截（或阻止）机制的原理、按步骤重现浏览器弹窗被拦截的场景以及实现如何绕过浏览器弹窗拦截。

## 弹窗拦截的机制

浏览器安全机制中，页面弹窗，_必须是在用户触发的，才算合法弹窗_；由*ajax 或定时执行的弹窗均为非用户触发*。会被浏览器或相关安全软件理解为广告被拦截掉；

## 弹窗拦截的场景

通过点击（ajax）获取后端返回的参数，其中部分参数会在在打开新窗口中进行页面跳转时使用。例如：自动登录（单点登录）、文件下载（权限控制）等等。

<!--more-->

### 场景一

```html
<a id="J_autoLogin" href="javascript:;" onclick="openNewWin();">自动登录</a>

<script>
  function openNewWin() {
    $.ajax({
      url: "url",
      type: "POST",
      dataType: "json",
      data: { key: "value" },
      success: function (data) {
        // callback中打开新窗口
        var url = data.url || "/";
        window.open(url, "_blank");
      },
    });
  }
</script>
```

### 场景二

```html
<a id="J_autoLogin" href="javascript:;" onclick="openNewWin();">自动登录</a>
<script>
  function openNewWin() {
    $.ajax({
      url: "url",
      type: "POST",
      dataType: "json",
      data: { key: "value" },
      success: function (data) {
        var url = data.url || "/";
        // 模拟用户点击跳转
        gotoURL(url);
      },
    });
  }

  function gotoURL(url) {
    var elem = document.createElement("a");
    elem.setAttribute("href", url);
    elem.setAttribute("target", "_blank");
    elem.style.display = "none";
    elem.innerText = "临时使用的链接";
    document.body.appendChild(elem);
    elem.click();
  }
</script>
```

### 场景三

```html
<a id="J_autoLogin" href="javascript:;" onclick="openNewWin();">自动登录</a>
<form id="J_loginForm" method="GET" action="#" target="_blank">
  <input type="hidden" name="token" value="" />
</form>
<script>
  function openNewWin() {
    $.ajax({
      url: "url",
      type: "POST",
      dataType: "json",
      data: { key: "value" },
      success: function (data) {
        var url = data.url || "/";
        // 自动提交表单
        $("#J_loginForm").attr("action", url);
        $("#J_loginForm input[name=token]").val(data.token);
        $("#J_loginForm").submit();
      },
    });
  }
</script>
```

## 绕过拦截的方法

### 方法一

```html
<a href="javascript:;" onclick="openNewWin();">点击弹窗</a>

<script>
  function openNewWin() {
    //先发起弹窗（因为是用户触发，所以不会被拦截）
    var popup = window.open("about:blank", "_blank");
    $.ajax({
      url: "url",
      type: "POST",
      dataType: "json",
      data: { key: "value" },
      success: function (data) {
        //在重定向页面链接
        popup.location = data.url;
      },
    });
  }
</script>
```

注：页面 ajax 弹窗为一次性操作。意思就是：从发起弹窗，到最后的重定向，一整套流程必须是一条线流程。如 ajax 成功后，做相关用户体验交互的校验（比如只有当校验成功才跳转），那该方法会影响页面交互，具体可自行测试。

### 方法二

```html
<a href="javascript:;" onclick="openNewWin();">点击弹窗</a>

<script>
  function openNewWin() {
    $.ajax({
      url: "url",
      type: "POST",
      dataType: "json",
      // 将异步修改为同步
      async: false,
      data: { key: "value" },
      success: function (data) {
        //发起弹窗
        window.open(data.url, "_blank");
      },
    });
  }
</script>
```

注：实测能解决大部分浏览器的拦截问题，但是解决不了安全软件的拦截（360 不会拦截，但是 QQ 管家会拦截）

### 方法三

```html
<a href="javascript:;" onclick="openNewWin();">点击弹窗</a>

<script>
  function openNewWin() {
    $.ajax({
      url: "url",
      type: "POST",
      dataType: "json",
      // ajax为同步
      async: false,
      data: { key: "value" },
      success: function (data) {
        // 模拟用户点击
        var url = data.url || "/";
        gotoURL(url);
      },
    });
  }

  function gotoURL(url) {
    //生成一个临时链接对象
    var link = $(
      '<a href="' +
        url +
        '" target="_blank" style="display: none;">临时链接</a>'
    );
    var elem = a.get(0);
    var evt = document.createEvent("MouseEvents");
    //模拟点击操作
    evt.initEvent("click", true, true);
    elem.dispatchEvent(e);
    // 点击后移除该对象
    link.remove();
  }
</script>
```

注：目前该方法亲测有效，可通过浏览器和安全软件；但所有浏览器兼容性未检测，请自行检测！

## 写在最后

浏览器弹窗被拦截主要还是非用户直接操作（异步请求或定时执行）所产生的。解决弹窗被拦截的方法主要是修改*异步请求*为*同步请求*以及模拟用户自动事件触发。
