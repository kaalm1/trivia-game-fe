import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import * as Animatable from 'react-native-animatable';
import randomString from 'random-string'


class MultiplayerCode extends React.Component{

  render(){
    const code = randomString({length: 5, numeric:false}).toUpperCase()
    
    return(
      <Animatable.View animation="fadeInLeft" duration={1000}>
        <Text>The code is: {code}</Text>
        <Button><Text>Begin Game!</Text></Button>
      </Animatable.View>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(MultiplayerCode)
