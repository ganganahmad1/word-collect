import React, { Component } from "react"
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

class Btn extends Component {
  render() {
    const {
      innerDisabled,
      innerRef,
      btnStyle,
      action,
      textStyle,
      text,
      x,
      y,
    } = this.props
    return (
      <Animated.View
        ref={innerRef}
        style={[
          btnStyle,
          {
            transform: [
              {
                translateX: x,
              },
              {
                translateY: y,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={action} disabled={innerDisabled}>
          <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

export default Btn
