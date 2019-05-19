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

  changeTabbar(active) {
    this.setState({
      active
    })
  }

  render () {
    const { active } = this.state
    return (
      <View className='index' style={{height: '200vh'}}>
        <Button onClick={this.handleClick.bind(this)}> GOGOGO </Button>

        {active == 0 && <View>tab 0</View>}
        {active == 1 && <View>tab 1</View>}
        {active == 2 && <View>tab 2</View>}
        {active == 3 && <View>tab 3</View>}

        <View style={{
          display: 'flex',
          position: 'fixed',
          bottom: 0,
          width: '100%'
        }}>

          {
            [0,1,2,3].map(item => (
              <View key={item} onClick={this.changeTabbar.bind(this, item)} style={{
                flex: 1,
                backgroundColor: active == item ? 'red' : ''
              }}>
                {item} 
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
