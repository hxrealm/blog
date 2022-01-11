title: 博客从Jekyll迁移到Hexo
author: Alan Yi
tags:
  - 博客迁移、Jekyll、Hexo
categories:
  - 博客人生
date: 2018-05-31 14:47:00
---
博客从刚开始的[Wordpress](https://wordpress.com/)迁移到[Jekyll](https://jekyllrb.com/)那都是发生在2014年的事，到现在已经四年了。在这段时间里确实发生了很多事情，近段时间静下心来想想得到了一些感想，我认为“过去的就让它过去，现在重新认识自己，也来得及改变自己！”。

这两天花了几个小时的时间将博客从[Jekyll](https://jekyllrb.com/)迁移到[Hexo](https://hexo.io/zh-cn/)，这里主要记录一下操作过程。

**建站**

按以下命令安装*Hexo*并初始化*blog*项目，这里默认用户机已安装*node*运行环境。

```
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```


**迁移**

把*_posts*文件夹内的所有文件复制到*source/_posts*文件夹，并在*_config.yml*中修改 *new_post_name*参数。

```
new_post_name: :year-:month-:day-:title.md
```

**主题**

项目初始化时默认采用*landscape*的主题，由于时间的关系我直接从官方[主题库](https://hexo.io/themes/)中选择了一款简约风格的[hexo-theme-Anatole](http://anatole.munen.cc/)主题。

将*hexo-theme-Anatole*主题下载后放到*themes*目录，并在*_config.yml*修改*theme*参数。

```
theme: hexo-theme-Anatole
```

**部署**

这里主要是采用[GitHub Pages](https://pages.github.com/)的模式托管静态博客。

1、新建仓库

登录[GitHub](https://github.com/)并在[新建仓库](https://github.com/new)页面新建*blog*仓库。

2、配置参数

在本项目*_config.yml*文件中配置*deploy*下的参数，例如：

```
deploy:
  type: git
  repo: https://github.com/username/blog
  branch: gh-pages
```

3、绑定域名

在*source*目录下新建*CNAME*文件，请输入个人域名，例如：

```
www.domain.com
```

4、配置DNS

这里以DNSPod为例，在DNS解析模块添加以下记录：

```
主机记录	记录类型	记录值
@  		CNAME		username.github.io
www		CNAME		username.github.io
```

或

```
主机记录	记录类型	记录值
@  		A             192.30.252.153
@  		A             192.30.252.154
www		CNAME         username.github.io
```

注：对DNS的配置不是立即生效的，过10分钟再去访问你的域名看看有没有配置成功 : )

5、一键部署

```
$ hexo deploy
```

大功告成^_^，更多的部署方式以及详细介绍，请[点击这里](https://hexo.io/zh-cn/docs/deployment.html)