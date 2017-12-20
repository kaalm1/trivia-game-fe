import React from 'react'
import {StyleSheet, View, Dimensions, Image} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button} from 'native-base'
import { Font, LinearGradient } from 'expo'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCategories} from '../actions/game'
import altCategories from '../assets/categoryList'

import BackgroundImage from './BackgroundImage'
import Login from '../components/Setup/login'
import SingleOrMulti from '../components/Setup/singleOrMulti'
import CodeOrNew from '../components/Setup/multiCodeOrNew'
import Difficulty from '../components/Setup/difficulty'
import Category from '../components/Setup/category'
import MultiplayerCode from '../components/Setup/multiplayerCode'

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
    let content;
    switch (this.props.page) {
    case 'login':
      content = <Login />;
      break;
    case 'singleOrMulti':
      content = <SingleOrMulti />;
      break;
    case 'multiCodeOrNew':
      content = <CodeOrNew />;
      break;
    case 'difficulty':
      content = <Difficulty />;
      break;
    case 'category':
      content = <Category />;
      break;
    case 'multiplayerCode':
      content = <MultiplayerCode />;
      break;
    default:
      content = <Login />;
      break;
    }

    return (

        <Container>
            <BackgroundImage source={require('../assets/images/background.jpg')}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{flex:1, resizeMode:'contain', width:width-10}} source={require('../assets/images/logo3.png')}/>
                <Text style={[styles.subtitle,{color:'#1f94c6', backgroundColor:'transparent'}]}>Test Your Limits!</Text>
              </View>
              <View style={styles.container}>
                  {content}
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

const mapStateToProps = (state) => {
  return {
    page: state.setup.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCategories
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
