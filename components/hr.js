import React from 'react'
import {Image, View, Dimensions, Text} from 'react-native'

var { width, height } = Dimensions.get('window')

export default class Hr extends React.Component{
  render(){
    return(
        <View style={{flex:1, justifyContent: "center", alignItems: "center", flexDirection:'row'}}>
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            width: width/3,
            }}/>
            <Text style={{backgroundColor: 'transparent'}}>   {this.props.text}   </Text>
            <View style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              width: width/3,
              }}/>
        </View>
  )
}
}
