import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Question from '../components/Question'

class GameScreen extends React.Component{

  render(){
    return(
      <Container>
        {this.props.isLoading ? <ActivityIndicator /> : <Question />}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.game.loading
  };
};

export default connect(mapStateToProps)(GameScreen);
