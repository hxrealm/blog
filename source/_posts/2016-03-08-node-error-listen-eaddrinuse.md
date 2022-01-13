---
layout: post
title: 解决 node app.js 关闭后显示端口占用
cover: /gallery/22.jpg
date: 2016-03-08 17:20
categories: [前端技术]
---

在学习 Node 开发过程中，经常运行程序（node app.js）时提示端口被占用，信息如下：

```js
    node app.js
    events.js:141
          throw er; // Unhandled 'error' event
          ^
    Error: listen EADDRINUSE :::3000
        at Object.exports._errnoException (util.js:870:11)
        at exports._exceptionWithHostPort (util.js:893:20)
        at Server._listen2 (net.js:1236:14)
        at listen (net.js:1272:10)
        at Server.listen (net.js:1368:5)
        at EventEmitter.listen (/Users/hxrealm/www/node_pro/node-test/node_modules/express/lib/application.js:617:24)
        at Object.<anonymous> (/Users/hxrealm/www/node_pro/node-test/app.js:15:5)
        at Module._compile (module.js:409:26)
        at Object.Module._extensions..js (module.js:416:10)
        at Module.load (module.js:343:32)
```

此类情况在主要出现在\*unix 系统下，程序退出时对应的进程未结束，请注意以下几种操作下：

<!--more-->

- mac OS X 系统下应该是 control + c 而不是 control + z
- Linux 系统下应该是 ctrl + c

通过以下命令查看端口被占用的使用：

    lsof -i:3000

解决端口被占用可以通过以下几种方式：

- 调用系统自带的进行管理窗口，结束 node 进程
- sudo kill pid 通过 lsof -i:3000 查看
- sudo pkill -9 node 结束所有 node 进程
- sudo npm install -g funckyou，执行 funck node 可以结束 node 进程

针对 node app.js 单一进程管理，重复操作比较繁琐，这里推荐几个 node 进程管理器：

- [StrongLoop Process Manager](http://strong-pm.io/)
- [PM2](https://github.com/Unitech/pm2)
- [Forever](https://github.com/foreverjs/forever)
- [Supervisor](https://github.com/petruisfan/node-supervisor)

参考资料：

- [cnode 上 node 运行时端口被占用问题的讨论](https://cnodejs.org/topic/560a5fdb148959375f34ffda)
- [Express 官方推荐的进程管理器](http://expressjs.com/en/advanced/pm.html)
