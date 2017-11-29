import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button, Icon} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {gameSetup} from '../actions/game'
import {navHome} from '../actions/nav'

import BackgroundImage from './BackgroundImage'

class DifficultyScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: <Icon name='arrow-back' style={{margin: 10, color:'blue', fontSize:35}} onPress={()=>navigation.dispatch({type: 'Home'})}/>
  });

  onPress = (difficulty) => {
    this.props.gameSetup({difficulty: difficulty})
    const { navigate } = this.props.navigation;
    navigate('Categories')
  }

  render () {
    return (
      <Container>
        <BackgroundImage source={require('../assets/images/background.jpg')}>
          <View style={styles.container}>
            <Button block rounded success style={styles.button} onPress={()=>this.onPress('easy')}>
              <Text>Easy</Text>
            </Button>
            <Button block rounded style={styles.button} onPress={()=>this.onPress('medium')}>
              <Text>Medium</Text>
            </Button>
            <Button block rounded danger style={styles.button} onPress={()=>this.onPress('hard')}>
              <Text>Hard</Text>
            </Button>
            </View>
        </BackgroundImage>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    navHome
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(DifficultyScreen);
