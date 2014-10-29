---
layout: post
title: Highlight Code In TinyMCE
date: 2013-10-11 10:00:00
category: Opensource
image: http://andward-blog-picture.qiniudn.com/bkbridge.jpg
---

SyntaxHighlighter is a popular code highlight tool using in wordpress.It also can be pluged into TinyMCE.

First..Download SyntaxHighlighter from its [site][lighter-link] and extract it into your app static folder.

add script and css in html
{% highlight ruby %}
<script type="text/javascript" src="/static/syntaxhighlighter/scripts/shCore.js">
</script>
<script type="text/javascript" src="/static/syntaxhighlighter/scripts/shBrushPython.js">
</script> '''Here use python code style'''
<script type="text/javascript">
SyntaxHighlighter.all();
</script>
<link type="text/css" rel="stylesheet" href="/static/syntaxhighlighter/styles/shCoreDefault.css"/>
<link type="text/css" rel="stylesheet" href="/static/syntaxhighlighter/styles/shCore.css"/>
{% endhighlight %}

Then download another plugin for TinyMCE named [SyntaxHL][SyntaxHL-link]. Extract it and add it into TinyMCE plugin: /static/tinymce/jscripts/tiny_mce/plugins/

Add following in TinyMCE setting:

{% highlight ruby %}
tinyMCE.init({
plugins:syntaxhl
remove_linebreaks:false,
extended_valid_elements:"pre[cols|rows|disabled|name|readonly|class]",
});
{% endhighlight %}

We can find code editor button appear in TinyMCE toolbar,and code is highlight at website.


[lighter-link]: http://alexgorbatchev.com/SyntaxHighlighter/
[SyntaxHL-link]: https://github.com/RichGuk/syntaxhl