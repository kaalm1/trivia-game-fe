import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Question from '../components/QuestionReview'

class GameScreen extends React.Component{

  render(){
    return(
      <Container>
        <Question navigation={this.props.navigation}/>
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
