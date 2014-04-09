---
layout: post
title: 元素在Chrome上的移动的问题（JQuery animation）
date: 2014-3-31 14:00:00
categories: js jquery
---

同事写js animation的时候碰到了一个很奇怪的问题 -> 一个有<code>margin</code>和<code>overflow:hidden</code>的div里存在很多li。在用jquery的animation移动这些li的时候，li的css会显示在margin层上。直接看code:

js
{% highlight js %}
$('.scrollbar').find('li').live('click', function(event) {
     $('.bbslider').animate({
         'left': ‘+=100px’
     }, 'slow');
 });
{% endhighlight %}

html
{% highlight html %}
<div class='tag_area'>
	<div class='tag_align_area'>
		<div class='tag_content_area'>
			<div class='tag_slide_area'>
				<div class='slide'>
					<ul class='bbslider' style='width:300%;position:relative;'>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
					</ul>
				</div>
				<div class='scrollbar'>
					<ul class="bbscroll"></ul>
				</div>
			</div>
		</div>
	</div>
</div>
{% endhighlight %}

css
{% highlight css %}
.tag_align_area
{
	margin: 0 auto; 
	width: 800px;
	height:100%;
	position: relative;
}
.tag_content_area
{
	width: 100%;
	position: absolute;
	height:50%;
	top:0px;
}
.tag_slide_area
{
	margin: 0px auto;
	width: 600px;
	height:100%;
	overflow: hidden;
}
.slide
{
	margin-top: 50px;
	width: 600px;
	height: 400px;
	overflow-x: scroll;
	overflow-y: hidden;
}
.slide ul
{
	padding:0px;
	list-style-type: none;
}
.slide li
{
	float:left;
}
.scrollbar
{
	position: absolute;
	top: 260px;
    width:600px;
    text-align: center;
}
.scrollbar li
{
	width:20px;
	height:20px;
	float:left;
	cursor: pointer;
	border-radius: 50%;
	margin-left: 15px;
	position: relative;
	right: 50%;
}
{% endhighlight %}

从代码看似乎没什么问题，在FF上也是OK的。但是在Chrome上li的css的“残影”会出现在<code>.tag-slide-area</code>的margin上([见图][link])。感觉上这个bug跟浏览器解析margin的方式有关。。


[link]: https://screenshot.googleplex.com/xzbgMqTDiX
