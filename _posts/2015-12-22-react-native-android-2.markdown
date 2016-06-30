---
layout: post
title: React Native Android - 基本结构
date: 2015-12-21 0:00
categories: js android 前端
image: http://7jppzb.com1.z0.glb.clouddn.com/react-native.jpg
---

接上集~

初始化项目后进入目录，里面的结构大概是这样的（忽略隐藏文件）：

- android(directory)
- ios(directory)
- index.android.js
- index.ios.js
- package.json

Android和ios俩文件夹分别是对应系统的配置文件，深入的分析将在下次分享（其实是还没有研究）；android.index.js和index.ios.js分别是android和ios应用的入口；package.json是项目的依赖配置文件，新的add-ons都需要写进这个文件中。

整个项目的js代码是采用reactjs的架构，不熟悉的童鞋可以先go through一下reactjs的[官网]。
简单地说就是把app与数据分离并且组件化，使组件可复用。我用RN写了一个android的demo，github地址是：[这里]，下面我就以demo为例分析一下其基本结构。

index.android.js

{% highlight ruby %}
'use strict';

var React = require('react-native');
var AppMain = require('./components/nav');
var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var App = React.createClass({
    
  render: function() {
    return (            
      <View style={{ flex: 1 }}>
        <AppMain />
      </View>
    );
  }
});

AppRegistry.registerComponent('ReactTODO', () => App);
{% endhighlight %}

RN中，module的引用用的是require，这里第1，2个var分别引入了React和我在components下面自建的module。第三个var里面是这个文件用到的原生APIs和components，所有的原生组件可以去RN的官网查询，例如[Image]。需要注意的是目前RN for Android还处于完善阶段，原生的components比IOS的要少很多（带IOS的原生组件只support IOS)，还有不少坑要填。AppRegistry是js entry；最后一行AppRegistry.registerComponent就是用来用来注册和运行app的；ListView，Text和View分别是列表，文字和视图的组件；StyleSheet是样式的组件。

React.createClass这个方法创建了叫App的组件，最后被AppRegistry调用运行。下面看另外一个自定义的component:

detail.js

{% highlight ruby %}
'use strict';

var React = require('react-native');
var apiList = require('../api');
var CommentList = require('./commentList');
var CommentInput = require('./commentInput');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var DetailPage = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function() {
        fetch(apiList.apiWrapper('comments', String(this.props.todo.id)))
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    loaded: true,
                });
            })
            .done();
    },

    updateComment: function() {
        this.fetchData()
    },

    render: function() {
        return (
            <View style={styles.container}>
            <View style={styles.tag}>
            <Text style={styles.tagName}>{this.props.todo.tag}</Text>
            </View>
            <View style={styles.task}>
            <Text>{this.props.todo.task}</Text>
            </View>
            <View style={styles.cell}>
            <View style={styles.name}>
            <Text>{this.props.todo.name}</Text>
            </View>
            <View style={styles.time}>
            <Text>{this.props.todo.time}</Text>
            </View>
            </View>
            <View style={styles.header}>
            <Text style={styles.headerText}>Comments</Text>
            </View>
            <CommentList 
            dataSource={this.state.dataSource} />
            <CommentInput
            todo={this.props.todo} 
            updateComment={this.updateComment} />
            </View>
            );
    },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cell: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  task: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingLeft: 20,
    paddingRight: 20,
  },
  tag: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingLeft: 20,
  },
  tagName: {
    color: '#C74433',
  },
  time: {
    paddingRight: 20,
  },
  name: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 11,
  },
});

module.exports = DetailPage;
{% endhighlight %}

这个DetailPage是一个比较完整的组件，最后module.exports使得其他模块可以调用DetailPage。在createClass中，有几个方法需要注意：

- **getInitialState**：初始化函数，返回需要初始化的变量。
- **componentDidMount**：Component load好以后执行的函数。这里定义了一个fetchData()用来拿RESTFul API的数据。有关fetch可以参阅官方文档<a href="https://fetch.spec.whatwg.org/"></a>。
- **componentWillMount**：这个没有定义但也很重要，看名字就知道是component load之前执行的函数。
- **render**：返回组件结构的函数。

StyleSheet.create创建了样式供render的组件调用。

最后关于数据传输，沿用的是react中props和statee，有关于两者的区别和用法可以参阅官方的BLOG:[Props and state]。


[官网]: https://facebook.github.io/react/
[Props and state]: https://facebook.github.io/react/docs/thinking-in-react.html
[Image]: https://facebook.github.io/react-native/docs/image.html#content
[这里]: https://github.com/andward/AndwardTODO-ReactNative
