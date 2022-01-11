---
layout: post
title: JS判断客户端是否为手机移动设备
date: 2013-09-06 15:10
comments: true
categories: [前端开发]
---

    function is_mobile(){
        var ua = navigator.userAgent, isMobile = false;
        var ma = ["240x320","acer","acoon","acs-","abacho","ahong","airness","alcatel","amoi","android","anywhereyougo.com","applewebkit/525","applewebkit/532","asus","audio","au-mic","avantogo","becker","benq","bilbo","bird","blackberry","blazer","bleu","cdm-","compal","coolpad","danger","dbtel","dopod","elaine","eric","etouch","fly ","fly_","fly-","go.web","goodaccess","gradiente","grundig","haier","hedy","hitachi","htc","huawei","hutchison","inno","ipad","ipaq","ipod","jbrowser","kddi","kgt","kwc","lenovo","lg ","lg2","lg3","lg4","lg5","lg7","lg8","lg9","lg-","lge-","lge9","longcos","maemo","mercator","meridian","micromax","midp","mini","mitsu","mmm","mmp","mobi","mot-","moto","nec-","netfront","newgen","nexian","nf-browser","nintendo","nitro","nokia","nook","novarra","obigo","palm","panasonic","pantech","philips","phone","pg-","playstation","pocket","pt-","qc-","qtek","rover","sagem","sama","samu","sanyo","samsung","sch-","scooter","sec-","sendo","sgh-","sharp","siemens","sie-","softbank","sony","spice","sprint","spv","symbian","tablet","talkabout","tcl-","teleca","telit","tianyu","tim-","toshiba","tsm","up.browser","utec","utstar","verykool","virgin","vk-","voda","voxtel","vx","wap","wellco","wig browser","wii","windows ce","wireless","xda","xde","zte","GiONEE","GiONEE-"];
        for (var i = 0, lens = ma.length; i < lens; i++) {
            if (ua.indexOf(ma[i]) > -1) {
                isMobile = true;
                break;
            }
        }
        return isMobile;
    }
    if(is_mobile() === true){
        document.write(navigator.userAgent + '<br>');
        document.write('mobile access!');
        //location.href = "http://blog.hankewins.com/"
    } else {
        document.write(navigator.userAgent + '<br>');
        //document.write('pc access!'); 
    }

参考：http://levi.cg.am/?p=2214

