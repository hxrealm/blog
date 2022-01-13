---
layout: post
title: MAC OS X 10.10.1下安装php扩展
date: 2015-03-09 22:41
cover: /gallery/37.jpg
categories: [后端技术]
---

年后开发环境从 ubuntu 14.0.4 迁移到 MAC OS X 10.10.1 Yosemite 版本，本以为 ubuntu 中编译过的 php 扩展可以直接拷贝使用，其实是我“想多了”。除了常见的\*unix 系统的基本操作相同外，还是存在很大的差异。现记录一下 mac os 下如何安装 php 扩展，以便后面查阅。

安装 PHP 扩展要求你的 Mac 系统已经安装了 Xcode 环境和命令行开发工具，如果还没安装，请先使用 Shell 安装。

```shell
    xcode-select --install
```

为了扩展管理方便，首先来安装 pecl 扩展管理器。

```shell
    cd /usr/lib/php
    sudo php install-pear-nozlib.phar
```

安装 Redis、Memcache、Mongo 等扩展。

```shell
    sudo pecl install redis
    sudo pecl install memcache
    sudo pecl install mongo
```

将扩展配置添加的 php.ini 文件中：

```text
    [memcache]
    extension=memcache.so
    [mongo]
    extension=mongo.so
    [redis]
    extension=redis.so
```

由于 Mac 自带的 PHP 环境是不包括 mcrypt 扩展的，所以需要下载同版本的 php 源码包，单独编译这个模块加载。从官网的归档里面找到 php5.5.14 的源码包，下载：[http://php.net/releases/](http://php.net/releases/)

```shell
    tar zxvf php-5.5.14.tar.gz
    cd php-5.5.14/ext/mcrypt/
    phpize
    ./configure
    make
    sudo make install
```

配置 Mcrypt

```text
    extension=mcrypt.so
```

为了加速，还需要打开 opcache。

```text
    zend_extension=opcache.so

    [opcache]
    ; Determines if Zend OPCache is enabled
    opcache.enable=0

    ; Determines if Zend OPCache is enabled for the CLI version of PHP
    opcache.enable_cli=0
```

如果在安装过程中 PHP 动态编译出现 Cannot find autoconf 错误：

```text
    Configuring for:
    PHP Api Version:         20041225
    Zend Module Api No:      20060613
    Zend Extension Api No:   220060519
    Cannot find autoconf. Please check your autoconf installation and the
    $PHP_AUTOCONF environment variable. Then, rerun this script.
```

请安装 autoconf

```bash
    brew install autoconfig
```
