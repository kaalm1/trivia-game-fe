import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setupSoM} from '../../actions/setup'
import {Image, View, Dimensions, Text} from 'react-native'
import { Button } from 'native-base'
import FBLogin from '../FacebookLogin'
import GoogleLogin from '../GoogleLogin'
import Hr from '../hr'
var { width, height } = Dimensions.get('window')

class Login extends React.Component{
  onPress = () => {
    this.props.setupSoM()
  }

  render(){
    return(
      <View>
        <View style={{flex:1, marginTop:30, marginBottom:30}}>
          <FBLogin />
          <Hr lineColor='gray' text="OR"/>
          <GoogleLogin />
        </View>
        <Button full success  onPress={this.onPress}>
          <Text>Begin Trivia!</Text>
        </Button>
      </View>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setupSoM
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(Login)
