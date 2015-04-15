---
layout: post
title: Django集成socketio
date: 2015-4-13 0:00
categories: python django socketio
image: http://andward-blog-picture.qiniudn.com/red_forest.jpeg?imageView/2/w/1400/h/720
---

最近想在TODO项目（django）上加一个实时更新TODO动态的功能，这样感觉更酷炫。。查阅了一下一般有以下解决方案：

**用Ajax定时发请求**。比如每隔1分钟通过Ajax发送一个数据库查询请求，看看有没新的item被save。这个是最直接最简单的做法，但是做不到实时更新，而且很耗费server的资源。

**集成WebSocket通信的解决方案**。WebSocket是双工通道的通信协议，而django等python框架用的WSGI的同步协议，所以需要起建立另一个支持WebSocket的server去handle实时通信的需求，最近大热的nodejs/socketio就可以支持WebSocket的服务，于是有就有大牛写了一个集成socketio的django插件django-socketio-> [链接]。它把socketio以app的形式集成进了django，于是大家可以愉快地用django建立聊天室了。但是，我的项目里面已经有大量的Ajax的方法与WebSocket不兼容，而且socketio对于关系型数据库的操作不是特别好。所以它并不是一个好的方案。忍痛割爱~

**Comet:Long-polling（长轮询）**。这个是目前主流的方案。建立一个定时长连接，一旦server端有更新立刻返回。socketio也支持这种模式，它在不支持WebSocket的情况下使用Long-polling进行实时通信。好，就玩一玩它把~


###装包

Follow大牛的github，所有的依赖包都可以在pipy里面找到并用pip进行安装。

但是小心，里面有坑。不是所有的版本都可以正常工作的，而且装django-socketio的时候会把你老的django版本卸载了然后重新装上最新版django 1.8，导致你原有的code无法工作（API都变了）。下面是我目前装的依赖包版本，可以正常工作：

{% highlight ruby %}
gevent=0.13.6
gevent-socketio=0.2.1
gevent-websocket=0.2.3
greenlet=0.4.5
django-socketio=0.3.6
{% endhighlight %}

###集成代码

将socketio塞进app列表

{% highlight ruby %}
url("", include('django_socketio.urls')),
{% endhighlight %}

将socketio模板塞进HTML head

{% highlight ruby %}
<head>
load socketio_tags
socketio
</head>
{% endhighlight %}

在你的client端js代码中启动socket，并建立名为‘notification’的通信连接通道（channel）。countNewMessage方法在server返回数据时候调用。send的方法发送id为1的JSON到server端。

{% highlight ruby %}
var socket = new io.Socket();
socket.connect();
socket.on('connect', function() {
	socket.subscribe('notification');
})
socket.on('message',countNewMessage);
socket.send({'id': 1};)

var countNewMessage = function(data) {
	console.log(data.id);
};
{% endhighlight %}

在server端view中新建socket处理方法。on_message的语法糖是bind event with channel，broadcast方法将id发给每个client端。

{% highlight ruby %}
@on_message(channel='notification')
def notification(request, socket, context, message):
    socket.broadcast({'id': message['id']})
{% endhighlight %}

###启动server

这里需要启动两个不同端口的server，一个django的，一个socketio的。

{% highlight ruby %}
python manage.py runserver
python manage.py runserver_socketio localhost:9000
{% endhighlight %}

打开多个demo,会发现先打开的console log记录了1。更多的细节可以参考大牛的demo或者是我的github code:)


<img src="http://andward-blog-picture.qiniudn.com/notification_demo.png">

[链接]: https://github.com/stephenmcd/django-socketio
