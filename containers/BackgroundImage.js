import React, { Component } from 'react'
import { Image } from 'react-native'

class BackgroundImage extends Component {
  render() {
    const {source, children, style, ...props} = this.props
    return (
      <Image source={ source }
             style={ { flex: 1, width: null, height: null, ...style } }
             {...props}>
        { children }
      </Image>
    )
  }
}

export default BackgroundImage
