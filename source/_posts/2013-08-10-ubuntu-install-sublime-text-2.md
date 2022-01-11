---
layout: post
title: Ubuntu 12.04下Sublime Text 2的详细安装与破解过程
date: 2013-08-10 21:37
comments: true
categories: [前端开发]
---

记得之前也写过一篇文章《前端开发环境（ST2）搭建过程》，主要讲不同环境下安装的过程以及当时团队前端开发环境搭建过程（涉及到业务需求的一些组件、外部工具等等）。本篇文章意在详细讲解Ubuntu 12.04（与版本无关）下安装破解ST2的过程。

使用ST2已有很久时间了，一直认为它是“最好的一款前端开发工具”，喜欢它体积小、速度快、外观简单、代码语法高亮清晰、插件丰富、安装简单。实际上ST2是一款共享软件，收费（59刀）但可以永久免费试用的跨平台的编辑神器。好了，不多在这里扯蛋啦，有讲的不好、或者不清晰的地方还请指正。

为什么不使用ST3呢？ （答：ST3改动很大，不能与ST2兼容，因此没有丰富的插件，后期可以进行尝试安装。）

一、ST2安装流程:
官网下载安装包
官网地址：[http://www.sublimetext.com/2](http://www.sublimetext.com/2)

ST2目前是2.0.2版，由于软件源并非默认就存在，所以apt-get install是无法下载到的。官网也是提供直接的下载包，linux下是.bz2的文件。文件不大，才5M多一点。

解压放置
解压并不难，随便找个目录解压就行，但考虑到后面要能在命令行下方便的快速启动，推荐解压到/usr/lib/目录下，我用的方法是先解压后搬移，命令如下：

    tar -xvf Sublime\ Text\ 2.0.1.tar.bz2 //解压到当前目录
    mv Sublime\ Text\ 2 /usr/lib/ //移动到／usr/lib／目录下
    sudo mv Sublime\ Text\ 2 sublime-text-2 //修改文件名为sublime-text-2
    其中的\为转义符

这样做是因为$PATH这个环境变量自动涵盖了/usr/lib这个目录，不用专门去修改环境变量。

然后键入：

    ln -s /usr/lib/sublime-text-2/sublime_text /usr/bin/st2

这行命令是在/usr/bin/目录下建立一个名为st2链接，这样后面可以比较方便的用命令行启动这个编辑器。其中st2这个名字是自行定义的，用户可以定义的更加简单方便。

这个时候应该已经安装结束了，可以用st2来打开一个文件试试。

侧边条LaunchBar设置
由于并非安装，缺少Ubuntu桌面运行的一些基本配置，比如不能将它加入桌面侧边的启动器，这个和通过软件安装中心安装的程序不太一样。要做到这一点，需要增加一个配置文件，放在/usr/share/appliations/路径下，比如增加sublime.desktop，文件内容如下：

    [Desktop Entry]
    Version=1.0
    Name=Sublime Text 2
    # Only KDE 4 seems to use GenericName, so we reuse the KDE strings.
    # From Ubuntu's language-pack-kde-XX-base packages, version 9.04-20090413.
    GenericName=Text Editor
     
    Exec=st2
    Terminal=false
    Icon=/usr/lib/sublime-text-2/Icon/48x48/sublime_text.png
    Type=Application
    Categories=TextEditor;IDE;Development
    X-Ayatana-Desktop-Shortcuts=NewWindow
     
    [NewWindow Shortcut Group]
    Name=New Window
    Exec=st2 -n
    TargetEnvironment=Unity

保存后给予可执行属性即可。

FAQ

如果一定希望通过apt-get install来安装，可以如下来做：

    sudo add-apt-repository ppa:webupd8team/sublime-text-2
    sudo apt-get update
    sudo apt-get install sublime-text-2

关于package control以及前端插件的安装可以查看我之前写的文章《前端开发环境（ST2）搭建过程》。

二、Linux下ST2破解的过程

首先查看一下ST2安装路径(推荐安装的路径是：／usr/lib/sublime-text-2)，然后用vim打开sublime_text文件

    ＃  whereis sublime-text-2

输出结果：

    ＃ sublime-text-2:/usr/bin/sublime-text-2 /usr/lib/sublime-text-2 /usr/bin/X11/sublime-text-2    －－这里是两条信息，第二个/usr/前面有一个空格的

然后，进入第一个路径下，查看有哪些文件，输入：

    #  cd /usr/lib/sublime-text-2/
    #  ls 

会列出的文件信息有：

``Icon lib PackageSetup.py Pristine Packages sublimeplugin.py sublimetext``

然后我们用vim打开这个文件（如果没有装vim 输入：# sudo apt-get install vim 安装）

    #sudo vim /usr/lib/sublime-text-2/sublime_text

将文件转成十六进制形式。vim中输入

    :%!xxd

在vim中定位至“Thanks”文字附近。

    :/Thanks

接着查找数字串“3342”

    :/3342

找到一处3342的地方大致是这个样子 ……4333 3342 3032…….

将这里的3342 改为3242,在vim中输入

    :s/3342/3242

将文件转换回去。

    :%!xxd -r

保存文件、退出。

    :wq

打开程序，去help-enter licence 里贴进去通过程序算出来的Licence，OK 成功了。

    —–BEGIN LICENSE—–
    China
    Unlimited User License
    EA7E-2861
    BE67D2175D3569FDAB9EB5340FAD2822
    E7B56B3397A76AA9FBE8AC3D3C65918B
    DFC28F2EA158140D9E07853D594818EB
    3A237B2E8E98ED257C269548F50EDA34
    EF0C7F72D8917DB538A0245E46BFD6B1
    85F4EDE331F253530ED67A5C19E92399
    04C5F4A1AF4AF3DB5EC49C1FEE17CA76
    7E369F8AAE4AC6C6E756B5882E1608B9
    —–END LICENSE—–

补充说明：Sublime Text 2是一款轻量型的编辑器，但功能却远远超过了我的预期，让我很满意的一点是速度快，搜索，跳转等都相当快，另外还有多重选中的功能，这个也挺实用的，总之这款编辑器可以尝试一下，是个不错的选择。

