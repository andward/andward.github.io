---
layout: post
title: React Native Android - 简单的用户登陆和auth处理（Django RESTful）
date: 2016-1-5 0:00
categories: js android 前端 django
image: http://7jppzb.com1.z0.glb.clouddn.com/react-native.jpg
---

RN的官网并没有专门处理用户登陆的doc。对于IOS，已经有大神写了一个cookie的插件：[react-cookie]，然而并不支持android(⊙o⊙)…于是便手动搭建一套简易的用户登陆以及maintain auth的流程。大概的思路是登陆后生成一个token并把它传回。RN拿到token后存在本地，之后每一次请求都会在header中携带此token，如果auth fail或者token不存在则清掉本地数据，并跳回登陆页。

##Server端Auth认证

后台用的是Django Restful API。之前没有加上auth的服务，这里快速记录一下。

首先在settings.py中引入auth模块和auth的配置。这里有三种auth的模式可以选择：

- BasicAuthentication是最基本的auth认证，需要每次都提供username和pwd，故不选择。
- SessionAuthentication最好是RN端有cookie机制，故也不选择。
- TokenAuthentication利用token key送到sever端与value匹配。

最后就选择了token。有兴趣的同学可以研究一下OAuth2，其由于有refresh token和expiry date更为安全。
{% highlight ruby %}
INSTALLED_APPS = (
'rest_framework.authtoken',
)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',),
}
{% endhighlight %}

加好后需要python manage.py syncdb一下。Django版本小于1.7的需要用[South]migrate，具体请参考South的doc。完成后会生成与User关联的Auth table。

接着在serializers.py中添加User的serializer：
{% highlight ruby %}
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')
{% endhighlight %}

然后在你需要auth的API上加上auth的decorators，例如下面：
{% highlight ruby %}
@api_view(['POST'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def createComment(request, task_id=None):
    created_time = datetime.datetime.now()
    request.data['time'] = created_time
    serializer = commentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
{% endhighlight %}

@authentication_classes中的参数是auth的类型，@permission_classes用来与request中的token进行authentication。

最后在urls.py中加上：
{% highlight ruby %}
urlpatterns += patterns('',
(r'^api/token-auth$', views.obtain_auth_token),
)
{% endhighlight %}

这个url是RESTFul自带的url，用来generate token。只要auth pass就会返回一个token的JSON。

## RN端搭建

这里存取token用的是RN的AsyncStorage，这里是其[官方doc]。引用原文：AsyncStorage is a simple, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

###Token存取

我们先在顶层component中加入token存取的方法，这里我加在navigator的component中。直接贴项目里面code：

nav.js

{% highlight ruby %}
const DRAWER_REF = 'drawer';
const NAV_NAME = {
  todo: "TODO",
  done: "DONE",
  detail: "Detail",
  newTodo: "New Todo",
  signIn: "Sign In",
};

var NavBar = React.createClass({
    getInitialState: function() {
      return ({
      title: null,
      token: '',
      });
    },

    getToken: async function() {
      var new_token = await AsyncStorage.getItem('token');
      this.setState({token: new_token});
    },

    updateToken: async function(value) {
      await AsyncStorage.setItem('token', 'Token ' + value);
    },

    removeToken: async function() {
      await AsyncStorage.removeItem('token');
    },

    authFail: async function() {
      await this.removeToken();
      await this._navigator.push({
        name: NAV_NAME.signIn,
      });
      this.refs[DRAWER_REF].closeDrawer();
    },

    renderScene: function(router, navigator){
      var Component = null;
      this._navigator = navigator;

      switch(router.name){
        case NAV_NAME.done:
          Component = DonePage;
          break;
        case NAV_NAME.todo: //default view
          Component = TodoPage;
          break;
        case NAV_NAME.detail:
          Component = DetailPage;
          break;
        case NAV_NAME.newTodo:
          Component = NewTodoPage;
          break;
        case NAV_NAME.signIn:
          Component = SignInPage;
          break;
      }

      return <Component 
      navigator={navigator} 
      todo={router.todo}
      token={this.state.token}
      getToken={this.getToken}
      updateToken={this.updateToken}
      authFail={this.authFail}/>
    },
...
    switchNav: function(name) {
      this.setState({title: name});
      this._navigator.push({name: this.state.title});
      this.refs[DRAWER_REF].closeDrawer();
    },
...
    navView: function() {
      return (
        <View style = {styles.nav}>
          <View style = {styles.header}>
          <Text style = {styles.headerText}>ANDWARD</Text>
          <Text style = {styles.headerText}>.TODO</Text>
          </View>
          <View style = {styles.item}>
            <Text style = {styles.text}
            onPress= {() => {this.switchNav(NAV_NAME.todo);}}
            >TODO</Text>
          </View>
          <View style = {styles.item}>
            <Text style = {styles.text}
            onPress= {() => {this.switchNav(NAV_NAME.done);}}
            >DONE</Text>
          </View>
          <View style = {styles.item}>
          <Text style = {styles.text}>SETTINGS</Text>
          </View>
          <View style = {styles.item}>
          <Text style = {styles.text}
          onPress= {() => {this.authFail();}}
          >Log Out</Text>
          </View> 
        </View>);
    },

    render: function() {
      var title = this.state.title ? this.state.title : NAV_NAME.todo;
      return (
          <DrawerLayoutAndroid
          ref={DRAWER_REF}
          drawerWidth={Dimensions.get('window').width - 56}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.navView}>
          <View style = {styles.container}>
          <ToolbarAndroid
            navIcon={{uri: apiList.resourceWrapper('menu_white.png')}}
            title={title}
            titleColor="white"
            style={styles.toolbar}
            onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
            onActionSelected={this.onActionSelected} />
          <Navigator 
          initialRoute={{name: NAV_NAME.todo}}
          configureScene={this.configureScene}
          renderScene={this.renderScene} />
          </View>
          </DrawerLayoutAndroid>
        );
    }
});
{% endhighlight %}

这里定义了存取删token的三个函数：getToken，updateToken，removeToken。注意所有的
AsyncStorage method都是异步的，需要用ES6的async/await，这三个函数都作为参数传入compnent中。

###登录页面的验证以及获取token:

sign.js

{% highlight ruby %}
var SignInPage = React.createClass({
    getInitialState: function() {
        return {
            username: false,
            password: false,
        };
    },
        
    signIn: function() {
        fetch(apiList.SIGN_IN, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                this.clearInput();
            }
        })
        .then((repsonseData) => {
            this.props.updateToken(repsonseData.token);
            this.props.navigator.push({
                name: 'TODO'
            });
        });
    },
...
});
{% endhighlight %}

注：this.props.updateToken用来存generate的token。

todo.js

{% highlight ruby %}
var TodoPage = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: async function() {
    await this.props.getToken();
    await this.fetchData();
  },

  fetchData: function() {
    fetch(apiList.TODO_API, {
        headers: {
          'Authorization': this.props.token,
        }
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          this.props.authFail();
        }
      })
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      });
  },
});
{% endhighlight %}

this.props.getToken()从storage里面拿到generate的token并在顶层component中setState。这样所有的navigator都可以通过this.props.token拿到token，并用于请求。在fetch的headers中加入：'Authorization': this.props.token，server端就可以对request进行token authentication了。

稍后附上效果图~

[react-cookie]: https://github.com/joeferraro/react-native-cookies
[South]: https://south.readthedocs.org/en/latest/
[官方doc]: https://facebook.github.io/react-native/docs/asyncstorage.html#content
