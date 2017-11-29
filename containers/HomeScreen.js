import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button} from 'native-base'
import { Font } from 'expo'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCategories} from '../actions/game'
import altCategories from '../assets/categoryList'

import BackgroundImage from './BackgroundImage'

class HomeScreen extends React.Component {
  // Use Node && MongoDB to save the information
  static navigationOptions = {
    headerTintColor: 'white',
    title: 'TriZilla',
    headerStyle: {backgroundColor: 'teal'}
  }

  componentDidMount(){

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
    return (

        <Container>
            <BackgroundImage source={require('../assets/images/background.jpg')}>
              <View style={styles.container}>
                <Text>Welcome to TrivaZilla!</Text>
                <Button block rounded style={styles.button} onPress={this.onPress}>
                  <Text>Begin Trivia!</Text>
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
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCategories
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(HomeScreen);
