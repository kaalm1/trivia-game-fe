import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


class GameScreen extends React.Component{

  render(){
    return(
      <Container>
        <Text>Game End!!</Text>
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
