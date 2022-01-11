---
layout: post
title: web常见的安全问题
date: 2017-07-22 12:38
comments: true
categories: [前端安全]
---

本文主要是收集并科普一下web常见的安全问题，针对安全漏洞产生的场景和防御方式不详细的描述(仅作参考)，后续将通过相关系列的文章进行补充和完善。想了解详细的内容，请点击对应的链接进入维基百科查看。持续更新中...

## 前端安全

[XSS 跨站脚本攻击](https://zh.wikipedia.org/zh-cn/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)

跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。

XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java，VBScript，ActiveX，Flash或者甚至是普通的HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。

防御措施：过滤特殊字符、使用HTTP头指定类型

[CSRF 跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

防御措施：检查Referer字段、添加校验token

## 后端安全

[SQL注入攻击](https://zh.wikipedia.org/wiki/SQL%E8%B3%87%E6%96%99%E9%9A%B1%E7%A2%BC%E6%94%BB%E6%93%8A)

SQL攻击（英语：SQL injection），简称注入攻击，是发生于应用程序之数据库层的安全漏洞。简而言之，是在输入的字符串之中注入SQL指令，在设计不良的程序当中忽略了检查，那么这些注入进去的指令就会被数据库服务器误认为是正常的SQL指令而运行，因此遭到破坏或是入侵。

[SESSION 与 COOKIE](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))

Session 和 Cookie 是两种用于存储用户当前状态的工具。某些开发者不了解 Session 与 Cookie 的区别，误用或者混用，导致敏感信息泄露或者信息篡改。

Cookie 存储在浏览器上，用户可以查看和修改 Cookie。
Session 是存储在服务端的数据，一般来说安全可靠；大多数 Session 都是基于 Cookie 实现的（在 Cookie 中存储一串 SESSION_ID，在服务器上存储该 SESSION_ID 对应的内容）。

[IP地址欺骗](https://zh.wikipedia.org/wiki/IP%E5%9C%B0%E5%9D%80%E6%AC%BA%E9%AA%97)

在计算机网络里面，IP地址欺骗或IP欺骗是一个带有假的源IP地址的IP协议分组（数据报）的产物，目的是隐藏发送方或冒充另一个计算系统身份。使发送方可以保持匿名的一种技术是使用代理服务器。

防御措施：数据报过滤、...

[验证码破解](https://zh.wikipedia.org/wiki/%E9%AA%8C%E8%AF%81%E7%A0%81#.E7.A0.B4.E8.A7.A3)


非一次性、易识别性的验证码相对来讲很容易进行破解。

非一次性指的是同一个验证码可以一直被使用下去。一般来说，每进行一次验证码校对（无论正确与否），都应该强制更换或清除 Session 中的验证码。

易识别性指的是不加噪点不加扭曲的验证码，主当技术基本上100%可识别的。

## 服务器安全

[DoS/DDoS攻击](https://zh.wikipedia.org/wiki/%E9%98%BB%E6%96%B7%E6%9C%8D%E5%8B%99%E6%94%BB%E6%93%8A)

拒绝服务攻击（英语：denial-of-service attack，缩写：DoS attack、DoS）亦称洪水攻击，是一种网络攻击手法，其目的在于使目标电脑的网络或系统资源耗尽，使服务暂时中断或停止，导致其正常用户无法访问。
当黑客使用网络上两个或以上被攻陷的电脑作为“僵尸”向特定的目标发动“拒绝服务”式攻击时，其称为分布式拒绝服务攻击（distributed denial-of-service attack，缩写：DDoS attack、DDoS）。

防御措施：防火墙、交换机、路由器、黑洞引导、流量清洗

...