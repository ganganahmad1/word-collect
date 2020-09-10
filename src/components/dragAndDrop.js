import React, { Component } from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import Animated from "react-native-reanimated"
import { PanGestureHandler, State } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window")
const { cond, eq, add, set, Value, event } = Animated

class Dnd extends Component {
  dragX = new Value(0)
  dragY = new Value(0)
  offsetX = new Value(50)
  offsetY = new Value(150)
  gestureState = new Value(-1)
  onGestureEvent = event([
    {
      nativeEvent: {
        translationX: this.dragX,
        translationY: this.dragY,
        state: this.gestureState,
      },
    },
  ])

  transX = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetX, this.dragX),
    set(this.offsetX, add(this.offsetX, this.dragX))
  )

  transY = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetY, this.dragY),
    set(this.offsetY, add(this.offsetY, this.dragY))
  )

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={[
              styles.box,
              {
                borderWidth: 2,
                transform: [
                  {
                    translateX: this.transX,
                  },
                  {
                    translateY: this.transY,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.txtMove}>Move Me</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    )
  }
}

const CIRCLE_SIZE = 70

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: "tomato",
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: "#000",
    justifyContent: "center",
  },
  txtMove: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
})

export default Dnd
