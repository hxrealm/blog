---
layout: post
title: Ubuntu 12.0.4下安装Nodejs
date: 2013-07-12 23:25
comments: true
categories: [前端开发]
---

###准备工作

    sudo apt-get install g++ curl libssl-dev apache2-utils
    
###安装方式（一）：git clone

    sudo apt-get install git-core
    git clone git://github.com/ry/node.git
    
###安装方式（二）： 源码安装

    wget http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-x64.tar.gz
    mv node-v0.10.13-linux-x64.tar.gz node-linux-x64.tar.gz
    tar -zxvf node-linux-x64.tar.gz
    
###编译和安装Node
    
    cd your-node-current-folder
    ./configure
    make
    sudo make install
    
###查看是否安装成功

    node -v OR node -version //查看Node.js当前的版本
    
###Node运行hello world

在主文件夹创建hello.js,编辑以下文本：
    
    var http = require('http');  
    http.createServer(function(req, res){  
    res.writeHead(200, {'Content-Type': 'text/plain'});  
    res.end('Hello world!');  
    }).listen(3000,'127.0.0.1');  
    console.log('Server running at http://127.0.0.1:3000/')

###在命令行中运行

    node hello.js

打开浏览器，输入http://127.0.0.1:3000/，可以看到屏幕上显示"Hello world!"。

