import React from 'react'
import {StyleSheet} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {gameSetup, getCategories} from '../actions/game'


class DifficultyScreen extends React.Component {


  onPress = (difficulty) => {
    this.props.gameSetup({difficulty: difficulty})
    const { navigate } = this.props.navigation;
    navigate('Categories')
  }

  render () {
    return (
      <Container style={styles.container}>

          <Button block rounded success style={styles.button} onPress={()=>this.onPress('easy')}>
            <Text>Easy</Text>
          </Button>
          <Button block rounded style={styles.button} onPress={()=>this.onPress('medium')}>
            <Text>Medium</Text>
          </Button>
          <Button block rounded danger style={styles.button} onPress={()=>this.onPress('hard')}>
            <Text>Hard</Text>
          </Button>

      </Container>
    )
  }
}

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    gameSetup,
    getCategories
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(DifficultyScreen);
