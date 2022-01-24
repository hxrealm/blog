---
layout: post
title: nodemailer 使用过程中发现的一些问题
date: 2013-05-29 21:30
cover: /gallery/6.jpg
categories: [前端技术]
---

## nodemailer 使用过程中发现的一些问题

在实现 Node.js 开发指南中提到的[microblog](https://github.com/hxrealm/microblog)后，想加入邮件功能模块，通过各方的了解，最终选择了[nodemailer](http://www.nodemailer.com/)。根据[nodemailer 官网](http://www.nodemailer.com/)的使用方法介绍，可以很轻松的实现邮件发送功能，可是当你根据自己的想法去使用 nodemailer 时会遇到一些问题，以下详细的介绍 nodemailer 的使用以及遇到的问题的一些思考。

### 安装 nodemailer

```bash
npm install nodemailer
```

### 引入 nodemailer 模块

```javascript
var nodemailer = require("nodemailer");
```

<!--more-->

### nodemailer 实例

```javascript
var nodemailer = require("nodemailer");
var transport = nodemailer.createTransport("SMTP", {
  service: "qq", //use well known service
  auth: {
    user: "hxrealm@qq.com",
    pass: "123456",
  },
});

var data = {
  form: "han.yi <yihan.sz@qq.com",
  to: "tomail@gmail.com,tomail2<tomail2@gmail.com>",
  subject: "Hello world",
  text: "Hello world, I am a test mail!",
  html: "<b>Hello world, I am a test mail!</b>",
};

transport.sendMail(data, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Message sent: " + res.message);
  }
});
```

运行以上实例会产生以下几种情况：

1.当 user 和 pass 正确时，采用 Gmail SMTP 方式邮件发送成功。（**Gmail 只验证用户是否通过认证，不做其他格式要求**）

2.当 user 和 pass 正确时，采用 QQ SMTP 方式邮件发送失败。（**QQ 邮件服务器验证用户是否通过认证、用户与收件人是否一致，同时格式须正确。**）

```text
    { [SenderError: Mail from command failed - 501 mail from address must be same as
        authorization user]
        name: 'SenderError',
        data: '501 mail from address must be same as authorization user' }
```

3.当 user 和 pass 正确时，采用 126、163 SMTP 方式邮件发送失败。（**网易邮件服务器验证用户是否通过认证、用户与收件人是否一致，同时验证邮件格式是否正确**）

```text
    { [SenderError: Mail from command failed - 550 Invalid User c6b4f4d2-2f21-4de3-8
    985-68b589eab3d1]
      name: 'SenderError',
      data: '550 Invalid User c6b4f4d2-2f21-4de3-8985-68b589eab3d1' }
```

当用户的邮件格式不正确，或者收件人错误时，返回提示信息都没有 QQ 邮件服务精确

为了明确的知道邮件发送过程，我通过 windows DOS 命令 telnet smtp 连接邮件服务器，测试邮件发送情况，同时找到了得出以上结论。

### nodemailer 的几点说明

1. 官网的实例大部分都是采用定义 service: "Gmail" 的 SMTP 发送邮件。(基中 service 是指定义好的接口，包含提供 SMTP 服务的邮件服务商列表。文件路径为：node_modules/nodermailer/lib/wellknown.js)

2.nodemailer->service 默认国内的邮件服务商只提供 QQ 的配置，如果需要使用其他邮件服务商的 SMTP 可以打开 wellknown.js 文件进行修改。

```text
    文件路径：node_modules/nodermailer/lib/wellknown.js

    "126":{
        transport: "SMTP",
        host: "smtp.126.com",
        port:465,
        secureConnection: true,
        requiresAuth: true,
        domains: ["126.com"]
    },
    "163":{
        transport: "SMTP",
        host: "smtp.163.com",
        port:465,
        secureConnection: true,
        requiresAuth: true,
        domains: ["163.com"]
    }

    以上SMTP格式也可以在nodemailer.createTransport参数传递过程中指定。
```

### 参考资料

- nodemailer 官网 [http://www.nodemailer.com/](http://www.nodemailer.com/)
- win7 下开启 telnet [http://zhidao.baidu.com/question/316035780.html](http://zhidao.baidu.com/question/316035780.html)
- telnet smtp 发送邮件 [http://www.cnblogs.com/rootq/articles/1320266.html](http://www.cnblogs.com/rootq/articles/1320266.html)
