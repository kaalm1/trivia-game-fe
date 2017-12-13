import React from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button} from 'native-base'
import { Font, LinearGradient } from 'expo'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCategories} from '../actions/game'
import altCategories from '../assets/categoryList'

import BackgroundImage from './BackgroundImage'
const {width, height} = Dimensions.get('window')

var randomColor = require('randomcolor')
var color = randomColor()

const MyHeader = () => {
  return(
    <LinearGradient
     colors={['teal', 'gray', 'beige', 'white']}
     style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height:40 , width:width}}
   >
     <Text style={{ fontSize: 20, backgroundColor: 'transparent', fontFamily: 'PermanentMarker'}}>
       TriZilla!
     </Text>
   </LinearGradient>
  )

}

class HomeScreen extends React.Component {
  // Use Node && MongoDB to save the information
  static navigationOptions = {
    headerTitle: <MyHeader />
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
    console.log(color)
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
