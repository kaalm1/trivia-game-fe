import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import {Container, Text, Button} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { navDifficulty, navHome, navReview } from '../actions/nav'


class GameScreen extends React.Component{
  state = {
    score: Math.round((this.props.correctAnswers.length*1.0 / (this.props.correctAnswers.length + this.props.wrongAnswers.length))*100)
  }


  render(){
    return(
      <Container style={styles.container}>
        <Text>Game End!!</Text>
        <Text>Score</Text>
        <Text>{this.state.score}</Text>
        <Button block rounded style={styles.button} onPress={()=>this.props.navDifficulty()}><Text>Play Again</Text></Button>
        <Button block rounded style={styles.button} onPress={()=>this.props.navHome()}><Text>Home</Text></Button>
        <Button block rounded style={styles.button} onPress={()=>this.props.navReview()}><Text>View Errors</Text></Button>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navDifficulty,
    navHome,
    navReview
  }, dispatch);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(GameScreen);
