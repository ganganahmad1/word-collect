import React, { Component } from "react"
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
} from "react-native"

class panResponder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY({ x: 5, y: 0 }),
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {},
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.zone} />

        {this.renderDraggable()}
      </View>
    )
  }

  renderDraggable() {
    return (
      <View style={styles.draggableContainer}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.draggable, this.state.pan.getLayout()]}
        ></Animated.View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  draggable: {
    height: 100,
    width: 100,
    backgroundColor: "#848ccf",
    elevation: 3,
    borderRadius: 10,
    position: "absolute",
  },
  zone: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 5,
  },
})

export default panResponder
