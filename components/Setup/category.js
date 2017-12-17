import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {saveCategory, setupMultiplayerCode} from '../../actions/setup'
import {gameStart} from '../../actions/game'
import {navGame} from '../../actions/nav'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {Button} from 'native-base'
import ModalSelector from 'react-native-modal-selector'
import * as Animatable from 'react-native-animatable';

const Level = (props) => {
  return(
    <Button transparent onPress={()=>props.onPress(props.category)}>
      <Text>{props.category.name}</Text>
    </Button>
  )
}


class Category extends React.Component{
  state = {
    textInputValue: ''
  }

  onPress = (category) => {
    this.setState({textInputValue:category.label})
    this.props.saveCategory(category.key)
    if (this.props.singlePlayer){
      // Begin Game
      this.props.gameStart()
      this.props.navGame()
    } else {
      // Go to multiplayer screen for code -- give out and then begin!
      this.props.setupMultiplayerCode()
    }
  }

  render(){
    const categories = this.props.categories.sort((a,b)=>a.name>b.name).map(x=>Object.assign({},{key:x.id,label:x.name}))
    return(
      <Animatable.View animation="fadeInLeft" duration={1000}>
        <ModalSelector
           data={categories}
           initValue="Categories"
           onChange={(option)=>{this.onPress(option)}}>

           <TextInput
               style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30, width:100}}
               editable={false}
               placeholder="Categories"
               value={this.state.textInputValue} />

         </ModalSelector>
      </Animatable.View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.game.categories,
    singlePlayer: state.setup.singlePlayer
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveCategory,
    setupMultiplayerCode,
    gameStart,
    navGame
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(Category)
