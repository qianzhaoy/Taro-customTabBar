import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
  }

  handleClick() {
    Taro.navigateTo({
      url: '/pages/gogogo/index'
    })
  }

  switchTab() {
    Taro.reLaunch({
      url: '/pages/index/index?tab=3'
    })
  }

  jumpToTab() {
    Taro.eventCenter.trigger('switchTab', {
      tabIndex: 3
    })
    Taro.navigateBack({
      delta: 10
    })
  }

  render () {
    return (
      <View className='index' style={{height: '200vh'}}>
        <Text>一直点</Text>
        <Button onClick={this.handleClick.bind(this)}>GOGOGOGOGOGO</Button>
        <Button onClick={this.switchTab.bind(this)}>reLaunch BACK</Button>
        <Button onClick={this.jumpToTab.bind(this)}>navigate BACK</Button>
      </View>
    )
  }
}
