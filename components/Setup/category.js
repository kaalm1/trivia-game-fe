import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {saveCategory} from '../../actions/setup'
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
    this.props.saveCategory(category)
  }

  render(){
    const categories = this.props.categories.sort((a,b)=>a.name>b.name).map(x=>Object.assign({},{key:x.id,label:x.name}))
    return(
      <Animatable.View animation="fadeInLeft" duration={1000}>
        <ModalSelector
           data={categories}
           initValue="Categories"
           onChange={(option)=>{ this.setState({textInputValue:option.label})}}>

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveCategory
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(Category)
