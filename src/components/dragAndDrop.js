import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import Animated from "react-native-reanimated"
import { PanGestureHandler, State } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window")
const { 
    cond, 
    eq, 
    add, 
    set, 
    Value, 
    event,
    interpolate,
    Extrapolate
} = Animated

class Dnd extends Component {
    dragX = new Value(0)
    dragY = new Value(0)
    offsetX = new Value(width - (width / 4))
    offsetY = new Value(height - (height / 4))
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
        set(this.offsetX, add(this.offsetX, this.dragX)),
    )
    
    transY = cond(
        eq(this.gestureState, State.ACTIVE),
        add(this.offsetY, this.dragY),
        set(this.offsetY, add(this.offsetY, this.dragY)),
    )

    opacity = interpolate(this.transY, {
        inputRange: [0, height],
        outputRange: [0.1, 1],
    })

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
                                opacity: this.opacity,
                                borderWidth: 3,
                                transform: [
                                    {
                                        translateX: this.transX,
                                    },
                                    {
                                        translateY: this.transY,
                                    }
                                ]
                            }
                        ]}
                    >
                        <Text style={ styles.txtMove }>Move Me</Text>
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
    justifyContent: 'center'
  },
  txtMove: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold'
  }
})

export default Dnd