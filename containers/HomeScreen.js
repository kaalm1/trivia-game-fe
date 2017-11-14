import React from 'react'
import {StyleSheet} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {gameSetup, getCategories} from '../actions/game'
import altCategories from '../assets/categoryList'


class HomeScreen extends React.Component {
  // Use Node && MongoDB to save the information
  componentWillMount(){
    fetch('https://opentdb.com/api_category.php')
    .then(res=>res.json())
    .then(data=>this.props.getCategories(data.trivia_categories))
    .catch(()=>this.props.getCategories(altCategories.categories))
  }

  onPress = () => {
    const {navigate} = this.props.navigation
    navigate('Difficulty')
  }

  render () {
    console.log(this.props.navigation)
    return (
      <Container style={styles.container}>

          <Text>Welcome to TrivaZilla!</Text>
          <Button block rounded style={styles.button} onPress={this.onPress}>
            <Text>Begin Trivia!</Text>
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

export default connect(null,mapDispatchToProps)(HomeScreen);
