---
layout: post
title: 从 wordpress 搬迁到 github pages
date: 2014-01-22 23:10
comments: true
categories: [工作与生活]
---

一直在寻求快速发表文章的工具，于是不停的在尝试。期间尝试过win7和Ubuntu下各种Ｍarkdown编辑预览工具， 甚至使用开发工具ST2(Sublime text 2)装Ｍarkdown插件来更新博客，各种尝试，各种折腾。也许是因为之前对动态站点的理解， 导致思想上一直认为 —— WordPress 或者 emlog 等是最好的博客系统没有之一的原故。

自从使用nico生成了ICAT文档后， 有一种冲动想立刻在上面建立起我的博客副本，感觉挺不错的。

昨天打算在Ｗordpress的编辑器里写了一篇年会抽奖系统(nodejs+mongodb)的文章，由于涉及到很多的代码片段，有的需要格式化，有的只是要使用code标签。 当我在编辑模式和HTML源码编辑模式下各种抓狂之后，决定放弃ＷordPress，使用github。这样我就可以在我喜欢的编辑器里，使用我熟悉的markdown语法来写博客。

迁移的步骤如下：

先阅读阮一峰的一篇很赞的文章搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门

备份wordpress数据库，并转换日志为.md文件

下载一份 jekyll 模板 (这里感谢展新的模块kunka)

将第二步中的所有.md文件放到_posts文件夹中（手动处理好.md文件中非法的字符和标签）

模块 kunka 中支持两种评论插件（disqus 和多说），进行简单配置即可直接使用。

将本地文件提交到github

迁移的注意点如下：

github pages 分为两大类，一类是以根站点（github user or organization site, e.g. username.github.io), 另一类是　项目站点（project site, e.g. username.github.io/projectname),请参考官方文档

域名域名(顶级域名绑定——只需要把顶级域名的Ａ记录指向到204.232.175.78， 非顶级域名绑定——只需要把非顶级域名绑定的cname的DNS解析指向到username.github.com（请将username换成你的用户名）)，查看[官方文档](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)

关于 jekyll 的相关操作，可以查看[官方文档](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)

对以上有任何的疑问都可以联系我或者给我留言，谢谢！

最后，整个博客都是开源，博客中的样式、模板都可以直接使用，但文章内容和图片内容保留版权，未经允许禁止使用！

