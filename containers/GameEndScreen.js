import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


class GameScreen extends React.Component{
  state = {
    score: this.props.correctAnswers.length / (this.props.correctAnswers.length + this.props.wrongAnswers.length)
  }

  render(){
    return(
      <Container>
        <Text>Game End!!</Text>
        <Text>Score</Text>
        <Text>{this.state.score}</Text>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.game.loading,
    correctAnswers: state.game.correct,
    wrongAnswers: state.game.wrong
  };
};

export default connect(mapStateToProps)(GameScreen);
