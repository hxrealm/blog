---
layout: post
title: Node学习历险记（1）— 扬帆启航
date: 2013-05-20 22:00
comments: true
categories: [前端开发]
---

背景：毕业三年有余，栖息于一线城市，先后从事web前端开发、移动前端开发等相关工作，一次偶然的机会{2012年}面试了迅雷下载-前端开发工程师一职（没通过），开始知道Node的重要性，初步的去了解了Node的发展史以及应用场景，在参加腾讯H5沙龙、公司级培训、内部培训等相关活动时经常能听到Node字眼，似乎Node与H5（移动开发）一样爆发，是前端的福音。今年{2013年}借着项目以及学习计划开启Node学习之旅。

Node学习历险记采用游记的方式记录学习过程，由于文字功底弱，难免存在语句不通顺，标点错误等等一系列的语病，还望轻拍。^__^

##快速开始

###windows篇

查看系统是32bit OR 64bit，DOS命令行下输入 wmic os get osarchitecture

1.下载Node.js官方Windows可执行程序：

    http://nodejs.org/download/

2.下载MongoDB官方Windows可执行程序：
    
    http://www.mongodb.org/downloads

3.安装Node和MongoDB

    a.安装完成后，打开windows命令行（win+r）,输入cmd进行命令行模式
    b.查看Node版本 node -v // 安装成功 v0.10.7
    c.查看MongoDB版本 mongo --version // 安装成功 MongoDB shell version: 2.4.3 
    d.添加MongoDB系统变量 //切换到其他盘符查看显示 mongo --version
    
    注：因为Node安装时默认会添加系统变量所以可全局访问，而MongoDB需手动添加系统变量。
    
4.MongoDB相关配置

+ 详细的官方安装与配置（英文） [传送门](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
+ 简单直白的配置方式(DOS下输入命令测试)

**1.了解mongo 和 mongod 两个命令的作用**  

    mongo:mongodb客户端命令，用于连接MongoDB服务器
    mongod:mongodb服务器命令，用于启动和配置MongoDB服务器

**2.开始配置和启动MongoDB**

    a.在DOS下输入 mongod 回车，可以看到提示信息如下：
    
    D:\>mongod
    mongod --help for help and startup options
    Sun May 26 15:13:52.230
    Sun May 26 15:13:52.243 warning: 32-bit servers don't have journaling enabled by
     default. Please use --journal if you want durability.
    Sun May 26 15:13:52.244
    Sun May 26 15:13:52.422 [initandlisten] MongoDB starting : pid=5408 port=27017 d
    bpath=\data\db\ 32-bit host=yihaner
    Sun May 26 15:13:52.423 [initandlisten]
    Sun May 26 15:13:52.423 [initandlisten] ** NOTE: This is a 32 bit MongoDB binary
    .
    Sun May 26 15:13:52.424 [initandlisten] **       32 bit builds are limited to le
    ss than 2GB of data (or less with --journal).
    Sun May 26 15:13:52.424 [initandlisten] **       Note that journaling defaults t
    o off for 32 bit and is currently off.
    Sun May 26 15:13:52.424 [initandlisten] **       See http://dochub.mongodb.org/c
    ore/32bit
    Sun May 26 15:13:52.425 [initandlisten]
    Sun May 26 15:13:52.425 [initandlisten] db version v2.4.3
    Sun May 26 15:13:52.426 [initandlisten] git version: fe1743177a5ea03e91e0052fb5e
    2cb2945f6d95f
    Sun May 26 15:13:52.427 [initandlisten] build info: windows sys.getwindowsversio
    n(major=6, minor=0, build=6002, platform=2, service_pack='Service Pack 2') BOOST
    _LIB_VERSION=1_49
    Sun May 26 15:13:52.427 [initandlisten] allocator: system
    Sun May 26 15:13:52.428 [initandlisten] options: {}
    Sun May 26 15:13:52.456 [initandlisten] exception in initAndListen: 10296
    *********************************************************************
     ERROR: dbpath (\data\db\) does not exist.
     Create this directory or give existing directory in --dbpath.
     See http://dochub.mongodb.org/core/startingandstoppingmongo
    *********************************************************************
    , terminating
    Sun May 26 15:13:52.457 dbexit:
    Sun May 26 15:13:52.458 [initandlisten] shutdown: going to close listening socke
    ts...
    Sun May 26 15:13:52.458 [initandlisten] shutdown: going to flush diaglog...
    Sun May 26 15:13:52.459 [initandlisten] shutdown: going to close sockets...
    Sun May 26 15:13:52.459 [initandlisten] shutdown: waiting for fs preallocator...
    
    Sun May 26 15:13:52.460 [initandlisten] shutdown: closing all files...
    Sun May 26 15:13:52.460 [initandlisten] closeAllFiles() finished
    Sun May 26 15:13:52.460 dbexit: really exiting now
    很明显错误显示dbpath(\data\db\)不存在（默认文件路径是C:\data\db），这里指定
    db目录为E:\mongodb\data\db
    log目录为E:\mongodb\log。
    
    b.指定dbpath来启动MongoDB（在DOS下输入 mongod --dbpath E:\mongodb\data\db）
    
    Sun May 26 15:26:25.423 [initandlisten] allocator: system
    Sun May 26 15:26:25.423 [initandlisten] options: { dbpath: "E:\mongodb\data\db"
    }
    Sun May 26 15:26:25.460 [websvr] admin web console waiting for connections on po
    rt 28017
    Sun May 26 15:26:25.460 [initandlisten] waiting for connections on port 27017
    可以看到MongoDB已启动，等待客户端的连接。
    我们发现这种启动方式每次最少要打开两个CMD窗口才可以进行操作，是否有更好的方法呢？
    如果MongoDB能够系统启动就好了，OK，可以把MongoDB添加到windows服务中。
    
    c.方法如下：

    1.在E:\mongodb\下创建mongod.conf配置文件，写入一下内容：

        logpath=E:\mongodb\log\mongo.log //用于存放日志文件
        dbpath=E:\mongodb\data\db   //用于存放数据库文件

    2.执行以下命令 mongod --config E:\mongodb\mongod.conf --install

    3.通过DOS命令行操作Mongodb

        net start MongoDB //启动服务
        net stop MongoDB //停止服务
    
    4.在命令行下执行 mongo 连接数据库， 连接成功后输入： show dbs;
        admin   0.0625GB
        local   0.03125GB
        test    0.0625GB

    相关类似的信息说明配置成功，客户端连接MongoDB成功，现在就可以直接操作数据库啦。



至此，Node学习历险记 -《快速开始》篇到此告一段落，如有表述不正确的地方还望指正，我将及时更正。

欢迎加入交流群：322794303

