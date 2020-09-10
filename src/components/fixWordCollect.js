import React, { Component } from "react"
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native"
import Btn from "./utilities/btn"
import Box from "./utilities/box"
import CorrextBox from "./utilities/correctBox"

class FixWordCollect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      word: [
        {
          id: 0,
          value: "ABC",
          correct: false,
        },
        {
          id: 1,
          value: "BCA",
          correct: false,
        },
        {
          id: 2,
          value: "CBA",
          correct: false,
        },
      ],
      alphabet: [
        {
          id: 0,
          value: "A",
          position: new Animated.ValueXY({ x: 5, y: 160 }),
          isDisabled: false,
        },
        {
          id: 1,
          value: "B",
          position: new Animated.ValueXY({ x: 5, y: 160 }),
          isDisabled: false,
        },
        {
          id: 2,
          value: "C",
          position: new Animated.ValueXY({ x: 5, y: 160 }),
          isDisabled: false,
        },
      ],
      isSelected: 0,
      boxPosition: [],
      btnPosition: [],
    }
  }

  componentDidMount() {
    this.getBtnPosition()
    setTimeout(() => {
      this.setIsSelected(0)
    }, 100)
  }

  renderBtn = (word, containerKey) => {
    return word
      .split("")
      .map((item, key) => (
        <CorrextBox
          key={key}
          btnStyle={styles.correctBox}
          txtStyle={styles.buttonText}
          text={item}
        />
      ))
  }

  renderBox = (word, containerKey) => {
    return word
      .split("")
      .map((item, key) => (
        <Box
          boxStyle={styles.border}
          key={key}
          innerRef={(node) => (this["box" + containerKey + key] = node)}
        />
      ))
  }

  getBoxPosition = () => {
    this.state.word.map((item, key) =>
      this.state.word[this.state.isSelected].value
        .split(" ")
        .map((childItem, childKey) => {
          if (this["box" + this.state.isSelected + key])
            this["box" + this.state.isSelected + key].measure(
              (fx, fy, width, height, px, py) => {
                let newBoxPosition = { width, height, px, py }
                this.setState({
                  boxPosition: [...this.state.boxPosition, newBoxPosition],
                })
              }
            )
        })
    )
  }

  getBtnPosition = () => {
    this.state.alphabet.map((item, key) => {
      this["btn" + item.id].measure((fx, fy, width, height, px, py) => {
        let newBtnPosition = { fx, fy, px, py, width, height }
        this.setState({
          btnPosition: [...this.state.btnPosition, newBtnPosition],
        })
      })
    })
  }

  resetBtnPosition = () => {
    this.setState({
      alphabet: this.state.alphabet.map((item, key) => {
        return Object.assign(item, { isDisabled: false })
      }),
    })
    this.state.alphabet.map((item, key) => {
      Animated.spring(this.state.alphabet[key].position, {
        toValue: {
          x: 5,
          y: 160,
        },
        useNativeDriver: true,
      }).start()
    })
  }

  resetAll = () => {
    this.setState(
      {
        word: this.state.word.map((item, key) => {
          return Object.assign(item, { correct: false })
        }),
      },
      () => {
        this.resetBtnPosition()
        setTimeout(() => {
          this.setIsSelected(0)
        }, 100)
      }
    )
  }

  setIsSelected = (id) => {
    this.setState({ isSelected: id }, () => {
      this.getBoxPosition()
      this.setState({ boxPosition: [] })
      this.setState({ value: "" })
      this.resetBtnPosition()
    })
  }

  moveBtn = (id) => {
    this.setState(
      {
        value: this.state.value + this.state.alphabet[id].value,
      },
      () => {
        this.setState({
          alphabet: this.state.alphabet.map((item, key) => {
            return item.id === id
              ? Object.assign(item, { isDisabled: true })
              : item
          }),
        })
        if (this.state.word[this.state.isSelected].value == this.state.value) {
          this.setState(
            {
              word: this.state.word.map((item, key) => {
                return item.id === this.state.isSelected
                  ? Object.assign(item, { correct: true })
                  : item
              }),
            },
            () => {
              this.setIsSelected(0)
              this.resetBtnPosition()
            }
          )
        }
      }
    )
    Animated.spring(this.state.alphabet[id].position, {
      toValue: {
        x:
          this.state.boxPosition[this.state.value.length]?.px -
          this.state.btnPosition[id].px -
          this.state.boxPosition[1]?.width * id -
          5 * 2 * id,
        y: this.state.boxPosition[this.state.value.length]?.py - 10,
      },
      useNativeDriver: true,
    }).start()
  }

  render() {
    console.log(this.state.value)
    return (
      <SafeAreaView style={styles.container}>
        {this.state.word.map((item, key) => (
          <TouchableOpacity
            key={item.id}
            onPress={(_) => this.setIsSelected(item.id)}
            style={[
              {
                flexDirection: "row",
              },
              this.state.isSelected == item.id
                ? { borderWidth: 1 }
                : { borderWidth: 0 },
            ]}
          >
            {this.state.word[item.id].correct
              ? this.renderBtn(item.value, item.id)
              : this.renderBox(item.value, item.id)}
          </TouchableOpacity>
        ))}
        <View style={{ position: "absolute" }}>
          <View style={{ flexDirection: "row" }}>
            {this.state.alphabet.map((item, key) => (
              <Btn
                key={item.id}
                innerDisabled={item.isDisabled}
                btnStyle={styles.btnAdd}
                textStyle={styles.buttonText}
                text={item.value}
                innerRef={(node) => (this["btn" + item.id] = node)}
                x={item.position.x}
                y={item.position.y}
                action={
                  this.state.word[this.state.isSelected].correct
                    ? null
                    : () => this.moveBtn(item.id)
                }
              />
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.btnReset,
              {
                transform: [
                  {
                    translateX: 5,
                  },
                  {
                    translateY: 170,
                  },
                ],
              },
            ]}
            onPress={() => this.resetAll()}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  btnAdd: {
    marginRight: 10,
    backgroundColor: "blue",
    elevation: 3,
    marginTop: 5,
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
  },
  correctBox: {
    height: 40,
    width: 40,
    elevation: 3,
    borderRadius: 6,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "blue",
  },
  border: {
    height: 40,
    width: 40,
    borderRadius: 6,
    borderWidth: 1,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  btnReset: {
    backgroundColor: "red",
    elevation: 3,
    width: 140,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
  },
})

export default FixWordCollect
