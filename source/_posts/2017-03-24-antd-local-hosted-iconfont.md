---
layout: post
title: antd 本地部署 iconfont 正确步骤
cover: /gallery/26.jpg
date: 2017-03-24 22:48
categories: [技术随记]
---

[Ant Design of React](https://ant.design/index-cn)由蚂蚁金服体验技术部出品，是基于 React+Redux 实现，开发和服务于企业级后台产品。

Ant Design 默认的 iconfont 文件托管在 [iconfont.cn](http://iconfont.cn/) 并默认使用平台提供的 alicdn 地址，公网可访问使用。

由于 alicdn 对部分域名有[访问限制](https://github.com/ant-design/ant-design/issues/1070)，或者需要内网环境使用，因此我们可能需要将 iconfont 文件部署到本地环境。

操作步骤如下：

一、下载 iconfont 文件

1、官网[在线下载](https://ant.design/docs/resource/download)

2、字体图标库[iconfont](http://iconfont.cn)中下载

<!--more-->

二、部署 iconfont 服务

通过搭建本地服务器提供 iconfont 访问地址，例如：<http://localhost/iconfont>

三、配置@icon-url 地址

1、通过 package.json 中自定义主题参数 theme 中配置@icon-font 为'"iconfont 字体本地访问地址"'

2、通过引用 theme.js 的方式自定义主题，配置方式同 1

```css
// 注意：@icon-font地址为字符串，且后面一个iconfont为字体文件名（不需要后缀），地址字符串需要在双引号内
'@icon-url': '"http://localhost/iconfont/iconfont"'
```

### 参数资料

- [本地部署 iconfont](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)
- [解决@icon-url 无效](https://github.com/ant-design/antd-init/issues/136)
