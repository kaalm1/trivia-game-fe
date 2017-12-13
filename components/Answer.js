import React from 'react'
import {ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import {Container, Text, Card, CardItem, Body} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class Answer extends React.Component{

  render(){
    return(
      <CardItem style={{backgroundColor:'transparent'}}>
        <Card>
           <CardItem button onPress={()=>this.props.onAnswer(this.props.answer)}>
             <Body style={styles.container}>
               <Text>
                  {this.props.answer}
               </Text>
             </Body>
           </CardItem>
         </Card>
      </CardItem>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10
  }
});


export default connect(null)(Answer);
