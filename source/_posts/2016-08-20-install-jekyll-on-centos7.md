---
layout: post
title: CentOS7下安装Jekyll及配置
date: 2016-08-20 15:05
comments: false
categories: [后端技术]
---

这两天购买了[linode](https://www.linode.com/)的vps,通过各种设置后成功安装了```CentOS7```操作系统，现尝试在```CentOS7```下安装并使用```Jekyll```，记录步骤和安装过程中产生的问题和解决方法。

### 查看系统版本

方式一：

```bash
rpm -q rpm -q centos-release // centos-release-7-2.1511.el7.centos.2.10.x86_64
```

方式二：

```bash
cat /etc/redhat-release // CentOS Linux release 7.2.1511 (Core)
```

或

```bash
cat /etc/centos-release // CentOS Linux release 7.2.1511 (Core)
```

### 安装Ruby

```bash
yum install ruby
ruby -v // ruby 2.0.0p598 (2014-11-13) [x86_64-linux]
gem -v // 2.0.14
```

### 安装Jekyll

通过gem安装Jekyll。因为网络问题需要将国外的镜像替换为国内的镜像（同Windows下的操作相同）

```bash
gem sources --remove https://rubygems.org/
gem sources --add https://ruby.taobao.org/
gem sources -l // 查看源列表
```

执行命令

```bash
gem install jekyll
```

如果出现如下错误

```bash
mkmf.rb can't find header files for ruby at /usr/share/include/ruby.h
```

安装 ruby-devel 即可解决

```bash
yum install ruby-devel
```

如果仍出现编译错误，安装以下依赖

```bash
yum install libtool automake autoconf gcc-c++ openssl-devel
```

至此安装成功

### Jekyll创建博客

```bash
jekyll new weblog
cd weblog
jekyll serve
```

### 参考资料

+ [jekyllrb](http://jekyllrb.com/docs/home/)
+ [Jekyll中文](http://jekyll.com.cn/)
+ [RubyGems 镜像](https://ruby.taobao.org/)
