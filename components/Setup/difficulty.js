import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setupCategory, saveDifficulty} from '../../actions/setup'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import * as Animatable from 'react-native-animatable';

const Level = (props) => {
  return(
    <Button transparent onPress={()=>props.onPress(props.level)}>
      <Text>{props.level}</Text>
    </Button>
  )
}


class Difficulty extends React.Component{
  onPress = (difficulty) => {
    this.props.saveDifficulty(difficulty)
    this.props.setupCategory()
  }

  render(){
    const levels = ['Easy', 'Medium', 'Hard']
    return(
      <Animatable.View animation="fadeInLeft" duration={1000}>
        {levels.map(l=><Level key={l} level={l} onPress={this.onPress}/>)}
      </Animatable.View>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setupCategory,
    saveDifficulty
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(Difficulty)
