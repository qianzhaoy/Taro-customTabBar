import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component<any, any> {

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

  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  componentWillMount() {
    Taro.eventCenter.on('switchTab', ({tabIndex}) => {
      this.setState({
        active: tabIndex || 0
      })      
    })

    const { tab } = this.$router.params
    this.setState({
      active: tab || 0
    })
  }

  handleClick() {
    Taro.navigateTo({
      url: '/pages/gogogo/index'
    })
  }

  render () {
    const { active } = this.state
    return (
      <View className='index' style={{height: '200vh'}}>
        <Button onClick={this.handleClick.bind(this)}> GOGOGO </Button>

        <View style={{
          display: 'flex',
          position: 'fixed',
          bottom: 0,
          width: '100%'
        }}>
          <View
           style={{
            flex: 1,
            backgroundColor: active == 0 ? 'red' : ''
          }}>1</View>
          <View style={{
            flex: 1,
            backgroundColor: active == 1 ? 'red' : ''
          }}>1</View>
          <View style={{
            flex: 1,
            backgroundColor: active == 2 ? 'red' : ''
          }}>1</View>
          <View style={{
            flex: 1,
            backgroundColor: active == 3 ? 'red' : ''
          }}>1</View>
        </View>
      </View>
    )
  }
}
