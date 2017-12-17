import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setupDifficulty, singlePlayer} from '../../actions/setup'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import * as Animatable from 'react-native-animatable';

class SingleOrMulti extends React.Component{
  onPress = (singlePlayer) => {
    this.props.singlePlayer(singlePlayer)
    this.props.setupDifficulty()
  }

  render(){
    return(
      <Animatable.View animation="fadeInLeft" duration={1000}>
        <Button transparent onPress={()=>this.onPress(true)}>
          <Text>Single Player</Text>
        </Button>
        <Button transparent onPress={()=>this.onPress(false)}>
          <Text>Multi-Player</Text>
        </Button>
      </Animatable.View>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setupDifficulty,
    singlePlayer
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(SingleOrMulti)
