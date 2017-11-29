import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Form, Picker, Item, Button, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {gameSetup, gameStart} from '../actions/game'
import {navGame} from '../actions/nav'

import BackgroundImage from './BackgroundImage'

class CategoryScreen extends React.Component {
  state = {
    selected: ''
  }

  onValueChange = (value:string) => {
    this.setState({selected:value})
  }

  onPress = () => {
    if (this.state.selected){
      this.props.gameSetup({category: this.state.selected})
      this.props.gameStart()
      this.props.navGame()
    }
  }

  render(){
    return(
      <Container>
        <BackgroundImage source={require('../assets/images/background.jpg')}>
        <View style={styles.container}>
          <Form>
            <Item>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              placeholder='Category'
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange}
              tyle={{height:100, margin:-15}}
            >
              {this.props.categories.map(category=><Picker.Item label={category.name} value={category.id} key={category.id}/>)}
            </Picker>
            </Item>
          </Form>
          <Button block rounded style={styles.button} onPress={this.onPress}>
            <Text>Let's Play!</Text>
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

const mapStateToProps = (state) => {
  return {
    categories: state.game.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    gameSetup,
    gameStart,
    navGame
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
