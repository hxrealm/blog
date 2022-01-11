---
layout: post
title: Ubuntu下通过Heroku部署Node.js应用程序
date: 2013-09-17 23:50
comments: true
categories: [前端开发]
---

自从写第一个Node [Microblog](https://github.com/hankewins/microblog) web应用到现在也很长时间了，虽然后面也写了几个Node小工具，但是一直都是基于本地环境。虽然之前也有尝试在SAE、NAE(已停止维护)、BAE上部署Node应用程序，但由于种种原因，最终也只是一个尝试，没有成功部署，在此还是推荐几家PaaS平台：

- [Heroku](https://www.heroku.com/)(信赖Git+Foreman)
- [Cloud Foundry](http://www.cloudfoundry.com/)(依赖vmc+ruby+rubyGems)
- [Nodester](http://nodester.com/)(被AppFog收购)
- [AppFog](https://www.appfog.com/)

可根据自己的喜好与对PaaS不同平台的了解，选择适合的平台，本文选择Heroku来部署。

Heroku部署Node.js应用程序的步骤如下：

1.访问 https://id.heroku.com/signup/www-header ，网站会要求用户输入电子邮件地址。

2.Heroku注册，一旦成功输入电子邮件地址，网站会邀请你检查邮件，邮件中有确认链接。

3.打开电子邮件，进入所提供的Heroku链接，点击链接会邀请你输入密码。

4.按照 https://devcenter.heroku.com/articles/getting-started-with-nodejs 中的指南，首先安装Heroku工具条。它提供了能让我们将站点部署到Heroku的命令行工具。

5.访问 https://toolbelt.heroku.com/ ，选择适用于自己平台的安装方式，这里我选择的是 Debian/Ubuntu。

安装Heroku命令行工具

6.Heroku toolbelt安装完成后，现在就可以登录账号，在命令行模式下输入

    $ heroku login
    //输入heroku注册的账号信息
    Enter your Heroku credentials.
    Email: test@gmail.com
    Password (typing will be hidden):
    //如果是第一次登录，heroku会为你生成一个SSH公共密钥，
    //以此来管理对服务的访问，可在heroku账号设置中查看
    Could not find on existing public key.
    Would you like to generate one? [Yn]
    Generating new SSH public key.
    Uploading ssh public key ~/.ssh/id_rsa.pub

7.至此，Heroku环境配置己完成，可以准备部署到Heroku服务器啦！

8.检查程序入口文件中服务器端口设置是否正确。

    //Express 默认端口配置
    var port = process.env.PORT || 3000;
    //由于heroku会随机分配端口，因此不用指定固定端口
    app.listen(port);

9.Heroku的进程管理工具Foreman需要通过Procfile文件来声明应该默认启动的文件，因此需在应用程序根目录添加一个名为Procfile的文件，如下所示：

    //进入应用程序根目录，声明启动的文件
    $ echo "web: node app.js" > Procfile
    //通过Foreman启动应用程序
    $ forman start
    14:06:24 web.1  | started with pid 5105
    14:06:26 web.1  | Express server listening on port 5000

10.Foreman启动成功后，可以通过本地访问应用程序，最现只差上传应用程序到Heroku。

    //在应用程序package.json文件中指定engines
    "engines": {
        "node": "0.10.x",
        "npm": "1.2.x"
    }

    //检查应用程序package.json中的信赖文件是否安装
    $ npm install

    //通过Git添加应用程序到仓库，并上传到Heroku
    $ git init //创建git仓库
    $ git add . //添加文件到仓库
    $ git commit -m 'upload to heroku' //提交文件到仓库
    $ heroku create nodetest --stack ceder //在heroku中建立nodetest应用
    $ git push heroku master //提交应用程序到heroku的master主干

11.如果一切正常，可以通过Heroku分配的二级域名访问应用程序，例如 http://nodetest.herokuapp.com
12.Heroku支持自定义域名绑定，操作如下：

    //在以有的域名中添加子域名并指定DNS为Heroku分配的二级域名
    //以www.nodetest.com为例,添加到heroku自定域名中
    $ heroku domains:add www.nodetest.com

    //查看域名信息
    $ heroku domains
    === nodetest Domain Names
    nodetest.herokuapp.com
    www.nodetest.com

    //通过命令行打开并访问应用程序
    $ heroku open

### 参考文档：

- [http://blog.sina.com.cn/s/blog_6d0cbb0301019jor.html](http://blog.sina.com.cn/s/blog_6d0cbb0301019jor.html)
- [http://blog.longwin.com.tw/2011/04/ssh-failure-sign-key-2011/](http://blog.longwin.com.tw/2011/04/ssh-failure-sign-key-2011/)
- [http://blog.csdn.net/ithomer/article/details/7529022](http://blog.csdn.net/ithomer/article/details/7529022)
- [http://www.2cto.com/kf/201201/116097.html](http://www.2cto.com/kf/201201/116097.html)
- [http://ux.etao.com/posts/799](http://ux.etao.com/posts/799)

表达不清楚或者不正确的地方，请与我联系hankewins#gmail.com。

