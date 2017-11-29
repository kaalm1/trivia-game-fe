import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Question from '../components/Question'

import BackgroundImage from './BackgroundImage'

class GameScreen extends React.Component{

  render(){
    return(
      <Container>
        {/* <BackgroundImage source={require('../assets/images/background.jpg')}> */}
          {this.props.isLoading ? <ActivityIndicator /> : <Question navigation={this.props.navigation}/>}
        {/* </BackgroundImage> */}
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
