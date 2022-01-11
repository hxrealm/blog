---
layout: post
title: MAC OS X 10.10.1下安装php扩展
date: 2015-03-09 22:41
comments: true
categories: [服务器]
---

年后开发环境从ubuntu 14.0.4迁移到MAC OS X 10.10.1 Yosemite版本，本以为ubuntu中编译过的php扩展可以直接拷贝使用，其实是我“想多了”。除了常见的*unix系统的基本操作相同外，还是存在很大的差异。现记录一下mac os下如何安装php扩展，以便后面查阅。

安装PHP扩展要求你的Mac系统已经安装了Xcode环境和命令行开发工具，如果还没安装，请先使用Shell安装。

    xcode-select --install

为了扩展管理方便，首先来安装pecl扩展管理器。

    cd /usr/lib/php
    sudo php install-pear-nozlib.phar

安装Redis、Memcache、Mongo等扩展。

    sudo pecl install redis
    sudo pecl install memcache
    sudo pecl install mongo

将扩展配置添加的php.ini文件中：
    
    [memcache]
    extension=memcache.so
    [mongo]
    extension=mongo.so
    [redis]
    extension=redis.so

由于Mac自带的PHP环境是不包括mcrypt扩展的，所以需要下载同版本的php源码包，单独编译这个模块加载。从官网的归档里面找到php5.5.14的源码包，下载：[http://php.net/releases/](http://php.net/releases/)

    tar zxvf php-5.5.14.tar.gz
    cd php-5.5.14/ext/mcrypt/
    phpize
    ./configure
    make
    sudo make install

配置Mcrypt

    extension=mcrypt.so

为了加速，还需要打开opcache。

    zend_extension=opcache.so

    [opcache]
    ; Determines if Zend OPCache is enabled
    opcache.enable=0

    ; Determines if Zend OPCache is enabled for the CLI version of PHP
    opcache.enable_cli=0

如果在安装过程中PHP动态编译出现Cannot find autoconf错误：

    Configuring for:
    PHP Api Version:         20041225
    Zend Module Api No:      20060613
    Zend Extension Api No:   220060519
    Cannot find autoconf. Please check your autoconf installation and the
    $PHP_AUTOCONF environment variable. Then, rerun this script.

请安装autoconf

    brew install autoconfig




