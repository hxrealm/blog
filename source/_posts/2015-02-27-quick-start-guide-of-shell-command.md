---
layout: post
title: Linux命令行和Shell高效率使用方法(转)
date: 2015-02-27 16:24
comments: true
categories: [引用]
---

###快速调用history中的命令

- Ctrl+R快速搜索history 
- Ctrl+P显示上一条命令
- 快速执行一条history命令：!!/!-number

###快速进入某些目录

- 键入cd～可直接进入用户的home目录；
- 键入cd－可进入上一个目录。
- export CDPATH=.:~:/etc:/usr/local
- mkdir -p /***/***/***/
- alias cd3="cd ../../../"

###一次运行多个命令

- 在一个命令行中还可以置入多个命令，用分号将各个命令隔开
- $last;exit
- $make && make install

###命令行下快捷键

- Ctrl+a：把光标移到行首。
- Ctrl+e：把光标移到行尾。
- Ctrl+l：清除终端。该快捷操作与在命令行键入clear作用相同。
- Ctrl+d：从Shell提示中注销并关闭，使用该快捷键就不必键入exit
- Ctrl+u：删除光标至行首的所有字符,使用这一快捷操作可以清除从光标处到行首的字符
- Ctrl+K：删除从光标到行末所有字符。
- Ctrl+t：新建屏幕。
- Alt+1到9：选择屏幕。
- Ctrl + F :向前移动一个字符。
- Ctrl + B :向后移动一个字符
- Alt + F : 向前移动一个单词。
- Alt + B : 向后移动一个单词。

###在文件里查找

    grep -rlI '\<main' .
    find -type f -name *.java -exec grep -l '\<main' {} \;

###快速的建立一个文件

    cat >> filename ，输入一些内容然后按Ctrl-d结束输入。

###将文本文件中DOS换行符号转化为UNIX的换行符号

    tr -s "\r" "\n" <inputfile
    tr -s "\r" "\n" <inputfile >outputfile

###当然你使用vim编辑文件时，vim也提供文件转换功能

    // 整个文件大小写转换
    tr a-z A-Z < **.txt
    tr A-Z a-z < **.txt

###Shell 脚本

- $0为程序名称，$1为第一个参数，$2为第二个参数，依次类推，直到$9为第九个参数。
- 特殊变量$#测试执行脚本时包含的命令行参数个数。
- 变量$*将命令行中提供的所有参数作为一个单词处理，它将多个参数看成 一个参数。
- 变量$@将命令行中提供的所有参数作为同一个字符串中的多个单词处理。 
- shift命令能够改变命令行参数的相对位置。默 认将每个参数变量左移一个位置
- 使用-t指定一个计时器，计时数满还未输入，read返回一个非0的退出状态。
- 使用-n指定输入的字符个数，输入达到预定数目时，就自动结束输入
- 使用-s使输入不显示在终端（例如输入密码）
- shell 调试 set -xv
- dstat & sar
- iostat, vmstat, ifstat 三合一的工具，用来查看系统性能。
- 官方网站：http://dag.wieers.com/rpm/packages/dstat/
- 你可以这样使用：
- alias dstat='dstat -cdlmnpsy'

###vim 命令：

- 查找一个字符：fx
- 重复上次find:  ;
- 重复执行上次：.
- w 下一个单词开始字符
- e 下一个单词结束字符
- b 上一个单词开始字符
- H M L 目前屏幕的第一行,中间行，最后一行
- gg G 文件的第一行和最后一行
- 拷贝到指定寄存器：yt{标识符}   
- Ctrl + r{register}调出寄存器的值
- 分割窗口：split  vsplit
- 超级自动补全：ctrl-N
- 转到一个变量定义的位置: gd(文件)  gD(全局)
- 快速查询命令 :K 2K
- 匹配花括号：%
- 选取标志符的内容：va{       vit     vi{
- 修改标示符的内容：ci{标识符}
- 删除标志符的内容：di"
- 删除指定行前的内容：:10,20g/^$/d


原文来自：[http://www.cnblogs.com/thinksasa/p/3507714.html](http://www.cnblogs.com/thinksasa/p/3507714.html)