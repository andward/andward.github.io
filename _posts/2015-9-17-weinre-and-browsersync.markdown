---
layout: post
title: Weinre和Browsersync - 跨设备前端调试
date: 2015-9-17 0:00
categories: weinre Browsersync 前端
image: http://7jppzb.com1.z0.glb.clouddn.com/browser-sync-head.png
---

前段时间在写html动画，需要在PC端和mobile web端还有坑爹的微信端兼容（微信内置浏览器简直就是IE。。）

- **PC端调试**。比较直接，用chrome/firefox等等inspector就可以搞定。

- **Standard mobile web**。例如mobile chrome和safari用chrome/safari勉强可以搞定（开browser emulator或者自带的inspector)，但是只能调前端样式，不负责性能。

- **各种基于webkit的mobile browser**。例如UC浏览器，小米浏览器就比较痛苦了，当然你也可以开个Android emulator把这些个app都装上去debug，但是毕竟不能代表真机，而且感觉多此一举。

- **坑爹的微信**。最新的微信打开网页在iPhone上会调用safari，可以直接调mobile safari；在Android上调用的是内置的x5浏览器，问题就来了，渲染和性能各种差。。这里专门有x5的吐槽汇总 -> http://www.qianduan.net/qqliu-lan-qi-x5nei-he-wen-ti-hui-zong/。（现在已经开放了webview调试，不过用起来略麻烦）

有需求必然就有工具。

##Weinre

官方地址 -> [链接1]。全称WEb INspector REmote，望文生义即是网页远程调试工具。贴一段原文:

weinre is a debugger for web pages, like FireBug (for FireFox) and Web Inspector (for WebKit-based browsers), except it's designed to work remotely, and in particular, to allow you debug web pages on a mobile device such as a phone.

以下几个部分我们会用到:

- Debug server：调试服务器起到代理的作用，用来同步调试目标和调试客户端之间的命令。
- Debug client：这是 Web Inspector 界面，即开发者在浏览器中进行调试的界面。
- Debug target：需要调试的页面，也指用于运行被调试 Web 内容的的浏览器所在的移动设备。

贴一张运行图：
<img src="http://7jppzb.com1.z0.glb.clouddn.com/weinre.png">

###安装启动weinre（Mac）- 请先install node(https://nodejs.org/en/)

{% highlight ruby %}
sudo npm -g install weinre
ipconfig (get your machine IP, exp: 172.23.116.1)
weinre --boundHost 172.23.116.1
{% endhighlight %}

访问http://localhost/8080， 你应该会得到以下页面：
<img src="http://7jppzb.com1.z0.glb.clouddn.com/weinre-web.png">

###用weinre来debug

截图里有一段target script，将其放在你的应用的html中，然后把你的应用在本地服务器环境中启动。这里需要注意的是这个服务必须是局域网的，无线的IP应该要与启动的service是同一域的。

接着访问http://172.23.113.62:8080/client/#anonymous，你将会看到以下页面：
<img src="http://7jppzb.com1.z0.glb.clouddn.com/weinre-manage.png">

顶上的几个tab都是dev tool常用的工具，遗憾的是里面并没有断点调试。Weinre里面target列表显示的是哪些设备在访问你的应用。Client列表显示连接的设备。用手机连接同域的wifi，然后在手机浏览器或者微信打开运行的本地应用，就会在target的列表中显示出来，这个时候就可以远程地用dev tool来debug了。
<img src="http://7jppzb.com1.z0.glb.clouddn.com/weinre-target.png">

##Browsersync

官方网址 -> [链接2]。作为前端调试尤其是某些应用只有前端来讲，我们只需要起一个mini-server。Browsersync是一个强大的工具，它可以：

- 架设本地静态资源的服务
- 动态更新CSS的改动
- 实时刷新所有设备的页面
- 可以模拟不同的网络环境
- 可以集成grunt之类的插件

然而更重要的是，它的新版已然集成了weinre。

###安装启动browsersync - 对于静态站点

{% highlight ruby %}
npm install -g browser-sync
browser-sync start --server --files "css/*.css"（exp: 172.23.116.1）
{% endhighlight %}

###运行weinre

启动后会在自动弹出你的应用，地址172.23.116.1:3000。在新的tab打开172.23.116.1:3001会出现browsersync的控制面板。在Remote debug的tab中打开Remote Debugger (weinre)的开关，点击“Access remote debugger (opens in a new tab)” -> 无需添加script，weinre已嵌入你的应用。然后就可以愉快的remote debug了:)
<img src="http://7jppzb.com1.z0.glb.clouddn.com/browser-sync.png">

最后安利一下：[好玩的动画]


[链接1]: http://people.apache.org/~pmuellr/weinre/docs/latest/
[链接2]: http://www.browsersync.io/
[好玩的动画]: http://gtravel.sinaapp.com/


