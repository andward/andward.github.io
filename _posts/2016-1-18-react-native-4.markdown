---
layout: post
title: React Native Android - 自动化测试(一)
date: 2016-1-18 0:00
categories: android appium test
image: http://7jppzb.com1.z0.glb.clouddn.com/react-native.jpg
---


RN-Android build成apk后就是一个十分正常的android应用了。用android正常的test framework就可以对它进行automation test。前几天用Appium试着跑了一下demo，发现其中还是有坑的。

RN中最基本的component例如View和TextInput都有一个prop叫testID -> 这里是[官网说明]。
可以用来做end-to-end test的locator。那么它应该显示在哪里呢？根据facebook的code，看起来应该是作为content description出现：

ReactTestHelper.java
{% highlight ruby %}
  /**
   * Gets the view with a given react test ID in the UI hierarchy. React test ID is currently
   * propagated into view content description.
   */
  public static View getViewWithReactTestId(View rootView, String testId) {
    return findChild(rootView, hasTagValue(testId));
  }
{% endhighlight %}

于是在demo中某个render加了类似如下testID:
{% highlight ruby %}
    render: function() {
        return (
            <View style = {styles.container}>
            ...
            <View style = {styles.input}>
            <TextInput
            ...
            placeholder = {'Your Account'}
            testID = 'debug-signin-username-input' />
            </View>
            <View style = {styles.input}>
            <TextInput
            ...
            placeholder = {'Your Password'}
            testID = 'debug-signin-passwd-input' />
            </View>
            ...
            </View>
        );
    },
{% endhighlight %}

build好后用uiautomator一看，content-desc是空的：
<img src="http://7jppzb.com1.z0.glb.clouddn.com/appium_1.png">

网上搜了搜发现这个[帖子]，原文-> React Native put testID into the tag of view, and accessibilityLabel into content description。accessibilityLabel这个prop目前View才有，于是改成以下：

{% highlight ruby %}
    render: function() {
        return (
            <View style = {styles.container}>
            ...
            <View 
            style = {styles.input}
            accessibilityLabel = 'username-input'>
            <TextInput
            ...
            placeholder = {'Your Account'} />
            </View>
            <View 
            style = {styles.input}
            accessibilityLabel = 'passwd-input'>
            <TextInput
            ...
            placeholder = {'Your Password'} />
            </View>
            <TouchableNativeFeedback>            
            <View style={styles.submit}
            accessibilityLabel = 'signin-submit'>
            <Text style={styles.submitText}>
            SIGN IN
            </Text>
            </View>
            </TouchableNativeFeedback>
            </View>
        );
    },
{% endhighlight %}

再用uiautomator看，content-desc有了：
<img src="http://7jppzb.com1.z0.glb.clouddn.com/appium_2.png">

测试代码如下：

{% highlight ruby %}
    def test_find_elements(self):
        sleep(5)
        user_input = self.driver.find_element_by_accessibility_id("username-input")
        user_input.click()
        user_input.send_keys('test_account')
        pwd_input = self.driver.find_element_by_accessibility_id("passwd-input")
        pwd_input.click()
        pwd_input.send_keys('123456')
        signin_submit = self.driver.find_element_by_accessibility_id("signin-submit")
        signin_submit.click()
{% endhighlight %}

启动Appium跑测试代码，通过。
<img src="http://7jppzb.com1.z0.glb.clouddn.com/appium_3.png">

[官网说明]: http://facebook.github.io/react-native/docs/view.html#testid
[帖子]: https://discuss.appium.io/t/react-native-ui-element-access-via-testid/7845/4
