---
layout: post
title: 怎么阻止JS的冒泡事件
date: 2014-12-29 16:00:00
categories: js jquery
image: http://andward-blog-picture.qiniudn.com/inbox-by-gmail.png
---

用了一段时间google inbox，赶脚mail task的样式很酷炫，于是也模仿着做了一个task管理系统。
Google task有个behavior是点击页面别处，当前展开的mail就会收起。查了查实现发现这里应该是阻止了js事件的冒泡。

关于事件冒泡的官方解释：
After an event triggers on the deepest possible element, it then triggers on parents in nesting order. - 总结一下就是说子元素会逐层往上层查找，直到找到绑定了触发事件的父元素。这儿有个简单的例子：

{% highlight ruby %}
<div class='class1'>
    <div class='class2'></div>
</div>
<script type='text/javascript'>
$('.class1').click(function(event) {
    /* Act on the event */
    $(this).css('background', 'red');
});
</script>
{% endhighlight %}

运行代码，如果点击class2的div，整个class1的区域仍然会变红。点击事件从子元素冒泡到了绑定click事件的父元素上。

js的事件冒泡其实有不少好处，例如可以减少同一事件的重复绑定。如果class1下面有10个div都需要触发同一事件而没有事件冒泡，则我们需要写10次相同的事件函数。。那是多么的坑爹~

为了实现google task的效果，就需要阻止<code>$(document).click()</code>事件的冒泡。很多文章都推荐用stopPropagation方法。这个函数可以阻止事件冒泡:

{% highlight ruby %}
$(document).click(function() {
  // Hide the menus if visible.
});

$('.class2').click(function(event){
  event.stopPropagation();
});
{% endhighlight %}

当点击class2时 由于其用了stopPropagation，不会触发到绑定在$(document)的点击事件。js和jquery都支持这个方法。

然而有些同学对这种强行阻止冒泡的行为表示了担忧。见帖：[dangers-stopping-event-propagation][link1]。大意是指这种全局阻止事件冒泡会导致某些lib产生bug(博主举了个boostrap的bug),并推荐一下用法：

{% highlight ruby %}
$(document).on('click', function(event) {
  if (!$(event.target).closest('.class2').length) {
    // do sth
  }
});
{% endhighlight %}

大体思路就是检查一下事件绑定的元素以及父元素是不是想要的，不是就触发方法~

两种方法我试了试在我这里都work~~最后我用了第二种方法^_^

<img src="http://andward-blog-picture.qiniudn.com/task.png">



[link1]: http://css-tricks.com/dangers-stopping-event-propagation/

