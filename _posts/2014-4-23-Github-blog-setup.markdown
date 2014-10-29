---
layout: post
title: 建立个人的Github Page
date: 2014-4-23 6:00:00
categories: github git
image: http://andward-blog-picture.qiniudn.com/sunrise.jpg
---

很久以前（其实也不是很久啦），如果想建立一个个人的blog,一般的做法是：要么在sina，csdn等一些公共站点注册一个blog，所有的资源都由这个公共站点host；要么自己搭建一个站点和申请独立的域名，资源都放在本地。如果有精力的话，自己搭建一个独立blog还是挺好玩儿的。

但是，像我这样的懒人，租服务器啊申请域名啊搭建应用啊神马的，简直是太麻烦了-_-! 一个独立应用对于一个文字blog来讲有点笨重了，而公共站点的blog又太不cool了（原谅我的矫情╮(╯▽╰)╭）。这个时候，我发现github上有了github page这个玩意儿！没错，就是它了！

进入正题->

###建立github page

Github page host在github上的分支上,域名是<code>your-github-name.github.io</code>, 这对于一个git的使用者来说简直太方便了。我们可以offline本地编辑，有网了就往github上push，想回滚了就reset再push,真是异常方便。最关键的是它不！要！钱！

第一步，你得要有一个github的账号（没有的话去github注册一个）。接着创建一个分支名字叫<code>your-github-name.github.io</code>。假设你的github账号名叫justin-bieber，那建立的分支名字就叫<code>justin-bieber.github.io</code>。

接着，把这个分支clone到你的本地：

{% highlight ruby %}
git clone https://github.com/justin-bieber/justin-bieber.github.io
{% endhighlight %}

如果对github不熟，请移步[这里][github]去看看github的设置。

Clone到本地后，在本地justin-bieber.github.io的文件夹中创建一个Html文件<code>index.html</code>,写一些html code在里面例如:

{% highlight ruby %}
<html>Hello World!</html>
{% endhighlight %}

把这个html文件push到github上去

{% highlight ruby %}
git add index.html
git commit -m 'init'
git push origin master
{% endhighlight %}

如果对git也不熟，请移步[这里][git]去熟悉一下git的用法。

Push好之后等2分钟，去访问域名justin-bieber.github.io，就会看到hello world的页面。更多的github page的细节可以移步[这里][github-page]去了解。

###个性化github page

Github page只能host静态页面，如果想把blog做得“动感”一点，就需要借助一个blog frame <code>jekyll</code>。它提供结构化的静态页面框架，无需数据库支持，使用markdown编辑文本（文字爱好者的福音），使用Liquid让页面模板化，并提供许多blog-style的标签。更多内容请移步[这里][jekyllrb]。

如果你有一台mac，恭喜你！所有的环境都已经ready了。如果是window或者是linux，你需要先安装一下Ruby和RubyGems。环境设置好后，我们在本地安装一下jekyll:

{% highlight ruby %}
gem install jekyll
{% endhighlight %}

然后，在justin-bieber.github.io的目录下，build一个jekyll:

{% highlight ruby %}
jekyll build
{% endhighlight %}

jekyllrb初始化了一个静态框架，结构如下：

{% highlight ruby %}
.
├── _config.yml
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts // html通用模板，可用标签调用
|   ├── default.html
|   └── post.html
├── _posts // blog文章，以markdown格式存放
|   ├── first-article.markdown
├── _data
|   └── members.yml
├── _site // push到server后的结构目录
└── index.html // 当前页的html
{% endhighlight %}

Layout文件夹里面的通用模板，可以通过标签加入任何html文件中。Posts里存放blog的markdown文件。index.html就是当前页的html文件。我们也可以在总目录下加上js和css去修改和添加网页的animtaion和style。

终于可以写blog了！在posts下面以日期+blog名字为文件名，新建一个markdown文件。系统会根据文件名去组织结构。在markdown中，有许多标签需要注意，请细读文档[这里][jekyllrb-doc]去添加和组织文章。如果你对markdown不熟，请移步[这里][markdown]赖熟悉一下markdown的语法。

然后请享受写作带来的快感吧。



[github]: https://help.github.com/articles/set-up-git
[git]: http://git-scm.com/documentation
[github-page]: https://pages.github.com/
[jekyllrb]: http://jekyllrb.com
[jekyllrb-doc]: http://jekyllrb.com/docs/frontmatter/
[markdown]: http://daringfireball.net/projects/markdown/syntax
