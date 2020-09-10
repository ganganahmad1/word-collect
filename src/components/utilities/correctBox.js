import React, { Component } from "react"
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

class CorrextBox extends Component {
  render() {
    const { btnStyle, txtStyle, text } = this.props
    return (
      <TouchableOpacity style={[btnStyle]}>
        <Text style={txtStyle}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default CorrextBox
