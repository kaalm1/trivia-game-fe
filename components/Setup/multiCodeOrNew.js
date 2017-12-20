import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setupDifficulty, singlePlayer} from '../../actions/setup'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import * as Animatable from 'react-native-animatable';

class CodeOrNew extends React.Component{
  onNewGame = () => {
    this.props.setupDifficulty()
  }

  render(){
    return(
      <Animatable.View animation="fadeInLeft" duration={1000}>
        <Button transparent onPress={()=>this.onPress(true)}>
          <Text>Enter Code</Text>
        </Button>
        <Button transparent onPress={this.onNewGame}>
          <Text>New Game</Text>
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

export default connect(null,mapDispatchToProps)(CodeOrNew)
