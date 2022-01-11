---
layout: post
title: lookitui移动端的通用样式组件库
date: 2013-06-13 19:20
comments: true
categories: [前端开发]
---

lookitui是一个移动端的通用样式组件库。为了提升协同开发的效果，采用compass扩展插件的方式存在。

[查看DEMO](/demo/dpl.html)

lookitui的安装

    gem install lookitui --pre
    lookitui的结构
    @import "lookitui/vars"; //变量的配置   
    @import "lookitui/reset"; //reset.css   
    @import "lookitui/func"; //通用的函数库  
    @import "lookitui/slider"; //幻灯片组件  
    @import "lookitui/refresh"; //加载组件  
    @import "lookitui/form"; //表单样式  
    @import "lookitui/box"; //区块样式  
    @import "lookitui/button"; //按钮样式  
    @import "lookitui/list"; //列表样式  
    @import "lookitui/loading"; //loading样式  
    @import "lookitui/toolbar"; //工具栏组件  
    @import "lookitui/gotop"; //返回顶部组件  
    @import "lookitui/tab"; //Tab切换组件

lookitui的引用

    //1.引用所有模块  
    @import "lookitui/all";
     
    //2.引用单一模块  
    @import "lookitui/form"; //例如：引用表单模块（Form最新版本）
     
    //3.引用固定版本的独立模块  
    @import "lookitui/form/0.1/form"; //例如：引用表单模块（Form最新版本）
 
注：引入独立模块是必须先引入lookitui核心模块。

[查看DEMO](/demo/dpl.html)

github访问地址：[http://github.com/hankewins/lookitui/](ttp://github.com/hankewins/lookitui/)

