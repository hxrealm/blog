---
layout: post
title: 前端开发环境（ST2）搭建过程
date: 2013-04-10 14:47
cover: /gallery/4.jpg
categories: 工作随记
---

**Sublime Text 2（简称：ST2）**是一个实用又好用的编辑器，以其体积小、响应快、功能齐全、操作便捷、插件丰富、跨平台等特性，被前端人员的推崇为神器。

为了促进前端（团队）统一开发环境的正确搭建，现梳理一下我们产品业务中用到的一些插件，以便大家能快速搭建好 ST2 开发环境。

`注：ST3版本硬性要求比较高，且与ST2兼容的插件比较少，帮暂不推荐升级。`

<!--more-->

### 准备工作

下载对应版本的 ST2:[http://www.sublimetext.com/2](http://www.sublimetext.com/2)

### 开始安装

在 windows 环境下双击下载的 ST2 可执行文件即可安装。

[ST2 免费注册码下载](http://pan.baidu.com/share/link?shareid=2246429840&uk=3945756521#dir/path=%2F%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3%E4%B8%AD%E5%BF%83%2F%E5%89%8D%E7%AB%AF%E7%BB%9F%E4%B8%80%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)

在 linux 环境下安装如下：

1.解压并修改 ST2 文件名

    tar -xvf sublime_text_2.0.2.tar.bz2
    mv Sublime\ Text\ 2/ sublime_text_2

2.移动到合适的位置，这里选择`/usr/lib/`

    sudo mv sublime_text_2 /usr/lib/

3.命令行（Terminal）下启动 ST2

    sudo ln -s /usr/lib/sublime_text_2/sublime_text /usr/bin/sublime

4.创建可使用的应用程序图标（可以放在 Launcher 下）

    sudo sublime /usr/share/applications/sublime.desktop

5.配置 sublime.desktop 文件

    [Desktop Entry]
    Version=1.0
    Name=Sublime Text 2
    # Only KDE 4 seems to use GenericName, so we reuse the KDE strings.
    # From Ubuntu's language-pack-kde-XX-base packages, version 9.04-20090413.
    GenericName=Text Editor

    Exec=sublime
    Terminal=false
    Icon=/usr/lib/sublime_text_2/Icon/48x48/sublime_text.png
    Type=Application
    Categories=TextEditor;IDE;Development
    X-Ayatana-Desktop-Shortcuts=NewWindow

    [NewWindow Shortcut Group]
    Name=New Window
    Exec=sublime -n
    TargetEnvironment=Unity

### 安装 ST2 packpage control

1. 按 Ctrl+`调出 console

2. 粘贴以下代码到底部命令行并回车

```text
    import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();
    os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.
    urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```

=> 重启 Sublime Text 2

如果在 `Perferences->package settings` 中看到 `package control` 这一项，则安装成功或者 `Ctrl+Shift+p` 调出的面板中搜索 `install package` 如果存在，则代表安装成功。

至此，ST2 的安装已全部完成，下面我们要安装业务中所需要的插件。

### 安装 sublime Text 插件的一般步骤

=> 按住 `Ctrl+Shift+P`
=> 在出现的输入框中输入 `install`
=> 选择 `package control:install package` 回车  
=> 输入需安装的插件名称进行检索
=> 选中对应的插件，按回车
=> 稍定一会儿，插件正在安装中，注意右下角状态栏会显示正在连接的提示文字

### 前端 Team 需安装的插件

- 安装 compass 插件

- 安装 sass 插件

- 安装 zendcoding 插件

- 安装 YUI Compressor 代码压缩插件

- 安装 Sublime codeIntel 代码提示插件

- 安装 Alignment 代码等号对齐插件

- 安装 GBK Encoding Support 插件

- 安装 DocBlockr 插件

- 安装 BracketHighlighter 插件
