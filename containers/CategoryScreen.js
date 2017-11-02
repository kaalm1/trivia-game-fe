import React from 'react'
import {StyleSheet} from 'react-native'
import {Container, Content, Form, Picker, Item, Button, Text} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {gameSetup, createGame} from '../actions/game'

class CategoryScreen extends React.Component {
  state = {
    selected: ''
  }

  onValueChange = (value:string) => {
    this.setState({selected:value})
  }

  onPress = () => {
    this.props.gameSetup({category: this.state.selected})
    this.props.createGame()

    const {navigate} = this.props.navigation
    navigate('Game')
  }

  render(){
    return(
      <Container style={styles.container}>
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

const mapStateToProps = (state) => {
  return {
    categories: state.game.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    gameSetup,
    createGame
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
