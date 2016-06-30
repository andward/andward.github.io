---
layout: post
title: React Native Android - Setup (Mac)
date: 2015-12-21 0:00
categories: js android 前端
image: http://7jppzb.com1.z0.glb.clouddn.com/react-native.jpg
---


React Native一出世，业界就炸了锅。因为这货看起来非常之美好：

- **用js作为语言**。前端的伙计们于是可以理所当然地在skill list潇洒地写上：编写Android和IOS app的技能：）如果RN可以大规模应用，写app的后备军瞬间增加了几十倍：）
- **跨平台**。一套代码可以同时在Android和IOS上跑起来（当然现在并不能100%重用），瞬间减了一半的工作量有木有！

本人也借势玩了一把RN，这里分P做一下笔记。

##装包

入门什么的比较推荐用Mac，搭建起来比较顺手。首先你需要装一下东西：

- 装一个Homebrew。便于安装其他的依赖包
- 装一个最新的nodejs。如果你已经装了npm这个就非常方便：npm install node --save
- 用Homebrew装一个watchman。可以动态地检测code change：brew install watchman

##Android环境

如果你Mac上从来没有装过android sdk，那么直接brew install android-sdk。装好后在.bash_profile里面指一下sdk的全局路径：
{% highlight ruby %}
export ANDROID_HOME=/usr/local/opt/android-sdk
{% endhighlight %}

或者你可以直接从android的官网上下载一个android studio装上。然后把全局路径指向studio带的sdk:
{% highlight ruby %}
export ANDROID_HOME=~/Library/Android/sdk
{% endhighlight %}

设置好全局后，在terminal里面输入android打开sdk manager。选择并安装以下add-ons：

- Android SDK Build-tools version 23.0.1
- Android 6.0 (API 23)
- Android Support Repository
- Intel x86 Atom System Image
- Intel x86 Emulator Accelerator

<img src="http://7jppzb.com1.z0.glb.clouddn.com/AndroidSDK1.png">
<img src="http://7jppzb.com1.z0.glb.clouddn.com/AndroidSDK2.png">

如果需要在emulator上调试，finder去~/Library/Android/sdk/extras/intel/下面安装一下IntelHAXM。接着在terminal里面输入android avd建立一个新的emulator。如果用真机调试请打开debug，**并保证连接的WIFI与你的Mac在同一局域网**。

##新建项目

安装RN：
{% highlight ruby %}
npm install -g react-native-cli
{% endhighlight %}

新建一个项目，名字随意~（就叫GouDai好了
{% highlight ruby %}
react-native init GouDai
{% endhighlight %}

cd到新的目录下面，启动项目：
{% highlight ruby %}
react-native run-android
{% endhighlight %}

讲道理在你在emulator或者在5.0以上版本的真机上会看到欢迎界面。5.0以下的或者小米什么的定制OS可能会出现一个大红屏或者大白屏。这个时候你需要摇晃一下手机（小米什么的需要去设置->其他应用管理->自己的应用名称->权限管理-> 显示悬浮窗去设置‘显示悬浮窗’）会出现一个菜单，选择Dev Settings然后点击Debug Server host for device，把Mac的ip放进去，fn+f2选择reload js应该就可以看到界面了。




