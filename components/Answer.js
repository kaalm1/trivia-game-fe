import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text, Card, CardItem, Body} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class Answer extends React.Component{

  render(){
    return(
        <Card>
           <CardItem>
             <Body>
               <Text>
                  //Your text here
               </Text>
             </Body>
           </CardItem>
         </Card>
    )
  }
}


export default connect(null)(Answer);
