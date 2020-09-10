import React, { Component } from "react"
import { View } from "react-native"

class Box extends Component {
  render() {
    const { boxStyle, innerRef } = this.props
    return <View style={boxStyle} ref={innerRef} />
  }
}

export default Box
