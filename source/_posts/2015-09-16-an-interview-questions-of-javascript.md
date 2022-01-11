---
layout: post
title: 一个Javascript面试题引发的思考
date: 2015-09-16 17:05
comments: true
categories: [javascript]
---

最近一直在负责团队内部前端人员的招聘，前前后后估计也面试了二十几号人，由来自知名互联网、外包公司、非计算机专业、高中毕业生等等。本次不再过多的讨论前端人员面试面经，后面如果有时间的话会针对近期前端招聘详细的分析和总结。这里选取一道笔试题在笔试结果后引发的思考。

##Javascript面试题

题目：实现一个URI解析方法，把url里#之后的参数解析成指定的数据结构。
    
    function urlParser(s){
        // 答题部分，写出你的代码...
    }
    try{
        var url1 = "http://www.abc.com/m/s/#page/2/?type=latest_videos&page_size=20";
        var url2 = "http://www.abc.com/m/s/#type=latest_videos&page_size=20";
        var url3 = "http://www.abc.com/m/s/#page?type=latest_videos&page_size=20";
        console.log(urlParser(url1));
        console.log(urlParser(url2));
        console.log(urlParser(url3));

        /*----[执行结果]----
        ["page","2",{"type":"latest_videos","page_size":20}]
        [{"type":"latest_videos", "page_size":20}]
        ["page",{"type":"latest_videos","page_size":20}]
        ------------------*/
    } catch(e){
        console.error('执行出错，错误信息：'+e);
    }

这道笔试题第一眼看上去比较简单，大部分同学的直接反应就是采用字符串分割N次，转换成数组即可。在我的印象中到目前为止，还没有一位同学写出完整的代码。大部分笔试结果如下：

1. 对#,?,&,=,/特殊符号进行分割转换成数组，然后再处理（很少部分能写出来）
2. 对?进行判断，然后进行分割
3. 这题是什么，jquery好像写不出来
4. 工作中没有遇到过，如果真有这需求，百度应该可以
5. 正则应该可以，不知道怎么写
6. 工作了这么多年，还要笔试，不干了
7. ...

这道题目主要是考查对``Javascript基本知识``、``字符串相关操作``、``数组相关操作``、``JSON字符串``、``正则表达式的应用``等知识点的掌握程度。

##引发的思考

通过前面各种笔试的结果分析可以得到以下几大方面的要点：

- 对基础知识的掌握并能灵活的运用的重要性
- 思维逻辑的提升、代码的优化等需要长期的自我总结和学习
- 对事物需从本质思考，深入的学习和理解
- 工作中态度比能力更重要

那么

=> 基础知识重要还是业务能力重要？

本身场景不同可能侧重点也就不一样啦，这里主要是我个人的观点：对于个人发展到一定程度可能侧重的方向不再是业务表层，更多的可能是对业务底层或者架构的思考，那么相对来讲就需要对基础知识或者深层掌握更加的重要。

=> 如何提升自己思维逻辑能力、代码组织能力？

1. 反复阅读基础知识并理解其要领
2. 反复阅读优化的代码并理解其原理
3. 勤动手，多思考


=> 工作年限和工作能力的关系？

如果工作年限和工作能力是正比，那么你自身的价值会越来越高。否则工作5年和工作2年没有什么区别，需自我反思，认清自己，努力提升自己。

...

在这里我觉得有很多的问题需要自我思考、认清自己、改掉坏习惯、提升自己基础能力。

##附个人答案

以下是我个人对本题给出的答案，若有误之处，望批评指正！同时也欢迎大家讨论并给出更好的答案。

方法一：字符串分割成数组

    function urlParser1(s){
        // 方法一
        var arr = [], obj = {}, strl, strr, hash;
        // 获取#之后的字符串
        hash = s.substring(s.indexOf('#')+1);
        // 根据?号进行分割成strl和strr,然后单独处理
        if(hash.indexOf('?') > -1){
            strl = hash.split('?')[0];
            strl = strl.lastIndexOf('/') === strl.length-1 ? strl.substring(0, strl.length-1) : strl;
            arr = strl.split('/');
            strr = hash.split('?')[1];
        } else {
            strr = hash;
        }

        for(var i = 0, strq = strr.split('&'); i < strq.length; i++){
            var tmp = strq[i].split('=');
            // 对类型进行判断
            obj[tmp[0]] = isNaN(tmp[1]) ? tmp[1] : parseInt(tmp[1]);
        }

        arr.push(obj);
        // 转换成字符串JSON数组
        return JSON.stringify(arr);
    }

方法二：正则匹配

    function urlParser(s){
        var arr = [], reg, hash, obj = {}, tmp;
        // 获取#之后的字符串
        hash = s.substring(s.indexOf('#')+1);
        // 正则匹配关键参数
        reg = /(\w+(?=\/|\?))|(\w+=\w+)/g;
        // 奖 key=value 转换成对象
        for(var i = 0, rets = hash.match(reg); i < rets.length; i++){
            if(rets[i].indexOf('=') > -1){
                tmp = rets[i].split('=');
                // 对类型判断
                obj[tmp[0]] = isNaN(tmp[1]) ? tmp[1] : parseInt(tmp[1]);
            } else {
                arr.push(rets[i]);
            }
        }

        arr.push(obj);
        // 转换成字符串JSON数组
        return JSON.stringify(arr);
    }

##推荐学习资料

- [Javascript教程](http://www.w3school.com.cn/js/index.asp)
- [Javascript高级程序设计第3版](http://book.douban.com/subject/10546125/)
- [正则表达式速查表](http://www.jb51.net/shouce/jquery1.82/regexp.html)
    

